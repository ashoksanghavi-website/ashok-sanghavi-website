// Single Lucide icon set for the whole site. All icons share one stroke width
// and are colored via currentColor (brand gold/emerald). Same `name` API as
// before, so every existing call site keeps working.
import {
  Phone, Mail, MapPin,
  ArrowRight, ArrowUpRight, ArrowLeft, ChevronRight, Check,
  TrendingUp, Sunrise, ShieldCheck, Landmark, Lock, Building2, Users, HeartHandshake,
  CalendarDays, Calculator, Play, BookOpen, FileText, Quote, Star, Award, Scale,
  Handshake, Briefcase, Coins, Umbrella, Clock, Send, Sparkles, Home,
  Compass, Target, Gem, LineChart, GraduationCap, PiggyBank, Receipt, Percent,
  X, Cookie, SlidersHorizontal,
} from 'lucide-react'

// Brand marks are not part of Lucide (removed upstream). Render them as stroke
// glyphs at the same weight as the Lucide set so they sit consistently.
const brand = {
  facebook: 'M14 9h2V6h-2c-1.7 0-3 1.3-3 3v2H9v3h2v6h3v-6h2.2l.8-3H14v-2c0-.6.4-1 1-1z',
  linkedin: 'M7 10v7M7 7v.01M11 10v7m0-4a2 2 0 014 0v4M4 4h16v16H4z',
  instagram: 'M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm5 5.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zM17 6.5h.01',
  youtube: 'M3 8.5c0-1 .8-1.8 1.8-1.9C7 6.4 9.4 6.3 12 6.3s5 .1 7.2.3c1 .1 1.8.9 1.8 1.9V15.5c0 1-.8 1.8-1.8 1.9-2.2.2-4.6.3-7.2.3s-5-.1-7.2-.3A1.9 1.9 0 013 15.5V8.5zM10.5 9.8v4.4l4-2.2-4-2.2z',
}

const map = {
  // contact
  phone: Phone, mail: Mail, pin: MapPin,
  // ui
  arrow: ArrowRight, arrowUpRight: ArrowUpRight, arrowLeft: ArrowLeft,
  chevronRight: ChevronRight, check: Check, home: Home, send: Send, sparkles: Sparkles,
  close: X, cookie: Cookie, settings: SlidersHorizontal,
  // services / concepts
  growth: TrendingUp, sun: Sunrise, shield: ShieldCheck, legacy: Landmark,
  lock: Lock, building: Building2, people: Users, heart: HeartHandshake,
  calendar: CalendarDays, calculator: Calculator, play: Play, book: BookOpen,
  file: FileText, quote: Quote, star: Star, award: Award, scale: Scale,
  handshake: Handshake, briefcase: Briefcase, coins: Coins, umbrella: Umbrella,
  clock: Clock, compass: Compass, target: Target, gem: Gem, chart: LineChart,
  graduation: GraduationCap, piggy: PiggyBank, receipt: Receipt, percent: Percent,
}

export default function Icon({ name, className = '', size = 24, strokeWidth = 1.6, ...rest }) {
  // Authentic LinkedIn brand mark — a LinkedIn-blue rounded square with the
  // white "in" wordmark. Self-coloured (ignores currentColor) so it reads as
  // the real logo.
  if (name === 'linkedin') {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...rest}>
        <circle cx="12" cy="12" r="12" fill="#0A66C2" />
        <path
          fill="#fff"
          d="M8 10H5.6v8H8v-8zM6.8 6.1a1.4 1.4 0 100 2.8 1.4 1.4 0 000-2.8zM18.4 13.9c0-2.2-1.18-3.22-2.75-3.22-1.27 0-1.83.7-2.15 1.19V10H11.1c.03.68 0 8 0 8h2.4v-4.47c0-.21.02-.42.08-.57.17-.42.55-.85 1.19-.85.84 0 1.18.64 1.18 1.58V18h2.45v-4.1z"
        />
      </svg>
    )
  }
  if (brand[name]) {
    return (
      <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d={brand[name]} />
      </svg>
    )
  }
  const Cmp = map[name]
  if (!Cmp) return null
  return <Cmp className={className} size={size} strokeWidth={strokeWidth} aria-hidden="true" {...rest} />
}
