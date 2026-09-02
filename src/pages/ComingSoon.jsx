import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import Icon from '../components/Icons'
import { firm } from '../lib/site'

export default function ComingSoon({ eyebrow = 'Ashok Sanghavi Financial Advisory', title, body }) {
  return (
    <PageTransition>
      <section className="relative flex min-h-[86svh] items-center overflow-hidden bg-ivory pt-32 pb-24">
        {/* soft ambient shapes */}
        <div
          className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full opacity-40 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(107,169,138,0.35), transparent 70%)' }}
        />
        <div
          className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full opacity-40 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(198,162,83,0.24), transparent 70%)' }}
        />
        <div className="container-lux relative">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow eyebrow--center justify-center">{eyebrow}</p>
            <h1 className="mt-6 font-display text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">{title}</h1>
            <hr className="rule-gold mx-auto my-9 w-24" />
            <p className="mx-auto max-w-prose font-sans text-[1.08rem] leading-relaxed text-ink-soft">
              {body ||
                'This page is being prepared with the same care as everything else we do. It will be here shortly. In the meantime, we would be glad to talk with you directly.'}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/contact" className="btn-primary w-full sm:w-auto">
                Book a consultation
              </Link>
              <Link to="/" className="inline-flex items-center gap-2 link-gold">
                <Icon name="arrow" size={18} className="rotate-180 text-gold" />
                Back to home
              </Link>
            </div>
            <p className="mt-10 font-sans text-[0.9rem] text-ink-muted">
              Or call us at{' '}
              <a href={firm.phoneHref} className="link-gold">
                {firm.phone}
              </a>
            </p>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
