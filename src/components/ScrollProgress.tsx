import { motion, useScroll, useSpring } from 'motion/react'

/** Gold filament across the top, scaled to scroll progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-40 h-[2px] bg-white/[0.06]">
      <motion.div
        className="h-full origin-left"
        style={{
          scaleX,
          background: 'linear-gradient(90deg,#9c7b45,#e8d3a2)',
          boxShadow: '0 0 10px rgba(201,169,106,.55)',
        }}
      />
    </div>
  )
}
