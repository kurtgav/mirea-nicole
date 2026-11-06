import { ABOUT } from '../../data/content'
import { Layer, Ornament } from '../ui/Layer'
import { Rings } from '../Backdrop'
import { Reveal } from '../ui/Reveal'
import { SectionTitle } from '../ui/SectionTitle'

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative overflow-hidden border-t border-gold/20 px-6 py-[clamp(110px,16vh,180px)]"
    >
      <Rings className="absolute left-1/2 top-[46%] w-[min(560px,90vw)] -translate-x-1/2 -translate-y-1/2 text-gold/[0.1]" />
      <Layer name="acropolis-b" tint className="bottom-[-2%] right-[-20%] w-[90vw] opacity-45 lg:right-[-4%] lg:w-[46vw]" imgClassName="fade-bottom" speed={0.06} />
      <Layer
        name="column-ivy-lg"
        className="statue left-[-22%] top-[-3%] w-[48vw] opacity-60 sm:opacity-85 lg:left-[-5%] lg:w-[clamp(220px,22vw,340px)] lg:opacity-100"
        imgClassName="fade-bottom"
        speed={0.1}
      />
      <Layer name="cloud-xl" tint className="bottom-[-4%] left-[-22%] w-[80vw] opacity-80 lg:left-[-7%] lg:w-[40vw]" imgClassName="fade-bottom -scale-x-100" speed={0.12} />
      <Layer
        name="goddess-lg"
        imgClassName="anim-hover"
        className="statue right-[-14%] top-[2%] w-[46vw] opacity-55 sm:opacity-80 lg:right-[1%] lg:top-[6%] lg:w-[clamp(260px,27vw,420px)] lg:opacity-100"
        speed={0.28}
      />

      <div className="relative z-10 mx-auto max-w-[640px] text-center">
        <SectionTitle title="About" id="about-title" />
        <div className="mt-9 space-y-3 text-[clamp(20px,2.1vw,25px)] italic leading-[1.6] text-ivory/90">
          {ABOUT.lines.map((line, i) => (
            <Reveal key={line} delay={0.1 + i * 0.12}>
              <p className="m-0 whitespace-pre-line">{line}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.35}>
          <p className="caps mx-auto mt-9 max-w-[46ch] text-[11px] leading-[2.1] text-gold-light">{ABOUT.theme}</p>
        </Reveal>
        <Reveal delay={0.45} className="mt-8 flex justify-center">
          <Ornament name="star-lg" className="anim-twinkle w-[26px]" />
        </Reveal>
      </div>
    </section>
  )
}
