import { useState } from 'react'
import PageTransition from '../components/PageTransition'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Icon from '../components/Icons'
import { firm, social } from '../lib/site'
import { useSiteContent } from '../lib/useSiteContent'

const mapSrc =
  'https://www.google.com/maps?q=25416%20County%206%20Road%20Suite%20102%20Elkhart%20IN%2046514&output=embed'

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block font-sans text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-ink-soft">
        {label}
      </span>
      {children}
    </label>
  )
}

const inputCls =
  'w-full rounded-xl border border-gold/25 bg-ivory px-4 py-3 font-sans text-[0.98rem] text-ink outline-none transition-all duration-300 placeholder:text-ink-muted/60 focus:border-gold focus:ring-2 focus:ring-gold/25'

export default function Contact() {
  const { t } = useSiteContent()
  const [status, setStatus] = useState('idle') // idle | sending | done | error

  async function handleSubmit(e) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget).entries())
    try {
      setStatus('sending')
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, source: 'contact' }),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <PageTransition>
      <Seo
        title="Contact"
        description="Reach Ashok Sanghavi Financial Advisory in Elkhart, Indiana. A no cost, no obligation conversation about your future."
      />
      <PageHero
        eyebrow={t('contact.hero.eyebrow')}
        title={t('contact.hero.title')}
        intro={t('contact.hero.intro')}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
      />

      <section className="bg-ivory py-24 sm:py-28">
        <div className="container-lux grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Form */}
          <Reveal>
            <div className="rounded-[1.4rem] border border-gold/25 bg-cream p-7 sm:p-10">
              {status === 'done' ? (
                <div className="flex flex-col items-start gap-4 py-8">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-emerald/10 text-emerald">
                    <Icon name="check" size={28} strokeWidth={2.2} />
                  </span>
                  <h2 className="font-display text-[1.8rem] text-emerald">Thank you.</h2>
                  <p className="max-w-md text-body text-ink-soft">
                    Your message is on its way. We will be in touch shortly to arrange a time that suits you.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-[1.8rem] text-emerald sm:text-[2.1rem]">{t('contact.form.heading')}</h2>
                  <p className="mt-3 whitespace-pre-line text-body text-ink-soft">
                    {t('contact.form.body')}
                  </p>
                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Name">
                        <input name="name" required className={inputCls} placeholder="Your name" />
                      </Field>
                      <Field label="Phone">
                        <input name="phone" type="tel" className={inputCls} placeholder="Optional" />
                      </Field>
                    </div>
                    <Field label="Email">
                      <input name="email" type="email" required className={inputCls} placeholder="you@example.com" />
                    </Field>
                    <Field label="How can we help?">
                      <textarea name="message" required rows={5} className={`${inputCls} resize-none`} placeholder="A sentence or two is plenty." />
                    </Field>
                    <button type="submit" className="btn-primary w-full sm:w-auto" disabled={status === 'sending'}>
                      {status === 'sending' ? 'Sending...' : 'Request a consultation'}
                    </button>
                    {status === 'error' && (
                      <p className="text-[0.9rem] text-red-700">
                        Something went wrong. Please call us at {firm.phone} and we will help right away.
                      </p>
                    )}
                    <p className="text-[0.82rem] leading-relaxed text-ink-muted">
                      No cost, no obligation. Your details stay private and are used only to reach you.
                    </p>
                  </form>
                </>
              )}
            </div>
          </Reveal>

          {/* Details */}
          <Reveal delay={120}>
            <div className="flex h-full flex-col">
              <p className="eyebrow">{t('contact.details.eyebrow')}</p>
              <h2 className="mt-5 font-display text-[2rem] leading-tight sm:text-[2.4rem]">
                {t('contact.details.heading')}
              </h2>

              <ul className="mt-8 space-y-5">
                <li className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-gold/30 bg-cream text-gold">
                    <Icon name="mail" size={20} />
                  </span>
                  <span>
                    <span className="block font-sans text-[0.76rem] uppercase tracking-[0.16em] text-ink-muted">Email</span>
                    <a href={`mailto:${firm.email}`} className="link-gold text-body">{firm.email}</a>
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-gold/30 bg-cream text-gold">
                    <Icon name="phone" size={20} />
                  </span>
                  <span>
                    <span className="block font-sans text-[0.76rem] uppercase tracking-[0.16em] text-ink-muted">Phone</span>
                    <a href={firm.phoneHref} className="link-gold text-body">{firm.phone}</a>
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-gold/30 bg-cream text-gold">
                    <Icon name="pin" size={20} />
                  </span>
                  <span>
                    <span className="block font-sans text-[0.76rem] uppercase tracking-[0.16em] text-ink-muted">Office</span>
                    <span className="text-body text-ink-soft">
                      {firm.address.line1}
                      <br />
                      {firm.address.line2}
                    </span>
                  </span>
                </li>
              </ul>

              {/* Map */}
              <div className="mt-8 overflow-hidden rounded-2xl border border-gold/25">
                <iframe
                  title="Office location"
                  src={mapSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-56 w-full"
                  style={{ border: 0 }}
                />
              </div>

              <div className="mt-8 flex items-center gap-3">
                {social.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-gold/30 transition-all duration-400 hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10"
                  >
                    <Icon name={s.icon} size={24} />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  )
}
