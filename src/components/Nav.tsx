import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { EVENT, NAV_LINKS } from '../data/content'
import { scrollToId, startScroll, stopScroll } from '../lib/smoothScroll'
import { useScrollSpy } from '../lib/useScrollSpy'
import { EASE_OUT_EXPO } from '../lib/motion'
import { cn } from '../lib/cn'
import { Ornament } from './ui/Layer'

const SPY_IDS = ['top', ...NAV_LINKS.map((l) => l.id)] as const

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useScrollSpy(SPY_IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
      <motion.header
        className={cn(
          'fixed inset-x-0 top-0 z-[60] transition-[background-color,backdrop-filter] duration-500',
          scrolled && !open ? 'bg-[rgba(7,10,28,.62)] backdrop-blur-md' : 'bg-transparent',
        )}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.2 }}
      >
        <nav
          aria-label="Main"
          className="mx-auto flex h-[clamp(60px,8vw,76px)] max-w-[1320px] items-center justify-between gap-6 px-[clamp(20px,4vw,48px)]"
        >
          <button
            type="button"
            onClick={() => go('top')}
            className="caps cursor-pointer whitespace-nowrap bg-transparent p-0 text-[15px] tracking-[0.24em] text-ivory"
            aria-label="Mirea Nicole — back to top"
          >
            Mirea Nicole
          </button>

          <ul className="m-0 hidden list-none items-center gap-[clamp(20px,3vw,48px)] p-0 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <button
                  type="button"
                  onClick={() => go(link.id)}
                  aria-current={active === link.id ? 'true' : undefined}
                  className={cn(
                    'caps relative cursor-pointer bg-transparent px-0 py-2 text-[12px] transition-colors duration-300',
                    active === link.id ? 'text-gold-light' : 'text-ivory/80 hover:text-gold-light',
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      'absolute -bottom-0.5 left-1/2 h-px -translate-x-1/2 bg-gold transition-all duration-500',
                      active === link.id ? 'w-full opacity-80' : 'w-0 opacity-0',
                    )}
                  />
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => go('top')}
            aria-label="Back to top"
            className="hidden cursor-pointer bg-transparent p-1 opacity-90 transition-[opacity,transform] duration-500 hover:rotate-[-8deg] hover:opacity-100 lg:block"
          >
            <Ornament name="wreath-gold" className="w-[38px]" />
          </button>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="frame flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-[6px] bg-[rgba(9,14,40,.45)] lg:hidden"
          >
            <motion.span
              className="block h-px w-5 bg-gold-light"
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
            />
            <motion.span className="block h-px w-5 bg-gold-light" animate={{ opacity: open ? 0 : 1 }} />
            <motion.span
              className="block h-px w-5 bg-gold-light"
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
            />
          </button>
        </nav>
        <div className="hairline mx-auto max-w-[1240px] opacity-60" />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[50] flex flex-col items-center justify-center gap-[clamp(10px,2.6vh,22px)] px-6 lg:hidden"
            style={{ background: 'rgba(7,10,28,.94)', backdropFilter: 'blur(18px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
          >
            <Ornament name="wreath-sm" className="mb-2 w-[92px]" />
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.id}
                type="button"
                onClick={() => go(link.id)}
                className={cn(
                  'cursor-pointer bg-transparent font-display text-[clamp(24px,7vw,36px)] uppercase tracking-[0.12em]',
                  active === link.id ? 'text-gold-light' : 'text-ivory',
                )}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.55, ease: EASE_OUT_EXPO, delay: 0.1 + i * 0.06 }}
              >
                {link.label}
              </motion.button>
            ))}
            <p className="caps mt-4 text-[11px] text-gold">
              {EVENT.dateLabel} · {EVENT.timeLabel}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
