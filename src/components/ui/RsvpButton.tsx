import { LUMA_RSVP_URL } from '../../data/content'
import { cn } from '../../lib/cn'

type RsvpButtonProps = {
  label?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

// equal padding on both sides with the star parked in the right one, so the label sits dead centre
const SIZES = {
  sm: { box: 'px-7 text-[11px] h-[40px]', star: 'right-2' },
  md: { box: 'px-10 text-[13px] h-[50px]', star: 'right-3.5' },
  lg: { box: 'px-12 text-[15px] h-[60px]', star: 'right-4' },
} as const

/** Every RSVP call-to-action on the site — one URL, always a new tab. */
export function RsvpButton({ label = 'RSVP Now', size = 'md', className }: RsvpButtonProps) {
  return (
    <a
      href={LUMA_RSVP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'frame-notch caps group relative inline-flex items-center justify-center py-0 text-gold-light no-underline',
        'transition-[color,filter,transform] duration-500 ease-[var(--ease-out-expo)]',
        'hover:-translate-y-0.5 hover:text-ivory hover:drop-shadow-[0_8px_22px_rgba(201,169,106,.3)] active:translate-y-0',
        SIZES[size].box,
        className,
      )}
    >
      {/* the negative margin cancels the letter-spacing after the last letter */}
      <span className="-mr-[0.22em]">{label}</span>
      <span
        aria-hidden
        className={cn('absolute top-1/2 -translate-y-1/2 text-gold transition-[rotate] duration-500 group-hover:rotate-90', SIZES[size].star)}
      >
        ✦
      </span>
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  )
}
