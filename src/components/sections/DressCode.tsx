import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { GlassCard } from '../ui/GlassCard'
import { Eyebrow, Diamond } from '../ui/Ornaments'
import { Silhouette } from '../ui/Attire'

/** A figure that lifts and gains a gold glow on hover. */
function Figure({
  kind,
  variant,
  height,
  delay,
}: {
  kind: 'gown' | 'suit'
  variant: number
  height: number | string
  delay: number
}) {
  return (
    <Reveal delay={delay} y={26} className="flex items-end">
      <div className="drop-shadow-[0_3px_18px_rgba(230,201,143,.22)] transition-all duration-500 ease-out hover:-translate-y-2 hover:drop-shadow-[0_12px_34px_rgba(230,201,143,.45)]">
        <Silhouette kind={kind} variant={variant} height={height} />
      </div>
    </Reveal>
  )
}

/** Gold baseline the figures stand on. */
function Stage() {
  return (
    <span
      className="mt-1 block h-px w-full"
      style={{ background: 'linear-gradient(90deg,transparent,rgba(230,201,143,.6) 30%,rgba(230,201,143,.6) 70%,transparent)' }}
    />
  )
}

export function DressCode() {
  return (
    <section
      id="dresscode"
      className="relative px-6 pb-[clamp(60px,9vh,110px)] pt-[clamp(40px,7vh,90px)]"
      data-label="Dress Code"
    >
      <div className="mx-auto max-w-[1080px]">
        <SectionHeading eyebrow="What to Wear" title="The Dress Code" variant="serif" />

        <Reveal delay={0.12}>
          <p className="mx-auto mt-5 max-w-[560px] text-center text-[15px] font-light leading-[1.9] tracking-[0.02em] text-[rgba(236,224,239,.85)] text-balance">
            A formal evening in deep, refined tones. Kindly come dressed to impress — the exact
            colour palette will be revealed in the weeks ahead.
          </p>
        </Reveal>

        <div
          className="mt-14 grid gap-6 md:grid-cols-2"
          style={{ perspective: 1400 }}
        >
          {/* THE LADIES */}
          <Reveal>
            <GlassCard className="h-full rounded-[18px] px-[clamp(24px,4vw,40px)] py-[clamp(32px,4vw,44px)]" tilt={5}>
              <Eyebrow className="text-center">For the Ladies</Eyebrow>
              <div className="relative mt-7">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 -top-3 bottom-0"
                  style={{ background: 'radial-gradient(58% 68% at 50% 58%,rgba(150,110,190,.3),transparent 72%)' }}
                />
                <div className="relative flex items-end justify-center gap-[3%]">
                  <Figure kind="gown" variant={1} height="clamp(130px,30vw,200px)" delay={0} />
                  <Figure kind="gown" variant={0} height="clamp(152px,35vw,232px)" delay={0.1} />
                  <Figure kind="gown" variant={2} height="clamp(130px,30vw,200px)" delay={0.2} />
                </div>
              </div>
              <Stage />
              <p className="mt-6 text-center font-serif text-[clamp(22px,3.4vw,28px)] font-medium text-[#f4e7d4]">
                Floor-Length Formal Gown
              </p>
              <p className="mt-2 text-center text-[13px] font-light leading-[1.7] text-[rgba(236,224,239,.7)]">
                An elegant evening gown, sweeping to the floor.
              </p>
            </GlassCard>
          </Reveal>

          {/* THE GENTLEMEN */}
          <Reveal delay={0.12}>
            <GlassCard className="h-full rounded-[18px] px-[clamp(24px,4vw,40px)] py-[clamp(32px,4vw,44px)]" tilt={5}>
              <Eyebrow className="text-center">For the Gentlemen</Eyebrow>
              <div className="relative mt-7">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 -top-3 bottom-0"
                  style={{ background: 'radial-gradient(58% 68% at 50% 58%,rgba(150,110,190,.3),transparent 72%)' }}
                />
                <div className="relative flex items-end justify-center gap-[10%]">
                  <Figure kind="suit" variant={0} height="clamp(150px,34vw,228px)" delay={0} />
                  <Figure kind="suit" variant={1} height="clamp(150px,34vw,228px)" delay={0.12} />
                </div>
              </div>
              <Stage />
              <p className="mt-6 text-center font-serif text-[clamp(22px,3.4vw,28px)] font-medium text-[#f4e7d4]">
                Suit &amp; Necktie
              </p>
              <p className="mt-2 text-center text-[13px] font-light leading-[1.7] text-[rgba(236,224,239,.7)]">
                A tailored suit with a collared shirt and tie.
              </p>
            </GlassCard>
          </Reveal>
        </div>

        {/* COLOUR CODE — to be announced */}
        <Reveal delay={0.1}>
          <div className="glass mx-auto mt-6 flex flex-col items-center rounded-[18px] px-6 py-[clamp(32px,5vw,44px)] text-center">
            <Eyebrow>The Colour Code</Eyebrow>
            <p
              className="foil mx-auto mt-3 font-script leading-[1.1]"
              style={{ fontSize: 'clamp(40px,9vw,72px)', padding: '.04em .18em .14em' }}
            >
              To Be Announced
            </p>

            <div className="mt-5 flex items-center justify-center gap-4">
              {[0, 1, 2].map((n) => (
                <span
                  key={n}
                  className="flex h-12 w-12 items-center justify-center rounded-full font-serif text-[22px] text-[rgba(230,201,143,.8)]"
                  style={{
                    background: 'linear-gradient(160deg,#1b1622,#07050c)',
                    border: '1px solid rgba(230,201,143,.4)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,.06)',
                  }}
                >
                  ?
                </span>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3">
              <Diamond size={6} />
              <p className="text-[10px] uppercase tracking-[0.34em] text-[var(--color-orchid-dim)]" style={{ textIndent: '0.34em' }}>
                Palette revealed soon
              </p>
              <Diamond size={6} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
