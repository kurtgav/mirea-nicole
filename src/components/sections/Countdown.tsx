import { AnimatePresence, motion } from 'motion/react'
import { EVENT } from '../../data/content'
import { useCountdown } from '../../lib/useCountdown'
import { Reveal } from '../ui/Reveal'
import { Eyebrow } from '../ui/Ornaments'
import { EASE_OUT_EXPO } from '../../lib/motion'

/** A single number that slides up when its value changes (odometer feel). */
function Rolling({ value }: { value: string }) {
  return (
    <span className="relative inline-grid overflow-hidden" style={{ lineHeight: 1.05 }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          className="foil col-start-1 row-start-1 block"
          initial={{ y: '70%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-70%', opacity: 0 }}
          transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

const pad = (n: number) => String(n).padStart(2, '0')

export function Countdown() {
  const { days, hours, minutes, seconds } = useCountdown(EVENT.dateISO)

  const units: Array<{ label: string; value: string }> = [
    { label: 'Days', value: String(days) },
    { label: 'Hours', value: pad(hours) },
    { label: 'Minutes', value: pad(minutes) },
    { label: 'Seconds', value: pad(seconds) },
  ]

  return (
    <section className="relative px-6 py-[clamp(64px,9vh,110px)] text-center" data-label="Countdown">
      <Reveal>
        <Eyebrow className="mb-9">Counting down to the night</Eyebrow>
      </Reveal>

      <Reveal delay={0.1}>
        <div
          className="gold-ring glass mx-auto grid w-[min(440px,100%)] grid-cols-2 gap-x-[clamp(10px,5vw,48px)] gap-y-[clamp(20px,5vw,40px)] rounded-[18px] px-[clamp(20px,5vw,44px)] py-[clamp(26px,6vw,38px)]"
        >
          {units.map((u) => (
            <div key={u.label} className="flex flex-col items-center gap-2">
              <span className="font-script text-[clamp(50px,13vw,82px)]">
                <Rolling value={u.value} />
              </span>
              <span className="text-[10px] uppercase tracking-[0.32em] text-[var(--color-orchid)]" style={{ textIndent: '0.32em' }}>
                {u.label}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
