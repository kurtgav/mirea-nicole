import { DETAILS } from '../../data/content'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { GlassCard } from '../ui/GlassCard'
import { Diamond } from '../ui/Ornaments'

export function Details() {
  return (
    <section
      id="celebration"
      className="relative px-6 pb-[clamp(60px,9vh,110px)] pt-[clamp(40px,7vh,90px)]"
      data-label="Details"
    >
      <div className="mx-auto max-w-[1020px]">
        <SectionHeading
          eyebrow="The Celebration"
          title="An Evening of Grace"
          variant="serif"
        />

        <div
          className="mt-14 grid gap-6"
          style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(238px,1fr))', perspective: 1200 }}
        >
          {DETAILS.map((d, i) => (
            <Reveal key={d.kicker} delay={i * 0.12}>
              <GlassCard className="h-full rounded-[14px] px-6 py-[46px] text-center">
                <Diamond size={8} className="mx-auto mb-[22px]" />
                <p className="m-0 text-[11px] uppercase tracking-[0.4em] text-[var(--color-orchid)]" style={{ textIndent: '0.4em' }}>
                  {d.kicker}
                </p>
                <p
                  className="foil my-[10px] font-script leading-[1.4]"
                  style={{ fontSize: 'clamp(40px,7vw,56px)', padding: '.06em .12em .16em' }}
                >
                  {d.headline}
                </p>
                <p className="m-0 font-serif text-[20px] italic text-[#d9bfe0]">{d.sub}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
