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

function Card(r, i) {
  const initial = r.name.trim().charAt(0)
  return (
    <figure
      key={i}
      className="flex w-[330px] shrink-0 flex-col rounded-2xl border border-gold/20 bg-cream p-7 sm:w-[380px]"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/40 bg-ivory">
            <span className="font-display text-lg text-emerald">{initial}</span>
          </span>
          <div>
            <p className="font-sans text-[0.98rem] font-semibold text-ink">{r.name}</p>
            <p className="font-sans text-[0.82rem] text-ink-muted">{r.role}</p>
          </div>
        </div>
        <Icon name="quote" size={24} className="text-gold/60" />
      </div>
      <p className="mt-5 font-display text-[1.12rem] leading-[1.5] text-emerald">{r.quote}</p>
      <div className="mt-6 flex items-center justify-between border-t border-gold/15 pt-4">
        <Stars n={r.stars} />
        <span className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-ink-muted">Verified client</span>
      </div>
    </figure>
  )
}

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
          <p className="mx-auto mt-14 max-w-xl text-center font-sans text-[0.86rem] leading-relaxed text-ink-muted">
            These reflections are shown as examples while we gather permission to publish named client stories.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
