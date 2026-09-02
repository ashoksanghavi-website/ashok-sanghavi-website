import { useParams, Link, Navigate } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import CTASection from '../components/CTASection'
import Reveal from '../components/Reveal'
import Icon from '../components/Icons'
import { services } from '../lib/site'
import { serviceDetails } from '../lib/content'
import { useSiteContent } from '../lib/useSiteContent'

export default function ServiceDetail() {
  const { t, img } = useSiteContent()
  const { slug } = useParams()
  const service = services.find((s) => s.slug === slug)
  const detail = serviceDetails[slug]
  if (!service || !detail) return <Navigate to="/services" replace />

  const others = services.filter((s) => s.slug !== slug).slice(0, 4)

  // Editable content (falls back to the built-in detail). Lists are stored as
  // one item per line in the admin.
  const lines = (s) => String(s || '').split('\n').map((x) => x.trim()).filter(Boolean)
  const tagline = t(`service.${slug}.tagline`)
  const forWho = lines(t(`service.${slug}.forWho`))
  const approach = lines(t(`service.${slug}.approach`))
  const benefits = lines(t(`service.${slug}.benefits`))

  return (
    <PageTransition>
      <Seo title={service.title} description={tagline} />
      <PageHero
        eyebrow="Services"
        title={service.title}
        intro={tagline}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Services', to: '/services' }, { label: service.title }]}
        image={img(`service.${slug}.image`)}
        imageLabel={service.title}
        imageIcon={service.icon}
      />

      {/* Overview */}
      <section className="bg-ivory py-24 sm:py-28">
        <div className="container-lux grid gap-8 lg:grid-cols-[auto_1fr] lg:gap-16">
          <Reveal className="flex items-center gap-5 lg:flex-col lg:items-start lg:gap-6">
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-gold/30 bg-cream text-emerald">
              <Icon name={service.icon} size={30} />
            </span>
            <p className="eyebrow">Overview</p>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-2xl whitespace-pre-line text-lead text-ink">{t(`service.${slug}.overview`)}</p>
          </Reveal>
        </div>
      </section>

      {/* Who it is for + approach */}
      <section className="bg-cream py-24 sm:py-28">
        <div className="container-lux grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="eyebrow">Who it is for</p>
            <h2 className="mt-5 font-display text-[1.9rem] leading-tight sm:text-[2.3rem]">
              Planning that fits your situation.
            </h2>
            <ul className="mt-8 space-y-4">
              {forWho.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="mt-1 text-gold">
                    <Icon name="check" size={20} strokeWidth={2} />
                  </span>
                  <span className="text-body text-ink-soft">{f}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">Our approach</p>
            <h2 className="mt-5 font-display text-[1.9rem] leading-tight sm:text-[2.3rem]">
              A calm, deliberate process.
            </h2>
            <ol className="mt-8 space-y-6">
              {approach.map((a, i) => (
                <li key={a} className="flex items-start gap-5">
                  <span className="font-display text-2xl leading-none text-gold/70">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-body text-ink-soft">{a}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Key benefits */}
      <section className="bg-ivory py-24 sm:py-28">
        <div className="container-lux">
          <Reveal>
            <p className="eyebrow">Key benefits</p>
            <h2 className="mt-5 max-w-2xl font-display text-[2rem] leading-[1.14] sm:text-[2.5rem]">
              What this looks like for you.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {benefits.map((b, i) => (
              <Reveal key={b} delay={i * 90}>
                <div className="h-full rounded-2xl border border-gold/20 bg-cream p-7">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-emerald/10 text-emerald">
                    <Icon name="check" size={20} strokeWidth={2.2} />
                  </span>
                  <p className="mt-5 font-display text-[1.25rem] leading-snug text-emerald">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Explore other services */}
      <section className="bg-cream py-20">
        <div className="container-lux">
          <Reveal>
            <div className="flex items-end justify-between gap-6">
              <h2 className="font-display text-[1.7rem] text-emerald sm:text-[2rem]">Explore other services</h2>
              <Link to="/services" className="hidden shrink-0 items-center gap-2 link-gold sm:inline-flex">
                All services
                <Icon name="arrow" size={16} className="text-gold" />
              </Link>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o, i) => (
              <Reveal key={o.slug} delay={(i % 4) * 70}>
                <Link
                  to={`/services/${o.slug}`}
                  className="group flex items-center gap-3 rounded-xl border border-gold/20 bg-ivory px-4 py-4 transition-all duration-500 hover:border-gold/50 hover:shadow-soft"
                >
                  <span className="text-gold">
                    <Icon name={o.icon} size={20} />
                  </span>
                  <span className="font-sans text-[0.9rem] font-semibold text-emerald">{o.title}</span>
                  <Icon
                    name="arrow"
                    size={15}
                    className="ml-auto -translate-x-1 text-gold opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Take the next step"
        heading={`Let us build your ${service.title.toLowerCase()} strategy.`}
        sub="A short, no cost conversation is the best way to see what is possible for your situation. No pressure, ever."
        variant="panel"
      />
    </PageTransition>
  )
}
