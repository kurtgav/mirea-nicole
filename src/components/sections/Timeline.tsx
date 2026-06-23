import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { TIMELINE } from '../../data/content'
import { SectionHeading } from '../ui/SectionHeading'
import { Butterfly } from '../ui/Butterfly'
import { EASE_OUT_EXPO, inView } from '../../lib/motion'
import { cn } from '../../lib/cn'

function Node() {
  return (
    <span className="absolute left-[26px] top-1 z-10 flex -translate-x-1/2 items-center justify-center md:left-1/2">
      <motion.span
        className="absolute h-10 w-10 rounded-full"
        style={{ border: '1px solid rgba(230,201,143,.4)' }}
        animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut' }}
      />
      <span
        className="flex h-[34px] w-[34px] items-center justify-center rounded-full"
        style={{ background: 'rgba(16,5,37,.85)', border: '1px solid rgba(230,201,143,.5)', boxShadow: '0 0 16px rgba(230,201,143,.4)' }}
      >
        <Butterfly size={20} />
      </span>
    </span>
  )
}

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 78%', 'end 65%'],
  })
  const fillScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section
      id="timeline"
      className="relative px-6 pb-[clamp(60px,9vh,110px)] pt-[clamp(40px,7vh,90px)]"
      data-label="Programme"
    >
      <div className="mx-auto max-w-[940px]">
        <SectionHeading
          eyebrow="The Order of the Evening"
          title="The Timeline"
          sub="A glimpse of how the night will unfold — tentative and to be confirmed."
          className="mb-14"
        />

        <div ref={ref} className="relative">
          {/* spine track */}
          <span className="absolute bottom-0 left-[26px] top-0 w-px -translate-x-1/2 bg-[rgba(230,201,143,.16)] md:left-1/2" />
          {/* spine fill draws with scroll */}
          <motion.span
            className="absolute bottom-0 left-[26px] top-0 w-px -translate-x-1/2 md:left-1/2"
            style={{
              scaleY: fillScale,
              transformOrigin: 'top',
              background: 'linear-gradient(180deg,#fff7ea,#e6c98f 40%,#c79355)',
              boxShadow: '0 0 12px rgba(230,201,143,.6)',
            }}
          />

          {TIMELINE.map((item, i) => {
            const right = i % 2 === 1
            return (
              <div key={item.title} className="relative mb-9 pl-[60px] last:mb-0 md:mb-14 md:pl-0">
                <Node />
                <motion.div
                  className={cn(
                    'md:w-1/2',
                    right ? 'md:ml-auto md:pl-14 md:text-left' : 'md:pr-14 md:text-right',
                  )}
                  initial={{ opacity: 0, x: right ? 36 : -36, y: 18, filter: 'blur(6px)' }}
                  whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
                  viewport={inView}
                  transition={{ duration: 1, ease: EASE_OUT_EXPO }}
                >
                  <p className="m-0 text-[11px] uppercase tracking-[0.34em] text-[var(--color-gold)]" style={{ textIndent: '0.34em' }}>
                    {item.time}
                  </p>
                  <h3 className="m-0 mt-[6px] font-serif text-[clamp(21px,4.6vw,27px)] font-medium text-[#f4e7d4]">
                    {item.title}
                  </h3>
                  <p className="m-0 mt-2 text-[14px] font-light leading-[1.75] text-[rgba(244,236,247,.78)]">
                    {item.desc}
                  </p>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
