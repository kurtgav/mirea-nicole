import { useId } from 'react'
import { cn } from '../../lib/cn'

type Kind = 'gown' | 'suit'

const RIM = 'rgba(230,201,143,.72)'
const GOLD_LINE = 'rgba(244,231,212,.62)'
const SHEEN = 'rgba(126,86,164,.55)' // cool inner sheen so black reads with depth

/**
 * Black couture silhouettes for the dress code — refined gowns and suits in
 * near-black with a fine gold rim, an inner sheen for depth, and gold accent
 * lines (necklines, lapels, ties). The colour code is "to be announced", so
 * the figures stay monochrome black.
 */
export function Silhouette({
  kind,
  variant = 0,
  className,
  height = 240,
}: {
  kind: Kind
  variant?: number
  className?: string
  /** px number or any CSS length (e.g. a clamp()) */
  height?: number | string
}) {
  const id = useId().replace(/:/g, '')
  const body = `body-${id}`
  const sheen = `sheen-${id}`
  const floor = `floor-${id}`
  const glow = `glow-${id}`

  return (
    <svg viewBox="0 0 120 320" style={{ height }} className={cn('w-auto overflow-visible', className)} aria-hidden>
      <defs>
        <linearGradient id={body} x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#2a2236" />
          <stop offset="0.45" stopColor="#150e22" />
          <stop offset="1" stopColor="#06040b" />
        </linearGradient>
        <linearGradient id={sheen} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={SHEEN} stopOpacity="0.5" />
          <stop offset="0.4" stopColor={SHEEN} stopOpacity="0" />
          <stop offset="1" stopColor={SHEEN} stopOpacity="0" />
        </linearGradient>
        <radialGradient id={floor} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="rgba(230,201,143,.42)" />
          <stop offset="1" stopColor="rgba(230,201,143,0)" />
        </radialGradient>
        <filter id={glow} x="-40%" y="-15%" width="180%" height="135%">
          <feDropShadow dx="0" dy="7" stdDeviation="8" floodColor="#000" floodOpacity="0.55" />
        </filter>
      </defs>

      <ellipse cx="60" cy="309" rx="46" ry="9" fill={`url(#${floor})`} />

      <g filter={`url(#${glow})`}>
        <g fill={`url(#${body})`} stroke={RIM} strokeWidth="1.25" strokeLinejoin="round" strokeLinecap="round">
          {kind === 'gown' ? <GownBody variant={variant} /> : <SuitBody variant={variant} />}
        </g>
        {/* inner sheen (left-lit) */}
        <g fill={`url(#${sheen})`} stroke="none" style={{ mixBlendMode: 'screen' }}>
          {kind === 'gown' ? <GownBody variant={variant} /> : <SuitBody variant={variant} />}
        </g>
        {/* gold accents */}
        {kind === 'gown' ? <GownAccents variant={variant} /> : <SuitAccents variant={variant} />}
      </g>
    </svg>
  )
}

/* ============================ GOWNS ============================ */
function Head() {
  return (
    <>
      {/* updo / bun */}
      <path d="M46 32 Q44 12 60 9 Q76 12 74 32 Q71 21 60 19 Q49 21 46 32 Z" />
      <ellipse cx="60" cy="13" rx="7.5" ry="5.5" />
      {/* face */}
      <ellipse cx="60" cy="31" rx="12.5" ry="15.5" />
      {/* hair framing the cheeks */}
      <path d="M47.5 31 Q46 48 51 60 L55 55 Q50 45 51.5 33 Z" />
      <path d="M72.5 31 Q74 48 69 60 L65 55 Q70 45 68.5 33 Z" />
      {/* neck */}
      <path d="M55 44 L65 44 L65 55 L55 55 Z" />
    </>
  )
}

function GownArms() {
  return (
    <>
      <path d="M50 60 Q39 86 42 116 Q43 124 48 122 Q47 100 54 70 Z" />
      <path d="M70 60 Q81 86 78 116 Q77 124 72 122 Q73 100 66 70 Z" />
    </>
  )
}

function GownBody({ variant }: { variant: number }) {
  if (variant === 1) {
    // A-line with cap sleeves
    return (
      <>
        <Head />
        <ellipse cx="49" cy="62" rx="7.5" ry="9.5" />
        <ellipse cx="71" cy="62" rx="7.5" ry="9.5" />
        <GownArms />
        <path d="M53 54 Q60 52 67 54 Q73 60 72 70 L69 116 Q60 122 51 116 L48 70 Q47 60 53 54 Z" />
        <path d="M51 113 L69 113 Q86 220 92 306 Q60 315 28 306 Q34 220 51 113 Z" />
      </>
    )
  }
  if (variant === 2) {
    // off-shoulder trumpet / mermaid with train
    return (
      <>
        <Head />
        <path d="M43 58 Q60 51 77 58 L75 63 Q60 57 45 63 Z" />
        <GownArms />
        <path d="M53 55 Q60 53 67 55 Q72 61 71 71 L67 118 Q60 123 53 118 L49 71 Q48 61 53 55 Z" />
        <path d="M54 115 L66 115 Q70 180 61 214 Q60 220 60 220 Q90 280 100 306 L20 306 Q30 280 59 220 Q60 220 59 214 Q50 180 54 115 Z" />
      </>
    )
  }
  // variant 0 — strapless sweetheart ball gown with train
  return (
    <>
      <Head />
      <GownArms />
      <path d="M53 54 Q60 52 67 54 Q73 59 72 69 L69 114 Q60 120 51 114 L48 69 Q47 59 53 54 Z" />
      <path d="M50 110 L70 110 Q100 215 108 306 Q60 318 12 306 Q20 215 50 110 Z" />
    </>
  )
}

function GownAccents({ variant }: { variant: number }) {
  const neck =
    variant === 0 ? 'M53 56 Q60 63 67 56' : variant === 2 ? 'M55 117 Q60 122 65 117' : 'M54 56 Q60 60 66 56'
  return (
    <g fill="none" stroke={GOLD_LINE} strokeWidth="1" strokeLinecap="round">
      {/* neckline */}
      <path d={neck} />
      {/* waist sash */}
      <path d="M50 110 Q60 116 70 110" />
      {/* skirt fall lines */}
      <path d="M58 122 Q54 210 44 300" opacity="0.5" />
      <path d="M64 122 Q70 210 80 300" opacity="0.5" />
      {/* a small jewel at the neckline */}
      <circle cx="60" cy="60" r="1.4" fill={GOLD_LINE} stroke="none" />
    </g>
  )
}

/* ============================ SUITS ============================ */
function SuitHead() {
  return (
    <>
      <path d="M48 28 Q49 13 60 12 Q71 13 72 28 Q70 20 60 18.5 Q50 20 48 28 Z" />
      <ellipse cx="60" cy="31" rx="12" ry="14.5" />
      <path d="M55 44 L65 44 L65 54 L55 54 Z" />
    </>
  )
}

function SuitBody({ variant }: { variant: number }) {
  const legs = (
    <path d="M47 150 L73 150 L72 302 Q72 308 67 308 L63 308 Q60 308 60.4 301 L60 182 L59.6 301 Q60 308 57 308 L53 308 Q48 308 48 302 Z" />
  )
  const shoes = (
    <>
      <path d="M46 303 Q45 310 53 310 L60 310 L60 303 Z" />
      <path d="M74 303 Q75 310 67 310 L60 310 L60 303 Z" />
    </>
  )
  if (variant === 1) {
    // contrapposto, right hand in pocket
    return (
      <>
        <SuitHead />
        {legs}
        {/* jacket: broad shoulders → tapered waist → slight hem flare */}
        <path d="M52 54 Q60 51 68 54 L81 67 Q84 71 82 80 L75 158 L45 158 L38 80 Q36 71 39 67 Z" />
        {/* left arm at side */}
        <path d="M41 72 Q33 104 37 142 Q38 152 44 150 Q41 116 48 82 Z" />
        {/* right arm bent into pocket */}
        <path d="M79 72 Q86 100 80 128 Q77 140 67 146 L64 138 Q75 112 72 82 Z" />
        {shoes}
      </>
    )
  }
  // variant 0 — upright, arms at sides
  return (
    <>
      <SuitHead />
      {legs}
      <path d="M52 54 Q60 51 68 54 L80 66 Q83 70 81 79 L74 158 L46 158 L39 79 Q37 70 40 66 Z" />
      <path d="M40 70 Q32 104 36 144 Q37 154 43 152 Q40 116 47 80 Z" />
      <path d="M80 70 Q88 104 84 144 Q83 154 77 152 Q80 116 73 80 Z" />
      {shoes}
    </>
  )
}

function SuitAccents({ variant }: { variant: number }) {
  const placketLen = variant === 1 ? 116 : 120
  return (
    <g>
      {/* shirt V */}
      <path d="M54 57 L60 66 L66 57 L65 96 L55 96 Z" fill="rgba(214,200,224,.22)" stroke="none" />
      {/* tie */}
      <path d="M58 66 L62 66 L61 73 L63 100 L57 100 L59 73 Z" fill="rgba(20,14,30,.9)" stroke={GOLD_LINE} strokeWidth="0.7" />
      {/* lapels */}
      <g fill="none" stroke={GOLD_LINE} strokeWidth="1" strokeLinecap="round">
        <path d="M60 56 L52 70 L57 98" />
        <path d="M60 56 L68 70 L63 98" />
        <path d={`M60 66 L60 ${placketLen}`} opacity="0.55" />
        {/* buttons */}
        <circle cx="60" cy="126" r="1.1" fill={GOLD_LINE} stroke="none" />
        <circle cx="60" cy="138" r="1.1" fill={GOLD_LINE} stroke="none" />
      </g>
    </g>
  )
}
