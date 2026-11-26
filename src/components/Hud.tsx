import { useEffect, useState } from 'react'

import { CHAPTERS, SITE } from '../content'
import { cx } from '../lib/cx'

/*
  Fixed instrument bar: identity, chapter index with scroll-spy, availability
  and a reading-progress hairline along the bottom edge.
*/
export function Hud() {
  const [active, setActive] = useState(CHAPTERS[0].id)
  const [progress, setProgress] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const nodes = CHAPTERS.map((c) => document.getElementById(c.id)).filter((n): n is HTMLElement => Boolean(n))
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      setProgress(max > 0 ? Math.min(1, el.scrollTop / max) : 0)
      setScrolled(el.scrollTop > 24)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <header
      className={cx(
        'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
        scrolled ? 'border-hair bg-void/88 backdrop-blur-xl' : 'border-transparent bg-void/45 backdrop-blur-sm',
      )}
    >
      <div className="mx-auto flex h-14 w-full max-w-[1320px] items-center gap-4 px-5 sm:px-8 lg:px-12">
        <a href="#top" className="group flex shrink-0 items-center gap-2.5" aria-label={`${SITE.name} — top of page`}>
          <span className="grid size-8 place-items-center border border-ice/30 font-mono text-[11px] font-medium tracking-[0.08em] text-ice transition-colors group-hover:border-ice/60 group-hover:bg-ice/[0.06]">
            {SITE.monogram}
          </span>
          <span className="hidden font-display text-[15px] font-medium tracking-tight text-ink sm:block">{SITE.short}</span>
        </a>

        <nav
          aria-label="Chapters"
          className="no-scrollbar -mx-1 flex flex-1 items-center gap-0.5 overflow-x-auto px-1 [mask-image:linear-gradient(to_right,black_86%,transparent)] lg:[mask-image:none]"
        >
          {CHAPTERS.map((chapter) => (
            <a
              key={chapter.id}
              href={`#${chapter.id}`}
              aria-current={active === chapter.id ? 'true' : undefined}
              className={cx(
                'mono-label shrink-0 px-2 py-1.5 transition-colors',
                active === chapter.id ? 'text-ice' : 'text-dim hover:text-mute',
              )}
            >
              <span className="mr-1 text-[9px] opacity-55">{chapter.code}</span>
              {chapter.label}
            </a>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 md:flex">
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-acid animate-breathe" />
            <span className="mono-label text-[9px] text-acid/85">Open to work</span>
          </span>
          <a
            href="#uplink"
            className="mono-label border border-ice/25 px-3 py-2 text-ice transition-colors hover:border-ice/50 hover:bg-ice/[0.08]"
          >
            Uplink
          </a>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-hair">
        <div
          className="h-full bg-linear-to-r from-ice to-acid"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>
    </header>
  )
}
