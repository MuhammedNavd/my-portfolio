import { ARSENAL } from '../content'
import { cx } from '../lib/cx'
import { Chapter } from './Chapter'
import { Reveal } from './Reveal'

/* Chapter 04: the capability map, grouped by what it is for. */
export function Arsenal() {
  return (
    <Chapter
      id="arsenal"
      code="04"
      label="Arsenal"
      title={
        <>
          The tools, and <span className="text-ice">when I reach for them.</span>
        </>
      }
      lead="A stack is only useful as a set of decisions. These are the layers I work across, from the runtime up to the agents calling it."
    >
      <div className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
        {ARSENAL.map((group, index) => (
          <Reveal
            key={group.label}
            delay={Math.min(index * 0.03, 0.18)}
            className={cx(
              'panel group p-5 transition-colors duration-300',
              group.accent ? 'border-acid/30 bg-acid/[0.035] xl:col-span-2' : 'hover:border-ice/25',
            )}
          >
            <div className={cx(group.accent && 'xl:flex xl:items-start xl:justify-between xl:gap-10')}>
              <div className={cx(group.accent && 'xl:max-w-[38%]')}>
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className={cx('font-display text-[15px] font-medium', group.accent ? 'text-acid' : 'text-ink')}>
                    {group.label}
                  </h3>
                  <span className="mono-label text-[8px] text-dim">{String(group.items.length).padStart(2, '0')}</span>
                </div>
                <p className="mt-1.5 text-[11.5px] leading-relaxed text-dim">{group.note}</p>
              </div>
              <ul className={cx('mt-4 flex flex-wrap gap-1.5', group.accent && 'xl:mt-1 xl:max-w-[58%] xl:justify-end')}>
                {group.items.map((item) => (
                  <li
                    key={item}
                    className={cx(
                      'mono-label border px-2 py-1.5 text-[8.5px] transition-colors duration-300',
                      group.accent
                        ? 'border-acid/20 bg-acid/[0.06] text-acid/85'
                        : 'border-hair bg-deck/60 text-mute group-hover:border-ice/20',
                    )}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Chapter>
  )
}
