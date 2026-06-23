import { motion } from 'motion/react'
import { EIGHTEEN } from '../../data/content'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { GlassCard } from '../ui/GlassCard'
import { Butterfly } from '../ui/Butterfly'
import { EASE_OUT_EXPO, inView } from '../../lib/motion'

export function TheEighteen() {
  return (
    <section
      id="eighteen"
      className="relative px-6 pb-[clamp(60px,9vh,110px)] pt-[clamp(40px,7vh,90px)]"
      data-label="The Eighteen"
    >
      <div className="mx-auto max-w-[1020px]">
        {/* butterfly bloom above the heading */}
        <motion.div
          className="mb-2 flex justify-center"
          initial={{ opacity: 0, scale: 0.4, rotate: -18 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={inView}
          transition={{ duration: 1.1, ease: EASE_OUT_EXPO }}
        >
          <Butterfly size={62} flutter />
        </motion.div>

        <SectionHeading
          eyebrow="A Debut Tradition"
          title="The Eighteen"
          sub="Eighteen cherished offerings to honour Mirea’s coming of age."
        />

        <div
          className="mt-12 grid gap-[18px]"
          style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(212px,1fr))', perspective: 1200 }}
        >
          {EIGHTEEN.map((e, i) => (
            <Reveal key={e.label} delay={i * 0.1}>
              <GlassCard className="h-full rounded-[14px] px-6 py-[clamp(36px,5vw,48px)] text-center" tilt={9}>
                <p
                  className="m-0 font-script leading-[1.04]"
                  style={{
                    fontSize: 'clamp(66px,11vw,94px)',
                    background: 'linear-gradient(100deg,#e9d6b5,#fff7ea 40%,#e6c98f)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    color: 'transparent',
                  }}
                >
                  18
                </p>
                <p className="mt-[14px] text-[12px] uppercase tracking-[0.36em] text-[#f4e7d4]" style={{ textIndent: '0.36em' }}>
                  {e.label}
                </p>
                <p className="mt-2 font-serif text-[15px] italic text-[var(--color-orchid)]">{e.note}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
