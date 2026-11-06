import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { FAQ } from '../../data/content'
import { EASE_OUT_EXPO } from '../../lib/motion'
import { Reveal } from '../ui/Reveal'
import { SectionTitle } from '../ui/SectionTitle'
import { Layer } from '../ui/Layer'

function AccordionItem({ q, a, isOpen, onToggle, id }: { q: string; a: string; isOpen: boolean; onToggle: () => void; id: string }) {
  return (
    <div className="border-b border-gold/25">
      <h3 className="m-0">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={id}
          className="flex w-full cursor-pointer items-center gap-4 bg-transparent px-1 py-6 text-left font-display text-[clamp(15px,1.6vw,18px)] font-normal uppercase tracking-[0.1em] text-ivory transition-colors hover:text-gold-light"
        >
          <motion.span
            aria-hidden
            className="text-[12px] text-gold"
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
          >
            ✦
          </motion.span>
          <span className="flex-1">{q}</span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
            className="overflow-hidden"
          >
            <p className="m-0 pb-7 pl-[30px] pr-2 text-[19px] italic leading-[1.65] text-ivory/80">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" aria-labelledby="faq-title" className="relative overflow-hidden border-t border-gold/20 px-6 py-[clamp(90px,13vh,150px)]">
      <Layer name="column-plain" tint className="bottom-0 left-[2%] hidden w-[clamp(140px,12vw,190px)] opacity-60 lg:block" imgClassName="fade-bottom" speed={0.08} />
      <Layer name="cloud-puff" tint className="right-[-4%] top-[18%] hidden w-[18vw] opacity-50 lg:block" speed={0.2} />
      <div className="relative z-10 mx-auto max-w-[720px]">
        <SectionTitle title="Good to Know" id="faq-title" />
        <Reveal delay={0.1} className="mt-10 border-t border-gold/25">
          {FAQ.map((f, i) => (
            <AccordionItem
              key={f.q}
              id={`faq-${i}`}
              q={f.q}
              a={f.a}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
