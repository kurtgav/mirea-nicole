import { useEffect, useRef, useState } from 'react'
import { MUSIC } from '../data/content'
import { cn } from '../lib/cn'

/* Minimal types for the Spotify iFrame API (https://developer.spotify.com/documentation/embeds) */
type PlaybackUpdate = { data: { isPaused: boolean; isBuffering: boolean; position: number } }
type SpotifyController = {
  togglePlay: () => void
  addListener: (event: 'ready' | 'playback_update', cb: (e: PlaybackUpdate) => void) => void
}
type SpotifyIFrameAPI = {
  createController: (
    el: HTMLElement,
    options: { uri: string; width?: number | string; height?: number | string },
    cb: (controller: SpotifyController) => void,
  ) => void
}
declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyIFrameAPI) => void
  }
}

const API_SRC = 'https://open.spotify.com/embed/iframe-api/v1'
// the embed often ignores its first play command; retry once if nothing has started by then
const RETRY_MS = 1200

/**
 * Background music: a single button. "Music" → click → plays and reads "Misty";
 * click again → pauses and reads "Music". The Spotify player stays hidden.
 */
export function MusicPlayer() {
  const hostRef = useRef<HTMLDivElement>(null)
  const controllerRef = useRef<SpotifyController | null>(null)
  const state = useRef({ playing: false, buffering: false, moved: false })
  const [ready, setReady] = useState(false)
  const [playing, setPlaying] = useState(false)

  // load the API once and build the (hidden) controller
  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    window.onSpotifyIframeApiReady = (api) => {
      api.createController(host, { uri: MUSIC.spotifyUri, width: 300, height: 80 }, (controller) => {
        controllerRef.current = controller
        controller.addListener('ready', () => setReady(true))
        controller.addListener('playback_update', ({ data }) => {
          state.current = { playing: !data.isPaused, buffering: data.isBuffering, moved: data.position > 0 }
          setPlaying(!data.isPaused)
        })
      })
    }
    if (!document.querySelector(`script[src="${API_SRC}"]`)) {
      const s = document.createElement('script')
      s.src = API_SRC
      s.async = true
      document.body.appendChild(s)
    }
  }, [])

  // first touch anywhere else on the page: start the music where the browser allows it, otherwise
  // this "spends" the command the embed ignores, so the button's first click plays
  useEffect(() => {
    if (!ready) return
    const events = ['pointerdown', 'keydown', 'touchend'] as const
    const stop = () => events.forEach((ev) => window.removeEventListener(ev, first))
    const first = (e: Event) => {
      if ((e.target as Element | null)?.closest?.('[data-music]')) return
      stop()
      if (!state.current.playing) controllerRef.current?.togglePlay()
    }
    events.forEach((ev) => window.addEventListener(ev, first, { passive: true }))
    return stop
  }, [ready])

  const toggle = () => {
    const c = controllerRef.current
    if (!c) return
    if (state.current.playing) {
      c.togglePlay() // pause
      return
    }
    c.togglePlay() // play
    setTimeout(() => {
      const s = state.current
      if (!s.playing && !s.buffering && !s.moved) c.togglePlay()
    }, RETRY_MS)
  }

  return (
    <>
      {/* hidden Spotify player — the audio lives here; never visible, never focusable */}
      <div aria-hidden inert className="pointer-events-none fixed bottom-0 left-0 -z-10 h-[80px] w-[300px] opacity-0">
        <div ref={hostRef} />
      </div>

      <button
        type="button"
        data-music
        onClick={toggle}
        disabled={!ready}
        aria-pressed={playing}
        aria-label={playing ? `Pause music (${MUSIC.title})` : 'Play music'}
        className={cn(
          'frame-notch caps fixed bottom-[clamp(16px,3vw,28px)] right-[clamp(16px,3vw,28px)] z-50 flex h-11 min-w-[112px] cursor-pointer items-center justify-center gap-3 bg-[rgba(5,7,22,.78)] px-4 text-[10px] text-gold-light backdrop-blur-sm transition-[opacity,translate,scale] duration-500 hover:-translate-y-0.5 active:scale-[0.97]',
          ready ? 'opacity-100' : 'opacity-0',
        )}
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
        <span>{playing ? MUSIC.title : 'Music'}</span>
      </button>
    </>
  )
}
