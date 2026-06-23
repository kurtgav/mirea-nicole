import { motion, type HTMLMotionProps } from 'motion/react'
import { EASE_OUT_EXPO, inView } from '../../lib/motion'

type RevealProps = HTMLMotionProps<'div'> & {
  delay?: number
  y?: number
  blur?: boolean
  duration?: number
}

/** Scroll-into-view rise + fade. The single reveal primitive for the page. */
export function Reveal({
  delay = 0,
  y = 34,
  blur = true,
  duration = 1.1,
  children,
  ...rest
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: blur ? 'blur(7px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration, ease: EASE_OUT_EXPO, delay }}
      viewport={inView}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
