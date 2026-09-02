import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import CTASection from '../components/CTASection'
import Reveal from '../components/Reveal'
import Icon from '../components/Icons'
import { watchLearnSections, concepts } from '../lib/content'
import { useSiteContent } from '../lib/useSiteContent'

export default function WatchLearnHub() {
  const { t } = useSiteContent()
  return (
    <PageTransition>
      <Seo
        title="Watch and Learn"
        description="A calm library of financial ideas, explained simply. Tax, retirement, protection and business strategies made clear."
      />
      <PageHero
        eyebrow={t('watch.hero.eyebrow')}
        title={t('watch.hero.title')}
        intro={t('watch.hero.intro')}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Watch and Learn' }]}
      />

      <section className="bg-ivory py-24 sm:py-28">
        <div className="container-lux grid gap-6 md:grid-cols-2">
          {watchLearnSections.map((sec, i) => {
            const count = concepts.filter((c) => c.group === sec.group).length
            return (
              <Reveal key={sec.slug} delay={i * 100}>
                <Link
                  to={`/watch-and-learn/${sec.slug}`}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.4rem] border border-gold/25 bg-cream p-9 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift"
                >
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full opacity-40 blur-2xl"
                    style={{ background: 'radial-gradient(circle, rgba(107,169,138,0.4), transparent 70%)' }}
                  />
                  <div className="relative">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl border border-gold/30 bg-ivory text-gold">
                      <Icon name={i === 0 ? 'book' : 'compass'} size={26} />
                    </span>
                    <h2 className="mt-7 font-display text-[1.9rem] leading-tight text-emerald sm:text-[2.2rem]">
                      {t(`watch.${sec.slug}.title`)}
                    </h2>
                    <p className="mt-3 max-w-md whitespace-pre-line text-body text-ink-soft">{t(`watch.${sec.slug}.intro`)}</p>
                  </div>
                  <div className="relative mt-8 flex items-center justify-between">
                    <span className="font-sans text-[0.8rem] uppercase tracking-[0.2em] text-ink-muted">
                      {count} concepts
                    </span>
                    <span className="inline-flex items-center gap-2 font-sans text-[0.85rem] font-semibold text-emerald">
                      Explore
                      <Icon
                        name="arrow"
                        size={16}
                        className="text-gold transition-transform duration-500 group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </section>

      <CTASection
        eyebrow={t('watch.cta.eyebrow')}
        heading={t('watch.cta.heading')}
        sub={t('watch.cta.sub')}
        variant="ring"
      />
    </PageTransition>
  )
}
