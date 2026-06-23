import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../lib/prefersReducedMotion'

type Mote = {
  x: number
  y: number
  r: number
  vy: number
  sway: number
  phase: number
  alpha: number
  gold: boolean
}

type Flit = {
  x: number
  y: number
  scale: number
  vx: number
  vy: number
  wing: number
  wingSpeed: number
  drift: number
  driftAmp: number
  tilt: number
}

const TAU = Math.PI * 2

/**
 * Living atmosphere: gold dust rising through the frame with a few
 * butterflies drifting past. Canvas based, DPR-aware, pauses when the
 * tab is hidden, and goes quiet under prefers-reduced-motion.
 */
export function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const reduce = prefersReducedMotion()
    let w = 0
    let h = 0
    let dpr = 1
    let raf = 0
    let last = performance.now()
    let scrollY = window.scrollY

    let motes: Mote[] = []
    let flits: Flit[] = []

    const rand = (a: number, b: number) => a + Math.random() * (b - a)

    function build() {
      const area = w * h
      const moteCount = reduce ? 0 : Math.min(70, Math.round(area / 26000))
      const flitCount = reduce ? 0 : Math.min(6, Math.max(3, Math.round(w / 460)))

      motes = Array.from({ length: moteCount }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        r: rand(0.6, 2.2),
        vy: rand(6, 20),
        sway: rand(8, 26),
        phase: rand(0, TAU),
        alpha: rand(0.25, 0.75),
        gold: Math.random() > 0.34,
      }))

      flits = Array.from({ length: flitCount }, () => spawnFlit(true))
    }

    function spawnFlit(initial: boolean): Flit {
      const dir = Math.random() > 0.5 ? 1 : -1
      const scale = rand(0.5, 1.05)
      return {
        x: initial ? rand(0, w) : dir > 0 ? -60 : w + 60,
        y: rand(h * 0.12, h * 0.9),
        scale,
        vx: dir * rand(14, 32),
        vy: rand(-6, 6),
        wing: rand(0, TAU),
        wingSpeed: rand(7, 11),
        drift: rand(0, TAU),
        driftAmp: rand(10, 30),
        tilt: 0,
      }
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas!.width = Math.floor(w * dpr)
      canvas!.height = Math.floor(h * dpr)
      canvas!.style.width = `${w}px`
      canvas!.style.height = `${h}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      build()
    }

    function drawMote(m: Mote, parallax: number) {
      const x = m.x + Math.sin(m.phase) * m.sway
      const y = m.y - parallax * 0.04
      const wrappedY = ((y % h) + h) % h
      const c = m.gold ? '234,217,176' : '199,154,214'
      const g = ctx!.createRadialGradient(x, wrappedY, 0, x, wrappedY, m.r * 4)
      g.addColorStop(0, `rgba(${c},${m.alpha})`)
      g.addColorStop(1, `rgba(${c},0)`)
      ctx!.fillStyle = g
      ctx!.beginPath()
      ctx!.arc(x, wrappedY, m.r * 4, 0, TAU)
      ctx!.fill()
    }

    function drawFlit(f: Flit) {
      const wingScale = 0.42 + Math.abs(Math.sin(f.wing)) * 0.58
      ctx!.save()
      ctx!.translate(f.x, f.y + Math.sin(f.drift) * f.driftAmp)
      ctx!.rotate(f.tilt)
      ctx!.scale(f.scale, f.scale)
      ctx!.shadowColor = 'rgba(230,201,143,.55)'
      ctx!.shadowBlur = 12

      const grad = ctx!.createLinearGradient(-18, -18, 18, 18)
      grad.addColorStop(0, 'rgba(255,247,234,.92)')
      grad.addColorStop(0.5, 'rgba(230,201,143,.85)')
      grad.addColorStop(1, 'rgba(199,147,85,.8)')
      ctx!.fillStyle = grad

      // upper + lower wings, mirrored, squeezed horizontally by wingScale
      const wing = (sx: number) => {
        ctx!.save()
        ctx!.scale(sx * wingScale, 1)
        ctx!.beginPath()
        ctx!.ellipse(11, -7, 11, 8, -0.5, 0, TAU)
        ctx!.fill()
        ctx!.beginPath()
        ctx!.ellipse(9, 7, 8, 6.5, 0.5, 0, TAU)
        ctx!.fill()
        ctx!.restore()
      }
      wing(1)
      wing(-1)

      ctx!.shadowBlur = 0
      ctx!.fillStyle = 'rgba(120,80,40,.9)'
      ctx!.beginPath()
      ctx!.ellipse(0, 0, 1.4, 9, 0, 0, TAU)
      ctx!.fill()
      ctx!.restore()
    }

    function frame(now: number) {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      ctx!.clearRect(0, 0, w, h)

      for (const m of motes) {
        m.y -= m.vy * dt
        m.phase += dt * 0.7
        if (m.y < -10) {
          m.y = h + 10
          m.x = rand(0, w)
        }
        drawMote(m, scrollY)
      }

      for (let i = 0; i < flits.length; i++) {
        const f = flits[i]
        f.x += f.vx * dt
        f.y += f.vy * dt
        f.wing += f.wingSpeed * dt
        f.drift += dt * 0.9
        f.tilt = Math.sin(f.drift) * 0.18 + (f.vx > 0 ? 0.08 : -0.08)
        drawFlit(f)
        if ((f.vx > 0 && f.x > w + 80) || (f.vx < 0 && f.x < -80)) {
          flits[i] = spawnFlit(false)
        }
      }

      raf = requestAnimationFrame(frame)
    }

    function onScroll() {
      scrollY = window.scrollY
    }
    function onVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(raf)
      } else {
        last = performance.now()
        raf = requestAnimationFrame(frame)
      }
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)

    if (reduce) {
      // a single static dusting so the layer is not entirely empty
      ctx.clearRect(0, 0, w, h)
    } else {
      raf = requestAnimationFrame(frame)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[2]"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
