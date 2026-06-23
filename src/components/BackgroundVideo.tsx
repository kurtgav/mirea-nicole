import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../lib/prefersReducedMotion'

/** Only this many seconds of the footage are mapped across the whole page. */
const VID_END = 15.5
/** Frame shown to reduced-motion users (no scrubbing). */
const STILL_FRAME = 4

/**
 * Full-screen scroll-scrubbed footage. Page scroll position (0 → 1) maps
 * directly onto video time (0 → VID_END): scroll down advances the playhead,
 * scroll up rewinds it, and when scrolling stops the frame holds. A short rAF
 * lerp keeps the scrub buttery in both directions. If the host can't serve
 * byte-range requests (seeking dead), it falls back to scroll-driven forward
 * play. A gentle scale adds parallax depth.
 */
export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const video = videoRef.current
    const wrap = wrapRef.current
    if (!video || !wrap) return
    const reduce = prefersReducedMotion()

    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    let dur = 0
    let ready = false
    let curr = 0
    let raf = 0
    let seekMode = true
    let probed = false
    let probeTimer = 0

    video.muted = true
    video.defaultMuted = true
    video.loop = false

    // One-time, deterministic seek-capability probe. If the host serves
    // byte-range requests, seeking works → exact scrub. If a `seeked` event
    // never arrives, the host can't seek → drop to forward-play fallback.
    const probeSeek = () => {
      if (probed) return
      probed = true
      let ok = false
      const onSeeked = () => {
        ok = true
      }
      video.addEventListener('seeked', onSeeked, { once: true })
      try {
        video.currentTime = 0.25
      } catch {
        /* ignore */
      }
      probeTimer = window.setTimeout(() => {
        video.removeEventListener('seeked', onSeeked)
        if (!ok) seekMode = false
      }, 1500)
    }

    const onMeta = () => {
      if (video.duration && isFinite(video.duration) && video.duration > 0) {
        dur = video.duration
        ready = true
        probeSeek()
      }
    }
    video.addEventListener('loadedmetadata', onMeta)
    video.addEventListener('canplay', onMeta)
    if (video.readyState >= 1) onMeta()

    // ---------- reduced motion: hold one still frame, no scrubbing ----------
    if (reduce) {
      const hold = () => {
        try {
          video.currentTime = STILL_FRAME
        } catch {
          /* ignore */
        }
        video.pause()
      }
      if (video.readyState >= 2) hold()
      else video.addEventListener('loadeddata', hold, { once: true })
      return () => {
        video.removeEventListener('loadedmetadata', onMeta)
        video.removeEventListener('canplay', onMeta)
      }
    }

    // prime playback permission so the forward-play fallback can run if needed
    try {
      const pr = video.play()
      if (pr && typeof pr.then === 'function') pr.then(() => video.pause()).catch(() => {})
    } catch {
      /* ignore */
    }

    const progress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      return clamp((window.scrollY || window.pageYOffset || 0) / (max || 1), 0, 1)
    }

    const frame = () => {
      const p = progress()
      wrap.style.setProperty('--vscale', (1.05 + p * 0.1).toFixed(3))

      if (ready) {
        const end = Math.min(VID_END, dur)
        const tgt = clamp(p * end, 0, end)

        if (seekMode) {
          // accurate position scrub via seeking — works both forward and back
          curr = lerp(curr, tgt, 0.22)
          if (video.readyState >= 2 && Math.abs(curr - video.currentTime) > 0.012) {
            try {
              video.currentTime = curr
            } catch {
              /* ignore */
            }
          }
        } else {
          // fallback (host without byte-range seeking): scroll speed drives
          // forward playback; jump back on rewind
          const ct = video.currentTime
          const gap = tgt - ct
          if (gap > 0.05 && ct < end - 0.03) {
            if (video.paused) {
              const pr = video.play()
              if (pr && typeof pr.catch === 'function') pr.catch(() => {})
            }
            video.playbackRate = clamp(gap * 2.4, 0.6, 6)
          } else {
            if (!video.paused) video.pause()
            if (gap < -0.25) {
              try {
                video.currentTime = tgt
              } catch {
                /* ignore */
              }
            }
          }
        }
      }
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(probeTimer)
      video.removeEventListener('loadedmetadata', onMeta)
      video.removeEventListener('canplay', onMeta)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[var(--color-night)]"
      style={{ ['--vscale' as string]: '1.05' }}
    >
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ transform: 'scale(var(--vscale))', transformOrigin: 'center center' }}
      >
        <source src="/media/invite.mp4" type="video/mp4" />
      </video>

      {/* brand grade + legibility — kept light so footage reads full-bleed,
          with only gentle darkening at the very top/bottom for nav + footer text */}
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
