import PageTransition from '../components/PageTransition'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import CTASection from '../components/CTASection'
import Reveal from '../components/Reveal'
import { coreBeliefs } from '../lib/content'

export default function CoreBeliefs() {
  return (
    <PageTransition>
      <Seo
        title="Core Beliefs"
        description="The values behind our advice. We begin with relationships, because trust is never assumed, it is earned."
      />
      <PageHero
        eyebrow="Core beliefs"
        title="What we believe about your money."
        intro="Trust is never assumed. It is earned, slowly and deliberately, over the course of a relationship."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Core Beliefs' }]}
      />

      {/* Lead philosophy */}
      <section className="bg-ivory py-24 sm:py-28">
        <div className="container-lux">
          <Reveal>
            <p className="mx-auto max-w-4xl text-center font-display text-[1.7rem] leading-[1.4] text-emerald sm:text-[2.15rem]">
              We begin with relationships, because success is measured not only in numbers, but in the clarity,
              confidence and security you carry into the future.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Numbered beliefs, staggered editorial */}
      <section className="bg-cream py-24 sm:py-28">
        <div className="container-lux">
          <div className="flex flex-col gap-16 sm:gap-20">
            {coreBeliefs.map((b, i) => (
              <Reveal key={b.title} delay={(i % 2) * 60}>
                <div
                  className={`grid gap-6 sm:grid-cols-[auto_1fr] sm:gap-10 ${
                    i % 2 === 1 ? 'lg:ml-auto lg:max-w-4xl' : 'lg:max-w-4xl'
                  }`}
                >
                  <span className="font-display text-[3.5rem] leading-none text-gold/70 sm:text-[4.5rem]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="sm:pt-3">
                    <div className="mb-4 h-px w-16 bg-gold/50" />
                    <h2 className="font-display text-[1.7rem] leading-tight text-emerald sm:text-[2.1rem]">{b.title}</h2>
                    <p className="mt-4 max-w-xl text-body text-ink-soft">{b.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Experience it"
        heading="See what a relationship first practice feels like."
        sub="Beliefs are easy to write and harder to live by. Let us show you the difference in a single conversation."
        variant="minimal"
      />
    </PageTransition>
  )
}
