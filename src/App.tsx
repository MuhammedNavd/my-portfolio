import { MotionConfig } from 'motion/react'

import { Arsenal } from './components/Arsenal'
import { AskNaveed } from './components/AskNaveed'
import { Backdrop } from './components/Backdrop'
import { Cursor } from './components/Cursor'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Hud } from './components/Hud'
import { Missions } from './components/Missions'
import { Origin } from './components/Origin'
import { Prologue } from './components/Prologue'
import { Record } from './components/Record'
import { Service } from './components/Service'
import { Ticker } from './components/Ticker'
import { Uplink } from './components/Uplink'

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Backdrop />
      <Cursor />
      <div className="relative z-10">
        <a
          href="#main"
          className="sr-only z-[100] bg-acid px-4 py-2 font-display text-[13px] font-semibold text-void focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Hud />
        <main id="main" tabIndex={-1} className="focus:outline-none">
          <Hero />
          <Ticker />
          <Prologue />
          <Origin />
          <Service />
          <Missions />
          <Arsenal />
          <Record />
          <AskNaveed />
          <Uplink />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
