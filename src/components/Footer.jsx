import { Link, useLocation } from 'react-router-dom'
import { firm, services, social } from '../lib/site'
import { partners } from '../lib/content'
import Icon from './Icons'
import { ParallaxFloating, FloatingElement } from './ParallaxFloating'
import TextHoverEffect from './TextHoverEffect'

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Core Beliefs', to: '/core-beliefs' },
  { label: 'Watch and Learn', to: '/watch-and-learn' },
  { label: 'Calculators', to: '/calculators' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

function Monogram({ size = 'h-12 w-12', borderClass = 'border-gold/50', textClass = 'text-gold-light' }) {
  return (
    <span className={`relative grid ${size} shrink-0 place-items-center overflow-hidden rounded-full border ${borderClass}`}>
      <img
        src="/logo.png"
        alt=""
        className="h-full w-full object-cover"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
          e.currentTarget.nextElementSibling.style.display = 'block'
        }}
      />
      <span className={`font-display text-xl ${textClass}`} style={{ display: 'none' }}>AS</span>
    </span>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()
  const { pathname } = useLocation()
  // The cream brand statement only belongs on a few key pages.
  const showBrandBanner = ['/', '/about', '/contact'].includes(pathname)
  return (
    <footer
      className="relative text-ivory"
      style={{ background: 'linear-gradient(180deg, #17603F 0%, #124A32 55%, #0E3A28 100%)' }}
    >
      {/* Gold accent line clearly separates the footer from the CTA above */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(198,162,83,0.9), transparent)' }} />

      {/* Soft gold radial glow for depth */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(120% 80% at 50% 100%, rgba(198,162,83,0.12), transparent 55%)' }}
      />

      {/* Brand banner — a calm, premium statement on a warm cream band.
          Only shown on home, about and contact. */}
      {showBrandBanner && (
      <div className="relative overflow-hidden" style={{ background: 'var(--cream)' }}>
        <ParallaxFloating sensitivity={1.2} className="hidden md:block">
          <FloatingElement className="left-[8%] top-[18%]" depth={0.6}>
            <span className="block h-9 w-9 rotate-45 rounded-md border border-gold/40" />
          </FloatingElement>
          <FloatingElement className="left-[18%] top-[60%]" depth={1.6}>
            <span className="block h-2.5 w-2.5 rounded-full bg-gold/60" />
          </FloatingElement>
          <FloatingElement className="right-[10%] top-[22%]" depth={2.4}>
            <span className="block h-14 w-14 rounded-full border border-sage/45" />
          </FloatingElement>
          <FloatingElement className="right-[16%] bottom-[20%]" depth={1}>
            <span className="block h-6 w-6 rotate-45 bg-gold/20" />
          </FloatingElement>
          <FloatingElement className="left-[46%] top-[10%]" depth={3}>
            <span className="block h-2 w-2 rounded-full bg-gold-deep/60" />
          </FloatingElement>
          <FloatingElement className="right-[38%] bottom-[14%]" depth={2}>
            <span className="block h-3.5 w-3.5 rounded-full border border-gold/50" />
          </FloatingElement>
          <FloatingElement className="left-[30%] bottom-[24%]" depth={0.9}>
            <span className="block h-1.5 w-1.5 rounded-full bg-sage/70" />
          </FloatingElement>
        </ParallaxFloating>

        <div className="container-lux relative z-10 flex flex-col items-center gap-7 py-16 text-center">
          <Monogram size="h-16 w-16" borderClass="border-gold/50" textClass="text-gold-deep" />
          <div className="flex items-center gap-4">
            <span className="hidden h-px w-12 bg-gold/50 sm:block" />
            <span className="font-sans text-[0.68rem] uppercase tracking-[0.34em] text-gold-deep">
              Ashok Sanghavi Financial Advisory
            </span>
            <span className="hidden h-px w-12 bg-gold/50 sm:block" />
          </div>
          <p className="max-w-2xl font-display text-[1.7rem] italic leading-[1.35] text-emerald sm:text-[2.1rem]">
            Helping you keep more of what you earn, protect what you have built, and pass it on with intention.
          </p>
        </div>
      </div>
      )}

      {/* Columns */}
      <div className="container-lux relative z-10 grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div className="lg:pr-8">
          <p className="max-w-xs font-sans text-[0.95rem] leading-relaxed text-sage-light/90">
            A fiduciary tax and wealth planning firm in Elkhart, Indiana. Relationship first, client first, for over
            thirty years.
          </p>
          <p className="mt-5 font-sans text-[0.82rem] tracking-wide text-sage-light/70">
            CFP®&nbsp;&middot;&nbsp;ChFC®&nbsp;&middot;&nbsp;CLU®&nbsp;&middot;&nbsp;CPA background
          </p>
        </div>

        <div>
          <h4 className="footer-head">Explore</h4>
          <ul className="mt-6 space-y-3">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="footer-link">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="footer-head">Services</h4>
          <ul className="mt-6 space-y-3">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className="footer-link">{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="footer-head">Contact</h4>
          <ul className="mt-6 space-y-4 font-sans text-[0.92rem] text-sage-light/90">
            <li className="flex items-start gap-3">
              <Icon name="mail" size={18} className="mt-0.5 text-gold-light" />
              <a href={`mailto:${firm.email}`} className="footer-link">{firm.email}</a>
            </li>
            <li className="flex items-start gap-3">
              <Icon name="phone" size={18} className="mt-0.5 text-gold-light" />
              <a href={firm.phoneHref} className="footer-link">{firm.phone}</a>
            </li>
            <li className="flex items-start gap-3">
              <Icon name="pin" size={18} className="mt-0.5 text-gold-light" />
              <span className="leading-relaxed">
                {firm.address.line1}
                <br />
                {firm.address.line2}
              </span>
            </li>
          </ul>
          <div className="mt-7">
            <span className="footer-head">Follow us</span>
            <div className="mt-3 flex items-center gap-3">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-ivory/15 transition-all duration-400 hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10"
                >
                  <Icon name={s.icon} size={22} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Giant brand wordmark — hover to reveal the gold gradient */}
      <div className="relative z-10 hidden select-none px-6 pb-4 lg:block" aria-hidden="true">
        <div className="mx-auto w-full max-w-5xl" style={{ aspectRatio: '300 / 58' }}>
          <TextHoverEffect text="Ashok Sanghavi" />
        </div>
      </div>

      {/* Affiliations */}
      <div className="relative z-10 border-t border-ivory/10">
        <div className="container-lux flex flex-col items-center gap-5 py-8 sm:flex-row sm:justify-between">
          <span className="footer-head">Affiliations</span>
          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            {partners.map((p) => (
              <a
                key={p.label}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[0.82rem] tracking-wide text-sage-light/80 transition-colors hover:text-gold-light"
              >
                {p.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-ivory/10">
        <div className="container-lux flex flex-col items-center gap-2 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="font-sans text-[0.78rem] text-sage-light/60">
            © {year} {firm.name}. All rights reserved.
          </p>
          <p className="font-sans text-[0.78rem] text-sage-light/60">
            Advisory services offered through {firm.entity}.
          </p>
          <p className="font-sans text-[0.78rem] text-sage-light/60">
            Designed by <span className="font-semibold text-gold-light">Automated Codes</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
