import { motion } from 'motion/react'
import { EVENT } from '../../data/content'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { EASE_OUT_EXPO } from '../../lib/motion'

export function Location() {
  return (
    <section
      id="location"
      className="relative px-6 py-[clamp(50px,9vh,120px)]"
      data-label="Location"
    >
      <div className="mx-auto max-w-[1080px]">
        <SectionHeading
          eyebrow="Find Your Way"
          title={EVENT.area}
          variant="serif"
          className="mb-11"
        />

        <Reveal delay={0.15}>
          <motion.a
            href={EVENT.mapUrl}
            target="_blank"
            rel="noopener"
            data-cursor
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            className="group gold-ring relative block overflow-hidden rounded-[16px] no-underline"
            style={{
              aspectRatio: '21 / 8',
              backgroundColor: 'rgba(23,10,40,.62)',
              backdropFilter: 'blur(8px)',
              backgroundImage:
                'linear-gradient(115deg,rgba(140,68,200,.22),transparent 60%),repeating-linear-gradient(0deg,rgba(230,201,143,.05) 0 1px,transparent 1px 46px),repeating-linear-gradient(90deg,rgba(230,201,143,.05) 0 1px,transparent 1px 46px)',
              boxShadow: '0 18px 44px rgba(0,0,0,.4)',
            }}
          >
            {/* sweeping light on hover */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[rgba(230,201,143,.12)] to-transparent transition-transform duration-1000 group-hover:translate-x-full"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-[14px] px-4 text-center">
              <motion.span
                className="block h-[13px] w-[13px] rotate-45 bg-gold"
                style={{ boxShadow: '0 0 16px rgba(230,201,143,.7)' }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span className="text-[12px] uppercase tracking-[0.34em] text-[#f0ddc8]" style={{ textIndent: '0.34em' }}>
                Open in Google Maps
              </span>
              <span className="text-[11px] tracking-[0.06em] text-[var(--color-orchid-dim)]">
                {EVENT.addressLine}
              </span>
            </div>
          </motion.a>
        </Reveal>
      </div>
    </section>
  )
}
