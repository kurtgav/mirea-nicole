/**
 * Fixed page backdrop — a painted cloud sky (/greek/sky.webp), toned down to the
 * mock's muted sepia so ivory and gold text stay readable, with a darker heart
 * behind the copy. A grain layer above everything gives it a printed finish.
 */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .6 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-ink">
      <div className="absolute inset-0 bg-[url(/greek/sky.webp)] bg-cover bg-center [filter:sepia(.35)_saturate(.8)_brightness(.76)_contrast(1.04)]" />
      {/* veil + darker slate heart behind the centred copy; clouds stay brighter at the edges */}
      <div className="absolute inset-0 bg-[rgba(22,22,24,.18)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_75%_at_50%_50%,rgba(30,33,40,.6),rgba(30,33,40,.3)_60%,transparent_100%)]" />
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
