import { useEffect } from 'react'
import { motion } from 'motion/react'
import { EASE_OUT_EXPO } from '../lib/motion'
import { prefersReducedMotion } from '../lib/prefersReducedMotion'
import { Ornament } from './ui/Layer'

const MIN_MS = 1700
const MAX_MS = 4000

/**
 * Brief laurel-and-name curtain while the hero layers load.
 * Lifts once the page has loaded (min 1.7s, never longer than 4s).
 */
export function Preloader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const start = performance.now()
    const minMs = prefersReducedMotion() ? 300 : MIN_MS
    let timer = 0
    const finish = () => {
      const wait = Math.max(0, minMs - (performance.now() - start))
      timer = window.setTimeout(onComplete, wait)
    }
    if (document.readyState === 'complete') finish()
    else window.addEventListener('load', finish, { once: true })
    const cap = window.setTimeout(onComplete, MAX_MS)
    return () => {
      window.removeEventListener('load', finish)
      clearTimeout(timer)
      clearTimeout(cap)
    }
  }, [onComplete])

  return (
    <motion.div
      role="status"
      aria-label="Loading invitation"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
      exit={{ opacity: 0, transition: { duration: 0.9, ease: EASE_OUT_EXPO } }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85, filter: 'blur(6px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
      >
        <Ornament name="wreath-lg" className="w-[132px]" />
      </motion.div>
      <motion.p
        className="caps m-0 mt-5 text-[22px] tracking-[0.42em] text-ivory"
        style={{ textIndent: '0.42em' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.35 }}
      >
        Mirea
      </motion.p>
      <motion.span
        className="mt-4 block h-px w-[140px] origin-center bg-gold"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, ease: EASE_OUT_EXPO, delay: 0.5 }}
      />
    </motion.div>
  )
}
