import { ArrowDownRight, ArrowUpRight } from 'lucide-react'

import { HERO, SITE } from '../content'
import { Container } from './Container'
import { Reveal } from './Reveal'

/* The opening scene: the claim on the left, the instrument on the right. */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20">
      <div
        aria-hidden
        className="field-grid pointer-events-none absolute inset-x-0 top-0 h-[540px] opacity-40 [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_72%)]"
      />
      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="size-1.5 bg-acid" />
                <span className="mono-label text-acid/90">{HERO.eyebrow}</span>
                <span className="h-px w-14 bg-linear-to-r from-ice/40 to-transparent" />
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="mt-7 font-display text-[clamp(2.3rem,5.3vw,4rem)] leading-[0.98] font-semibold tracking-[-0.035em] text-ink">
                {HERO.title[0]}
                <br />
                {HERO.title[1]}
                <br />
                <span className="bg-linear-to-r from-ice via-ice to-acid bg-clip-text text-transparent">
                  {HERO.title[2]}
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
                <span className="font-display text-[17px] font-medium text-ink">{SITE.name}</span>
                <span className="mono-label text-[9px] text-dim">{SITE.role}</span>
              </div>
              <p className="mt-5 max-w-[53ch] text-[16px] leading-[1.78] text-mute">{HERO.body}</p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href={HERO.primary.href}
                  className="group inline-flex h-12 items-center gap-2 bg-acid px-6 font-display text-[13.5px] font-semibold tracking-[0.06em] text-void uppercase transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_44px_-14px_rgb(216_255_92_/_0.6)]"
                >
                  {HERO.primary.label}
                  <ArrowDownRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                </a>
                <a
                  href={HERO.secondary.href}
                  className="group inline-flex h-12 items-center gap-2 border border-ice/25 px-6 font-display text-[13.5px] font-semibold tracking-[0.06em] text-ice uppercase transition-colors hover:border-ice/50 hover:bg-ice/[0.06]"
                >
                  {HERO.secondary.label}
                  <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>

              <ul className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
                {HERO.meta.map((item, index) => (
                  <li key={item} className="mono-label flex items-center gap-3 text-[9px] text-dim">
                    {item}
                    {index < HERO.meta.length - 1 && <span aria-hidden className="size-1 rounded-full bg-ice/40" />}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.16} className="relative">
            <Orbit />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

/* A radar-style instrument: concentric rings, an orbiting payload and a core. */
function Orbit() {
  const nodes = [
    { label: 'Azure', sub: 'app service', position: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2' },
    { label: 'AI agents', sub: 'llm · mcp', position: 'top-1/2 right-0 translate-x-1/2 -translate-y-1/2 text-right' },
    { label: 'SQL Server', sub: 'tuning', position: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-center' },
    { label: 'IoT edge', sub: 'telemetry', position: 'top-1/2 left-0 -translate-x-1/2 -translate-y-1/2' },
  ]

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[430px]">
      <div aria-hidden className="absolute inset-[16%] rounded-full bg-ice/[0.08] blur-3xl" />

      <div aria-hidden className="absolute inset-[13%]">
        <div className="absolute inset-0 rounded-full border border-ice/12" />
        <div className="absolute inset-[7%] animate-orbit-rev rounded-full border border-dashed border-ice/18" />
        <div className="absolute inset-[19%] rounded-full border border-ice/10" />
        <div className="absolute inset-[31%] animate-orbit rounded-full border border-dashed border-acid/25" />
        <div className="absolute inset-0 animate-ring rounded-full border border-ice/25" />
        <div className="absolute inset-0 animate-ring rounded-full border border-ice/15 [animation-delay:2.4s]" />

        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-linear-to-b from-transparent via-ice/15 to-transparent" />
        <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-linear-to-r from-transparent via-ice/15 to-transparent" />

        <div className="absolute inset-[7%] animate-orbit-rev">
          <span className="absolute left-1/2 top-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ice shadow-[0_0_14px_3px_rgb(143_247_255_/_0.55)]" />
        </div>
        <div className="absolute inset-[19%] animate-orbit [animation-duration:32s]">
          <span className="absolute bottom-0 left-1/2 size-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-acid shadow-[0_0_14px_3px_rgb(216_255_92_/_0.45)]" />
        </div>

        <div className="absolute inset-[33%] grid place-items-center rounded-full border border-ice/25 bg-deck/85 backdrop-blur-sm glow-ice">
          <div className="px-2 text-center">
            <div className="font-display text-[clamp(1.4rem,3.6vw,1.9rem)] font-semibold tracking-[0.06em] text-ice">
              MN
            </div>
            <div className="mono-label mt-1 text-[6.5px] tracking-[0.12em] text-dim">core / dotnet</div>
          </div>
        </div>
      </div>

      <span aria-hidden className="absolute left-0 top-0 size-4 border-l border-t border-ice/25" />
      <span aria-hidden className="absolute right-0 top-0 size-4 border-r border-t border-ice/25" />
      <span aria-hidden className="absolute bottom-0 left-0 size-4 border-b border-l border-ice/25" />
      <span aria-hidden className="absolute bottom-0 right-0 size-4 border-b border-r border-ice/25" />

      {nodes.map((node) => (
        <div key={node.label} className={`absolute ${node.position}`}>
          <div className="mono-label text-[9px] whitespace-nowrap text-ice/90">{node.label}</div>
          <div className="mono-label mt-0.5 text-[7.5px] whitespace-nowrap text-dim">{node.sub}</div>
        </div>
      ))}
    </div>
  )
}
