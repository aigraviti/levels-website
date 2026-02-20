export type LevelNum = 1 | 2 | 3 | 4 | 5

export type Event = {
  id: string
  title: string
  date: string
  city: string
  venue: string
  address: string | null
  capacity: number
  registered_count: number
  status: 'upcoming' | 'sold_out' | 'completed'
  price_standard: number
  price_vip: number
  description: string | null
  created_at: string
}

export type Product = {
  id: string
  name: string
  description: string | null
  category: 'backpack' | 'patch' | 'clothing' | 'footwear'
  level_association: number | null
  price: number
  in_stock: boolean
  stock_count: number
  size_options: string[] | null
  colour_hex: string | null
  featured: boolean
  image_url: string | null
  created_at: string
}

export type RecoveryProduct = {
  id: string
  name: string
  sponsor_brand: string
  description: string | null
  retail_value: number
  category: 'nutrition' | 'recovery' | 'tech' | 'apparel' | 'wellness'
  is_available: boolean
  tagline: string | null
  created_at: string
}

export type Registration = {
  event_id: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  ticket_type: 'standard' | 'vip'
}

export type EmailCapture = {
  email: string
  first_name?: string
  last_name?: string
  city_interest?: string
  current_level?: number
}

export const LEVEL_DATA = [
  {
    num: '01', numInt: 1, name: 'Foundation', color: '#2EC4B6',
    bg: 'rgba(46,196,182,0.08)', border: 'rgba(46,196,182,0.25)',
    desc: 'Accessible to anyone with 3+ months of regular gym attendance. Light loads, moderate pace, confidence builder.',
    stats: '3 Stations · ~8 min · 95% Pass Rate',
    passRate: 95,
  },
  {
    num: '02', numInt: 2, name: 'Build', color: '#457B9D',
    bg: 'rgba(69,123,157,0.08)', border: 'rgba(69,123,157,0.25)',
    desc: 'Increased loads, pace requirements, and movement complexity. Regular gym-goers find their rhythm here.',
    stats: '3 Stations · ~10 min · 80% Pass Rate',
    passRate: 80,
  },
  {
    num: '03', numInt: 3, name: 'Surge', color: '#FFB703',
    bg: 'rgba(255,183,3,0.08)', border: 'rgba(255,183,3,0.25)',
    desc: 'Genuinely challenging. Heavier sled pushes, faster intervals, demanding combinations. Time caps introduced.',
    stats: '4 Stations · ~12 min · 55% Pass Rate',
    passRate: 55,
  },
  {
    num: '04', numInt: 4, name: 'Elite', color: '#E63946',
    bg: 'rgba(230,57,70,0.08)', border: 'rgba(230,57,70,0.25)',
    desc: 'Competition-grade intensity. Heavy loads, sustained output, technical efficiency required. Top 15% territory.',
    stats: '4 Stations · ~14 min · 25% Pass Rate',
    passRate: 25,
  },
  {
    num: '05', numInt: 5, name: 'Apex', color: '#8338EC',
    bg: 'rgba(131,56,236,0.08)', border: 'rgba(131,56,236,0.25)',
    desc: 'The summit. Extreme physical demands designed for elite athletes. Only a fraction will ever reach this level.',
    stats: '4 Stations · ~15 min · 5–8% Pass Rate',
    passRate: 6,
  },
]

export function getLevelColor(level: number | null): string {
  if (!level) return '#606070'
  const colors: Record<number, string> = {
    1: '#2EC4B6', 2: '#457B9D', 3: '#FFB703', 4: '#E63946', 5: '#8338EC'
  }
  return colors[level] ?? '#606070'
}

export function formatNZD(cents: number): string {
  return `NZ$${(cents / 100).toFixed(0)}`
}

export function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('en-NZ', {
    weekday: 'short', day: 'numeric', month: 'long', year: 'numeric',
    timeZone: 'Pacific/Auckland',
  }).format(new Date(dateStr))
}

export function formatTime(dateStr: string): string {
  return new Intl.DateTimeFormat('en-NZ', {
    hour: 'numeric', minute: '2-digit', hour12: true,
    timeZone: 'Pacific/Auckland',
  }).format(new Date(dateStr))
}
