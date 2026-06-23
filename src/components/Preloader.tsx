import { useEffect, useRef } from 'react'
import { useAnimate } from 'motion/react'
import { EASE_OUT_EXPO, EASE_OUT_QUINT, EASE_IN_OUT_SOFT } from '../lib/motion'
import { EVENT } from '../data/content'
import { prefersReducedMotion } from '../lib/prefersReducedMotion'

/** How long the unfurled scroll dwells on screen before the page is revealed. */
const SCROLL_HOLD_MS = 1500

/* Closed roll — the engraved purple cylinder (black keyed out → transparent,
   cropped tight), sized to match the open scroll's width. */
function RollLog() {
  return (
    <img
      data-log
      src="/media/scroll-roll.png"
      alt=""
      aria-hidden
      className="block w-full"
      style={{ filter: 'drop-shadow(0 14px 24px rgba(0,0,0,.55))', zIndex: 4 }}
    />
  )
}

/* Realistic white satin ribbon + bow, untied by pulling both tails down. */
function WhiteRibbon() {
  return (
    <div data-ribbon className="pointer-events-none absolute inset-0 z-[7] flex flex-col items-center justify-center">
      {/* satin wrap band around the roll */}
      <div
        data-band
        className="absolute left-0 right-0 top-1/2 h-[34%] -translate-y-1/2"
        style={{
          transformOrigin: 'center',
          background:
            'linear-gradient(180deg,#b9b9c4 0%,#e8e8ee 22%,#ffffff 44%,#dcdce4 60%,#a9a9b6 100%)',
          boxShadow: 'inset 0 2px 0 rgba(255,255,255,.6),inset 0 -4px 7px rgba(0,0,0,.28),0 2px 8px rgba(0,0,0,.3)',
        }}
      />
      <svg
        viewBox="0 0 260 220"
        className="absolute"
        style={{ overflow: 'visible', left: '50%', top: '50%', width: '64%', transform: 'translate(-50%,-44%)' }}
      >
        <defs>
          <linearGradient id="wsilk" x1="0" y1="0" x2="0.35" y2="1">
            <stop offset="0" stopColor="#a9a9b6" />
            <stop offset="0.4" stopColor="#ffffff" />
            <stop offset="0.58" stopColor="#dcdce4" />
            <stop offset="1" stopColor="#9b9ba8" />
          </linearGradient>
          <linearGradient id="wknot" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.5" stopColor="#cfcfd8" />
            <stop offset="1" stopColor="#a3a3b0" />
          </linearGradient>
        </defs>

        {/* tails (pulled down to untie) */}
        <path data-ltail d="M120 98 C112 140 100 170 86 210 L104 198 L112 214 L124 176 C130 140 132 118 132 104 Z" fill="url(#wsilk)" stroke="rgba(255,255,255,.5)" strokeWidth="0.7" style={{ transformBox: 'fill-box', transformOrigin: '85% 0%' }} />
        <path data-rtail d="M140 98 C148 140 160 170 174 210 L156 198 L148 214 L136 176 C130 140 128 118 128 104 Z" fill="url(#wsilk)" stroke="rgba(255,255,255,.5)" strokeWidth="0.7" style={{ transformBox: 'fill-box', transformOrigin: '15% 0%' }} />

        {/* loops (consumed as tails are pulled) */}
        <path data-lloop d="M122 82 C68 32 6 46 20 88 C32 122 96 108 128 92 Z" fill="url(#wsilk)" stroke="rgba(255,255,255,.55)" strokeWidth="0.8" style={{ transformBox: 'fill-box', transformOrigin: '100% 60%' }} />
        <path data-rloop d="M138 82 C192 32 254 46 240 88 C228 122 164 108 132 92 Z" fill="url(#wsilk)" stroke="rgba(255,255,255,.55)" strokeWidth="0.8" style={{ transformBox: 'fill-box', transformOrigin: '0% 60%' }} />

        {/* knot */}
        <rect data-knot x="116" y="68" width="28" height="32" rx="9" fill="url(#wknot)" stroke="rgba(255,255,255,.7)" strokeWidth="0.8" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
        <ellipse data-knot cx="130" cy="84" rx="3.5" ry="7" fill="rgba(255,255,255,.55)" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
      </svg>
    </div>
  )
}

/**
 * Realistic vintage-scroll intro. A closed engraved-purple rolled scroll tied
 * with a white satin ribbon. Both ribbon tails are pulled down to untie the
 * bow; the scroll then unfurls to the ornate purple-rose invitation, dwells for
 * 2.5s, and expands into the landing page.
 */
export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [scope, animate] = useAnimate()
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true
    let done = false
    const finish = () => {
      if (!done) {
        done = true
        onComplete()
      }
    }
    const wait = (ms: number) => new Promise<void>((res) => setTimeout(res, ms))

    async function run() {
      if (prefersReducedMotion()) {
        await animate(scope.current, { opacity: [1, 0] }, { duration: 0.4 })
        finish()
        return
      }

      const expo = { ease: EASE_OUT_EXPO }
      const quint = { ease: EASE_OUT_QUINT }
      const soft = { ease: EASE_IN_OUT_SOFT }

      const parch = scope.current?.querySelector('[data-parch]') as HTMLElement | null
      const target = parch ? parch.offsetHeight : 480

      // 1 — scroll settles in (tied)
      await animate('[data-scene]', { opacity: [0, 1], scale: [0.9, 1], y: [22, 0] }, { duration: 0.7, ...expo })
      animate('[data-glint]', { x: ['-130%', '170%'], opacity: [0, 0.8, 0] }, { duration: 1.0, ...soft })
      await wait(260)

      // 2 — PULL BOTH TAILS DOWN → bow unties (loops consumed, knot loosens)
      await Promise.all([
        animate('[data-ltail]', { y: 70, x: -10, scaleY: 1.25 }, { duration: 0.7, ...quint }),
        animate('[data-rtail]', { y: 70, x: 10, scaleY: 1.25 }, { duration: 0.7, ...quint }),
        animate('[data-lloop]', { scaleX: [1, 0.04], scaleY: [1, 0.55], opacity: [1, 0.85, 0] }, { duration: 0.62, ...quint }),
        animate('[data-rloop]', { scaleX: [1, 0.04], scaleY: [1, 0.55], opacity: [1, 0.85, 0] }, { duration: 0.62, delay: 0.04, ...quint }),
        animate('[data-knot]', { scaleX: [1, 0.55], opacity: [1, 1, 0] }, { duration: 0.7, times: [0, 0.6, 1], ...expo }),
      ])

      // 3 — loosened ribbon slips off and falls away
      await Promise.all([
        animate('[data-ltail]', { y: 230, x: -34, rotate: -16, opacity: 0 }, { duration: 0.65, ...expo }),
        animate('[data-rtail]', { y: 240, x: 34, rotate: 16, opacity: 0 }, { duration: 0.7, ...expo }),
        animate('[data-band]', { y: 60, scaleY: 0.5, opacity: [1, 0] }, { duration: 0.6, delay: 0.06, ...expo }),
      ])

      // ensure parchment image is decoded before revealing
      await new Promise<void>((res) => {
        const img = new Image()
        img.onload = () => res()
        img.onerror = () => res()
        img.src = '/media/vintage-frame.png'
        if (img.complete) res()
      })

      // 4 — unfurl: scroll unrolls; roll lifts away
      await Promise.all([
        animate('[data-roll]', { height: [12, target] }, { duration: 1.3, ...quint }),
        animate('[data-log]', { y: -12, opacity: [1, 1, 0] }, { duration: 1.3, times: [0, 0.5, 1], ...expo }),
      ])

      // 5 — the scroll stays on screen for 2.5s before the landing page
      await wait(SCROLL_HOLD_MS)

      // 6 — expand into the page
      await Promise.all([
        animate('[data-scene]', { scale: 1.7, opacity: 0 }, { duration: 0.9, ...expo }),
        animate(scope.current, { opacity: 0 }, { duration: 0.85, delay: 0.4 }),
      ])
      finish()
    }

    run().catch(finish)
  }, [animate, scope, onComplete])

  return (
    <div ref={scope} className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
      {/* vintage vignette backdrop */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(125% 100% at 50% 36%,#22103f 0%,#0d0622 60%,#060310 100%)' }} />
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <span className="absolute left-[20%] top-[24%] h-[3px] w-[3px] rounded-full bg-[#ead9b0]" style={{ boxShadow: '0 0 10px 2px rgba(234,217,176,.6)' }} />
        <span className="absolute right-[22%] top-[62%] h-[2px] w-[2px] rounded-full bg-[#f0c8e6]" style={{ boxShadow: '0 0 8px 2px rgba(240,200,230,.5)' }} />
        <span className="absolute left-[60%] top-[18%] h-[2px] w-[2px] rounded-full bg-[#ead9b0]" style={{ boxShadow: '0 0 8px 2px rgba(234,217,176,.5)' }} />
      </div>

      {/* SCENE */}
      <div data-scene className="relative flex flex-col items-center" style={{ width: 'min(90vw, 36svh)', transformOrigin: 'top center' }}>
        {/* closed roll + white ribbon */}
        <div className="relative w-full">
          <RollLog />
          <WhiteRibbon />
        </div>

        {/* unfurling parchment — same width as the closed roll */}
        <div data-roll className="relative -mt-[2px] w-full overflow-hidden" style={{ height: 12, boxShadow: '0 12px 30px rgba(0,0,0,.5)' }}>
          <div
            data-parch
            className="relative flex w-full flex-col items-center justify-center px-[10%] text-center"
            style={{
              aspectRatio: '768 / 1360',
              backgroundColor: '#d9c7ec',
              backgroundImage: 'url(/media/vintage-frame.png)',
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
            }}
          >
            {/* dark medallion so the gold-foil headline reads on the light parchment */}
            <span
              aria-hidden
              className="pointer-events-none absolute left-[9%] right-[9%] top-[19%] bottom-[19%]"
              style={{
                borderRadius: '50%',
                background:
                  'radial-gradient(closest-side,rgba(9,4,22,.95),rgba(12,5,28,.82) 46%,rgba(16,7,34,.45) 70%,transparent 86%)',
                boxShadow: '0 0 0 1px rgba(230,201,143,.28),0 0 26px rgba(230,201,143,.12)',
                filter: 'blur(2px)',
              }}
            />

            <div className="relative z-20 flex flex-col items-center">
              <p className="m-0 text-[10px] font-light uppercase tracking-eyebrow text-[rgba(243,230,207,.92)]" style={{ textShadow: '0 1px 12px rgba(0,0,0,.6)' }}>
                You are cordially invited
              </p>
              <p className="m-0 mb-3 text-[9px] font-light uppercase tracking-eyebrow text-[rgba(236,224,239,.8)]" style={{ textShadow: '0 1px 12px rgba(0,0,0,.6)' }}>
                to the eighteenth birthday of
              </p>

              <p
                className="foil-bright m-0 font-script"
                style={{ fontSize: 'clamp(28px,9.4vw,46px)', lineHeight: 1.16, padding: '.2em .12em .12em', overflow: 'visible', whiteSpace: 'nowrap', filter: 'drop-shadow(0 2px 12px rgba(0,0,0,.6))' }}
              >
                {EVENT.celebrantFirst}
              </p>
              <p
                className="foil m-0 font-script"
                style={{ fontSize: 'clamp(28px,10vw,46px)', lineHeight: 1.16, padding: '.04em .16em .22em', marginTop: '-.14em', overflow: 'visible', filter: 'drop-shadow(0 2px 12px rgba(0,0,0,.55))' }}
              >
                {EVENT.celebrantLast}
              </p>

              <span className="my-3 flex items-center gap-[14px]">
                <span className="block h-px w-[42px]" style={{ background: 'linear-gradient(90deg,transparent,#e6c98f)' }} />
                <span className="block h-[6px] w-[6px] rotate-45 bg-gold" style={{ boxShadow: '0 0 10px rgba(230,201,143,.6)' }} />
                <span className="block h-px w-[42px]" style={{ background: 'linear-gradient(270deg,transparent,#e6c98f)' }} />
              </span>

              <p className="m-0 text-[10px] font-light uppercase tracking-[0.3em] text-[rgba(243,230,207,.92)]" style={{ textIndent: '0.3em', textShadow: '0 1px 12px rgba(0,0,0,.6)' }}>
                {EVENT.dateLabel}
              </p>
              <p className="m-0 mt-1 font-serif text-[13px] italic text-[var(--color-orchid-soft)]" style={{ textShadow: '0 1px 10px rgba(0,0,0,.55)' }}>
                {EVENT.venue} · The Palace
              </p>
            </div>
          </div>

          {/* curl shadow at the unrolling edge */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-9" style={{ background: 'linear-gradient(0deg,rgba(14,5,30,.6),transparent)' }} />
        </div>

        {/* sweeping glint */}
        <div data-glint className="pointer-events-none absolute inset-0 z-[8]" style={{ background: 'linear-gradient(105deg,transparent 42%,rgba(255,247,234,.5) 50%,transparent 58%)', opacity: 0 }} />
      </div>
    </div>
  )
}
