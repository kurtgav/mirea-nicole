import { Reveal } from './Reveal'
import { Eyebrow } from './Ornaments'
import { cn } from '../../lib/cn'

type SectionHeadingProps = {
  eyebrow: string
  title: string
  sub?: string
  /** script = Great Vibes, serif = Cormorant */
  variant?: 'script' | 'serif'
  className?: string
  titleClassName?: string
}

/** Eyebrow + display title + optional supporting line, all revealed in sequence. */
export function SectionHeading({
  eyebrow,
  title,
  sub,
  variant = 'script',
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div className={cn('text-center', className)}>
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={0.1}>
        <h2
          className={cn(
            'm-0 mt-4 text-[#fbf3e6]',
            variant === 'script'
              ? 'font-script text-[clamp(46px,9vw,118px)] leading-[1.04]'
              : 'font-serif font-normal text-[clamp(34px,6vw,68px)] leading-[1.08] tracking-[0.01em]',
            titleClassName,
          )}
          style={{ textShadow: '0 2px 36px rgba(0,0,0,.6)', padding: '.04em .1em' }}
        >
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.2}>
          <p className="mx-auto mt-[18px] max-w-[440px] text-[15px] font-light leading-[1.9] text-[rgba(244,236,247,.85)] text-balance">
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  )
}
