import { SERVICE } from '../content'
import { Chapter } from './Chapter'
import { Reveal } from './Reveal'

/* Chapter 02: the current post, its measured impact and the work itself. */
export function Service() {
  return (
    <Chapter
      id="service"
      code="02"
      label="Service"
      title={
        <>
          Four years, one <span className="text-ice">long deployment.</span>
        </>
      }
      lead={SERVICE.intro}
    >
      <Reveal className="panel relative overflow-hidden">
        <div aria-hidden className="dot-field absolute inset-0 opacity-[0.35]" />
        <div className="relative grid gap-6 p-5 sm:p-7 lg:grid-cols-[1.35fr_0.65fr] lg:gap-10">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="size-1.5 rounded-full bg-acid animate-breathe" />
              <span className="mono-label text-acid">current post</span>
            </div>
            <h3 className="mt-3 font-display text-[clamp(1.35rem,2.8vw,1.8rem)] font-semibold text-ink">{SERVICE.role}</h3>
            <p className="mt-1 text-[14px] text-mute">{SERVICE.company}</p>
            <p className="mt-4 max-w-[56ch] text-[13px] leading-[1.8] text-dim">
              Client: <span className="text-ink/90">{SERVICE.client}</span> — {SERVICE.clientNote}.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-4 self-start border-t border-hair pt-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
            <div>
              <dt className="mono-label text-[8.5px] text-dim">period</dt>
              <dd className="mt-1.5 font-mono text-[11.5px] text-ink">{SERVICE.period}</dd>
            </div>
            <div>
              <dt className="mono-label text-[8.5px] text-dim">base</dt>
              <dd className="mt-1.5 font-mono text-[11.5px] text-ink">{SERVICE.location}</dd>
            </div>
            <div>
              <dt className="mono-label text-[8.5px] text-dim">team</dt>
              <dd className="mt-1.5 font-mono text-[11.5px] text-ink">14 engineers</dd>
            </div>
            <div>
              <dt className="mono-label text-[8.5px] text-dim">delivered</dt>
              <dd className="mt-1.5 font-mono text-[11.5px] text-ink">4 projects</dd>
            </div>
          </dl>
        </div>
      </Reveal>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {SERVICE.impacts.map((impact, index) => (
          <Reveal key={impact.label} delay={index * 0.04} className="panel p-4 sm:p-5">
            <div className="flex items-baseline gap-1">
              <span className="font-display text-[clamp(1.7rem,3.4vw,2.2rem)] leading-none font-semibold text-ink">
                {impact.value}
              </span>
              <span className="font-mono text-[11px] text-acid">{impact.unit}</span>
            </div>
            <div className="mono-label mt-2.5 text-[8.5px] leading-relaxed text-ice/80">{impact.label}</div>
            <p className="mt-1.5 text-[11.5px] leading-relaxed text-dim">{impact.note}</p>
          </Reveal>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.45fr_0.55fr]">
        <Reveal className="panel p-5 sm:p-6">
          <h3 className="mono-label text-dim">what the work looked like</h3>
          <ul className="mt-4 gap-x-8 sm:columns-2">
            {SERVICE.work.map((item) => (
              <li key={item} className="mb-3 flex break-inside-avoid gap-3 text-[12.5px] leading-[1.75] text-mute">
                <span aria-hidden className="mt-[7px] size-1 shrink-0 rotate-45 bg-ice/60" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.08} className="relative border-l border-acid/40 pl-5">
          <span className="mono-label text-acid/80">{SERVICE.note.label}</span>
          <p className="mt-3 font-display text-[16px] leading-[1.55] text-ink/90">{SERVICE.note.body}</p>
        </Reveal>
      </div>
    </Chapter>
  )
}
