/* ============================================================
   All copy & configuration for the invitation in one place.
   Edit here — every section reads from this file.
   Source of truth: the "Compiled" Google Doc (date, time, theme,
   guest palette, ceremonial participants).
   ============================================================ */

/**
 * RSVP — every RSVP button on the site points here and opens in a new tab.
 * Replace the placeholder with the real Luma event link when it is ready.
 */
export const LUMA_RSVP_URL = 'https://luma.com/675uegvs'

/** Background music — Spotify track, played from the floating Music button. */
export const MUSIC = {
  spotifyUri: 'spotify:track:2I7agwVrMsDR2IwPE89ppF',
  title: 'Misty',
} as const

export const EVENT = {
  celebrant: 'Mirea Nicole Lomeda',
  celebrantFirst: 'Mirea',
  occasion: 'Eighteenth Birthday',
  /** ISO with Manila offset — drives the countdown */
  dateISO: '2026-12-13T16:00:00+08:00',
  dateLabel: 'December 13, 2026',
  timeLabel: '4PM Onwards',
  theme:
    'The celebration features a Greek mythology-inspired theme, incorporating classical Greek imagery and symbolism.',
  venue: 'Medusa BGC',
  venueSub: 'at The Palace',
  area: 'Uptown Parade, 9th Avenue, Taguig',
  mapUrl: 'https://maps.app.goo.gl/98fjdtDGAd2LdQdk6',
} as const

export const HERO = {
  eyebrow: 'You’re invited to',
  title: 'Mirea',
  tagline: 'A Night of Myth and Magic',
  sub: `The ${EVENT.occasion} of ${EVENT.celebrant}`,
} as const

export const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'details', label: 'Details' },
  { id: 'attire', label: 'Dress Code' },
  { id: 'court', label: 'The Court' },
  { id: 'venue', label: 'Venue' },
  { id: 'rsvp', label: 'RSVP' },
] as const

export const ABOUT = {
  lines: [
    'Step into a world where legends live,\nand myths come alive.',
    'Join us for a night inspired by the gods,\nfilled with elegance, enchantment, and timeless beauty.',
  ],
  theme: EVENT.theme,
} as const

/** Guest dress colour palette — sampled from the swatch photo in the doc. */
export const DRESS_PALETTE = [
  // x = the swatch's pixel span inside /greek/dress-palette.webp (565px wide)
  { name: 'Emerald', hex: '#1a2f26', x: [4, 90] },
  { name: 'Teal', hex: '#132c3e', x: [96, 168] },
  { name: 'Midnight Navy', hex: '#09153b', x: [174, 260] },
  { name: 'Royal Purple', hex: '#210e3a', x: [268, 374] },
  { name: 'Plum', hex: '#390a39', x: [384, 494] },
  { name: 'Burgundy', hex: '#460e2d', x: [502, 562] },
] as const

/** What each group wears — shown above the colour palette. */
export const DRESS_CODE = {
  rules: [
    { who: 'Ladies', what: 'Strictly Long Dress' },
    { who: 'Gentlemen', what: 'Semi-formal Suit', detail: 'Long-sleeved Polo or Coat & Tie with Slacks' },
    { who: '18 Roses', what: 'Navy Blue Suit' },
  ],
  note: 'Shorts and denim jeans are strictly not allowed in favor of formal attire.',
  paletteNote: 'Guests may wear these dark jewel-toned colors.',
} as const

/** Reserved for the debutante's gown — guests are asked not to wear these. */
export const DRESS_AVOID = {
  colors: [
    { name: 'Caramel', hex: '#b07a45' },
    { name: 'Champagne', hex: '#e9d5b0' },
  ],
  note: 'Kindly avoid caramel and champagne — these shades are reserved for the debutante’s gown.',
} as const

/** Shown under the participant lists in The Court. */
export const COURT_NOTE = 'Participants in the 18 Roses must wear Navy Blue Suits.'

/** Ceremonial participants, in the order listed in the doc. */
export const PARTICIPANTS = [
  {
    id: 'treasures',
    label: 'Treasures',
    note: 'Kindly prepare a short message for the celebrant to share as you present her with your gift.',
    names: [
      'Beatrize Hernandez', 'Yuen Yao', 'Lexie Malibiran', 'John De Laluna', 'Ali Jned', 'Mark Hemedes',
      'Vienne Rodriguez', 'Sophi Delasallagas', 'Charlize Las', 'Rynel Baguinon', 'Reese Dinglasan',
      'Alexandra Nava', 'Andrei Capio', 'Mico Ramiscal', 'Mikee Lomeda', 'Vernadette Sibulo', 'Miss. Yna',
      'Dory Lomeda',
    ],
  },
  {
    id: 'roses',
    label: 'Roses',
    names: [
      'Martin Lomeda', 'Michael Lomeda', 'Marion Lomeda', 'Mac Lomeda', 'Miles Lu', 'Noah Mangubat',
      'Vienne Rodriguez', 'Andrei Capio', 'Richmond Sibulo', 'John Natividad', 'Damien Borlasa', 'Kurt Lopez',
      'John Delaluna', 'Mark Hemedes', 'Ali Jned', 'Yuen Yao', 'Marcus Lomeda', 'Marionito Lomeda',
    ],
  },
  {
    id: 'shots',
    label: 'Shots',
    names: [
      'Marionito Lomeda', 'Melissa Lomeda', 'Marcus Lomeda', 'Mikayla Lomeda', 'Kurt Lopez', 'Martin Lomeda',
      'Michael Lomeda', 'Beatrize Hernandez', 'Yasmin Yao', 'Elizabeth De La Luna', 'Maria Xenia', 'AJ Parafina',
      'Arlene Parafina', 'Rafaela Ferrer', 'Reign Breganza', 'Sydney Restor', 'Ali Delasllagas', 'John Delaluna',
    ],
  },
  {
    id: 'bills',
    label: 'Bills',
    names: [
      'Jonamay Lomeda', 'Av Lomeda', 'Abby Marquez', 'Janine Castillo', 'Ricky Parafina', 'Ronald Sibulo',
      'Ato Javier', 'Rasoul Amadzadeh', 'Floro Regencia', 'Joe Perfecto Delaluna', 'Joe Yao', 'Mary Ann Marquez',
      'Teresita Barrameda', 'Cherry Natividad', 'Ileng Lomeda', 'Dory Lomeda',
    ],
  },
] as const

export const FAQ = [
  {
    q: 'Is there a dress code?',
    a: 'Yes — ladies in long dresses (strictly long), gentlemen in semi-formal suits (long-sleeved polo, or coat and tie, with slacks), and the 18 Roses in navy blue suits. Shorts and denim jeans are not allowed. Guests may wear the dark jewel tones of the evening — emerald, teal, midnight navy, royal purple, plum and burgundy. Kindly avoid caramel and champagne — those are reserved for the debutante’s gown.',
  },
  {
    q: 'What is the theme?',
    a: EVENT.theme,
  },
  {
    q: 'May I bring a plus-one?',
    a: 'Seating is reserved per invitation. Plus-one details will be confirmed with your formal invite closer to the date.',
  },
  {
    q: 'How do I RSVP?',
    a: 'Tap any “RSVP” button on this page — it opens our RSVP page in a new tab.',
  },
] as const
