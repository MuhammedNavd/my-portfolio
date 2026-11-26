import { TICKER } from '../content'

/* The stack ribbon: two identical groups so the loop is seamless. */
export function Ticker() {
  return (
    <div className="relative overflow-hidden border-y border-hair bg-deck/40 py-3">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((group) => (
          <div key={group} className="flex shrink-0 items-center" aria-hidden={group === 1}>
            {TICKER.map((item) => (
              <span key={`${group}-${item}`} className="mono-label flex items-center gap-6 pr-6 text-[9px] whitespace-nowrap text-dim">
                {item}
                <span aria-hidden className="size-1 rotate-45 bg-acid/50" />
              </span>
            ))}
          </div>
        ))}
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-linear-to-r from-void to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-linear-to-l from-void to-transparent" />
    </div>
  )
}
