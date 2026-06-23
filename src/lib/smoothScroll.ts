import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis | null = null

/** Programmatic scroll used by the nav / anchor links. */
export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) {
    lenis.scrollTo(el, { offset: 0, duration: 1.4 })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

export function stopScroll() {
  lenis?.stop()
}
export function startScroll() {
  lenis?.start()
}

/**
 * Boots Lenis once and wires it to the GSAP ticker + ScrollTrigger so that
 * scroll-scrubbed timelines stay perfectly in sync with the smoothed scroll.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    lenis = new Lenis({
      duration: reduce ? 0 : 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reduce,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    })

    lenis.on('scroll', ScrollTrigger.update)
    // expose for debugging / automated scroll verification
    ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis

    const onRaf = (time: number) => {
      // gsap ticker time is in seconds → Lenis wants ms
      lenis?.raf(time * 1000)
    }
    gsap.ticker.add(onRaf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(onRaf)
      lenis?.destroy()
      lenis = null
    }
  }, [])
}
