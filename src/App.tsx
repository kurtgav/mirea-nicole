import { useCallback, useEffect, useState } from 'react'
import { useSmoothScroll, startScroll, stopScroll } from './lib/smoothScroll'
import { BackgroundVideo } from './components/BackgroundVideo'
import { ParticleField } from './components/ParticleField'
import { ScrollProgress } from './components/ScrollProgress'
import { GoldFrame } from './components/GoldFrame'
import { Nav } from './components/Nav'
import { Preloader } from './components/Preloader'
import { Hero } from './components/sections/Hero'
import { Countdown } from './components/sections/Countdown'
import { Details } from './components/sections/Details'
import { Moment } from './components/sections/Moment'
import { TheEighteen } from './components/sections/TheEighteen'
import { Timeline } from './components/sections/Timeline'
import { DressCode } from './components/sections/DressCode'
import { Location } from './components/sections/Location'
import { Faq } from './components/sections/Faq'
import { Rsvp } from './components/sections/Rsvp'

export default function App() {
  useSmoothScroll()
  const [loading, setLoading] = useState(true)
  const [entered, setEntered] = useState(false)

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

  const handleComplete = useCallback(() => {
    setEntered(true)
    setLoading(false)
  }, [])

  return (
    <>
      <BackgroundVideo />
      <ParticleField />
      <ScrollProgress />
      <GoldFrame />
      <Nav />

      <main className="relative z-10">
        <Hero entered={entered} />
        <Countdown />
        <Details />
        <Moment />
        <TheEighteen />
        <Timeline />
        <DressCode />
        <Location />
        <Faq />
        <Rsvp />
      </main>

      {loading && <Preloader onComplete={handleComplete} />}
    </>
  )
}
