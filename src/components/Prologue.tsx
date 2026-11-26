import { PROLOGUE, STATS, TERMINAL } from '../content'
import { cx } from '../lib/cx'
import { Chapter } from './Chapter'
import { Reveal } from './Reveal'

/* Chapter 00: the boot log, four headline numbers and the short version. */
export function Prologue() {
  return (
    <Chapter id="prologue" code="00" label="Prologue" title={PROLOGUE.title} lead={PROLOGUE.lead}>
      <div className="grid gap-4 lg:grid-cols-[1.04fr_0.96fr]">
        <Reveal className="panel relative self-start overflow-hidden">
          <div className="flex items-center justify-between border-b border-hair px-4 py-2.5">
            <span className="mono-label text-dim">operator.log</span>
            <span aria-hidden className="flex gap-1.5">
              <span className="size-1.5 rounded-full bg-plasma/70" />
              <span className="size-1.5 rounded-full bg-acid/60" />
              <span className="size-1.5 rounded-full bg-ice/60" />
            </span>
          </div>
          <div className="scanlines relative p-5 font-mono text-[11.5px] leading-[2.05] sm:p-6 sm:text-[12.5px]">
            {TERMINAL.map((line) => (
              <div key={line.text} className="flex gap-2.5">
                <span aria-hidden className={cx('shrink-0', line.prompt ? 'text-acid' : 'text-ice/35')}>
                  {line.prompt ? '$' : '>'}
                </span>
                <span className={cx('break-words', line.prompt ? 'text-ink' : 'text-mute', line.cursor && 'text-dim')}>
                  {line.text}
                  {line.cursor && (
                    <span aria-hidden className="ml-1.5 inline-block h-[1em] w-[7px] translate-y-[2px] animate-blink bg-ice" />
                  )}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {STATS.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={0.05 * index}
              className="panel group relative flex flex-col justify-between overflow-hidden p-4 sm:p-5"
            >
              <span className="mono-label text-[9px] text-dim">0{index + 1}</span>
              <div className="mt-6">
                <div className="font-display text-[clamp(1.9rem,4.2vw,2.7rem)] leading-none font-semibold text-ice">
                  {stat.value}
                </div>
                <div className="mono-label mt-2.5 text-[8.5px] leading-relaxed text-ink/85">{stat.label}</div>
                <p className="mt-2 text-[11.5px] leading-relaxed text-dim">{stat.note}</p>
              </div>
              <span
                aria-hidden
                className="absolute right-0 top-0 size-9 border-r border-t border-ice/0 transition-colors duration-300 group-hover:border-acid/40"
              />
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-5 border-l border-ice/20 pl-5 sm:mt-10 sm:grid-cols-2 sm:gap-12 sm:pl-6">
        {PROLOGUE.body.map((paragraph) => (
          <p key={paragraph} className="text-[14.5px] leading-[1.85] text-mute">
            {paragraph}
          </p>
        ))}
      </div>
    </Chapter>
  )
}
