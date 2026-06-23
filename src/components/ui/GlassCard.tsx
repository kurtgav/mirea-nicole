import { useRef, type ReactNode, type PointerEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { cn } from '../../lib/cn'
import { isTouchDevice, prefersReducedMotion } from '../../lib/prefersReducedMotion'

type GlassCardProps = {
  children: ReactNode
  className?: string
  /** max rotation in degrees */
  tilt?: number
  /** radius for rounded corners (tailwind handles via className too) */
  glow?: boolean
}

/**
 * Frosted plum card that tilts toward the cursor in 3D and carries a
 * gold sheen that tracks the pointer. Falls back to a static card on
 * touch devices and when reduced-motion is requested.
 */
export function GlassCard({ children, className, tilt = 7, glow = true }: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const interactive = !isTouchDevice() && !prefersReducedMotion()

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const sx = useSpring(px, { stiffness: 150, damping: 18, mass: 0.4 })
  const sy = useSpring(py, { stiffness: 150, damping: 18, mass: 0.4 })

  const rotateY = useTransform(sx, [0, 1], [-tilt, tilt])
  const rotateX = useTransform(sy, [0, 1], [tilt, -tilt])

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    if (!interactive || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    px.set(x)
    py.set(y)
    ref.current.style.setProperty('--mx', `${x * 100}%`)
    ref.current.style.setProperty('--my', `${y * 100}%`)
  }

  function handleLeave() {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={cn('group relative gold-ring glass', className)}
      style={
        interactive
          ? { rotateX, rotateY, transformPerspective: 900, transformStyle: 'preserve-3d' }
          : undefined
      }
    >
      {/* pointer-tracking gold sheen */}
      {glow && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(420px circle at var(--mx,50%) var(--my,50%), rgba(230,201,143,.16), transparent 60%)',
          }}
        />
      )}
      <div style={interactive ? { transform: 'translateZ(40px)' } : undefined} className="relative h-full">
        {children}
      </div>
    </motion.div>
  )
}
