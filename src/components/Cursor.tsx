import { useEffect, useRef } from 'react'

import { primeAudio, soundEnabled, twinkle } from '../lib/twinkle'

/*
  The signature pointer: a lagging ring, a fixed dot and a short ice/acid spark
  trail, plus the twinkle sound.

  Guard rails, because a custom cursor is easy to get wrong:
  - the visuals only mount for `(pointer: fine)` and never under
    `prefers-reduced-motion`;
  - the native cursor is hidden by a class the effect adds, so if JS fails the
    pointer still works;
  - the canvas is device-pixel scaled (capped at 2x) instead of stretching a
    CSS-pixel buffer, so the trail stays sharp on retina;
  - the requestAnimationFrame loop stops itself once settled with no sparks left,
    so an idle page costs nothing;
  - sound lives in its own effect. It used to be fired from the visual loop, so
    a visitor with reduced motion turned on heard nothing at all even with SFX
    enabled.
*/

const INTERACTIVE = 'a, button, [role="tab"], [role="button"], summary, input, select, textarea'

type Spark = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  span: number
  size: number
}

export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  /* Sound: pointer distance, not a dice roll, so it is predictable and audible. */
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    let lastX: number | null = null
    let lastY: number | null = null
    let travelled = 0
    let lastAt = 0

    const unlock = () => primeAudio()

    const onMove = (event: PointerEvent) => {
      if (!soundEnabled()) return
      if (lastX === null || lastY === null) {
        lastX = event.clientX
        lastY = event.clientY
        return
      }

      travelled += Math.hypot(event.clientX - lastX, event.clientY - lastY)
      lastX = event.clientX
      lastY = event.clientY

      const now = performance.now()
      if (travelled < 110 || now - lastAt < 180) return

      travelled = 0
      lastAt = now
      twinkle(0.85)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', unlock, { passive: true })
    window.addEventListener('keydown', unlock)
    window.addEventListener('touchend', unlock, { passive: true })

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('keydown', unlock)
      window.removeEventListener('touchend', unlock)
    }
  }, [])

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)')
    const still = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fine.matches || still.matches) return

    const ring = ringRef.current
    const dot = dotRef.current
    const canvas = canvasRef.current
    const surface = canvas?.getContext('2d')
    if (!ring || !dot || !canvas || !surface) return

    const root = document.documentElement
    root.classList.add('custom-cursor')

    let width = 0
    let height = 0
    let frame = 0
    let lastMove = 0
    let hovered: Element | null = null
    let hoverAt = 0
    let travelled = 0
    let hovering = false
    let visible = false

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const trail = { x: pointer.x, y: pointer.y }
    let scale = 1

    const sparks: Spark[] = []

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * ratio)
      canvas.height = Math.floor(height * ratio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      surface.setTransform(ratio, 0, 0, ratio, 0, 0)
    }
    resize()

    const reveal = () => {
      if (visible) return
      visible = true
      ring.style.opacity = '1'
      dot.style.opacity = '1'
    }

    const render = () => {
      frame = 0

      trail.x += (pointer.x - trail.x) * 0.18
      trail.y += (pointer.y - trail.y) * 0.18
      scale += ((hovering ? 1.7 : 1) - scale) * 0.2

      ring.style.transform = `translate3d(${trail.x}px, ${trail.y}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`
      dot.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%)`

      surface.clearRect(0, 0, width, height)
      for (let i = sparks.length - 1; i >= 0; i -= 1) {
        const spark = sparks[i]
        spark.life += 1
        if (spark.life >= spark.span) {
          sparks.splice(i, 1)
          continue
        }
        spark.x += spark.vx
        spark.y += spark.vy
        spark.vx *= 0.985
        spark.vy = spark.vy * 0.985 + 0.02

        const fade = 1 - spark.life / spark.span
        surface.globalAlpha = fade * 0.6
        surface.fillStyle = i % 3 === 0 ? '#d8ff5c' : '#8ff7ff'
        surface.beginPath()
        surface.arc(spark.x, spark.y, spark.size * fade + 0.35, 0, Math.PI * 2)
        surface.fill()
      }
      surface.globalAlpha = 1

      const settled = Math.abs(pointer.x - trail.x) < 0.15 && Math.abs(pointer.y - trail.y) < 0.15
      if (!settled || sparks.length > 0) frame = requestAnimationFrame(render)
    }

    const kick = () => {
      if (!frame) frame = requestAnimationFrame(render)
    }

    const onMove = (event: PointerEvent) => {
      reveal()

      const distance = Math.hypot(event.clientX - pointer.x, event.clientY - pointer.y)
      travelled += distance
      pointer.x = event.clientX
      pointer.y = event.clientY

      const now = performance.now()
      const node = event.target instanceof Element ? event.target.closest(INTERACTIVE) : null
      /* One ping when the pointer lands on something actionable, with its own
         cooldown so sweeping across a dense row of links stays a chime and not
         a machine gun. */
      if (node && node !== hovered && now - hoverAt > 260) {
        hoverAt = now
        twinkle(0.7)
      }
      hovered = node
      hovering = Boolean(node)

      if (travelled > 22 && now - lastMove > 40) {
        travelled = 0
        lastMove = now

        const count = Math.random() > 0.5 ? 2 : 1
        for (let i = 0; i < count; i += 1) {
          sparks.push({
            x: event.clientX + (Math.random() - 0.5) * 8,
            y: event.clientY + (Math.random() - 0.5) * 8,
            vx: (Math.random() - 0.5) * 0.9,
            vy: (Math.random() - 0.5) * 0.9 - 0.18,
            life: 0,
            span: 26 + Math.random() * 20,
            size: 1 + Math.random() * 1.5,
          })
        }
        if (sparks.length > 90) sparks.splice(0, sparks.length - 90)
      }

      kick()
    }

    const onLeave = () => {
      visible = false
      ring.style.opacity = '0'
      dot.style.opacity = '0'
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('resize', resize)
    document.addEventListener('pointerleave', onLeave)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', resize)
      document.removeEventListener('pointerleave', onLeave)
      root.classList.remove('custom-cursor')
      canvas.width = 0
      canvas.height = 0
    }
  }, [])

  return (
    <div aria-hidden className="cursor-layer pointer-events-none fixed inset-0 z-[90]">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div
        ref={ringRef}
        className="absolute top-0 left-0 size-7 rounded-full border border-ice/55 opacity-0 transition-opacity duration-200 will-change-transform"
      />
      <div
        ref={dotRef}
        className="absolute top-0 left-0 size-1.5 rounded-full bg-acid opacity-0 shadow-[0_0_12px_2px_rgb(216_255_92_/_0.5)] transition-opacity duration-200 will-change-transform"
      />
    </div>
  )
}
