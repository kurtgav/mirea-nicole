import { MotionConfig } from 'motion/react'
import { useSmoothScroll } from './lib/smoothScroll'
import { Backdrop, Grain } from './components/Backdrop'
import { ScrollProgress } from './components/ScrollProgress'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { MusicPlayer } from './components/MusicPlayer'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Details } from './components/sections/Details'
import { Attire } from './components/sections/Attire'
import { Court } from './components/sections/Court'
import { Venue } from './components/sections/Venue'
import { Faq } from './components/sections/Faq'
import { Rsvp } from './components/sections/Rsvp'

export default function App() {
  useSmoothScroll()
  return (
    // honour the OS "reduce motion" setting for every motion animation (keeps fades, drops movement)
    <MotionConfig reducedMotion="user">
      <Backdrop />
      <Grain />
      <ScrollProgress />
      <Nav />

      <main className="relative">
        <Hero />
        <About />
        <Details />
        <Attire />
        <Court />
        <Venue />
        <Faq />
        <Rsvp />
      </main>
      <Footer />
      <MusicPlayer />
    </MotionConfig>
  )
}
