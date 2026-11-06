import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'motion/react'
import { useSmoothScroll, startScroll, stopScroll } from './lib/smoothScroll'
import { Backdrop, Grain } from './components/Backdrop'
import { ScrollProgress } from './components/ScrollProgress'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { Preloader } from './components/Preloader'
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
  const [loading, setLoading] = useState(true)

  // lock scrolling behind the curtain
  useEffect(() => {
    if (loading) {
      stopScroll()
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      startScroll()
    }
  }, [loading])

  const handleComplete = useCallback(() => setLoading(false), [])

  return (
    // honour the OS "reduce motion" setting for every motion animation (keeps fades, drops movement)
    <MotionConfig reducedMotion="user">
      <Backdrop />
      <Grain />
      <ScrollProgress />
      <Nav />

      <main className="relative">
        <Hero entered={!loading} />
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

      <AnimatePresence>{loading && <Preloader onComplete={handleComplete} />}</AnimatePresence>
    </MotionConfig>
  )
}
