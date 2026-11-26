import { ArrowUpRight, Download } from 'lucide-react'

import { UPLINK } from '../content'
import { Container } from './Container'
import { Reveal } from './Reveal'

/* Chapter 06: the closing call to action and the contact channels. */
export function Uplink() {
  return (
    <section id="uplink" className="relative scroll-mt-20 border-t border-hair py-20 sm:py-28">
      <Container>
        <Reveal className="panel relative overflow-hidden p-6 sm:p-10 lg:p-14">
          <div aria-hidden className="dot-field absolute inset-0 opacity-30" />
          <div aria-hidden className="absolute -top-28 -right-24 size-72 rounded-full bg-ice/10 blur-[100px]" />
          <div aria-hidden className="absolute -bottom-24 -left-20 size-64 rounded-full bg-acid/[0.06] blur-[100px]" />

          <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
            <div>
              <div className="mono-label flex items-center gap-2.5 text-acid">
                <span className="size-1.5 rounded-full bg-acid animate-breathe" />
                {UPLINK.availability}
              </div>
              <h2 className="mt-5 max-w-[17ch] text-[clamp(2rem,4.6vw,3.3rem)] leading-[1.02] font-semibold text-balance text-ink">
                {UPLINK.title}
              </h2>
              <p className="mt-5 max-w-[50ch] text-[15px] leading-[1.8] text-mute">{UPLINK.body}</p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={UPLINK.primary.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex h-12 items-center gap-2.5 bg-ice px-6 font-display text-[13.5px] font-semibold tracking-[0.06em] text-void uppercase transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_44px_-14px_rgb(143_247_255_/_0.65)]"
                >
                  {UPLINK.primary.label}
                  <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <a
                  href={UPLINK.resume.href}
                  download
                  className="group inline-flex h-12 items-center gap-2.5 border border-acid/35 px-6 font-display text-[13.5px] font-semibold tracking-[0.06em] text-acid uppercase transition-colors hover:border-acid/60 hover:bg-acid/[0.07]"
                >
                  {UPLINK.resume.label}
                  <Download className="size-4 transition-transform duration-200 group-hover:translate-y-0.5" />
                </a>
              </div>
              <p className="mono-label mt-3.5 text-[8px] text-dim">
                {UPLINK.primary.note} · {UPLINK.resume.note}
              </p>
            </div>

            <div className="space-y-2">
              {UPLINK.channels.map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  target={channel.href.startsWith('http') ? '_blank' : undefined}
                  rel={channel.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="group flex items-center justify-between gap-4 border border-hair bg-void/40 px-4 py-3.5 transition-colors hover:border-ice/30 hover:bg-ice/[0.05]"
                >
                  <span>
                    <span className="mono-label block text-[8px] text-dim">{channel.label}</span>
                    <span className="mt-1.5 block font-mono text-[11.5px] break-all text-ink/90">{channel.value}</span>
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 text-dim transition-colors group-hover:text-ice" />
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
