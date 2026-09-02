import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from './Icons'
import { firm } from '../lib/site'

// ─────────────────────────────────────────────────────────────────────────────
const SESSION_KEY = 'gitPopupDismissed'

const inputCls =
  'w-full rounded-lg border border-gold/25 bg-ivory px-3.5 py-2.5 font-sans text-[0.92rem] text-ink outline-none transition-all duration-300 placeholder:text-ink-muted/60 focus:border-gold focus:ring-2 focus:ring-gold/20'

// A small, premium "get in touch" card that slides up once the visitor reaches
// the foot of the page. Dismissable, and it stays dismissed for the session.
export default function GetInTouchPopup() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [status, setStatus] = useState('idle') // idle | sending | done | error

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY) === '1') setDismissed(true)
    } catch { /* ignore */ }
  }, [])

  useEffect(() => {
    if (dismissed) return
    const footer = document.querySelector('footer')
    if (!footer) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
    )
    io.observe(footer)
    return () => io.disconnect()
  }, [dismissed])

  function close() {
    setVisible(false)
    setDismissed(true)
    try { sessionStorage.setItem(SESSION_KEY, '1') } catch { /* ignore */ }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget).entries())
    try {
      setStatus('sending')
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, source: 'popup' }),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.97 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-5 right-5 z-[55] w-[min(22rem,calc(100vw-2.5rem))]"
          role="dialog"
          aria-label="Get in touch"
        >
          <div
            className="relative overflow-hidden rounded-2xl border border-gold/30 bg-ivory"
            style={{ boxShadow: '0 30px 70px -28px rgba(14,58,40,0.6)' }}
          >
            {/* gold accent top rule */}
            <span className="absolute inset-x-0 top-0 h-[3px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(198,162,83,0.9), transparent)' }} />
            {/* soft glow */}
            <span
              className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-60 blur-2xl"
              style={{ background: 'radial-gradient(circle, rgba(198,162,83,0.22), transparent 70%)' }}
            />

            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full border border-gold/25 text-ink-soft transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:text-emerald"
            >
              <Icon name="close" size={15} />
            </button>

            <div className="relative p-6">
              {status === 'done' ? (
                <div className="flex flex-col items-start gap-3 py-3">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-emerald/10 text-emerald">
                    <Icon name="check" size={24} strokeWidth={2.2} />
                  </span>
                  <h3 className="font-display text-[1.4rem] text-emerald">Thank you.</h3>
                  <p className="text-[0.9rem] leading-relaxed text-ink-soft">
                    We have your note and will be in touch shortly to find a time that suits you.
                  </p>
                  <button onClick={close} className="mt-1 font-sans text-[0.82rem] font-semibold text-gold-deep hover:text-emerald">
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <p className="flex items-center gap-2 font-sans text-[0.58rem] uppercase tracking-[0.28em] text-gold-deep">
                    <span className="text-gold">&#9670;</span> Get in touch
                  </p>
                  <h3 className="mt-2.5 font-display text-[1.45rem] leading-tight text-emerald">
                    A quick hello?
                  </h3>
                  <p className="mt-2 text-[0.86rem] leading-relaxed text-ink-soft">
                    Leave your details and we will reach out. No cost, no obligation.
                  </p>
                  <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                    <input name="name" required className={inputCls} placeholder="Your name" aria-label="Your name" />
                    <input name="email" type="email" required className={inputCls} placeholder="Email address" aria-label="Email address" />
                    <textarea name="message" rows={2} className={`${inputCls} resize-none`} placeholder="How can we help? (optional)" aria-label="Message" />
                    <button type="submit" className="btn-primary w-full justify-center text-[0.9rem]" disabled={status === 'sending'}>
                      {status === 'sending' ? 'Sending...' : 'Request a call'}
                    </button>
                    {status === 'error' && (
                      <p className="text-[0.82rem] text-red-700">
                        Something went wrong. Please call {firm.phone}.
                      </p>
                    )}
                  </form>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
