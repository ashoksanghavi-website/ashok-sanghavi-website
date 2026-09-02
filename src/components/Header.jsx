import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { nav, services, firm } from '../lib/site'
import Icon from './Icons'
import { useSchedule } from './ScheduleModal'

function Wordmark({ compact, light }) {
  return (
    <Link to="/" className="flex items-center gap-3 group" aria-label={`${firm.name} home`}>
      {/* Logo slot — replace /logo.svg to brand */}
      <span
        className="relative grid place-items-center overflow-hidden rounded-full border transition-all duration-500"
        style={{
          width: compact ? 38 : 44,
          height: compact ? 38 : 44,
          borderColor: light ? 'rgba(217,190,126,0.6)' : 'rgba(198,162,83,0.5)',
          background: light ? 'rgba(251,248,241,0.06)' : 'transparent',
        }}
      >
        {/* Logo slot — drop /public/logo.svg (or .png) and it appears here */}
        <img
          src="/logo.png"
          alt=""
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            e.currentTarget.nextElementSibling.style.display = 'block'
          }}
        />
        <span
          className="font-display text-lg leading-none"
          style={{ display: 'none', color: light ? 'var(--gold-light)' : 'var(--emerald)' }}
        >
          AS
        </span>
      </span>
      <span className="leading-tight">
        <span
          className="block font-display text-[1.05rem] sm:text-[1.15rem] tracking-tight transition-colors duration-500"
          style={{ color: light ? '#FBF8F1' : 'var(--emerald)' }}
        >
          Ashok Sanghavi
        </span>
        {/* gold rule + motto, echoing the brand lockup */}
        <span className="mt-1 block h-px w-6 bg-gold transition-all duration-500 sm:w-7" />
        <span
          className="mt-1 block font-sans text-[0.5rem] uppercase tracking-[0.2em] transition-colors duration-500 sm:text-[0.54rem]"
          style={{ color: light ? 'rgba(207,225,213,0.85)' : 'var(--ink-muted, #6E7B72)' }}
        >
          Peace of mind through planning
        </span>
      </span>
    </Link>
  )
}

export default function Header() {
  const openSchedule = useSchedule()
  const [scrolled, setScrolled] = useState(false)
  const [pastHero, setPastHero] = useState(false)
  const [open, setOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState(null)
  const [mobileSub, setMobileSub] = useState(null)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      // On home, the hero is pinned for its full (tall) height; only flip the
      // header to its solid/dark treatment once real content scrolls in.
      const hero = document.getElementById('scroll-hero')
      if (hero) {
        setPastHero(y > hero.offsetHeight - window.innerHeight * 1.05)
      } else {
        setPastHero(true)
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [location.pathname])

  useEffect(() => {
    setOpen(false)
    setOpenMenu(null)
    setMobileSub(null)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => (document.body.style.overflow = '')
  }, [open])

  // Light treatment while sitting transparent over the dark home hero.
  const solid = !isHome || pastHero
  const light = !solid
  const compact = scrolled && solid

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${light ? 'header-light' : ''}`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)',
          background: solid ? 'rgba(251,248,241,0.82)' : 'transparent',
          backdropFilter: solid ? 'blur(14px) saturate(1.1)' : 'none',
          boxShadow: solid ? '0 10px 40px -24px rgba(14,58,40,0.4)' : 'none',
          borderBottom: solid ? '1px solid rgba(198,162,83,0.18)' : '1px solid transparent',
        }}
      >
        {/* Utility bar — a slim premium top row that collapses on scroll */}
        <div
          className="hidden overflow-hidden border-b transition-all duration-500 xl:block"
          style={{
            height: compact ? 0 : 38,
            opacity: compact ? 0 : 1,
            borderColor: light ? 'rgba(251,248,241,0.14)' : 'rgba(198,162,83,0.16)',
          }}
        >
          <div
            className="container-wide flex h-[38px] items-center justify-between font-sans text-[0.74rem] tracking-wide"
            style={{ color: light ? 'rgba(207,225,213,0.9)' : 'var(--ink-muted, #6E7B72)' }}
          >
            <span className="inline-flex items-center gap-2 uppercase tracking-[0.2em]">
              <span className="text-gold-light">&#9670;</span>
              Fiduciary advisory · Elkhart, Indiana · Since 1988
            </span>
            <div className="flex items-center gap-6">
              <a href={firm.phoneHref} className="inline-flex items-center gap-2 transition-colors hover:text-gold-light">
                <Icon name="phone" size={14} className="text-gold-light" />
                {firm.phone}
              </a>
              <a href={`mailto:${firm.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-gold-light">
                <Icon name="mail" size={14} className="text-gold-light" />
                {firm.email}
              </a>
            </div>
          </div>
        </div>

        <div
          className="container-wide flex items-center justify-between transition-all duration-500"
          style={{ height: compact ? 68 : 88 }}
        >
          <Wordmark compact={compact} light={light} />

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-8">
            {nav.map((item) =>
              item.children ? (
                <div
                  key={item.to}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(item.to)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `nav-item font-sans text-[0.86rem] font-medium tracking-[0.02em] inline-flex items-center gap-1.5 ${
                        isActive
                          ? light ? 'text-gold-light' : 'text-emerald'
                          : light ? 'text-ivory/85 hover:text-ivory' : 'text-ink-soft hover:text-emerald'
                      }`
                    }
                  >
                    {item.label}
                    <svg
                      width="10" height="10" viewBox="0 0 12 12"
                      className="mt-0.5 opacity-60 transition-transform duration-300"
                      style={{ transform: openMenu === item.to ? 'rotate(180deg)' : 'none' }}
                    >
                      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
                    </svg>
                  </NavLink>
                  <AnimatePresence>
                    {openMenu === item.to && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className={`absolute top-full pt-4 ${item.to === '/services' ? 'left-1/2 -translate-x-1/2' : 'left-0'}`}
                      >
                        {item.to === '/services' ? (
                          <div className="w-[42rem] rounded-2xl border border-gold/25 bg-ivory p-3 shadow-lift" style={{ boxShadow: '0 30px 70px -28px rgba(14,58,40,0.5)' }}>
                            <div className="mb-1 flex items-center justify-between px-3 pt-2">
                              <span className="eyebrow">What we do</span>
                              <Link to="/services" className="font-sans text-[0.76rem] font-semibold text-emerald hover:text-gold-deep">
                                View all
                              </Link>
                            </div>
                            <div className="grid grid-cols-2 gap-1">
                              {services.map((s) => (
                                <Link
                                  key={s.slug}
                                  to={`/services/${s.slug}`}
                                  className="group flex items-start gap-3 rounded-xl px-3 py-3 transition-colors duration-300 hover:bg-cream"
                                >
                                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-gold/25 text-gold transition-all duration-300 group-hover:border-gold group-hover:bg-gold/10">
                                    <Icon name={s.icon} size={17} />
                                  </span>
                                  <span>
                                    <span className="block font-sans text-[0.86rem] font-semibold text-emerald">{s.title}</span>
                                    <span className="mt-0.5 block font-sans text-[0.76rem] leading-snug text-ink-muted">{s.blurb}</span>
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="w-72 rounded-2xl border border-gold/25 bg-ivory p-2 shadow-lift" style={{ boxShadow: '0 30px 70px -28px rgba(14,58,40,0.5)' }}>
                            {item.children.map((c) => (
                              <Link
                                key={c.to}
                                to={c.to}
                                className="group flex items-center justify-between rounded-xl px-4 py-3 transition-colors duration-300 hover:bg-cream"
                              >
                                <span className="font-sans text-[0.88rem] font-semibold text-emerald">{c.label}</span>
                                <Icon name="arrow" size={15} className="-translate-x-1 text-gold opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                              </Link>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `nav-item font-sans text-[0.86rem] font-medium tracking-[0.02em] ${
                      isActive
                        ? light ? 'text-gold-light' : 'text-emerald'
                        : light ? 'text-ivory/85 hover:text-ivory' : 'text-ink-soft hover:text-emerald'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              )
            )}
          </nav>

          <div className="hidden items-center gap-6 xl:flex">
            <span
              className="h-7 w-px"
              style={{ background: light ? 'rgba(217,190,126,0.4)' : 'rgba(198,162,83,0.35)' }}
            />
            <button type="button" onClick={openSchedule} className="btn-primary text-[0.9rem]">
              Book a consultation
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className={`grid h-12 w-12 place-items-center rounded-full border transition-all duration-500 xl:hidden ${
              light
                ? 'border-gold-light/50 text-ivory hover:bg-ivory/10'
                : 'border-gold/45 text-emerald hover:border-gold hover:bg-gold/10'
            }`}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span className="relative block h-[14px] w-[22px]">
              <span
                className="absolute left-0 top-[1px] h-[1.6px] w-full rounded-full bg-current transition-all duration-[450ms]"
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)',
                  transformOrigin: 'center',
                  transform: open ? 'translateY(6px) rotate(45deg)' : 'none',
                }}
              />
              <span
                className="absolute left-0 top-1/2 h-[1.6px] w-full -translate-y-1/2 rounded-full bg-current transition-all duration-300"
                style={{ opacity: open ? 0 : 1, transform: open ? 'translateX(8px)' : 'translateX(0)' }}
              />
              <span
                className="absolute bottom-[1px] left-0 h-[1.6px] w-full rounded-full bg-current transition-all duration-[450ms]"
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)',
                  transformOrigin: 'center',
                  transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none',
                }}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile slide-in menu — premium drawer with collapsible sections */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-40 xl:hidden">
            {/* Scrim */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute inset-0 h-full w-full cursor-default"
              style={{ background: 'rgba(10,42,27,0.42)', backdropFilter: 'blur(3px)' }}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col overflow-y-auto pt-28 pb-10"
              style={{
                background: 'linear-gradient(180deg, #FBF8F1 0%, #F5F0E6 100%)',
                boxShadow: '-30px 0 80px -40px rgba(14,58,40,0.55)',
              }}
            >
              {/* gold hairline on the drawer's leading edge */}
              <span className="pointer-events-none absolute inset-y-0 left-0 w-px" style={{ background: 'linear-gradient(180deg, transparent, rgba(198,162,83,0.7), transparent)' }} />

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="mb-2 flex items-center gap-2 px-7 font-sans text-[0.62rem] uppercase tracking-[0.34em] text-gold-deep"
              >
                <span className="text-gold">&#9670;</span> Menu
              </motion.p>

              <nav className="flex flex-col px-7">
                {nav.map((item, i) => {
                  const isSubOpen = mobileSub === item.to
                  return (
                    <motion.div
                      key={item.to}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.14 + i * 0.055, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="border-b border-gold/15"
                    >
                      {item.children ? (
                        <>
                          <button
                            onClick={() => setMobileSub(isSubOpen ? null : item.to)}
                            aria-expanded={isSubOpen}
                            className="flex w-full items-center justify-between py-4 text-left"
                          >
                            <span className="flex items-baseline gap-3">
                              <span className="font-sans text-[0.7rem] tabular-nums text-gold-deep/70">0{i + 1}</span>
                              <span className="font-display text-[1.7rem] leading-none text-emerald">{item.label}</span>
                            </span>
                            <span
                              className="grid h-8 w-8 place-items-center rounded-full border border-gold/30 text-gold transition-all duration-500"
                              style={{
                                transform: isSubOpen ? 'rotate(180deg)' : 'none',
                                background: isSubOpen ? 'rgba(198,162,83,0.12)' : 'transparent',
                              }}
                            >
                              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                          </button>
                          <AnimatePresence initial={false}>
                            {isSubOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                                className="overflow-hidden"
                              >
                                <div className="flex flex-col gap-0.5 pb-3 pl-8">
                                  <Link
                                    to={item.to}
                                    className="flex items-center gap-2 py-2 font-sans text-[0.82rem] font-semibold uppercase tracking-[0.16em] text-gold-deep"
                                  >
                                    All {item.label}
                                    <Icon name="arrow" size={14} className="text-gold" />
                                  </Link>
                                  {item.children.map((c) => (
                                    <Link
                                      key={c.to}
                                      to={c.to}
                                      className="group flex items-center gap-3 py-2 font-sans text-[0.98rem] text-ink-soft transition-colors hover:text-emerald"
                                    >
                                      <span className="h-1 w-1 rounded-full bg-gold/50 transition-all duration-300 group-hover:w-4 group-hover:bg-gold" />
                                      {c.label}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link to={item.to} className="flex items-baseline gap-3 py-4">
                          <span className="font-sans text-[0.7rem] tabular-nums text-gold-deep/70">0{i + 1}</span>
                          <span className="font-display text-[1.7rem] leading-none text-emerald">{item.label}</span>
                        </Link>
                      )}
                    </motion.div>
                  )
                })}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.5 }}
                className="mt-9 px-7"
              >
                <button
                  type="button"
                  onClick={() => { setOpen(false); openSchedule() }}
                  className="btn-primary w-full justify-center"
                >
                  Book a consultation
                </button>
                <div className="mt-6 flex flex-col gap-3">
                  <a href={firm.phoneHref} className="flex items-center gap-3 font-sans text-[0.92rem] text-ink-soft transition-colors hover:text-emerald">
                    <Icon name="phone" size={17} className="text-gold" /> {firm.phone}
                  </a>
                  <a href={`mailto:${firm.email}`} className="flex items-center gap-3 font-sans text-[0.92rem] text-ink-soft transition-colors hover:text-emerald">
                    <Icon name="mail" size={17} className="text-gold" /> {firm.email}
                  </a>
                </div>
                <p className="mt-7 font-sans text-[0.7rem] uppercase tracking-[0.24em] text-ink-muted">
                  Fiduciary advisory &middot; Elkhart, Indiana
                </p>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
