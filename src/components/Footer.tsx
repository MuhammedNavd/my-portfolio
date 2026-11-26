import { SITE } from '../content'
import { Container } from './Container'

export function Footer() {
  return (
    <footer className="relative border-t border-hair py-8">
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid size-7 place-items-center border border-ice/25 font-mono text-[10px] text-ice">
            {SITE.monogram}
          </span>
          <span className="mono-label text-[8.5px] text-dim">
            {SITE.name} · field log {SITE.logVersion} · {SITE.year}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="mono-label text-[8.5px] text-dim">
            {SITE.location} · {SITE.timezone}
          </span>
          <a href="#top" className="mono-label text-[8.5px] text-mute transition-colors hover:text-ice">
            Back to top ↑
          </a>
        </div>
      </Container>
    </footer>
  )
}
