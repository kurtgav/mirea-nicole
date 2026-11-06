import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { EVENT, HERO } from '../../data/content'
import { EASE_OUT_EXPO } from '../../lib/motion'
import { Layer, Ornament } from '../ui/Layer'
import { RsvpButton } from '../ui/RsvpButton'
import { CalendarIcon, ClockIcon } from '../ui/Icons'
import { Rings } from '../Backdrop'

const rise = (entered: boolean, delay: number) => ({
  initial: { opacity: 0, y: 24, filter: 'blur(8px)' },
  animate: entered ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined,
  transition: { duration: 1.3, ease: EASE_OUT_EXPO, delay },
})

export function Hero({ entered }: { entered: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      id="top"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] flex-col items-center overflow-hidden pt-[clamp(96px,14vh,150px)] lg:justify-center lg:pt-[80px]"
    >
      {/* ---- stage layers: bust left, temple on clouds right (as in the mock) ---- */}
      {/* plain wrapper on purpose: an animated/opaque parent would isolate the tinted (blend) layers */}
      <div className="absolute inset-0">
        <Rings className="absolute left-1/2 top-[44%] w-[min(640px,92vw)] -translate-x-1/2 -translate-y-1/2 text-gold/[0.13]" />
        <Layer name="cloud-xl" tint className="right-[-14%] top-[9%] w-[62vw] opacity-75 lg:right-[-6%] lg:top-[10%] lg:w-[34vw]" speed={0.3} eager />
        <Layer name="cloud-xl" tint className="left-[-14%] top-[9%] w-[62vw] opacity-75 lg:left-[-6%] lg:top-[10%] lg:w-[34vw]" imgClassName="-scale-x-100" speed={0.3} eager />
        <Layer
          name="temple-clouds"
          className="statue bottom-[-1%] right-[-26%] w-[86vw] sm:right-[-14%] sm:w-[62vw] lg:bottom-[2%] lg:right-[-13%] lg:w-[clamp(380px,46vw,760px)]"
          speed={0.12}
          eager
        />
        <Layer
          name="bust-lg"
          className="statue bottom-[-6%] left-[-22%] w-[74vw] sm:left-[-10%] sm:w-[60vw] lg:bottom-[-12%] lg:left-[-9%] lg:w-[clamp(420px,45vw,820px)]"
          speed={0.08}
          eager
        />
        <Layer name="star-sm" className="anim-twinkle left-[37%] top-[18%] w-[10px]" eager />
        <Layer name="star-sm" className="anim-twinkle right-[34%] top-[40%] w-[8px] [animation-delay:1.5s]" eager />
      </div>

      {/* ---- invitation copy ---- */}
      <motion.div
        className="relative z-10 flex flex-col items-center px-6 text-center"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <motion.div {...rise(entered, 0.1)}>
          <Ornament name="wreath-sm" className="w-[clamp(74px,8vw,104px)]" />
        </motion.div>

        <motion.p {...rise(entered, 0.25)} className="caps m-0 mt-5 text-[clamp(11px,1.2vw,14px)] tracking-[0.34em] text-gold-light">
          {HERO.eyebrow}
        </motion.p>

        <motion.h1
          id="hero-title"
          {...rise(entered, 0.4)}
          className="marble-text m-0 mt-2 font-title text-[clamp(64px,11.5vw,168px)] font-normal leading-[1] tracking-[0.02em]"
          style={{ textIndent: '0.02em' }}
        >
          {HERO.title}
        </motion.h1>

        <motion.p {...rise(entered, 0.55)} className="m-0 mt-3 text-[clamp(22px,2.6vw,32px)] italic text-ivory/90">
          {HERO.tagline}
        </motion.p>

        <motion.p {...rise(entered, 0.65)} className="caps m-0 mt-3 max-w-[34ch] text-[clamp(10px,1vw,12px)] sm:max-w-none leading-[1.9] text-ivory/65">
          {HERO.sub}
        </motion.p>

        <motion.div {...rise(entered, 0.75)} className="mt-6 w-[min(320px,78vw)]">
          <Ornament name="divider-star" className="w-full opacity-90" />
        </motion.div>

        <motion.dl
          {...rise(entered, 0.85)}
          className="caps m-0 mt-6 flex flex-col items-center gap-3 text-[clamp(13px,1.3vw,16px)] tracking-[0.16em] text-ivory sm:flex-row sm:gap-6"
        >
          <div className="flex items-center gap-3">
            <dt className="sr-only">Date</dt>
            <CalendarIcon className="h-[18px] w-[18px] text-gold" />
            <dd className="m-0">{EVENT.dateLabel}</dd>
          </div>
          <span aria-hidden className="hidden h-6 w-px bg-gold/60 sm:block" />
          <div className="flex items-center gap-3">
            <dt className="sr-only">Time</dt>
            <ClockIcon className="h-[18px] w-[18px] text-gold" />
            <dd className="m-0">{EVENT.timeLabel}</dd>
          </div>
        </motion.dl>

        <motion.div {...rise(entered, 1)} className="mt-9">
          <RsvpButton />
        </motion.div>

        {/* keeps the copy clear of the statues on small screens */}
        <div aria-hidden className="h-[64vw] sm:h-[48vw] lg:hidden" />
      </motion.div>
    </section>
  )
}
