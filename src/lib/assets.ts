/**
 * Transparent layers cut from the Greek asset pack (public/greek/*.webp).
 * Intrinsic sizes are listed so every <img> reserves its box (no layout shift).
 */
export const ASSET_SIZES = {
  'column-ivy': [180, 480],
  'cloud-lg': [458, 194],
  'cloud-md': [255, 76],
  'cloud-sm': [182, 77],
  'cloud-wide': [419, 124],
  drape: [280, 163],
  'ivy-left': [224, 179],
  'ivy-right': [240, 326],
  arch: [257, 216],
  'wreath-lg': [198, 148],
  'wreath-sm': [151, 108],
  'wreath-gold': [177, 124],
  'laurel-branch': [67, 185],
  'star-4pt': [101, 141],
  'star-sm': [24, 65],
  sunburst: [128, 131],
  'divider-star': [348, 26],
  'divider-ornate': [311, 38],
  'divider-diamond': [321, 27],
  'divider-short': [179, 24],
  'banner-green': [108, 253],
  'banner-purple': [106, 253],
  capital: [74, 69],
  // packs 4 & 5
  'bust-lg': [488, 542],
  'temple-clouds': [626, 440],
  parthenon: [648, 384],
  'goddess-lg': [433, 527],
  'goddess-pedestal': [379, 515],
  'column-plain': [214, 434],
  'column-ivy-lg': [292, 456],
  acropolis: [645, 206],
  'acropolis-b': [638, 182],
  'cloud-xl': [478, 182],
  'cloud-puff': [223, 135],
  'cloud-curl': [287, 111],
  moon: [86, 87],
  'star-8pt': [89, 90],
  'star-lg': [130, 138],
  'wreath-green': [189, 165],
  'divider-grand': [459, 76],
} as const

export type AssetName = keyof typeof ASSET_SIZES

export const assetUrl = (name: AssetName) => `/greek/${name}.webp`
