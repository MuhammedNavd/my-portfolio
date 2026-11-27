/*
  The interface sound.

  One shared AudioContext, unlocked inside the first real gesture, synthesised
  on demand and never reopened. The rules that matter:

  - Browsers start a context suspended. `primeAudio()` is wired to pointerdown,
    keydown and touchend even while sound is muted, so the moment the visitor
    flips SFX on the context is already allowed to run. It also pushes one
    silent frame through the graph, which is what actually unlocks output on
    iOS Safari.
  - A context can be `suspended` (autoplay policy) or `interrupted` (Safari
    after a phone call). A chirp that arrives in either state resumes first and
    plays once the resume settles, instead of being dropped.
  - Two partials, an octave apart: a bare sine at 2 kHz is nearly inaudible on
    laptop speakers, which is why the first version of this was silent for most
    people.

  Preferences live under `fieldlog-sfx` and default to on.
*/

const STORAGE_KEY = 'fieldlog-sfx'

const listeners = new Set<() => void>()

function read(): boolean {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return saved === null ? true : saved === 'on'
  } catch {
    return true
  }
}

let enabled = typeof window === 'undefined' ? true : read()
let context: AudioContext | null = null
let master: GainNode | null = null
let lastAt = 0

export function soundEnabled(): boolean {
  return enabled
}

export function subscribeSound(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function setSoundEnabled(next: boolean): void {
  enabled = next
  try {
    window.localStorage.setItem(STORAGE_KEY, next ? 'on' : 'off')
  } catch {
    /* storage blocked — the preference just will not persist */
  }
  if (next) primeAudio()
  for (const listener of listeners) listener()
}

function running(audio: AudioContext): boolean {
  /* Safari reports `interrupted`; it is resumable, so treat everything else as stopped. */
  return (audio.state as string) === 'running'
}

function acquire(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (context && context.state === 'closed') {
    context = null
    master = null
  }
  if (context) return context

  const Ctor =
    window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!Ctor) return null

  try {
    context = new Ctor({ latencyHint: 'interactive' })
    master = context.createGain()
    master.gain.value = 0.9
    master.connect(context.destination)
  } catch {
    context = null
    master = null
  }
  return context
}

/* Called from every real user gesture, muted or not, so nothing is locked later. */
export function primeAudio(): void {
  const audio = acquire()
  if (!audio || running(audio)) return

  try {
    const source = audio.createBufferSource()
    source.buffer = audio.createBuffer(1, 1, audio.sampleRate)
    source.connect(audio.destination)
    source.start(0)
  } catch {
    /* the resume below is the part that matters */
  }
  void audio.resume().catch(() => {
    /* blocked until a louder gesture — the next one will try again */
  })
}

function chirp(type: OscillatorType, frequency: number, level: number, at: number, duration: number): void {
  const audio = context
  const out = master
  if (!audio || !out || level <= 0) return

  const oscillator = audio.createOscillator()
  const gain = audio.createGain()

  oscillator.type = type
  oscillator.frequency.setValueAtTime(frequency, at)

  gain.gain.setValueAtTime(0.0001, at)
  gain.gain.exponentialRampToValueAtTime(level, at + 0.007)
  gain.gain.exponentialRampToValueAtTime(0.0001, at + duration)

  oscillator.connect(gain)
  gain.connect(out)
  oscillator.start(at)
  oscillator.stop(at + duration + 0.02)
  oscillator.onended = () => {
    oscillator.disconnect()
    gain.disconnect()
  }
}

function emit(strength: number, force = false): void {
  if (!enabled || document.visibilityState === 'hidden') return
  const audio = context
  if (!audio) return
  /* `force` is for chirps that were queued behind a resume: the graph is built
     anyway and the oscillator plays the moment the context starts. */
  if (!force && !running(audio)) return

  const now = performance.now()
  if (now - lastAt < 70) return
  lastAt = now

  const at = audio.currentTime + 0.002
  const root = 880 + Math.random() * 620

  /* Fundamental plus a quieter octave: reads as a bell rather than a test tone. */
  chirp('sine', root, 0.13 * strength, at, 0.18)
  chirp('triangle', root * 2, 0.045 * strength, at, 0.1)
}

/* A short, high, quiet chime. Throttled so fast movement cannot machine-gun it. */
export function twinkle(strength = 0.9): void {
  if (!enabled) return

  const audio = acquire()
  if (!audio) return

  if (!running(audio)) {
    /* Resume first, play when it lands. Without this a chirp fired in the same
       tick as the enabling click — or during the resume — is dropped and the
       visitor hears nothing. */
    const askedAt = performance.now()
    void audio
      .resume()
      .then(() => {
        /* A resume that only lands after a later gesture would chirp out of
           nowhere, so stale requests are dropped. */
        if (performance.now() - askedAt < 1200) emit(strength, true)
      })
      .catch(() => {
        /* still blocked; the next gesture unlocks it */
      })
    return
  }

  emit(strength)
}
