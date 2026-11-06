import { EVENT } from '../../data/content'
import { Layer, Ornament } from '../ui/Layer'
import { Reveal } from '../ui/Reveal'
import { SectionTitle } from '../ui/SectionTitle'
import { PinIcon } from '../ui/Icons'

export function Venue() {
  return (
    <section
      id="venue"
      aria-labelledby="venue-title"
      className="relative overflow-hidden border-t border-gold/20 px-6 pb-[clamp(240px,30vw,360px)] pt-[clamp(90px,13vh,150px)]"
    >
      <Layer name="ivy-left" className="right-[-6%] top-0 w-[44vw] -scale-x-100 opacity-50 lg:right-0 lg:w-[clamp(180px,18vw,260px)] lg:opacity-85" speed={-0.06} />
      <Layer name="cloud-xl" tint className="left-[-18%] top-[3%] w-[80vw] opacity-70 lg:left-[-7%] lg:top-[6%] lg:w-[32vw]" imgClassName="-scale-x-100" speed={0.15} />
      <Layer name="parthenon" tint className="bottom-[-6%] left-[-26%] w-[96vw] opacity-40 lg:left-[-4%] lg:w-[40vw]" imgClassName="fade-bottom" speed={0.04} />
      <Layer name="goddess-pedestal" className="statue bottom-0 right-[-4%] hidden w-[clamp(260px,25vw,400px)] lg:block" speed={0.1} />

      <div className="relative z-10 mx-auto max-w-[760px] text-center">
        <SectionTitle title="The Venue" id="venue-title" />

        <Reveal delay={0.1} className="mt-10 flex justify-center">
          <Ornament name="capital" className="w-[64px]" />
        </Reveal>
        <Reveal delay={0.18}>
          <p className="marble-text m-0 mt-5 font-display text-[clamp(38px,6.4vw,76px)] leading-none tracking-[0.06em]">{EVENT.venue}</p>
        </Reveal>
        <Reveal delay={0.26}>
          <p className="m-0 mt-3 text-[clamp(21px,2.4vw,27px)] italic text-ivory/90">{EVENT.venueSub}</p>
          <p className="caps m-0 mt-3 text-[11px] leading-[2] text-gold-light">{EVENT.area}</p>
        </Reveal>

        <Reveal delay={0.3} className="mx-auto mt-10 w-[min(400px,100%)]">
          <figure className="frame m-0 p-2 shadow-[0_24px_60px_rgba(0,0,0,.5)]">
            <img
              src="/greek/venue-medusa.webp"
              width={476}
              height={588}
              alt="The arched, lit entrance of Medusa BGC at night"
              loading="lazy"
              decoding="async"
              className="h-auto w-full"
            />
          </figure>
        </Reveal>

        <Reveal delay={0.34} className="mt-10 flex justify-center">
          <a
            href={EVENT.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="caps group inline-flex items-center gap-3 border-b border-gold/50 pb-2 text-[12px] text-ivory no-underline transition-colors duration-300 hover:border-gold-light hover:text-gold-light"
          >
            <PinIcon className="h-[18px] w-[18px] text-gold transition-transform duration-500 group-hover:-translate-y-0.5" />
            Open in Google Maps
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
