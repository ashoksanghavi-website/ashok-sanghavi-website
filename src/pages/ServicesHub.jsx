import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import CTASection from '../components/CTASection'
import Reveal from '../components/Reveal'
import ImageSlot from '../components/ImageSlot'
import Icon from '../components/Icons'
import { services } from '../lib/site'
import { useSiteContent } from '../lib/useSiteContent'

export default function ServicesHub() {
  const { t, img } = useSiteContent()
  return (
    <PageTransition>
      <Seo
        title="Services"
        description="Eight disciplines under one roof: wealth management, retirement, tax, estate, protection, business, benefits and long term care."
      />
      <PageHero
        eyebrow={t('services.hero.eyebrow')}
        title={t('services.hero.title')}
        intro={t('services.hero.intro')}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Services' }]}
      />

      {/* Featured, asymmetric */}
      <section className="bg-ivory py-24 sm:py-28">
        <div className="container-lux grid items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">{t('services.approach.eyebrow')}</p>
            <h2 className="mt-5 max-w-lg font-display text-[2rem] leading-[1.14] sm:text-[2.6rem]">
              {t('services.approach.heading')}
            </h2>
            <p className="mt-6 max-w-xl whitespace-pre-line text-body text-ink-soft">
              {t('services.approach.body')}
            </p>
            <Link to="/contact" className="mt-8 inline-flex items-center gap-2 link-gold">
              Start a conversation
              <Icon name="arrow" size={18} className="text-gold" />
            </Link>
          </Reveal>
          <Reveal delay={140}>
            {/* EDIT: optional, drop /public/media/lobby.jpg (already provided) */}
            <ImageSlot src={img('services.approach.image')} label="Our office" ratio="5 / 4" framed parallax icon="building" />
          </Reveal>
        </div>
      </section>

      {/* Services grid */}
      <section className="bg-cream py-24 sm:py-28">
        <div className="container-lux">
          <Reveal>
            <p className="eyebrow">{t('services.grid.eyebrow')}</p>
            <h2 className="mt-5 max-w-2xl font-display text-[2rem] leading-[1.14] sm:text-[2.6rem]">
              {t('services.grid.heading')}
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 4) * 70}>
                <Link
                  to={`/services/${s.slug}`}
                  className="service-tile group flex h-full flex-col overflow-hidden rounded-2xl border border-gold/20 bg-ivory"
                >
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <img
                      src={`/media/service-${s.slug}.jpg`}
                      alt={s.title}
                      loading="lazy"
                      className="service-tile-img h-full w-full object-cover"
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(14,58,40,0.5))' }} />
                    <span className="absolute left-3.5 top-3.5 grid h-9 w-9 place-items-center rounded-lg border border-gold/40 bg-ivory/85 text-gold backdrop-blur-sm">
                      <Icon name={s.icon} size={18} />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-[1.2rem] leading-snug text-emerald">{s.title}</h3>
                    <span className="service-underline" />
                    <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-ink-soft">{t(`service.${s.slug}.tagline`)}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 font-sans text-[0.8rem] font-semibold text-emerald">
                      Explore
                      <Icon name="arrow" size={15} className="text-gold transition-transform duration-500 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow={t('services.cta.eyebrow')}
        heading={t('services.cta.heading')}
        sub={t('services.cta.sub')}
        variant="seal"
      />
    </PageTransition>
  )
}
