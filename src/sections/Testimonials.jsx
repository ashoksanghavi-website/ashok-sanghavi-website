import Reveal from '../components/Reveal'
import Icon from '../components/Icons'
import Marquee from '../components/Marquee'
import { reviews } from '../lib/content'

function Stars({ n = 5 }) {
  return (
    <span className="flex items-center gap-0.5 text-gold" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.8l6.5-.9L12 2.5z" />
        </svg>
      ))}
    </span>
  )
}

// The Google "G" mark, for the Reviews-on-Google button.
function GoogleG({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </svg>
  )
}

// Tasteful, brand-aligned avatar colours; each reviewer gets a stable one.
const AVATAR_COLORS = ['#14563B', '#A6863B', '#2F6E5A', '#8A6D3B', '#4E7C64', '#B0873C']
function colorFor(name) {
  let h = 0
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return AVATAR_COLORS[h % AVATAR_COLORS.length]
}

function Card(r, i) {
  const initial = r.name.trim().charAt(0).toUpperCase()
  return (
    <figure
      key={i}
      className="flex h-[21rem] w-[330px] shrink-0 flex-col rounded-2xl border border-gold/20 bg-cream p-7 sm:w-[380px]"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {r.image ? (
            <img
              src={r.image}
              alt={r.name}
              className="h-11 w-11 shrink-0 rounded-full border border-gold/40 object-cover"
            />
          ) : (
            <span
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full ring-1 ring-gold/30"
              style={{ backgroundColor: colorFor(r.name) }}
            >
              <span className="font-display text-lg text-ivory">{initial}</span>
            </span>
          )}
          <div>
            <p className="font-sans text-[0.98rem] font-semibold text-ink">{r.name}</p>
            <p className="font-sans text-[0.82rem] text-ink-muted">{r.role}</p>
          </div>
        </div>
        <GoogleG size={20} />
      </div>
      <p className="mt-5 flex-1 overflow-hidden font-display text-[1.02rem] leading-[1.5] text-emerald [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:7]">
        {r.quote}
      </p>
      <div className="mt-6 flex items-center justify-between border-t border-gold/15 pt-4">
        <Stars n={r.stars} />
        <span className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-ink-muted">Google review</span>
      </div>
    </figure>
  )
}

const GOOGLE_REVIEWS_URL = 'https://share.google/4Bj2GV6BbmkOyN3b7'

export default function Testimonials() {
  const rowA = reviews
  return (
    <section className="relative overflow-hidden bg-ivory py-24 sm:py-32">
      <div
        className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(107,169,138,0.28), transparent 70%)' }}
      />
      <div className="container-lux relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow eyebrow--center justify-center">Voices of trust</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">Success stories, in their words.</h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-5 text-body text-ink-soft">
              For over thirty years, families across Michiana have trusted us with what matters most. Here is a little
              of what that trust sounds like.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Single gliding marquee row */}
      <Reveal delay={120} className="mt-16">
        <Marquee items={rowA} renderItem={Card} duration={56} />
      </Reveal>

      <div className="container-lux relative">
        <Reveal delay={120}>
          <div className="mt-14 flex justify-center">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-gold/30 bg-white px-6 py-3 font-sans text-[0.92rem] font-semibold text-ink shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:shadow-lift"
            >
              <GoogleG size={20} />
              Read all our reviews on Google
              <Icon name="arrowUpRight" size={16} className="text-gold" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
