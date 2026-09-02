import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from './Icons'

const STORAGE_KEY = 'cookieConsent.v1'

// A premium, custom cookie banner with a Customize panel. Essential cookies are
// always on; the visitor can toggle analytics and marketing. The choice is
// stored locally so the banner does not reappear once answered.
export default function CookieConsent() {
  const [open, setOpen] = useState(false)
  const [customizing, setCustomizing] = useState(false)
  const [prefs, setPrefs] = useState({ analytics: true, marketing: false })

  useEffect(() => {
    let saved = null
    try { saved = localStorage.getItem(STORAGE_KEY) } catch { /* ignore */ }
    if (!saved) {
      // slight delay so it eases in after the page settles
      const t = setTimeout(() => setOpen(true), 900)
      return () => clearTimeout(t)
    }
  }, [])

  function persist(value) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...value, ts: Date.now() })) } catch { /* ignore */ }
    setOpen(false)
  }

  const acceptAll = () => persist({ essential: true, analytics: true, marketing: true })
  const declineAll = () => persist({ essential: true, analytics: false, marketing: false })
  const saveChoice = () => persist({ essential: true, ...prefs })

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-5 left-5 z-[70] w-[min(26rem,calc(100vw-2.5rem))]"
          role="dialog"
          aria-label="Cookie preferences"
        >
          <div
            className="relative overflow-hidden rounded-2xl border border-gold/30 text-ivory"
            style={{
              background: 'linear-gradient(158deg, #14563B 0%, #0E3A28 60%, #0A3020 100%)',
              boxShadow: '0 30px 70px -28px rgba(10,42,27,0.75)',
            }}
          >
            <span className="absolute inset-x-0 top-0 h-[3px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(198,162,83,0.9), transparent)' }} />
            <span
              className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full opacity-70 blur-2xl"
              style={{ background: 'radial-gradient(circle, rgba(198,162,83,0.22), transparent 70%)' }}
            />

            <div className="relative p-6">
              <div className="flex items-start gap-3.5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-gold/40 bg-ivory/5 text-gold-light">
                  <Icon name="cookie" size={22} />
                </span>
                <div>
                  <h3 className="font-display text-[1.35rem] leading-tight text-ivory">A note on cookies</h3>
                  <p className="mt-1.5 text-[0.88rem] leading-relaxed text-sage-light">
                    We use cookies to keep the site working and to understand how it is used, so we can make it better.
                    You are in control of the rest.
                  </p>
                </div>
              </div>

              <AnimatePresence initial={false}>
                {customizing && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 space-y-1.5 border-t border-ivory/10 pt-4">
                      <PrefRow
                        title="Essential"
                        desc="Required for the site to function. Always on."
                        checked
                        locked
                      />
                      <PrefRow
                        title="Analytics"
                        desc="Anonymous insight into how the site is used."
                        checked={prefs.analytics}
                        onChange={() => setPrefs((p) => ({ ...p, analytics: !p.analytics }))}
                      />
                      <PrefRow
                        title="Marketing"
                        desc="Helps us measure and improve our outreach."
                        checked={prefs.marketing}
                        onChange={() => setPrefs((p) => ({ ...p, marketing: !p.marketing }))}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-5 flex flex-col gap-2.5">
                <div className="flex gap-2.5">
                  <button onClick={acceptAll} className="btn-gold flex-1 justify-center px-4 py-2.5 text-[0.86rem]">
                    Accept all
                  </button>
                  {customizing ? (
                    <button
                      onClick={saveChoice}
                      className="flex-1 justify-center rounded-full border border-ivory/25 px-4 py-2.5 text-center font-sans text-[0.86rem] font-semibold text-ivory transition-all duration-300 hover:border-gold hover:text-gold-light"
                    >
                      Save choices
                    </button>
                  ) : (
                    <button
                      onClick={declineAll}
                      className="flex-1 justify-center rounded-full border border-ivory/25 px-4 py-2.5 text-center font-sans text-[0.86rem] font-semibold text-ivory transition-all duration-300 hover:border-gold hover:text-gold-light"
                    >
                      Decline
                    </button>
                  )}
                </div>
                <button
                  onClick={() => setCustomizing((v) => !v)}
                  className="inline-flex items-center justify-center gap-2 font-sans text-[0.8rem] font-semibold text-gold-light transition-colors hover:text-ivory"
                >
                  <Icon name="settings" size={15} />
                  {customizing ? 'Hide preferences' : 'Customize preferences'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function PrefRow({ title, desc, checked, locked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 py-1.5">
      <div>
        <p className="font-sans text-[0.86rem] font-semibold text-ivory">{title}</p>
        <p className="text-[0.76rem] leading-snug text-sage-light/85">{desc}</p>
      </div>
      <button
        type="button"
        onClick={locked ? undefined : onChange}
        aria-pressed={checked}
        aria-label={title}
        disabled={locked}
        className="relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300"
        style={{
          background: checked ? 'rgba(198,162,83,0.85)' : 'rgba(251,248,241,0.16)',
          cursor: locked ? 'not-allowed' : 'pointer',
          opacity: locked ? 0.75 : 1,
        }}
      >
        <span
          className="absolute top-0.5 h-5 w-5 rounded-full bg-ivory shadow transition-all duration-300"
          style={{ left: checked ? '1.375rem' : '0.125rem' }}
        />
      </button>
    </div>
  )
}
