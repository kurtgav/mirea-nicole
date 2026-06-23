/* ============================================================
   All copy & configuration for the invitation in one place.
   Edit here — every section reads from this file.
   ============================================================ */

export const EVENT = {
  celebrant: 'Mirea Nicole Lomeda',
  celebrantFirst: 'Mirea Nicole',
  celebrantLast: 'Lomeda',
  occasion: 'eighteenth birthday',
  /** ISO with Manila offset — drives the countdown */
  dateISO: '2026-12-06T16:00:00+08:00',
  dateLabel: 'December 6, 2026',
  dateLong: 'December 6',
  yearWords: 'Two Thousand & Twenty-Six',
  timeLabel: '4 PM — Late Night',
  timeLong: '4:00 in the Afternoon',
  timeSub: 'until late into the night',
  venue: 'Medusa BGC',
  venueSub: 'at The Palace, Manila',
  area: 'Uptown Parade, Taguig',
  addressLine: 'Medusa · The Palace · Uptown Parade, 9th Ave, Taguig',
  mapUrl: 'https://maps.app.goo.gl/98fjdtDGAd2LdQdk6',
  monogram: 'Mirea · XVIII',
} as const

export const HERO = {
  eyebrow: 'You are cordially invited to the eighteenth birthday of',
  intro:
    'An evening of grace and celebration as Mirea steps into her eighteenth year — fine company, music, and timeless elegance await.',
  cta: 'Save the Date',
  meta: [EVENT.dateLabel, EVENT.timeLabel, 'Medusa BGC · The Palace'],
} as const

export const NAV_LINKS = [
  { id: 'celebration', label: 'Celebration' },
  { id: 'eighteen', label: 'The Eighteen' },
  { id: 'timeline', label: 'Programme' },
  { id: 'location', label: 'Location' },
  { id: 'rsvp', label: 'RSVP' },
] as const

export const DETAILS = [
  {
    kicker: 'The Date',
    headline: EVENT.dateLong,
    sub: EVENT.yearWords,
  },
  {
    kicker: 'The Hour',
    headline: EVENT.timeLong,
    sub: EVENT.timeSub,
  },
  {
    kicker: 'The Venue',
    headline: EVENT.venue,
    sub: EVENT.venueSub,
  },
] as const

export const EIGHTEEN = [
  { label: 'Roses', note: 'Names announced soon' },
  { label: 'Treasures', note: 'Names announced soon' },
  { label: 'Blue Bills', note: 'Names announced soon' },
  { label: 'Wishes', note: 'Names announced soon' },
] as const

export const TIMELINE = [
  {
    time: '4:00 PM',
    title: 'Guest Arrival & Cocktails',
    desc: 'Welcome drinks and portraits as guests are received and seated.',
  },
  {
    time: '5:00 PM',
    title: 'The Grand Entrance',
    desc: 'Mirea makes her debut as the celebrant of the evening.',
  },
  {
    time: '5:30 PM',
    title: 'Dinner is Served',
    desc: 'A plated feast to open the celebration in good company.',
  },
  {
    time: '7:00 PM',
    title: 'The Eighteen',
    desc: 'Roses, candles and treasures presented in Mirea’s honour.',
  },
  {
    time: '8:30 PM',
    title: 'Cake & Toast',
    desc: 'A sweet pause and a heartfelt toast to the celebrant.',
  },
  {
    time: '9:00 PM — Late',
    title: 'Dancing till Late Night',
    desc: 'Music, dancing and celebration into the early hours.',
  },
] as const

export const FAQ = [
  {
    q: 'Is there a dress code?',
    a: 'A formal palette and attire will be revealed in the coming weeks — kindly watch this space for the full details.',
  },
  {
    q: 'May I bring a plus-one?',
    a: 'Seating is reserved per invitation. Plus-one details will be confirmed with your formal invite closer to the date.',
  },
  {
    q: 'Where exactly is the venue?',
    a: 'Medusa at The Palace, Uptown Parade, 9th Avenue, Taguig. Tap the map below to open directions in Google Maps.',
  },
] as const

export const REMINDERS = [
  'Kindly keep the evening of December 6, 2026 free — the celebration runs from late afternoon into the night.',
  'A formal invitation with the full programme, dress code and reply details will follow in the coming months.',
  'Please arrive a little before the programme begins so you do not miss The Grand Entrance.',
] as const

export const RSVP = {
  headline: 'More details & RSVP\nto follow soon',
  body:
    'Kindly keep the date. A formal invitation with full program, dress code, and reply details will be shared in the coming months.',
} as const
