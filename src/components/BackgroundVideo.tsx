import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../lib/prefersReducedMotion'

/* Scroll-scrubbed background as a pre-rendered image sequence (Apple-style).
   This works IDENTICALLY on every device — desktop, Android, and iOS Safari —
   because it draws cached frames to a canvas instead of seeking a <video>
   (which iOS Safari refuses to scrub frame-by-frame). */
const FRAME_COUNT = 78
const STILL_INDEX = 22 // frame held for reduced-motion users
const frameUrl = (i: number) => `/media/seq/f${String(i + 1).padStart(3, '0')}.webp`

export function BackgroundVideo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduce = prefersReducedMotion()

    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    // preload every frame
    const images: HTMLImageElement[] = []
    let firstLoaded = false
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image()
      img.decoding = 'async'
      img.src = frameUrl(i)
      img.onload = () => {
        if (!firstLoaded) {
          firstLoaded = true
          render(curIdx, true)
        }
      }
      images[i] = img
    }

    let dpr = 1
    let vw = 0
    let vh = 0
    let curIdx = reduce ? STILL_INDEX : 0
    let raf = 0
    let lastDrawn = -1
    let lastScale = -1

    /** nearest already-decoded frame to the requested index */
    function pick(idx: number): HTMLImageElement | null {
      const n = clamp(Math.round(idx), 0, FRAME_COUNT - 1)
      if (images[n]?.complete && images[n].naturalWidth) return images[n]
      for (let d = 1; d < FRAME_COUNT; d++) {
        const a = images[n - d]
        if (a?.complete && a.naturalWidth) return a
        const b = images[n + d]
        if (b?.complete && b.naturalWidth) return b
      }
      return null
    }

    function render(idx: number, force = false) {
      const scale = 1.05 + progress() * 0.1
      const n = clamp(Math.round(idx), 0, FRAME_COUNT - 1)
      if (!force && n === lastDrawn && Math.abs(scale - lastScale) < 0.002) return
      const img = pick(idx)
      if (!img) return
      lastDrawn = n
      lastScale = scale
      const fw = img.naturalWidth
      const fh = img.naturalHeight
      const cover = Math.max(canvas!.width / fw, canvas!.height / fh) * scale
      const dw = fw * cover
      const dh = fh * cover
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      ctx!.drawImage(img, (canvas!.width - dw) / 2, (canvas!.height - dh) / 2, dw, dh)
    }

    function progress() {
      const max = document.documentElement.scrollHeight - window.innerHeight
      return clamp((window.scrollY || window.pageYOffset || 0) / (max || 1), 0, 1)
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      vw = window.innerWidth
      vh = window.innerHeight
      canvas!.width = Math.floor(vw * dpr)
      canvas!.height = Math.floor(vh * dpr)
      canvas!.style.width = `${vw}px`
      canvas!.style.height = `${vh}px`
      lastDrawn = -1
      render(curIdx, true)
    }

    resize()
    window.addEventListener('resize', resize)

    if (reduce) {
      const tryDraw = () => {
        if (pick(STILL_INDEX)) render(STILL_INDEX, true)
        else setTimeout(tryDraw, 120)
      }
      tryDraw()
      return () => window.removeEventListener('resize', resize)
    }

    const frame = () => {
      const target = progress() * (FRAME_COUNT - 1)
      curIdx = lerp(curIdx, target, 0.2)
      if (Math.abs(target - curIdx) < 0.01) curIdx = target
      render(curIdx)
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[var(--color-night)]"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* brand grade + legibility — light so footage reads full-bleed */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(155deg,rgba(92,36,150,.18),rgba(40,15,72,.06) 50%,rgba(20,8,40,.2))',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg,rgba(8,3,18,.48) 0%,rgba(10,4,22,.1) 22%,rgba(10,4,22,.1) 70%,rgba(8,3,18,.58) 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(145% 115% at 50% 42%,transparent 64%,rgba(6,3,16,.4) 100%)',
        }}
      />
    </div>
  )
}
