import { useId } from 'react'
import { cn } from '../../lib/cn'

type ButterflyProps = {
  size?: number
  className?: string
  /** apply the gentle flutter keyframe */
  flutter?: boolean
  title?: string
}

/**
 * Refined gold debut butterfly. Symmetric wings drawn as bezier paths,
 * filled with a foil gradient and lifted with a soft inner gleam.
 */
export function Butterfly({ size = 48, className, flutter = false, title }: ButterflyProps) {
  const id = useId().replace(/:/g, '')
  const gid = `bfly-${id}`
  const sid = `bsheen-${id}`

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn(className, flutter && 'will-change-transform')}
      style={flutter ? { animation: 'flutter 4.5s ease-in-out infinite', transformOrigin: '50% 50%' } : undefined}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff7ea" />
          <stop offset="0.45" stopColor="#e6c98f" />
          <stop offset="1" stopColor="#c79355" />
        </linearGradient>
        <radialGradient id={sid} cx="0.5" cy="0.4" r="0.6">
          <stop offset="0" stopColor="#fffaf0" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fffaf0" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g fill={`url(#${gid})`}>
        {/* upper wings */}
        <path d="M50 38 C42 18 26 10 16 18 C6 26 8 44 24 50 C36 54 46 50 50 42 Z" />
        <path d="M50 38 C58 18 74 10 84 18 C94 26 92 44 76 50 C64 54 54 50 50 42 Z" />
        {/* lower wings */}
        <path d="M50 46 C44 58 34 70 26 66 C18 62 20 50 32 48 C40 46 47 48 50 50 Z" />
        <path d="M50 46 C56 58 66 70 74 66 C82 62 80 50 68 48 C60 46 53 48 50 50 Z" />
        {/* body */}
        <ellipse cx="50" cy="46" rx="2.1" ry="13" />
      </g>

      {/* inner gleam on the upper wings */}
      <g fill={`url(#${sid})`} opacity="0.7">
        <ellipse cx="32" cy="32" rx="9" ry="6" />
        <ellipse cx="68" cy="32" rx="9" ry="6" />
      </g>

      {/* antennae */}
      <g stroke="#e6c98f" strokeWidth="1.1" fill="none" strokeLinecap="round" opacity="0.85">
        <path d="M50 34 C47 26 44 22 40 20" />
        <path d="M50 34 C53 26 56 22 60 20" />
      </g>
    </svg>
  )
}
