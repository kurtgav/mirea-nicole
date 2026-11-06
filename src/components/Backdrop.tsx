/**
 * Fixed page backdrop — the reference's velvet drapes (emerald → teal →
 * navy → royal → plum → burgundy) with aged-paper mottling, rendered once
 * into /greek/velvet.webp. A faint astrolabe ring sits behind the content,
 * and a grain layer above everything gives statues the same printed finish.
 */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .6 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-ink">
      <div className="absolute inset-0 bg-[url(/greek/velvet.webp)] bg-[length:100%_100%]" />
      {/* the mock's darker navy heart behind the copy */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_42%_55%_at_50%_45%,rgba(8,12,40,.45),transparent_75%)]" />
    </div>
  )
}

/** Film grain over the whole page (statues included), like the printed mock. */
export function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[55] opacity-[0.08] mix-blend-overlay"
      style={{ backgroundImage: GRAIN }}
    />
  )
}

/** Faint concentric rings (astrolabe) seen behind the hero and About titles. */
export function Rings({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 600 600" className={className} fill="none" stroke="currentColor">
      <circle cx="300" cy="300" r="296" strokeWidth=".8" />
      <circle cx="300" cy="300" r="250" strokeWidth=".5" strokeDasharray="2 6" />
      <circle cx="300" cy="300" r="200" strokeWidth=".6" />
    </svg>
  )
}
