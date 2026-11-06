import { EVENT } from '../../data/content'
import { Layer, Ornament } from '../ui/Layer'
import { Reveal } from '../ui/Reveal'
import { RsvpButton } from '../ui/RsvpButton'

export function Rsvp() {
  return (
    <section
      id="rsvp"
      aria-labelledby="rsvp-title"
      className="relative overflow-hidden border-t border-gold/20 px-6 pb-[clamp(150px,20vw,240px)] pt-[clamp(100px,15vh,170px)] text-center"
    >
      <Layer name="cloud-lg" tint className="bottom-[-6%] left-[-20%] w-[80vw] opacity-80 lg:left-[-6%] lg:w-[40vw]" imgClassName="fade-bottom" speed={0.12} />
      <Layer name="cloud-lg" tint className="bottom-[-8%] right-[-20%] w-[80vw] -scale-x-100 opacity-80 lg:right-[-6%] lg:w-[40vw]" imgClassName="fade-bottom" speed={0.06} />
      <Layer name="moon" className="right-[10%] top-[14%] w-[clamp(44px,5vw,70px)] opacity-90" speed={0.25} />
      <Layer name="star-8pt" className="anim-twinkle left-[16%] top-[42%] hidden w-[34px] lg:block" />
      <Layer name="cloud-sm" tint imgClassName="anim-drift"
        className="left-[12%] top-[20%] hidden w-[160px] opacity-50 lg:block" speed={0.3} />

      <div className="relative z-10 mx-auto max-w-[640px]">
        <Reveal className="relative mx-auto w-fit">
          <Ornament name="sunburst" className="absolute left-1/2 top-1/2 w-[190px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-35 motion-safe:animate-[spin_60s_linear_infinite]" />
          <Ornament name="wreath-lg" className="relative w-[clamp(110px,12vw,150px)]" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            id="rsvp-title"
            className="marble-text m-0 mt-8 font-display text-[clamp(40px,6.4vw,80px)] font-normal uppercase leading-none tracking-[0.08em]"
          >
            Kindly Reply
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="m-0 mt-6 text-[clamp(20px,2.2vw,25px)] italic leading-[1.6] text-ivory/90 text-balance">
            Your presence would make the night complete. Let us know you’re coming.
          </p>
          <p className="caps m-0 mt-5 text-[12px] text-gold-light">
            {EVENT.dateLabel} · {EVENT.timeLabel}
          </p>
        </Reveal>
        <Reveal delay={0.3} className="mt-10 flex justify-center">
          <RsvpButton size="lg" />
        </Reveal>
      </div>
    </section>
  )
}
