import type { Variants, Transition } from 'motion/react'

/** Signature eases — keep every motion on the same curve family. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const
export const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const
export const EASE_IN_OUT_SOFT = [0.65, 0, 0.35, 1] as const

export const springSoft: Transition = {
  type: 'spring',
  stiffness: 120,
  damping: 20,
  mass: 0.9,
}

/** Rise-and-fade used by almost every reveal. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 34, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.1, ease: EASE_OUT_EXPO },
  },
}

/** Stagger container — children use `riseIn`. */
export const staggerContainer = (stagger = 0.12, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
})

/** Word / line headline reveal — masked rise from below. */
export const wordRise: Variants = {
  hidden: { opacity: 0, y: '0.62em' },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.15, ease: EASE_OUT_EXPO },
  },
}

/** Default viewport config for whileInView reveals. */
export const inView = { once: true, amount: 0.25, margin: '0px 0px -8% 0px' } as const
