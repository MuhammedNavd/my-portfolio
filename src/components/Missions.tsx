import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

import { MISSIONS, SIDE_MISSIONS } from '../content'
import { cx } from '../lib/cx'
import { Chapter } from './Chapter'
import { MissionMap } from './MissionMap'
import { Reveal } from './Reveal'

/* Chapter 03: a mission selector driving a single detailed file. */
export function Missions() {
  const [activeId, setActiveId] = useState(MISSIONS[0].id)
  const active = MISSIONS.find((mission) => mission.id === activeId) ?? MISSIONS[0]

  return (
    <Chapter
      id="missions"
      code="03"
      label="Missions"
      title={
        <>
          Six missions. <span className="text-ice">One standard.</span>
        </>
      }
      lead="Each of these ran against a live enterprise platform. Pick a file to open the log: what the problem was, what shipped, and what changed because of it."
    >
      <div className="grid gap-4 lg:grid-cols-[330px_1fr] xl:grid-cols-[370px_1fr]">
        <div role="tablist" aria-label="Missions" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
          {MISSIONS.map((mission) => {
            const selected = mission.id === activeId
            return (
              <button
                key={mission.id}
                type="button"
                role="tab"
                id={`tab-${mission.id}`}
                aria-selected={selected}
                aria-controls="mission-panel"
                onClick={() => setActiveId(mission.id)}
                className={cx(
                  'group relative w-[248px] shrink-0 border p-3.5 text-left transition-colors duration-200 lg:w-full',
                  selected
                    ? 'border-ice/30 bg-ice/[0.07]'
                    : 'border-hair bg-deck/40 hover:border-ice/20 hover:bg-ice/[0.03]',
                )}
              >
                <span className="mono-label text-[8.5px] text-dim">{mission.code}</span>
                <span
                  className={cx(
                    'mt-1.5 block font-display text-[14px] leading-snug font-medium transition-colors',
                    selected ? 'text-ice' : 'text-ink/85 group-hover:text-ink',
                  )}
                >
                  {mission.name}
                </span>
                <span className="mt-2 block font-mono text-[10px] text-acid/75">{mission.metric}</span>
                {selected && <span aria-hidden className="absolute inset-y-0 left-0 w-px bg-acid" />}
              </button>
            )
          })}
        </div>

        <div
          id="mission-panel"
          role="tabpanel"
          aria-labelledby={`tab-${active.id}`}
          aria-live="polite"
          className="panel relative min-h-[430px] overflow-hidden p-5 sm:p-7"
        >
          <div aria-hidden className="scanlines pointer-events-none absolute inset-0 opacity-40" />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="mono-label text-[9px] text-acid">
                  {active.code} / {active.tag}
                </span>
                <span className="mono-label flex items-center gap-2 text-[8.5px] text-dim">
                  <span className="size-1 rounded-full bg-acid" />
                  shipped
                </span>
              </div>

              <h3 className="mt-4 font-display text-[clamp(1.35rem,2.6vw,1.85rem)] leading-tight font-semibold text-ink">
                {active.name}
              </h3>
              <p className="mt-3 max-w-[62ch] text-[14.5px] leading-[1.8] text-mute">{active.summary}</p>

              <div className="mt-6 grid gap-6 sm:grid-cols-[1fr_170px]">
                <ul className="space-y-3">
                  {active.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-[12.5px] leading-[1.8] text-mute">
                      <span aria-hidden className="mt-[8px] size-1 shrink-0 rotate-45 bg-acid/70" />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-hair pt-4 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6">
                  <div className="mono-label text-[8.5px] text-dim">outcome</div>
                  <div className="mt-2 font-display text-[19px] leading-[1.25] font-medium text-acid">{active.metric}</div>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-1.5 border-t border-hair pt-5">
                {active.stack.map((tech) => (
                  <span key={tech} className="mono-label border border-hair bg-deck-2/70 px-2.5 py-1.5 text-[8.5px] text-mute">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {SIDE_MISSIONS.map((mission, index) => (
          <Reveal key={mission.code} delay={index * 0.05} className="panel p-5">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-[15px] font-medium text-ink">{mission.name}</h3>
              <span className="mono-label text-[8.5px] text-dim">{mission.code}</span>
            </div>
            <p className="mt-2 text-[12.5px] leading-[1.8] text-mute">{mission.body}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {mission.stack.map((tech) => (
                <span key={tech} className="mono-label border border-hair px-2 py-1 text-[8px] text-dim">
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>

      <MissionMap />
    </Chapter>
  )
}
