import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import CTASection from '../components/CTASection'
import Reveal from '../components/Reveal'
import Icon from '../components/Icons'
import { calculators } from '../lib/content'
import { useSiteContent } from '../lib/useSiteContent'

export default function Calculators() {
  const { t } = useSiteContent()
  return (
    <PageTransition>
      <Seo
        title="Financial Calculators"
        description="A set of simple financial calculators for investing, retirement, mortgage and income tax planning."
      />
      <PageHero
        eyebrow={t('calc.hero.eyebrow')}
        title={t('calc.hero.title')}
        intro={t('calc.hero.intro')}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Calculators' }]}
      />

      <section className="bg-ivory py-24 sm:py-28">
        <div className="container-lux">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {calculators.map((c, i) => (
              <Reveal key={c.title} delay={(i % 3) * 80} variant="scale">
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gold/20 bg-cream p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-lift"
                >
                  {/* soft gold wash on hover */}
                  <span
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: 'radial-gradient(circle, rgba(198,162,83,0.28), transparent 70%)' }}
                  />
                  <span className="relative grid h-14 w-14 place-items-center rounded-2xl border border-gold/30 bg-ivory text-gold transition-all duration-500 group-hover:border-gold group-hover:bg-gold/10 group-hover:scale-105">
                    <Icon name={c.icon} size={26} />
                  </span>
                  <h2 className="relative mt-7 font-display text-[1.45rem] leading-snug text-emerald">{c.title}</h2>
                  <p className="relative mt-3 flex-1 text-body text-ink-soft">{c.blurb}</p>
                  <span className="relative mt-6 inline-flex items-center gap-2 font-sans text-[0.86rem] font-semibold text-emerald">
                    Open calculator
                    <Icon
                      name="arrowUpRight"
                      size={16}
                      className="text-gold transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </a>
              </Reveal>
            ))}

            {/* Closing feature card — fills the trailing grid cell with an
                invitation for a real, personalised projection. */}
            <Reveal delay={(calculators.length % 3) * 80} variant="scale">
              <div
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl p-8 text-ivory"
                style={{ background: 'linear-gradient(155deg, #14563B 0%, #0E3A28 60%, #0A3020 100%)' }}
              >
                {/* gold glow + hairline frame */}
                <span
                  className="pointer-events-none absolute inset-0 opacity-80"
                  style={{ background: 'radial-gradient(80% 60% at 100% 0%, rgba(198,162,83,0.22), transparent 60%)' }}
                />
                <span className="pointer-events-none absolute inset-3 rounded-[1rem] border border-gold/25" />
                <span className="pointer-events-none absolute inset-[0.9rem] rounded-[0.85rem] border border-gold/10" />

                <span className="relative grid h-14 w-14 place-items-center rounded-2xl border border-gold/40 bg-ivory/5 text-gold-light transition-all duration-500 group-hover:scale-105">
                  <Icon name="compass" size={26} />
                </span>
                <h2 className="relative mt-7 font-display text-[1.45rem] leading-snug text-ivory">
                  {t('calc.card.heading')}
                </h2>
                <p className="relative mt-3 flex-1 whitespace-pre-line text-[0.95rem] leading-relaxed text-sage-light">
                  {t('calc.card.body')}
                </p>
                <Link
                  to="/contact"
                  className="relative mt-6 inline-flex items-center gap-2 font-sans text-[0.86rem] font-semibold text-gold-light transition-colors hover:text-ivory"
                >
                  Talk with Ashok
                  <Icon name="arrow" size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          </div>
          <Reveal>
            <p className="mt-10 max-w-2xl whitespace-pre-line text-[0.9rem] leading-relaxed text-ink-muted">
              {t('calc.disclaimer')}
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection
        eyebrow={t('calc.cta.eyebrow')}
        heading={t('calc.cta.heading')}
        sub={t('calc.cta.sub')}
        variant="contact"
      />
    </PageTransition>
  )
}
