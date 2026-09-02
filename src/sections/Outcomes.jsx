import Reveal from '../components/Reveal'
import CountUp from '../components/CountUp'
import { outcomes } from '../lib/site'

export default function Outcomes() {
  return (
    <section className="relative bg-ivory py-24 sm:py-32">
      <div className="container-lux">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow eyebrow--center justify-center">Signature outcomes</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
              What thoughtful planning can make possible.
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-gold/20 bg-gold/20 sm:grid-cols-2 lg:grid-cols-4">
          {outcomes.map((o, i) => (
            <Reveal key={i} delay={i * 90} className="bg-ivory">
              <div className="flex h-full flex-col items-start gap-4 px-7 py-10">
                <p className="eyebrow">{o.kicker}</p>
                <div className="font-display text-6xl leading-none text-emerald sm:text-7xl">
                  {o.word ? (
                    <span className="text-[2.6rem] sm:text-5xl">{o.word}</span>
                  ) : o.value === 0 ? (
                    <span>{o.display}</span>
                  ) : (
                    <span>
                      {o.prefix}
                      <CountUp value={o.value} suffix={o.suffix} />
                    </span>
                  )}
                </div>
                <p className="font-sans text-[0.98rem] leading-relaxed text-ink-soft">{o.line}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <p className="mx-auto mt-8 max-w-xl text-center font-sans text-[0.82rem] leading-relaxed text-ink-muted">
            Every situation is different. These reflect what careful, personalised planning has helped clients
            work toward, not a promise of specific results.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
