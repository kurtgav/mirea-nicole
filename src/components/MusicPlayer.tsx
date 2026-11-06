import { useEffect, useRef, useState } from 'react'
import { MUSIC } from '../data/content'
import { cn } from '../lib/cn'

/* Minimal types for the Spotify iFrame API (https://developer.spotify.com/documentation/embeds) */
type PlaybackUpdate = { data: { isPaused: boolean; position: number } }
type SpotifyController = {
  togglePlay: () => void
  loadUri: (uri: string) => void
  addListener: (event: 'ready' | 'playback_update', cb: (e: PlaybackUpdate) => void) => void
}
type SpotifyIFrameAPI = {
  createController: (
    el: HTMLElement,
    options: { uri: string; width?: number; height?: number },
    cb: (controller: SpotifyController) => void,
  ) => void
}
declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyIFrameAPI) => void
  }
}

const API_SRC = 'https://open.spotify.com/embed/iframe-api/v1'

/*
 * Browsers only let the Spotify player make sound when the tap lands *inside* it, and its
 * remote-control commands are unreliable. So an invisible copy of Spotify's own play/pause
 * button is laid exactly over our Music button: every tap is a real Spotify play/pause.
 * Measured: in a 300×80 embed the play button is the 32px circle centred at (274, 56). Scaled ×6
 * it is a 192px circle centred on our button, so it covers the whole button (largest: 148×56,
 * half-diagonal 79px < 96px) and nothing else in the player is reachable.
 */
const EMBED = { w: 300, h: 80, playCx: 274, playCy: 56 }
const SCALE = 6
// origin sits at the button's centre (left/top 50%), so this works for any button size
const OVERLAY_TRANSFORM = `translate(${-SCALE * EMBED.playCx}px, ${-SCALE * EMBED.playCy}px) scale(${SCALE})`
// how long a tap on the hidden player shows "Misty" before Spotify confirms playback
const START_GRACE_MS = 5000

// load Spotify on the first sign of a visitor (or after a few seconds), not on page open
const WAKE_EVENTS = ['pointermove', 'pointerdown', 'touchstart', 'wheel', 'scroll', 'keydown'] as const
const LOAD_AFTER_MS = 4000

/** "Music" ⇄ "Misty" — one button that plays and pauses the song; the Spotify player stays hidden. */
export function MusicPlayer() {
  const hostRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const controllerRef = useRef<SpotifyController | null>(null)
  const [ready, setReady] = useState(false)
  const [playing, setPlaying] = useState(false)
  // a tap that landed on the hidden player, before Spotify reports playback — shown instantly
  const [starting, setStarting] = useState(false)
  const on = playing || starting

  // taps inside the iframe never reach this page, but they move focus into it (window blur)
  useEffect(() => {
    const onBlur = () => {
      const el = document.activeElement
      if (el?.tagName === 'IFRAME' && overlayRef.current?.contains(el)) setStarting(true)
    }
    window.addEventListener('blur', onBlur)
    return () => window.removeEventListener('blur', onBlur)
  }, [])

  useEffect(() => {
    if (!starting) return
    const t = setTimeout(() => setStarting(false), START_GRACE_MS)
    return () => clearTimeout(t)
  }, [starting])

  useEffect(() => {
    const stop = () => {
      WAKE_EVENTS.forEach((ev) => window.removeEventListener(ev, load))
      clearTimeout(timer)
    }
    function load() {
      stop()
      const host = hostRef.current
      if (!host || document.querySelector(`script[src="${API_SRC}"]`)) return
      window.onSpotifyIframeApiReady = (api) => {
        const wrap = host.parentElement
        api.createController(host, { uri: MUSIC.spotifyUri, width: EMBED.w, height: EMBED.h }, (controller) => {
          controllerRef.current = controller
          // the hidden iframe stays out of the tab order; keyboard users get the real button
          wrap?.querySelector('iframe')?.setAttribute('tabindex', '-1')
          controller.addListener('ready', () => setReady(true))
          controller.addListener('playback_update', ({ data }) => {
            setPlaying(!data.isPaused)
            if (!data.isPaused) setStarting(false)
            // after a pause (or the preview ending) Spotify covers its play button with a
            // "Get Spotify" banner; reloading the track clears it so the next tap plays again
            if (data.isPaused && data.position > 0) controller.loadUri(MUSIC.spotifyUri)
          })
        })
      }
      const s = document.createElement('script')
      s.src = API_SRC
      s.async = true
      document.body.appendChild(s)
    }
    const timer = setTimeout(load, LOAD_AFTER_MS)
    WAKE_EVENTS.forEach((ev) => window.addEventListener(ev, load, { passive: true }))
    return stop
  }, [])

  return (
    <div className="fixed bottom-[calc(clamp(16px,3vw,28px)+env(safe-area-inset-bottom))] right-[calc(clamp(16px,3vw,28px)+env(safe-area-inset-right))] z-50 h-14 w-[148px] transition-[translate] duration-300 ease-out hover:-translate-y-0.5 sm:h-12 sm:w-[132px]">
      {/* what visitors see. Pausing goes through here (remote pause is reliable); keyboard
          users also start playback here via Spotify's remote control */}
      <button
        type="button"
        onClick={() => controllerRef.current?.togglePlay()}
        aria-pressed={on}
        aria-label={on ? `Pause music (${MUSIC.title})` : 'Play music'}
        className="frame-notch caps flex size-full cursor-pointer touch-manipulation select-none items-center justify-center gap-3 bg-[rgba(5,7,22,.78)] px-4 text-[11px] text-gold-light backdrop-blur-sm transition-[scale,background-color] duration-200 ease-out [-webkit-tap-highlight-color:transparent] hover:bg-[rgba(5,7,22,.9)] active:scale-[0.96] sm:text-[10px]"
      >
        <span aria-hidden className="flex h-4 items-end gap-[3px] sm:h-3.5">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={cn('eq-bar w-[2px] rounded-full bg-gold', on && 'is-playing')}
              style={{ animationDelay: `${i * -0.27}s` }}
            />
          ))}
        </span>
        <span className="whitespace-nowrap">{on ? MUSIC.title : 'Music'}</span>
      </button>

      {/* invisible Spotify play button laid over ours; catches mouse and touch taps to start only */}
      <div
        ref={overlayRef}
        aria-hidden
        className={cn('absolute inset-0 overflow-hidden opacity-0', (!ready || on) && 'pointer-events-none')}
      >
        <div
          tabIndex={-1}
          className="absolute left-1/2 top-1/2 origin-top-left"
          style={{ width: EMBED.w, height: EMBED.h, transform: OVERLAY_TRANSFORM }}
        >
          <div ref={hostRef} />
        </div>
      </div>
    </div>
  )
}
