import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Reveal } from '../ui/Reveal'
import { Eyebrow } from '../ui/Ornaments'

/** A quiet full-bleed moment that lets the footage breathe. */
export function Moment() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 1.06])

  return (
    <section
      ref={ref}
      className="relative flex min-h-[78svh] flex-col items-center justify-center px-6 py-[clamp(40px,10vh,90px)] text-center"
      data-label="Moment"
    >
      <Reveal>
        <Eyebrow tone="cream" className="tracking-[0.55em]">
          An Invitation
        </Eyebrow>
      </Reveal>
      <motion.h2
        style={{ scale }}
        className="m-0 mt-4 font-script text-[#fbf3e6]"
      >
        <Reveal delay={0.1} y={40} duration={1.3}>
          <span
            className="block leading-[1.08]"
            style={{ fontSize: 'clamp(42px,8.5vw,112px)', padding: '.06em .12em', textShadow: '0 3px 44px rgba(0,0,0,.7)' }}
          >
            We can’t wait to
            <br />
            celebrate with you
          </span>
        </Reveal>
      </motion.h2>
    </section>
  )
}
