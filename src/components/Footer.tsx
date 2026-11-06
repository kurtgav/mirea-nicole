import { EVENT, NAV_LINKS } from '../data/content'
import { scrollToId } from '../lib/smoothScroll'
import { Ornament } from './ui/Layer'
import { RsvpButton } from './ui/RsvpButton'
import { GmailLogo, ViberLogo, WhatsAppLogo } from './ui/BrandIcons'

const CONTACT = {
  email: 'kurtgavin.design@gmail.com',
  phone: '+63 962 916 5786',
  phoneDigits: '639629165786',
} as const

const CONTACT_LINK =
  'inline-flex items-center gap-2 rounded-sm p-1 font-[system-ui,sans-serif] text-[14px] tracking-[0.02em] no-underline transition-[color,transform] duration-300 hover:-translate-y-px hover:text-gold-light'

export function Footer() {
  return (
    <footer className="relative z-10 bg-[rgba(5,7,22,.72)] px-6 pb-10 pt-16 text-center backdrop-blur-sm">
      <div className="hairline absolute inset-x-0 top-0" />
      <Ornament name="wreath-gold" className="mx-auto w-[86px]" />
      <p className="marble-text m-0 mt-4 font-display text-[clamp(36px,5vw,52px)] tracking-[0.18em]" style={{ textIndent: '0.18em' }}>
        MIREA
      </p>
      <p className="m-0 mt-2 text-[19px] italic text-ivory/80">
        The {EVENT.occasion} of {EVENT.celebrant}
      </p>
      <p className="caps m-0 mt-3 text-[11px] text-gold-light/85">
        {EVENT.dateLabel} · {EVENT.timeLabel} · {EVENT.venue}
      </p>

      <nav aria-label="Footer" className="mt-9">
        <ul className="m-0 flex list-none flex-wrap justify-center gap-x-7 gap-y-3 p-0">
          {NAV_LINKS.map((l) => (
            <li key={l.id}>
              <button
                type="button"
                onClick={() => scrollToId(l.id)}
                className="caps cursor-pointer bg-transparent p-1 text-[11px] text-ivory/70 transition-colors hover:text-gold-light"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-9 flex justify-center">
        <RsvpButton size="sm" />
      </div>

      <Ornament name="divider-grand" className="mx-auto mt-12 w-[min(340px,80vw)] opacity-80" />
      <p className="m-0 mt-5 text-[15px] italic text-ivory/45">With love, from Olympus · MMXXVI</p>

      {/* designer credit / contact */}
      <div className="mx-auto mt-10 max-w-[560px] border-t border-gold/15 pt-7">
        <p className="caps m-0 text-[11px] text-gold-light/80">Do you need a website?</p>
        <ul className="m-0 mt-4 flex list-none flex-wrap items-center justify-center gap-x-6 gap-y-3 p-0 text-[15px] text-ivory/80">
          <li>
            <a href={`mailto:${CONTACT.email}`} className={CONTACT_LINK}>
              <GmailLogo className="h-[15px] w-[20px]" />
              <span className="sr-only">Email:</span>
              {CONTACT.email}
            </a>
          </li>
          <li className="flex items-center gap-2">
            <a href={`https://wa.me/${CONTACT.phoneDigits}`} target="_blank" rel="noopener noreferrer" className={CONTACT_LINK}>
              <WhatsAppLogo className="h-[20px] w-[20px]" />
              <span className="sr-only">WhatsApp (opens in a new tab)</span>
            </a>
            <a href={`viber://chat?number=%2B${CONTACT.phoneDigits}`} className={CONTACT_LINK}>
              <ViberLogo className="h-[20px] w-[20px]" />
              <span className="sr-only">Viber</span>
            </a>
            <a href={`tel:+${CONTACT.phoneDigits}`} className={CONTACT_LINK}>
              {CONTACT.phone}
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
