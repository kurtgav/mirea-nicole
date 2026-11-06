import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ASSET_SIZES, assetUrl, type AssetName } from '../../lib/assets'
import { cn } from '../../lib/cn'

type LayerProps = {
  name: AssetName
  /** positioning + width utilities for the wrapper */
  className?: string
  imgClassName?: string
  /** parallax strength: + drifts up faster than the page, − lags behind */
  speed?: number
  eager?: boolean
  /** take on the hue of the velvet behind it (distant clouds, ruins, hills) */
  tint?: boolean
}

/**
 * One decorative image layer from the asset pack. Always aria-hidden,
 * lazy by default, with optional scroll parallax (off under reduced motion).
 */
export function Layer({ name, className, imgClassName, speed = 0, eager = false, tint = false }: LayerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [speed * 140, speed * -140])
  const [w, h] = ASSET_SIZES[name]

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className={cn('pointer-events-none absolute select-none', tint && 'tint', className)}
      style={reduce || !speed ? undefined : { y }}
    >
      <img
        src={assetUrl(name)}
        width={w}
        height={h}
        alt=""
        draggable={false}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={cn('h-auto w-full', imgClassName)}
      />
    </motion.div>
  )
}

/** Inline (non-positioned) ornament image — dividers, wreaths, icons. */
export function Ornament({ name, className }: { name: AssetName; className?: string }) {
  const [w, h] = ASSET_SIZES[name]
  return (
    <img
      src={assetUrl(name)}
      width={w}
      height={h}
      alt=""
      aria-hidden
      draggable={false}
      loading="lazy"
      decoding="async"
      className={cn('h-auto select-none', className)}
    />
  )
}
