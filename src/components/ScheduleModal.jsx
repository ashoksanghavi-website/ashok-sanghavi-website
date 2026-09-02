import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from './Icons'
import { firm } from '../lib/site'

// A centred "schedule a meeting" popup, opened from any CTA via useSchedule().
// It collects an email and a preferred time, can be cancelled, and stores the
// request through /api/contact (source: 'schedule') so it lands in the admin Inbox.

const ScheduleContext = createContext(() => {})
export const useSchedule = () => useContext(ScheduleContext)

const inputCls =
  'w-full rounded-lg border border-gold/25 bg-ivory px-3.5 py-2.5 font-sans text-[0.92rem] text-ink outline-none transition-all duration-300 placeholder:text-ink-muted/60 focus:border-gold focus:ring-2 focus:ring-gold/20'
const labelCls = 'mb-1.5 block font-sans text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink-muted'

export function ScheduleProvider({ children }) {
  const [open, setOpen] = useState(false)
  const openSchedule = useCallback(() => setOpen(true), [])

  return (
    <ScheduleContext.Provider value={openSchedule}>
      {children}
      <ScheduleModal open={open} onClose={() => setOpen(false)} />
    </ScheduleContext.Provider>
  )
}

function ScheduleModal({ open, onClose }) {
  const [status, setStatus] = useState('idle') // idle | sending | done | error

  // Lock body scroll and close on Escape while open.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  // Reset the form state a moment after it closes.
  useEffect(() => {
    if (open) return
    const t = setTimeout(() => setStatus('idle'), 300)
    return () => clearTimeout(t)
  }, [open])

  async function handleSubmit(e) {
    e.preventDefault()
    const f = Object.fromEntries(new FormData(e.currentTarget).entries())
    const when = [f.date, f.slot].filter(Boolean).join(', ')
    const message = [when && `Preferred time: ${when}`, f.message].filter(Boolean).join('\n')
    try {
      setStatus('sending')
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: f.name, email: f.email, phone: f.phone, message, source: 'schedule' }),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label="Schedule a meeting"
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-emerald-deep/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[min(30rem,100%)] overflow-hidden rounded-2xl border border-gold/30 bg-ivory"
            style={{ boxShadow: '0 40px 90px -30px rgba(14,58,40,0.7)' }}
          >
            <span className="absolute inset-x-0 top-0 h-[3px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(198,162,83,0.9), transparent)' }} />
            <span
              className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full opacity-60 blur-2xl"
              style={{ background: 'radial-gradient(circle, rgba(198,162,83,0.22), transparent 70%)' }}
            />

            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3.5 top-3.5 z-10 grid h-8 w-8 place-items-center rounded-full border border-gold/25 text-ink-soft transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:text-emerald"
            >
              <Icon name="close" size={15} />
            </button>

            <div className="relative p-7 sm:p-8">
              {status === 'done' ? (
                <div className="flex flex-col items-start gap-3 py-4">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-emerald/10 text-emerald">
                    <Icon name="check" size={24} strokeWidth={2.2} />
                  </span>
                  <h3 className="font-display text-[1.6rem] text-emerald">Thank you.</h3>
                  <p className="text-[0.92rem] leading-relaxed text-ink-soft">
                    We have your request and will reach out shortly to confirm a time that suits you.
                  </p>
                  <button onClick={onClose} className="btn-primary mt-2 justify-center text-[0.9rem]">Done</button>
                </div>
              ) : (
                <>
                  <p className="flex items-center gap-2 font-sans text-[0.58rem] uppercase tracking-[0.28em] text-gold-deep">
                    <span className="text-gold">&#9670;</span> Let us begin
                  </p>
                  <h3 className="mt-2.5 font-display text-[1.7rem] leading-tight text-emerald">Schedule a meeting</h3>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-soft">
                    Share your email and a time that suits you. No cost, no obligation, no pressure.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
                    <div>
                      <label className={labelCls} htmlFor="sm-name">Your name</label>
                      <input id="sm-name" name="name" required className={inputCls} placeholder="Full name" />
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="sm-email">Email address</label>
                      <input id="sm-email" name="email" type="email" required className={inputCls} placeholder="you@example.com" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={labelCls} htmlFor="sm-date">Preferred day</label>
                        <input id="sm-date" name="date" type="date" className={inputCls} />
                      </div>
                      <div>
                        <label className={labelCls} htmlFor="sm-slot">Time of day</label>
                        <select id="sm-slot" name="slot" className={inputCls} defaultValue="">
                          <option value="">Any time</option>
                          <option value="Morning">Morning</option>
                          <option value="Afternoon">Afternoon</option>
                          <option value="Evening">Evening</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="sm-message">Anything to add? (optional)</label>
                      <textarea id="sm-message" name="message" rows={2} className={`${inputCls} resize-none`} placeholder="A note about what you would like to discuss" />
                    </div>

                    {status === 'error' && (
                      <p className="text-[0.84rem] text-red-700">Something went wrong. Please try again or call {firm.phone}.</p>
                    )}

                    <div className="flex items-center gap-3 pt-1">
                      <button type="submit" className="btn-primary flex-1 justify-center text-[0.92rem]" disabled={status === 'sending'}>
                        {status === 'sending' ? 'Sending...' : 'Request this time'}
                      </button>
                      <button type="button" onClick={onClose} className="btn-ghost text-[0.92rem]">
                        Cancel
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
