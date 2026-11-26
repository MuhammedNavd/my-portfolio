import { RECORD, SITE } from '../content'
import { Chapter } from './Chapter'
import { Reveal } from './Reveal'

/* Chapter 05: the operating rules, then the paper trail. */
export function Record() {
  return (
    <Chapter id="record" code="05" label="Record" title={RECORD.title} lead={RECORD.lead}>
      <div className="grid gap-3 sm:gap-4 lg:grid-cols-3">
        {RECORD.principles.map((principle, index) => (
          <Reveal key={principle.code} delay={index * 0.05} className="panel relative p-5">
            <div className="flex items-center justify-between">
              <span className="mono-label text-[8.5px] text-acid/80">{principle.code}</span>
              <span aria-hidden className="h-px w-10 bg-hair" />
            </div>
            <h3 className="mt-4 font-display text-[17px] leading-snug font-medium text-ink">{principle.title}</h3>
            <p className="mt-2 text-[12.5px] leading-[1.8] text-mute">{principle.body}</p>
          </Reveal>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.05fr_1fr_0.6fr]">
        <Reveal className="panel p-5">
          <h3 className="mono-label text-dim">certifications</h3>
          <ul className="mt-4 divide-y divide-hair">
            {RECORD.certs.map((cert) => (
              <li key={cert.name} className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
                <div>
                  <div className="text-[13px] leading-snug text-ink/90">{cert.name}</div>
                  <div className="mono-label mt-1 text-[8px] text-dim">{cert.issuer}</div>
                </div>
                {cert.code && cert.code !== cert.issuer && (
                  <span className="mono-label shrink-0 border border-ice/20 bg-ice/[0.05] px-2 py-1 text-[8px] text-ice/80">
                    {cert.code}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.05} className="panel p-5">
          <h3 className="mono-label text-dim">education</h3>
          <ul className="mt-4 space-y-4">
            {RECORD.education.map((entry) => (
              <li key={entry.degree} className="border-l border-hair pl-4">
                <div className="mono-label text-[8px] text-acid/70">{entry.date}</div>
                <div className="mt-1.5 text-[13.5px] leading-snug text-ink">{entry.degree}</div>
                <div className="mt-1 text-[11.5px] text-dim">{entry.field}</div>
                <div className="mt-1.5 text-[11.5px] leading-relaxed text-mute">{entry.school}</div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="panel p-5">
          <h3 className="mono-label text-dim">languages</h3>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {RECORD.languages.map((language) => (
              <li key={language} className="mono-label border border-hair bg-deck/60 px-2.5 py-1.5 text-[8.5px] text-mute">
                {language}
              </li>
            ))}
          </ul>
          <div className="mt-5 border-t border-hair pt-4">
            <div className="mono-label text-[8px] text-dim">base</div>
            <div className="mt-1.5 font-mono text-[11.5px] text-ink">{SITE.location}</div>
            <div className="mono-label mt-1 text-[8px] text-dim">{SITE.timezone}</div>
          </div>
        </Reveal>
      </div>
    </Chapter>
  )
}
