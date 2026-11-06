import { LUMA_RSVP_URL } from '../../data/content'
import { cn } from '../../lib/cn'

type RsvpButtonProps = {
  label?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const SIZES = {
  sm: 'px-3 py-0 text-[11px] h-[40px]',
  md: 'px-6 py-0 text-[13px] h-[50px]',
  lg: 'px-9 py-0 text-[15px] h-[60px]',
} as const

/** Every RSVP call-to-action on the site — one URL, always a new tab. */
export function RsvpButton({ label = 'RSVP Now', size = 'md', className }: RsvpButtonProps) {
  return (
    <a
      href={LUMA_RSVP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'frame-notch caps group relative inline-flex items-center gap-3 text-gold-light no-underline',
        'transition-[color,filter,transform] duration-500 ease-[var(--ease-out-expo)]',
        'hover:-translate-y-0.5 hover:text-ivory hover:drop-shadow-[0_8px_22px_rgba(201,169,106,.3)] active:translate-y-0',
        SIZES[size],
        className,
      )}
    >
      <span>{label}</span>
      <span aria-hidden className="text-gold transition-transform duration-500 group-hover:rotate-90">
        ✦
      </span>
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  )
}
