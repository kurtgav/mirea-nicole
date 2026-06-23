/**
 * A single crisp gold hairline framing the experience, inset from every edge
 * (and clear of device safe areas / notches). Four small diamonds sit exactly
 * on the corners as engraved accents — no overlapping borders, so the line
 * stays accurate at any viewport.
 */
export function GoldFrame() {
  const inset = 'max(env(safe-area-inset-INSET), clamp(10px, 1.6vw, 24px))'
  const corners = [
    { top: -3, left: -3 },
    { top: -3, right: -3 },
    { bottom: -3, left: -3 },
    { bottom: -3, right: -3 },
  ] as const

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-30"
      style={{
        top: inset.replace('INSET', 'top'),
        right: inset.replace('INSET', 'right'),
        bottom: inset.replace('INSET', 'bottom'),
        left: inset.replace('INSET', 'left'),
        border: '1px solid rgba(230,201,143,0.32)',
        borderRadius: 2,
        boxShadow: 'inset 0 0 70px rgba(7,3,15,0.45)',
      }}
    >
      {corners.map((pos, i) => (
        <span
          key={i}
          className="absolute h-[6px] w-[6px] rotate-45 bg-gold"
          style={{ ...pos, boxShadow: '0 0 8px rgba(230,201,143,0.7)' }}
        />
      ))}
    </div>
  )
}
