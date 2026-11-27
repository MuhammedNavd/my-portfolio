import { useEffect, useRef, useState } from 'react'

import { CHAPTERS, SITE } from '../content'
import { cx } from '../lib/cx'
import { setSoundEnabled, soundEnabled, subscribeSound, twinkle } from '../lib/twinkle'

/*
  Fixed instrument bar: identity, chapter index with scroll-spy, the interface
  sound switch, availability and a reading-progress hairline along the bottom.
*/
export function Hud() {
  const [active, setActive] = useState(CHAPTERS[0].id)
  const [progress, setProgress] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [sound, setSound] = useState(soundEnabled)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => subscribeSound(() => setSound(soundEnabled())), [])

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

  /* On narrow screens the index scrolls sideways: keep the current chapter in view. */
  useEffect(() => {
    const nav = navRef.current
    if (!nav || nav.scrollWidth <= nav.clientWidth) return
    const link = nav.querySelector<HTMLElement>(`[data-chapter="${active}"]`)
    if (!link) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    nav.scrollTo({
      left: Math.max(0, link.offsetLeft - nav.clientWidth / 2 + link.clientWidth / 2),
      behavior: reduce ? 'auto' : 'smooth',
    })
  }, [active])

  return (
    <header
      className={cx(
        'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
        scrolled ? 'border-hair bg-void/88 backdrop-blur-xl' : 'border-transparent bg-void/45 backdrop-blur-sm',
      )}
    >
      <div className="mx-auto flex h-14 w-full max-w-[1320px] items-center gap-2.5 px-5 sm:gap-4 sm:px-8 lg:px-12">
        <a
          href="#top"
          className="group flex shrink-0 items-center gap-2.5"
          aria-label={`${SITE.name} — top of page`}
        >
          <span className="grid size-9 place-items-center border border-ice/30 font-mono text-[11px] font-medium tracking-[0.08em] text-ice transition-colors group-hover:border-ice/60 group-hover:bg-ice/[0.06]">
            {SITE.monogram}
          </span>
          <span className="hidden font-display text-[15px] font-medium tracking-tight text-ink sm:block">
            {SITE.short}
          </span>
        </a>

        <nav
          ref={navRef}
          aria-label="Chapters"
          className="no-scrollbar -mx-1 flex flex-1 items-center gap-0.5 overflow-x-auto px-1 [mask-image:linear-gradient(to_right,black_86%,transparent)] lg:[mask-image:none]"
        >
          {CHAPTERS.map((chapter) => (
            <a
              key={chapter.id}
              href={`#${chapter.id}`}
              data-chapter={chapter.id}
              aria-current={active === chapter.id ? 'true' : undefined}
              className={cx(
                'mono-label flex h-11 shrink-0 items-center px-2.5 transition-colors',
                active === chapter.id ? 'text-ice' : 'text-dim hover:text-mute',
              )}
            >
              <span className="mr-1 text-[9px] opacity-55">{chapter.code}</span>
              {chapter.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          aria-pressed={sound}
          aria-label={sound ? 'Mute interface sound' : 'Enable interface sound'}
          onClick={() => {
            const next = !sound
            setSoundEnabled(next)
            /* Unmuting plays one chirp, so the switch proves itself immediately. */
            if (next) twinkle(1)
          }}
          className={cx(
            'mono-label flex h-11 shrink-0 items-center gap-1.5 border px-2.5 transition-colors',
            sound
              ? 'border-acid/40 text-acid hover:border-acid/70'
              : 'border-hair text-dim hover:border-ice/30 hover:text-mute',
          )}
        >
          <span aria-hidden className={cx('size-1.5 rounded-full', sound ? 'bg-acid' : 'bg-dim/70')} />
          sfx
        </button>

        <div className="hidden shrink-0 items-center gap-3 md:flex">
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-acid animate-breathe" />
            <span className="mono-label text-[9px] text-acid/85">Open to work</span>
          </span>
          <a
            href="#uplink"
            className="mono-label flex h-11 items-center border border-ice/25 px-3 text-ice transition-colors hover:border-ice/50 hover:bg-ice/[0.08]"
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
