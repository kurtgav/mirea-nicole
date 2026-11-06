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
 * Measured: in a 300×80 embed the play button is the 32×32 box at (258, 40). Scaled ×4 it is
 * 128px — larger than our 112×44 button in every direction — so nothing else is reachable.
 */
const EMBED = { w: 300, h: 80, playCx: 274, playCy: 56 }
const BTN = { w: 112, h: 44 }
const SCALE = 4
const OVERLAY_TRANSFORM = `translate(${BTN.w / 2 - SCALE * EMBED.playCx}px, ${BTN.h / 2 - SCALE * EMBED.playCy}px) scale(${SCALE})`

// load Spotify on the first sign of a visitor (or after a few seconds), not on page open
const WAKE_EVENTS = ['pointermove', 'pointerdown', 'touchstart', 'wheel', 'scroll', 'keydown'] as const
const LOAD_AFTER_MS = 4000

/** "Music" ⇄ "Misty" — one button that plays and pauses the song; the Spotify player stays hidden. */
export function MusicPlayer() {
  const hostRef = useRef<HTMLDivElement>(null)
  const controllerRef = useRef<SpotifyController | null>(null)
  const [ready, setReady] = useState(false)
  const [playing, setPlaying] = useState(false)

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
    <div
      className="fixed bottom-[clamp(16px,3vw,28px)] right-[clamp(16px,3vw,28px)] z-50 transition-[translate] duration-500 hover:-translate-y-0.5"
      style={{ width: BTN.w, height: BTN.h }}
    >
      {/* what visitors see. Pausing goes through here (remote pause is reliable); keyboard
          users also start playback here via Spotify's remote control */}
      <button
        type="button"
        onClick={() => controllerRef.current?.togglePlay()}
        aria-pressed={playing}
        aria-label={playing ? `Pause music (${MUSIC.title})` : 'Play music'}
        className="frame-notch caps flex size-full cursor-pointer items-center justify-center gap-3 bg-[rgba(5,7,22,.78)] px-4 text-[10px] text-gold-light backdrop-blur-sm"
      >
        <span aria-hidden className="flex h-3.5 items-end gap-[3px]">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={cn('eq-bar w-[2px] rounded-full bg-gold', playing && 'is-playing')}
              style={{ animationDelay: `${i * -0.27}s` }}
            />
          ))}
        </span>
        <span className="whitespace-nowrap">{playing ? MUSIC.title : 'Music'}</span>
      </button>

      {/* invisible Spotify play button laid over ours; catches mouse and touch taps to start only */}
      <div
        aria-hidden
        className={cn('absolute inset-0 overflow-hidden opacity-0', (!ready || playing) && 'pointer-events-none')}
      >
        <div
          tabIndex={-1}
          className="absolute left-0 top-0 origin-top-left"
          style={{ width: EMBED.w, height: EMBED.h, transform: OVERLAY_TRANSFORM }}
        >
          <div ref={hostRef} />
        </div>
      </div>
    </div>
  )
}
