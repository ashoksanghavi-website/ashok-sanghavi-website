import { useParams, Link, Navigate } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import Seo from '../components/Seo'
import CTASection from '../components/CTASection'
import Breadcrumb from '../components/Breadcrumb'
import Reveal from '../components/Reveal'
import ImageSlot from '../components/ImageSlot'
import Icon from '../components/Icons'
import { usePost, usePosts, coverSrc } from '../lib/usePosts'
import { formatDate } from './BlogIndex'

function Block({ block }) {
  if (block.type === 'h') {
    return <h2 className="mt-12 font-display text-[1.7rem] leading-tight text-emerald sm:text-[2rem]">{block.text}</h2>
  }
  if (block.type === 'quote') {
    return (
      <blockquote className="my-10 border-l-2 border-gold pl-6 font-display text-[1.4rem] italic leading-[1.4] text-emerald sm:text-[1.7rem]">
        {block.text}
      </blockquote>
    )
  }
  return <p className="mt-6 text-body text-ink-soft">{block.text}</p>
}

// Body comes in two shapes: bundled demo posts use an array of typed blocks;
// admin-authored posts store a single string (plain text or HTML). Render both.
function PostBody({ body }) {
  if (Array.isArray(body)) {
    return (
      <>
        {body.map((block, i) => (
          <Reveal key={i} delay={0}>
            <Block block={block} />
          </Reveal>
        ))}
      </>
    )
  }

  const text = String(body || '').trim()
  if (!text) return null

  const looksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(text)
  if (looksLikeHtml) {
    return <div className="article-html" dangerouslySetInnerHTML={{ __html: text }} />
  }

  // Plain text: blank lines separate paragraphs.
  const paragraphs = text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean)
  return (
    <>
      {paragraphs.map((p, i) => (
        <Reveal key={i} delay={0}>
          <p className="mt-6 text-body text-ink-soft">{p}</p>
        </Reveal>
      ))}
    </>
  )
}

export default function BlogArticle() {
  const { slug } = useParams()
  const { post, loading, notFound } = usePost(slug)
  const { posts: all } = usePosts()

  if (notFound) return <Navigate to="/blog" replace />

  if (loading || !post) {
    return (
      <PageTransition>
        <div className="flex min-h-[60vh] items-center justify-center bg-ivory">
          <span className="font-sans text-[0.8rem] uppercase tracking-[0.22em] text-ink-muted">Loading…</span>
        </div>
      </PageTransition>
    )
  }

  const related = all.filter((p) => p.slug !== slug).slice(0, 3)

  return (
    <PageTransition>
      <Seo title={post.title} description={post.excerpt} />

      {/* Article header */}
      <header className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(160deg, #FBF8F1 0%, #F5F0E6 60%, #E8EFE7 100%)' }}
        />
        <div className="container-lux relative pt-32 pb-14 sm:pt-40 sm:pb-16">
          <Reveal>
            <div className="mb-8">
              <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Blog', to: '/blog' }, { label: post.category }]} />
            </div>
          </Reveal>
          <Reveal delay={60}>
            <span className="eyebrow">{post.category}</span>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-5 max-w-4xl font-display text-[2.4rem] leading-[1.08] sm:text-[3.2rem]">{post.title}</h1>
          </Reveal>
          <Reveal delay={180}>
            <div className="mt-7 flex items-center gap-4 font-sans text-[0.88rem] text-ink-muted">
              <span className="inline-flex items-center gap-2">
                <Icon name="calendar" size={16} className="text-gold" />
                {formatDate(post.date)}
              </span>
              <span className="h-1 w-1 rounded-full bg-gold/60" />
              <span>{post.author || 'Ashok Sanghavi'}</span>
            </div>
          </Reveal>
        </div>
        <div className="rule-gold absolute inset-x-0 bottom-0 h-px opacity-70" />
      </header>

      {/* Lead image + body */}
      <article className="bg-ivory py-16 sm:py-20">
        <div className="container-lux">
          <Reveal>
            <ImageSlot src={coverSrc(post)} label="Article image" icon="file" ratio="16 / 9" framed className="mx-auto max-w-3xl" />
          </Reveal>
          <div className="mx-auto mt-16 max-w-prose">
            <PostBody body={post.body} />
          </div>

          {/* share / back */}
          <div className="mx-auto mt-14 flex max-w-prose items-center justify-between border-t border-gold/20 pt-8">
            <Link to="/blog" className="inline-flex items-center gap-2 link-gold">
              <Icon name="arrowLeft" size={18} className="text-gold" />
              All articles
            </Link>
            <Link to="/contact" className="btn-ghost">
              Talk to us
            </Link>
          </div>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-cream py-20 sm:py-24">
          <div className="container-lux">
            <Reveal>
              <h2 className="font-display text-[1.7rem] text-emerald sm:text-[2rem]">Related reading</h2>
            </Reveal>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 90}>
                  <Link
                    to={`/blog/${p.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-gold/20 bg-ivory p-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift"
                  >
                    <span className="eyebrow">{p.category}</span>
                    <h3 className="mt-3 font-display text-[1.25rem] leading-snug text-emerald">{p.title}</h3>
                    <p className="mt-3 flex-1 text-[0.94rem] leading-relaxed text-ink-soft">{p.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-2 font-sans text-[0.84rem] font-semibold text-emerald">
                      Read
                      <Icon name="arrow" size={15} className="text-gold transition-transform duration-500 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        eyebrow="Your turn"
        heading="Wondering how this applies to you?"
        sub="Every situation is different. A short conversation is the quickest way to find out what fits yours."
        variant="note"
      />
    </PageTransition>
  )
}
