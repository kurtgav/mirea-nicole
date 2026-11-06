import { Reveal } from './Reveal'
import { cn } from '../../lib/cn'

type SectionTitleProps = {
  title: string
  /** italic line under the title */
  sub?: string
  id?: string
  className?: string
}

/** Engraved section heading flanked by gold hairlines — "—— ABOUT ——". */
export function SectionTitle({ title, sub, id, className }: SectionTitleProps) {
  return (
    <div className={cn('text-center', className)}>
      <Reveal>
        <div className="flex items-center justify-center gap-[clamp(14px,2.4vw,28px)]">
          <span className="hairline w-[clamp(28px,14vw,170px)] shrink" />
          <h2
            id={id}
            className="m-0 whitespace-nowrap font-display text-[clamp(22px,3.6vw,40px)] font-normal uppercase tracking-[0.14em] text-ivory"
            style={{ textShadow: '0 2px 24px rgba(0,0,0,.5)', textIndent: '0.14em' }}
          >
            {title}
          </h2>
          <span className="hairline w-[clamp(28px,14vw,170px)] shrink" />
        </div>
      </Reveal>
      {sub && (
        <Reveal delay={0.1}>
          <p className="mx-auto mt-4 max-w-[520px] text-[clamp(18px,2vw,21px)] italic text-ivory/80 text-balance">{sub}</p>
        </Reveal>
      )}
    </div>
  )
}
