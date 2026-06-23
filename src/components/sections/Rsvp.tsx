import { EVENT, RSVP } from '../../data/content'
import { Reveal } from '../ui/Reveal'
import { Divider } from '../ui/Ornaments'
import { Butterfly } from '../ui/Butterfly'

export function Rsvp() {
  return (
    <section
      id="rsvp"
      className="relative px-6 pb-[clamp(96px,17vh,180px)] pt-[clamp(60px,11vh,140px)] text-center"
      data-label="RSVP"
    >
      <div className="mx-auto max-w-[680px]">
        <Reveal>
          <Divider width={54} className="mb-2" />
        </Reveal>

        <Reveal delay={0.08}>
          <h2
            className="m-0 mt-7 whitespace-pre-line font-script text-[#f4e7d4]"
            style={{ fontSize: 'clamp(42px,6.8vw,82px)', lineHeight: 1.06, padding: '.04em .08em', textShadow: '0 2px 34px rgba(0,0,0,.6)' }}
          >
            {RSVP.headline}
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-[560px] text-[14px] font-light leading-[2] tracking-[0.04em] text-[rgba(236,224,239,.88)] text-balance">
            {RSVP.body}
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-14 flex flex-col items-center gap-5">
            <Butterfly size={40} flutter />
            <div>
              <p className="m-0 font-serif text-[26px] font-medium tracking-[0.02em] text-[var(--color-gold-300)]" style={{ textShadow: '0 2px 24px rgba(0,0,0,.55)' }}>
                {EVENT.celebrant}
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-eyebrow text-[var(--color-orchid-dim)]">
                {EVENT.dateLabel}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
