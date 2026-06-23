import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { EVENT, NAV_LINKS } from '../data/content'
import { scrollToId, startScroll, stopScroll } from '../lib/smoothScroll'
import { useScrollSpy } from '../lib/useScrollSpy'
import { EASE_OUT_EXPO } from '../lib/motion'
import { cn } from '../lib/cn'

const SPY_IDS = ['top', ...NAV_LINKS.map((l) => l.id)] as const

export function Nav() {
  const [open, setOpen] = useState(false)
  const active = useScrollSpy(SPY_IDS)

  useEffect(() => {
    if (open) stopScroll()
    else startScroll()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    // allow the overlay to begin closing before scrolling
    setTimeout(() => scrollToId(id), 60)
  }

  return (
    <>
      <motion.nav
        className="fixed inset-x-0 top-0 z-[60] flex items-center justify-between gap-4 px-[clamp(20px,5vw,40px)] py-[clamp(16px,4vw,24px)]"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.2 }}
      >
        <button
          type="button"
          onClick={() => go('top')}
          data-cursor
          className="bg-transparent text-[clamp(13px,3.6vw,15px)] font-light uppercase tracking-[0.34em] text-[#f3e6cf]"
          style={{ textShadow: '0 1px 14px rgba(0,0,0,.6)' }}
        >
          Mirea <span className="text-gold">·</span> XVIII
        </button>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          data-cursor
          className="flex h-[46px] w-[46px] flex-col items-center justify-center gap-[6px] rounded-[11px] border border-[rgba(230,201,143,.3)] bg-[rgba(20,8,40,.32)] backdrop-blur-md"
        >
          <motion.span
            className="block h-[1.6px] w-[22px] rounded bg-gold"
            animate={open ? { rotate: 45, y: 7.6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
          />
          <motion.span
            className="block h-[1.6px] w-[22px] rounded bg-gold"
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block h-[1.6px] w-[22px] rounded bg-gold"
            animate={open ? { rotate: -45, y: -7.6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
          />
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[50] flex flex-col items-center justify-center gap-[clamp(14px,3.4vh,26px)]"
            style={{ background: 'rgba(8,3,18,.92)', backdropFilter: 'blur(18px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          >
            <motion.span
              className="mb-1 block h-[7px] w-[7px] rotate-45 bg-gold"
              style={{ boxShadow: '0 0 12px rgba(230,201,143,.6)' }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15 }}
            />
            {NAV_LINKS.map((link, i) => {
              const isActive = active === link.id
              return (
                <motion.button
                  key={link.id}
                  type="button"
                  onClick={() => go(link.id)}
                  data-cursor
                  className={cn(
                    'group relative bg-transparent font-serif text-[clamp(30px,8.5vw,52px)] tracking-[0.02em] transition-colors',
                    isActive ? 'text-gold' : 'text-[#f4e7d4] hover:text-gold',
                  )}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.18 + i * 0.07 }}
                >
                  {link.label}
                  <span
                    className={cn(
                      'absolute -bottom-1 left-1/2 h-px -translate-x-1/2 bg-gold transition-all duration-500',
                      isActive ? 'w-2/3 opacity-90' : 'w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-70',
                    )}
                  />
                </motion.button>
              )
            })}
            <motion.p
              className="mt-3 text-[11px] uppercase tracking-eyebrow text-[var(--color-orchid-dim)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {EVENT.dateLabel}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
