import { DRESS_AVOID, DRESS_CODE, DRESS_PALETTE } from '../../data/content'
import { Layer } from '../ui/Layer'
import { Reveal } from '../ui/Reveal'
import { SectionTitle } from '../ui/SectionTitle'

const FABRIC_W = 565 // px width of /greek/dress-palette.webp

/** Crop one fabric stripe out of the palette photo via background sizing. */
function fabricStyle([a, b]: readonly [number, number], hex: string) {
  const w = b - a
  return {
    backgroundColor: hex,
    backgroundImage: 'url(/greek/dress-palette.webp)',
    backgroundSize: `${(FABRIC_W / w) * 100}% 100%`,
    backgroundPosition: `${(a / (FABRIC_W - w)) * 100}% 0`,
  }
}

export function Attire() {
  return (
    <section
      id="attire"
      aria-labelledby="attire-title"
      className="relative overflow-hidden border-t border-gold/20 px-6 py-[clamp(90px,13vh,150px)]"
    >
      <Layer
        name="ivy-right"
        imgClassName="anim-drift"
        className="right-[-4%] top-[6%] w-[34vw] lg:top-[9%] opacity-50 lg:right-[1%] lg:w-[clamp(170px,14vw,230px)] lg:opacity-90"
        speed={0.12}
      />
      <Layer
        name="column-plain"
        imgClassName="fade-bottom"
        className="bottom-0 left-[-6%] hidden w-[clamp(140px,13vw,210px)] sm:block lg:left-[2%]"
        speed={0.08}
      />

      <div className="relative z-10 mx-auto max-w-[980px] text-center">
        <SectionTitle title="Dress Code" id="attire-title" sub="Formal attire, in the jewel tones of the evening." />

        <ul className="m-0 mt-12 grid list-none gap-4 p-0 sm:grid-cols-3">
          {DRESS_CODE.rules.map((r, i) => (
            <li key={r.who}>
              <Reveal delay={0.08 * i} className="frame panel flex h-full flex-col items-center justify-center gap-2 px-6 py-6">
                <span className="caps text-[11px] text-gold-light">{r.who}</span>
                <span className="font-display text-[clamp(18px,1.8vw,21px)] uppercase tracking-[0.08em] text-ivory">{r.what}</span>
                {'detail' in r && <span className="text-[17px] italic leading-snug text-ivory/90 text-balance">{r.detail}</span>}
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="m-0 mx-auto mt-6 max-w-[56ch] text-[17px] italic leading-snug text-ivory/95 text-balance">
          * {DRESS_CODE.note}
        </p>

        <p className="caps m-0 mt-14 text-[11px] text-gold-light">{DRESS_CODE.paletteNote}</p>
        <ul className="m-0 mt-8 grid list-none grid-cols-3 gap-x-3 gap-y-8 p-0 sm:grid-cols-6 sm:gap-4">
          {DRESS_PALETTE.map((c, i) => (
            <li key={c.name}>
              <Reveal delay={0.08 * i} className="group flex flex-col items-center gap-3">
                <div
                  className="frame h-[clamp(150px,22vw,320px)] w-full rounded-t-full shadow-[0_18px_40px_rgba(0,0,0,.45)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-2 [&::before]:rounded-t-full"
                  style={fabricStyle(c.x, c.hex)}
                />
                <span className="caps text-[10px] leading-snug text-ivory/95 sm:text-[11px]">{c.name}</span>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-14 max-w-[420px]">
          <Reveal delay={0.2} className="frame panel flex flex-col items-center justify-center gap-3 px-7 py-6">
            <span className="caps text-[11px] text-gold-light">Kindly Avoid</span>
            <div className="flex items-center gap-4">
              {DRESS_AVOID.colors.map((c) => (
                <span key={c.name} className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className="relative block h-7 w-7 overflow-hidden rounded-full border border-gold/60"
                    style={{ backgroundColor: c.hex }}
                  >
                    {/* struck through: reserved colour */}
                    <span className="absolute left-1/2 top-[-20%] h-[140%] w-px -translate-x-1/2 rotate-45 bg-ink" />
                  </span>
                  <span className="caps text-[11px] text-ivory">{c.name}</span>
                </span>
              ))}
            </div>
            <p className="m-0 text-[17px] italic leading-snug text-ivory/95 text-balance">{DRESS_AVOID.note}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
