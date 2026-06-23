import { useRef } from 'react'
import { motion, useScroll, useTransform, type Variants } from 'motion/react'
import { EVENT, HERO } from '../../data/content'
import { Divider } from '../ui/Ornaments'
import { scrollToId } from '../../lib/smoothScroll'
import { EASE_OUT_EXPO } from '../../lib/motion'

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.1 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.2, ease: EASE_OUT_EXPO } },
}
const nameLine: Variants = {
  hidden: { opacity: 0, y: 48, filter: 'blur(12px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.5, ease: EASE_OUT_EXPO } },
}

export function Hero({ entered }: { entered: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 110])
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col"
      data-label="Hero"
    >
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex flex-1 flex-col items-center justify-center px-[clamp(20px,5vw,40px)] pb-[clamp(72px,12vh,100px)] pt-[clamp(96px,18vh,128px)] text-center"
      >
        <motion.div variants={container} initial="hidden" animate={entered ? 'show' : 'hidden'}>
          <motion.p
            variants={item}
            className="m-0 mb-[26px] text-[12px] font-light uppercase tracking-eyebrow text-[rgba(243,230,207,.85)]"
            style={{ textShadow: '0 1px 16px rgba(0,0,0,.6)' }}
          >
            {HERO.eyebrow}
          </motion.p>

          <h1
            className="m-0 font-script leading-[1.16]"
            style={{
              fontSize: 'clamp(52px,11vw,168px)',
              padding: '.18em .12em .26em',
              filter: 'drop-shadow(0 4px 30px rgba(0,0,0,.6))',
            }}
          >
            <motion.span variants={nameLine} className="foil-bright block px-[.06em]">
              {EVENT.celebrantFirst}
            </motion.span>
            <motion.span variants={nameLine} className="foil block -mt-[.04em] px-[.06em]">
              {EVENT.celebrantLast}
            </motion.span>
          </h1>

          <motion.div variants={item} className="mt-[30px] flex justify-center">
            <Divider width={50} />
          </motion.div>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-[520px] text-[clamp(14px,1.6vw,17px)] font-light leading-[1.9] tracking-[0.02em] text-[rgba(244,236,247,.92)] text-balance"
            style={{ textShadow: '0 1px 18px rgba(0,0,0,.6)' }}
          >
            {HERO.intro}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-col items-center gap-7">
            <button
              type="button"
              onClick={() => scrollToId('celebration')}
              data-cursor
              className="gold-ring group relative overflow-hidden rounded-full px-10 py-4 text-[12px] uppercase tracking-[0.22em] text-[rgba(251,243,230,.96)] backdrop-blur-md transition-all duration-300"
              style={{ background: 'rgba(255,255,255,.06)', boxShadow: 'inset 0 1px 1px rgba(255,255,255,.16)' }}
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              {HERO.cta}
            </button>

            <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
              {HERO.meta.map((m) => (
                <span
                  key={m}
                  className="text-[11px] font-light uppercase tracking-[0.3em] text-[rgba(236,224,239,.9)]"
                  style={{ textShadow: '0 1px 14px rgba(0,0,0,.6)' }}
                >
                  {m}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* scroll cue — fades out as the hero parallaxes away */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-[clamp(20px,4vh,38px)] z-10 flex flex-col items-center gap-2"
        style={{ opacity }}
      >
        <span className="text-[10px] uppercase tracking-eyebrow text-[rgba(236,224,239,.7)]">Scroll</span>
        <motion.span
          className="block h-7 w-px"
          style={{ background: 'linear-gradient(180deg,var(--color-gold),transparent)' }}
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
