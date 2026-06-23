import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { FAQ, REMINDERS } from '../../data/content'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { EASE_OUT_EXPO } from '../../lib/motion'

function AccordionItem({
  q,
  a,
  isOpen,
  onToggle,
}: {
  q: string
  a: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="glass overflow-hidden rounded-[14px]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        data-cursor
        className="flex w-full items-center gap-4 bg-transparent px-6 py-[22px] text-left font-serif text-[clamp(19px,4.8vw,23px)] font-medium text-[#f4e7d4]"
      >
        <motion.span
          className="block h-[9px] w-[9px] flex-none bg-gold"
          style={{ boxShadow: '0 0 10px rgba(230,201,143,.5)' }}
          animate={{ rotate: isOpen ? 225 : 45 }}
          transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
        />
        <span className="flex-1">{q}</span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
            className="overflow-hidden"
          >
            <p className="m-0 px-6 pb-6 pl-[49px] text-[14px] font-light leading-[1.85] text-[rgba(236,224,239,.8)]">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section
      id="faq"
      className="relative px-6 pb-[clamp(60px,9vh,110px)] pt-[clamp(40px,7vh,90px)]"
      data-label="FAQ"
    >
      <div className="mx-auto max-w-[680px]">
        <SectionHeading eyebrow="Good to Know" title="FAQ & Reminders" className="mb-12" />

        <Reveal>
          <p className="mb-[18px] text-[11px] uppercase tracking-[0.4em] text-[var(--color-orchid)]" style={{ textIndent: '0.4em' }}>
            Frequently Asked
          </p>
        </Reveal>

        <div className="flex flex-col gap-3">
          {FAQ.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.08}>
              <AccordionItem
                q={f.q}
                a={f.a}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mb-[18px] mt-12 text-[11px] uppercase tracking-[0.4em] text-[var(--color-orchid)]" style={{ textIndent: '0.4em' }}>
            A Few Reminders
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass flex flex-col rounded-[14px] px-[clamp(22px,5vw,34px)] py-[clamp(20px,5vw,30px)]">
            {REMINDERS.map((r, i) => (
              <div
                key={i}
                className="flex items-start gap-4 py-[14px]"
                style={{ borderBottom: i < REMINDERS.length - 1 ? '1px solid rgba(230,201,143,.12)' : 'none' }}
              >
                <span
                  className="mt-[7px] block h-[7px] w-[7px] flex-none rotate-45 bg-gold"
                  style={{ boxShadow: '0 0 8px rgba(230,201,143,.5)' }}
                />
                <p className="m-0 text-[15px] font-light leading-[1.75] text-[rgba(244,236,247,.88)]">{r}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
