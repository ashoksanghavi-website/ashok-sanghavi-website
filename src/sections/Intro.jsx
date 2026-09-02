import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Icon from '../components/Icons'
import { CREDENTIALS, Reg } from '../components/Cred'
import { useSiteContent } from '../lib/useSiteContent'

export default function Intro() {
  const { t, img } = useSiteContent()
  return (
    <section id="intro" className="relative overflow-hidden bg-ivory py-24 sm:py-32">
      <div className="container-lux">
        <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
          {/* Portrait with soft gold frame + gentle parallax */}
          <Reveal className="mx-auto w-full max-w-sm lg:max-w-none">
            <div className="relative">
              <div className="pointer-events-none absolute -inset-3 rounded-[1.6rem] border border-gold/40" />
              <div className="pointer-events-none absolute -inset-3 rounded-[1.6rem] shadow-lift" />
              <div className="relative overflow-hidden rounded-[1.3rem] bg-cream" style={{ aspectRatio: '4 / 3' }}>
                <img
                  src={img('home.intro.image')}
                  alt="Ashok Sanghavi with family"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.parentElement.querySelector('[data-ph]').style.display = 'flex'
                  }}
                />
                <div
                  data-ph
                  className="absolute inset-0 hidden flex-col items-center justify-center gap-3 text-center"
                  style={{ background: 'linear-gradient(160deg, #F5F0E6, #E7DEC9)' }}
                >
                  <span className="grid h-16 w-16 place-items-center rounded-full border border-gold/50 text-gold">
                    <Icon name="people" size={30} />
                  </span>
                  <span className="font-sans text-[0.72rem] uppercase tracking-[0.24em] text-ink-muted">
                    Portrait of Ashok Sanghavi
                  </span>
                </div>
              </div>
            </div>
            {/* Credential plate — placed below the portrait so nothing clips it */}
            <div className="mt-9 flex justify-center">
              <div className="flex items-center gap-3 whitespace-nowrap rounded-full border border-gold/40 bg-ivory px-6 py-3.5 shadow-soft">
                <span className="font-display text-[1.05rem] text-emerald">Ashok Sanghavi</span>
                <span className="h-4 w-px shrink-0 bg-gold/50" />
                <span className="font-sans text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                  CFP<Reg /> · ChFC<Reg /> · CLU<Reg />
                </span>
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <div>
            <Reveal>
              <p className="eyebrow">{t('home.intro.eyebrow')}</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 max-w-xl font-display text-4xl leading-[1.08] sm:text-5xl">
                {t('home.intro.heading')}
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-6 flex flex-wrap gap-2">
                {CREDENTIALS.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-gold/30 bg-cream px-3.5 py-1.5 font-sans text-[0.76rem] font-semibold tracking-wide text-emerald"
                  >
                    {c}
                    <Reg />
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-7 max-w-prose whitespace-pre-line font-sans text-[1.05rem] leading-relaxed text-ink-soft">
                {t('home.intro.body1')}
              </p>
            </Reveal>
            <Reveal delay={300}>
              <p className="mt-4 max-w-prose whitespace-pre-line font-sans text-[1.05rem] leading-relaxed text-ink-soft">
                {t('home.intro.body2')}
              </p>
            </Reveal>
            <Reveal delay={360}>
              <Link to="/about" className="mt-8 inline-flex items-center gap-2 link-gold">
                Read more about Ashok
                <Icon name="arrow" size={18} className="text-gold" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
