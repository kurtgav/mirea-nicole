import { motion } from 'motion/react'
import { EVENT } from '../../data/content'
import { useCountdown } from '../../lib/useCountdown'
import { EASE_OUT_EXPO } from '../../lib/motion'
import { scrollToId } from '../../lib/smoothScroll'
import { Layer, Ornament } from '../ui/Layer'
import { Reveal } from '../ui/Reveal'
import { RsvpButton } from '../ui/RsvpButton'
import { SectionTitle } from '../ui/SectionTitle'
import { CalendarIcon, ClockIcon, PinIcon } from '../ui/Icons'

type Fact = { Icon: typeof CalendarIcon; label: string; value: string; note: string; to?: string }

const FACTS: Fact[] = [
  { Icon: CalendarIcon, label: 'Date', value: EVENT.dateLabel, note: 'Mark your calendars!' },
  { Icon: ClockIcon, label: 'Time', value: EVENT.timeLabel, note: 'See you there!' },
  { Icon: PinIcon, label: 'Venue', value: EVENT.venue, note: EVENT.venueSub, to: 'venue' },
]

const pad = (n: number) => String(n).padStart(2, '0')

/** Number that rolls up when it changes (odometer feel). */
function Rolling({ value }: { value: string }) {
  return (
    // enter-only: the old value is gone at once, so two numbers never overlap
    <span className="inline-block overflow-hidden leading-none tabular-nums">
      <motion.span
        key={value}
        className="block"
        initial={{ y: '60%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
      >
        {value}
      </motion.span>
    </span>
  )
}

function Countdown() {
  const { days, hours, minutes, seconds, done } = useCountdown(EVENT.dateISO)
  if (done) {
    return <p className="caps m-0 text-[14px] text-gold-light">The night has arrived</p>
  }
  const units = [
    { label: 'Days', value: String(days) },
    { label: 'Hours', value: pad(hours) },
    { label: 'Minutes', value: pad(minutes) },
    { label: 'Seconds', value: pad(seconds) },
  ]
  return (
    <div role="timer" aria-label={`${days} days until the celebration`} className="flex items-start justify-center gap-[clamp(14px,4vw,44px)]">
      {units.map((u, i) => (
        <div key={u.label} className="flex items-start gap-[clamp(14px,4vw,44px)]">
          {i > 0 && <span aria-hidden className="mt-3 text-[10px] text-gold/70">✦</span>}
          <div className="flex min-w-[3ch] flex-col items-center gap-2" aria-hidden>
            <span className="gold-text font-display text-[clamp(30px,4.4vw,52px)] tabular-nums">
              <Rolling value={u.value} />
            </span>
            <span className="caps text-[9px] text-ivory/60 sm:text-[10px]">{u.label}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export function Details() {
  return (
    <section
      id="details"
      aria-labelledby="details-title"
      className="relative overflow-hidden border-t border-gold/20 px-6 pb-[clamp(240px,30vw,400px)] pt-[clamp(90px,13vh,150px)]"
    >
      <div className="relative z-10 mx-auto max-w-[1000px] text-center">
        <SectionTitle title="Event Details" id="details-title" />

        <div className="relative mx-auto mt-12 max-w-[900px]">
          <Ornament name="laurel-branch" className="absolute left-[-7%] top-1/2 hidden w-[58px] -translate-y-1/2 -rotate-[18deg] lg:block" />
          <Ornament name="laurel-branch" className="absolute right-[-7%] top-1/2 hidden w-[58px] -translate-y-1/2 rotate-[18deg] -scale-x-100 lg:block" />

          <dl className="m-0 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-0">
            {FACTS.map((f, i) => (
              <Reveal
                key={f.label}
                delay={0.1 + i * 0.12}
                className="flex flex-col items-center gap-3 sm:border-l sm:border-gold/35 sm:px-4 sm:first:border-l-0"
              >
                <f.Icon className="h-[clamp(30px,3vw,36px)] w-[clamp(30px,3vw,36px)] text-gold-light" />
                <dt className="sr-only">{f.label}</dt>
                <dd className="m-0 flex flex-col items-center gap-1">
                  <span className="font-display text-[clamp(18px,1.9vw,23px)] uppercase tracking-[0.06em] text-ivory sm:whitespace-nowrap">{f.value}</span>
                  {f.to ? (
                    <button
                      type="button"
                      onClick={() => scrollToId(f.to!)}
                      className="cursor-pointer bg-transparent p-0 text-[18px] italic text-ivory/75 underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold-light"
                    >
                      {f.note}
                    </button>
                  ) : (
                    <span className="text-[18px] italic text-ivory/75">{f.note}</span>
                  )}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>

        <Reveal delay={0.2} className="frame panel mx-auto mt-14 w-fit max-w-full px-[clamp(18px,4vw,48px)] py-7">
          <p className="caps m-0 mb-5 text-[11px] text-gold-light/80">Counting down to the night</p>
          <Countdown />
        </Reveal>

        <Reveal delay={0.3} className="mt-12 flex justify-center">
          <RsvpButton size="lg" />
        </Reveal>
        <Reveal delay={0.4} className="mt-10 flex justify-center">
          <Ornament name="divider-star" className="w-[min(240px,60vw)] opacity-85" />
        </Reveal>
      </div>

      {/* ruins on the horizon, tinted into the velvet like the mock */}
      <Layer name="column-ivy" tint className="left-[-6%] top-[-2%] w-[26vw] opacity-55 lg:left-[0%] lg:w-[clamp(130px,12vw,190px)] lg:opacity-70" imgClassName="fade-bottom" speed={-0.06} />
      <Layer name="arch" tint className="right-[-18%] top-[18%] hidden w-[38vw] opacity-60 sm:block lg:right-[-6%] lg:w-[clamp(220px,24vw,360px)]" imgClassName="fade-bottom" speed={0.08} />
      <Layer name="acropolis-b" tint className="bottom-0 left-[-30%] w-[110vw] -scale-x-100 opacity-70 lg:left-[-6%] lg:w-[52vw]" imgClassName="fade-bottom" speed={0.04} />
      <Layer name="acropolis" tint className="bottom-0 right-[-30%] w-[110vw] opacity-70 lg:right-[-6%] lg:w-[52vw]" imgClassName="fade-bottom" speed={0.06} />
    </section>
  )
}
