import { useState } from 'react'

import { MISSION_MAP, MISSIONS } from '../content'
import { cx } from '../lib/cx'

const NODES = MISSION_MAP.flatMap((lane) => lane.nodes)

/*
  The mission map: five layers, sixteen nodes, and the six files that ran
  through them. Selecting a node shows its role and the missions it carried,
  which is the point the stacked project list cannot make — the same platform
  underneath every story.
*/
export function MissionMap() {
  const [activeId, setActiveId] = useState(NODES[0].id)
  const active = NODES.find((node) => node.id === activeId) ?? NODES[0]

  return (
    <section aria-labelledby="map-title" className="mt-14 border-t border-hair pt-12 sm:mt-16">
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
        <div>
          <div className="mono-label flex items-center gap-2.5 text-acid">
            <span aria-hidden className="size-1.5 bg-acid" />
            mission map
          </div>
          <h3
            id="map-title"
            className="mt-3 font-display text-[clamp(1.35rem,2.8vw,1.95rem)] leading-tight font-semibold text-ink"
          >
            Six files, <span className="text-ice">one platform.</span>
          </h3>
        </div>
        <p className="max-w-[46ch] text-[13px] leading-[1.8] text-mute">
          Every mission above ran through the same five layers. Select a node to see what it carried and which file it
          belongs to.
        </p>
      </div>

      <div className="mt-7 grid gap-px overflow-hidden border border-hair bg-hair sm:grid-cols-2 lg:grid-cols-5">
        {MISSION_MAP.map((lane) => (
          <div key={lane.code} className="bg-void/85 p-3">
            <div className="flex items-baseline justify-between gap-2 border-b border-hair pb-2.5">
              <span className="mono-label text-[8px] text-ice/70">{lane.label}</span>
              <span className="mono-label text-[7.5px] text-dim">{lane.code}</span>
            </div>

            <div className="mt-2.5 space-y-1.5">
              {lane.nodes.map((node) => {
                const selected = node.id === active.id
                return (
                  <button
                    key={node.id}
                    type="button"
                    aria-pressed={selected}
                    aria-controls="map-readout"
                    onClick={() => setActiveId(node.id)}
                    className={cx(
                      'flex min-h-11 w-full items-center justify-between gap-2 border px-2.5 py-2 text-left transition-colors duration-200',
                      selected
                        ? 'border-acid/45 bg-acid/[0.08] text-acid'
                        : 'border-hair bg-deck/50 text-ink/80 hover:border-ice/25 hover:bg-ice/[0.04] hover:text-ink',
                    )}
                  >
                    <span className="font-mono text-[10.5px] leading-tight">{node.label}</span>
                    <span aria-hidden className={cx('size-1 shrink-0', selected ? 'bg-acid' : 'bg-ice/35')} />
                  </button>
                )
              })}
            </div>

            <p className="mono-label mt-3 text-[7px] leading-relaxed text-dim">{lane.note}</p>
          </div>
        ))}
      </div>

      <div id="map-readout" aria-live="polite" className="panel mt-4 p-5 sm:p-6">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
          <div>
            <div className="mono-label text-[8.5px] text-acid">{active.label}</div>
            <p className="mt-3 max-w-[52ch] text-[13.5px] leading-[1.8] text-mute">{active.role}</p>
          </div>
          <div>
            <div className="mono-label text-[8px] text-dim">carried through</div>
            <ul className="mt-3 space-y-2">
              {active.missions.map((id) => {
                const mission = MISSIONS.find((entry) => entry.id === id)
                if (!mission) return null
                return (
                  <li
                    key={id}
                    className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-hair pb-2 last:border-0 last:pb-0"
                  >
                    <span className="mono-label text-[8px] text-ice/60">{mission.code}</span>
                    <span className="text-[12.5px] leading-snug text-ink/90">{mission.name}</span>
                    <span className="mono-label ml-auto text-[8px] text-acid/80">{mission.metric}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
