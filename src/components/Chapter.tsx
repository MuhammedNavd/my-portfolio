import type { ReactNode } from 'react'

import { Container } from './Container'
import { Reveal } from './Reveal'

/*
  A chapter opens with a rule carrying its index, then a display title paired
  with a lead. Every section on the page is one of these.
*/
export function Chapter({
  id,
  code,
  label,
  title,
  lead,
  children,
}: {
  id: string
  code: string
  label: string
  title: ReactNode
  lead?: string
  children: ReactNode
}) {
  return (
    <section id={id} className="relative scroll-mt-20 border-t border-hair py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="mono-label shrink-0 text-acid">ch.{code}</span>
            <span className="h-px flex-1 bg-linear-to-r from-ice/25 to-transparent" />
            <span className="mono-label shrink-0 text-dim">{label}</span>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-16">
            <h2 className="max-w-[20ch] text-[clamp(1.9rem,4.2vw,3.15rem)] leading-[1.03] font-semibold text-balance text-ink">
              {title}
            </h2>
            {lead && <p className="max-w-[50ch] text-[15.5px] leading-[1.8] text-mute lg:pb-1.5">{lead}</p>}
          </div>
        </Reveal>
        <div className="mt-12 sm:mt-16">{children}</div>
      </Container>
    </section>
  )
}
