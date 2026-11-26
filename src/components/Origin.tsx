import { ORIGIN, TIMELINE } from '../content'
import { cx } from '../lib/cx'
import { Chapter } from './Chapter'
import { Reveal } from './Reveal'

/* Chapter 01: the reasoning behind the migration, then the boot sequence. */
export function Origin() {
  return (
    <Chapter id="origin" code="01" label="Origin" title={ORIGIN.title} lead={ORIGIN.lead}>
      <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:gap-16">
        <div className="space-y-3">
          {ORIGIN.notes.map((note, index) => (
            <Reveal key={note.label} delay={index * 0.05} className="panel group p-5">
              <div className="flex items-center gap-3">
                <span className="mono-label text-[8.5px] text-acid/80">{String(index + 1).padStart(2, '0')}</span>
                <span className="h-px flex-1 bg-hair" />
                <span className="mono-label text-[8.5px] text-dim">{note.label}</span>
              </div>
              <p className="mt-3 text-[13.5px] leading-[1.8] text-mute">{note.body}</p>
            </Reveal>
          ))}
        </div>

        <ol className="relative">
          <span
            aria-hidden
            className="absolute top-2 bottom-6 left-[7px] w-px bg-linear-to-b from-ice/30 via-hair to-transparent"
          />
          {TIMELINE.map((entry) => (
            <li key={entry.code} className="relative pb-8 pl-8 last:pb-0">
              <span
                aria-hidden
                className={cx(
                  'absolute top-1.5 left-0 size-[15px] rounded-full border bg-void',
                  entry.tone === 'acid' ? 'border-acid/70' : 'border-ice/60',
                )}
              >
                <span className={cx('absolute inset-[4px] rounded-full', entry.tone === 'acid' ? 'bg-acid' : 'bg-ice')} />
              </span>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="mono-label text-[9px] text-dim">{entry.date}</span>
                <span aria-hidden className="h-px w-5 bg-hair" />
                <span className="mono-label text-[8.5px] text-ice/50">node {entry.code}</span>
              </div>
              <h3 className="mt-2 font-display text-[18px] leading-snug font-medium text-ink">{entry.title}</h3>
              <p className="mono-label mt-1.5 text-[8.5px] leading-relaxed text-acid/70">{entry.org}</p>
              <p className="mt-2 max-w-[54ch] text-[13.5px] leading-[1.8] text-mute">{entry.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </Chapter>
  )
}
