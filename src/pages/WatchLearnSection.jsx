import { useParams, Navigate } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import CTASection from '../components/CTASection'
import Reveal from '../components/Reveal'
import Icon from '../components/Icons'
import { watchLearnSections, concepts } from '../lib/content'

export default function WatchLearnSection() {
  const { slug } = useParams()
  const section = watchLearnSections.find((s) => s.slug === slug)
  if (!section) return <Navigate to="/watch-and-learn" replace />
  const items = concepts.filter((c) => c.group === section.group)

  return (
    <PageTransition>
      <Seo title={section.title} description={section.intro} />
      <PageHero
        eyebrow="Watch and learn"
        title={section.title}
        intro={section.intro}
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Watch and Learn', to: '/watch-and-learn' },
          { label: section.title },
        ]}
      />

      <section className="bg-ivory py-24 sm:py-28">
        <div className="container-lux">
          <Reveal>
            <p className="mb-10 max-w-2xl text-body text-ink-soft">
              Each concept is a short video. Select any card to watch it on YouTube.
            </p>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((c, i) => {
              const videoId = (c.url.split('v=')[1] || '').split('&')[0]
              return (
                <Reveal key={c.title} delay={(i % 3) * 80}>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gold/20 bg-cream transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift"
                  >
                    <div className="relative aspect-video overflow-hidden bg-emerald-deep">
                      <img
                        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                        alt={c.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(14,58,40,0.15), rgba(14,58,40,0.5))' }} />
                      <span className="absolute left-3.5 top-3.5 grid h-9 w-9 place-items-center rounded-lg border border-gold/40 bg-emerald-deep/60 text-gold-light backdrop-blur-sm">
                        <Icon name={c.icon} size={18} />
                      </span>
                      <span className="absolute bottom-3.5 left-3.5 inline-flex items-center gap-1.5 font-sans text-[0.6rem] uppercase tracking-[0.22em] text-ivory/85">
                        Watch on YouTube
                        <Icon name="arrowUpRight" size={13} className="text-gold-light" />
                      </span>
                      <span className="absolute inset-0 grid place-items-center">
                        <span className="grid h-14 w-14 place-items-center rounded-full border border-ivory/50 bg-emerald-deep/50 text-ivory backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:border-gold group-hover:bg-gold group-hover:text-emerald-deep">
                          <Icon name="play" size={22} />
                        </span>
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-display text-[1.2rem] leading-snug text-emerald">{c.title}</h3>
                      <p className="mt-3 text-[0.96rem] leading-relaxed text-ink-soft">{c.teaser}</p>
                    </div>
                  </a>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Curious about one of these?"
        heading="Let us show you how it applies to you."
        sub="These ideas come to life when they are matched to your situation. A short conversation is the best place to start."
        variant="divider"
      />
    </PageTransition>
  )
}
