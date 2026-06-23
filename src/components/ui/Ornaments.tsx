import { cn } from '../../lib/cn'

/** Small rotated gold diamond. */
export function Diamond({
  size = 8,
  className,
  glow = true,
}: {
  size?: number
  className?: string
  glow?: boolean
}) {
  return (
    <span
      aria-hidden
      className={cn('inline-block rotate-45 bg-gold', className)}
      style={{
        width: size,
        height: size,
        boxShadow: glow ? '0 0 10px rgba(230,201,143,.6)' : undefined,
      }}
    />
  )
}

/** Line · diamond · line divider. */
export function Divider({ width = 50, className }: { width?: number; className?: string }) {
  return (
    <div className={cn('flex items-center justify-center gap-[18px]', className)} aria-hidden>
      <span
        className="block h-px"
        style={{ width, background: 'linear-gradient(90deg,transparent,var(--color-gold))' }}
      />
      <Diamond size={6} />
      <span
        className="block h-px"
        style={{ width, background: 'linear-gradient(270deg,transparent,var(--color-gold))' }}
      />
    </div>
  )
}

/** Uppercase, wide-tracked label that sits above headings. */
export function Eyebrow({
  children,
  className,
  tone = 'orchid',
}: {
  children: React.ReactNode
  className?: string
  tone?: 'orchid' | 'cream'
}) {
  return (
    <p
      className={cn(
        'm-0 text-[12px] font-light uppercase tracking-eyebrow',
        tone === 'orchid' ? 'text-[var(--color-orchid-soft)]' : 'text-[rgba(243,230,207,.85)]',
        className,
      )}
      style={{ textShadow: '0 1px 14px rgba(0,0,0,.6)' }}
    >
      {children}
    </p>
  )
}
