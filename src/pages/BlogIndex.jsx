import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import CTASection from '../components/CTASection'
import Reveal from '../components/Reveal'
import ImageSlot from '../components/ImageSlot'
import Icon from '../components/Icons'
import { posts } from '../lib/content'

export function formatDate(d) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function BlogIndex() {
  const [featured, ...rest] = posts

  return (
    <PageTransition>
      <Seo
        title="Blog"
        description="Notes on planning, tax and legacy from Ashok Sanghavi Financial Advisory."
      />
      <PageHero
        eyebrow="Journal"
        title="Notes on planning and tax."
        intro="Plain spoken thoughts on the strategies, stories and lessons that shape a secure financial life."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Blog' }]}
      />

      {/* Featured lead post */}
      <section className="bg-ivory py-24 sm:py-28">
        <div className="container-lux">
          <Reveal>
            <Link
              to={`/blog/${featured.slug}`}
              className="group grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              <ImageSlot
                src={`/media/blog-${featured.slug}.jpg`}
                label="Featured image"
                icon="file"
                ratio="16 / 10"
                framed
              />
              <div>
                <span className="eyebrow">{featured.category}</span>
                <h2 className="mt-5 font-display text-[2.1rem] leading-[1.12] text-emerald sm:text-[2.7rem]">
                  {featured.title}
                </h2>
                <p className="mt-5 max-w-xl text-body text-ink-soft">{featured.excerpt}</p>
                <div className="mt-6 flex items-center gap-4">
                  <span className="font-sans text-[0.85rem] text-ink-muted">{formatDate(featured.date)}</span>
                  <span className="inline-flex items-center gap-2 font-sans text-[0.88rem] font-semibold text-emerald">
                    Read article
                    <Icon
                      name="arrow"
                      size={16}
                      className="text-gold transition-transform duration-500 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Grid of the rest */}
      <section className="bg-cream py-24 sm:py-28">
        <div className="container-lux">
          <Reveal>
            <p className="eyebrow">More from the journal</p>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 90}>
                <Link
                  to={`/blog/${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gold/20 bg-ivory transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift"
                >
                  <ImageSlot src={`/media/blog-${p.slug}.jpg`} label="Article image" icon="file" ratio="16 / 10" rounded="rounded-none" />
                  <div className="flex flex-1 flex-col p-6">
                    <span className="eyebrow">{p.category}</span>
                    <h3 className="mt-3 font-display text-[1.35rem] leading-snug text-emerald">{p.title}</h3>
                    <p className="mt-3 text-[0.96rem] leading-relaxed text-ink-soft">{p.excerpt}</p>
                    <div className="mt-5 flex items-center justify-between pt-2">
                      <span className="font-sans text-[0.8rem] text-ink-muted">{formatDate(p.date)}</span>
                      <Icon
                        name="arrow"
                        size={16}
                        className="text-gold transition-transform duration-500 group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Put it to work"
        heading="Ideas are only worth what you do with them."
        sub="If something here made you think, let us explore what it could mean for your own plan. No cost, no obligation."
        variant="editorial"
      />
    </PageTransition>
  )
}
