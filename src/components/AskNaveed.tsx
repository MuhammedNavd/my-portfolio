import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'

import { ASK } from '../content'
import { ask, STARTERS, type AskReply } from '../lib/askNaveed'
import { cx } from '../lib/cx'
import { Chapter } from './Chapter'

/*
  Chapter 06: a grounded question box over the resume.

  The answers come from `lib/askNaveed`, which matches the question against
  hand-written blocks built from the same content the page renders. No network
  call, no key, no hallucinated project — if the log does not cover it, the
  answer says so and points at Uplink.
*/

type Message = { id: number; role: 'you' | 'log'; text?: string; reply?: AskReply }

let sequence = 1

export function AskNaveed() {
  const [messages, setMessages] = useState<Message[]>([])
  const [value, setValue] = useState('')
  const [busy, setBusy] = useState(false)
  const [thinking, setThinking] = useState<string | null>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const timers = useRef<number[]>([])
  const reduce = useRef(false)

  useEffect(() => {
    reduce.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return () => timers.current.forEach((id) => window.clearTimeout(id))
  }, [])

  const last = messages.at(-1)
  const chips = last?.reply ? last.reply.follow : STARTERS

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    list.scrollTo({ top: list.scrollHeight, behavior: reduce.current ? 'auto' : 'smooth' })
  }, [messages, busy])

  const send = (raw: string) => {
    const query = raw.trim().slice(0, 160)
    if (!query || busy) return

    setValue('')
    setBusy(true)
    setThinking(query)
    setMessages((prev) => [...prev, { id: sequence++, role: 'you', text: query }])

    const reply = ask(query)
    const wait = reduce.current ? 60 : 340
    const timer = window.setTimeout(() => {
      setMessages((prev) => [...prev, { id: sequence++, role: 'log', reply }])
      setBusy(false)
      setThinking(null)
    }, wait)
    timers.current.push(timer)
  }

  return (
    <Chapter
      id="ask"
      code="06"
      label="Ask"
      title={
        <>
          Ask the log, <span className="text-ice">not the résumé.</span>
        </>
      }
      lead={ASK.lead}
    >
      <div className="panel relative overflow-hidden">
        <div aria-hidden className="scanlines pointer-events-none absolute inset-0 opacity-30" />
        <div aria-hidden className="absolute -top-24 right-0 size-64 rounded-full bg-ice/[0.07] blur-[100px]" />

        <div className="relative flex flex-wrap items-center justify-between gap-2 border-b border-hair px-4 py-3 sm:px-5">
          <span className="mono-label flex items-center gap-2 text-ice">
            <span aria-hidden className="size-1.5 rounded-full bg-acid animate-breathe" />
            ask mn-04
          </span>
          <span className="mono-label text-[8px] text-dim">{ASK.note}</span>
        </div>

        <div className="relative grid lg:grid-cols-[1fr_264px]">
          <div className="p-4 sm:p-6">
            <div
              ref={listRef}
              className="no-scrollbar max-h-[380px] min-h-[190px] space-y-3 overflow-y-auto pr-1 sm:max-h-[420px]"
            >
              <Bubble role="log">
                <p className="text-[13.5px] leading-[1.8] text-mute">{ASK.greeting}</p>
              </Bubble>

              <AnimatePresence initial={false}>
                {messages.map((message) =>
                  message.role === 'you' ? (
                    <Bubble key={message.id} role="you">
                      <p className="font-mono text-[12.5px] leading-[1.7] text-ink/90">{message.text}</p>
                    </Bubble>
                  ) : (
                    <Bubble key={message.id} role="log">
                      <Answer reply={message.reply!} />
                    </Bubble>
                  ),
                )}
              </AnimatePresence>

              {busy && (
                <Bubble role="log">
                  <p className="mono-label flex items-center gap-2 text-[8.5px] text-dim" aria-live="polite">
                    reading the log
                    <span aria-hidden className="inline-block h-2.5 w-1 bg-acid animate-blink" />
                    <span className="sr-only">{thinking}</span>
                  </p>
                </Bubble>
              )}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault()
                send(value)
              }}
              className="mt-4 flex gap-2 border-t border-hair pt-4"
            >
              <label htmlFor="ask-input" className="sr-only">
                Ask a question about Mohammed Naveed’s experience
              </label>
              <input
                id="ask-input"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                maxLength={160}
                autoComplete="off"
                placeholder="e.g. what did he build with AI agents?"
                className="h-11 min-w-0 flex-1 border border-hair bg-void/60 px-3 font-mono text-[12px] text-ink transition-colors placeholder:text-dim/80 hover:border-ice/25 focus:border-ice/45 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!value.trim() || busy}
                className={cx(
                  'mono-label flex h-11 shrink-0 items-center gap-2 border px-4 transition-colors',
                  value.trim() && !busy
                    ? 'border-acid/45 text-acid hover:border-acid/80 hover:bg-acid/[0.07]'
                    : 'border-hair text-dim',
                )}
              >
                ask
                <ArrowUpRight aria-hidden className="size-3.5" />
              </button>
            </form>
          </div>

          <aside className="border-t border-hair p-4 lg:border-t-0 lg:border-l sm:p-5">
            <div className="mono-label text-[8px] text-dim">{last?.reply ? 'related' : 'try asking'}</div>
            <div className="mt-3 flex flex-col items-start gap-2">
              {chips.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  disabled={busy}
                  onClick={() => send(chip.query)}
                  className="w-full border border-hair bg-void/40 px-3 py-2 text-left text-[12px] leading-[1.5] text-mute transition-colors hover:border-ice/30 hover:bg-ice/[0.05] hover:text-ink disabled:opacity-60"
                >
                  {chip.label}
                </button>
              ))}
            </div>
            <p className="mt-5 border-t border-hair pt-4 text-[11px] leading-[1.7] text-dim">{ASK.footnote}</p>
          </aside>
        </div>
      </div>
    </Chapter>
  )
}

function Bubble({ role, children }: { role: 'you' | 'log'; children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      className={cx('flex', role === 'you' ? 'justify-end' : 'justify-start')}
    >
      <div
        className={cx(
          'max-w-[92%] border px-3.5 py-3',
          role === 'you' ? 'border-acid/30 bg-acid/[0.06]' : 'border-hair bg-void/45',
        )}
      >
        <div className={cx('mono-label mb-2 text-[8px]', role === 'you' ? 'text-acid/80' : 'text-ice/75')}>
          {role === 'you' ? 'you' : 'mn-04 · field log'}
        </div>
        {children}
      </div>
    </motion.div>
  )
}

function Answer({ reply }: { reply: AskReply }) {
  const { answer } = reply
  return (
    <div aria-live="polite">
      <p className="text-[13.5px] leading-[1.8] text-ink/90">{answer.lead}</p>
      {answer.bullets && (
        <ul className="mt-3 space-y-2">
          {answer.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-2.5 text-[12.5px] leading-[1.75] text-mute">
              <span aria-hidden className="mt-[7px] size-1 shrink-0 rotate-45 bg-acid/70" />
              {bullet}
            </li>
          ))}
        </ul>
      )}
      {answer.close && <p className="mt-3 text-[12.5px] leading-[1.75] text-mute/90">{answer.close}</p>}
      {answer.sources && answer.sources.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-hair pt-2.5">
          <span className="mono-label text-[7.5px] text-dim">source</span>
          {answer.sources.map((source) => (
            <a
              key={source.href}
              href={source.href}
              className="mono-label text-[8px] text-ice/70 underline-offset-4 transition-colors hover:text-ice hover:underline"
            >
              {source.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
