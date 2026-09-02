import Reveal from './Reveal'
import Icon from './Icons'
import { firm } from '../lib/site'
import { useSchedule } from './ScheduleModal'

// One shared CTA API (eyebrow / heading / sub) with a family of DISTINCT,
// compact, premium designs chosen per page via `variant`. No two pages share a
// look. Backgrounds alternate emerald and cream so the site never feels heavy.

const EMERALD_BG = 'linear-gradient(158deg, #17603F 0%, #124A32 55%, #0E3A28 100%)'

function Fleuron({ className = '' }) {
  return (
    <svg width="150" height="14" viewBox="0 0 150 14" className={`text-gold-light ${className}`} fill="none" aria-hidden="true">
      <line x1="14" y1="7" x2="60" y2="7" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <circle cx="66" cy="7" r="1.4" fill="currentColor" />
      <path d="M75 1 l5.5 6 -5.5 6 -5.5 -6 z" fill="currentColor" />
      <circle cx="84" cy="7" r="1.4" fill="currentColor" />
      <line x1="90" y1="7" x2="136" y2="7" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    </svg>
  )
}

// buttons ------------------------------------------------------------
function GoldPrimary({ label = 'Schedule a meeting' }) {
  const openSchedule = useSchedule()
  return <button type="button" onClick={openSchedule} className="btn-gold w-full sm:w-auto">{label}</button>
}
function CallGhost() {
  return (
    <a href={firm.phoneHref} className="btn-ghost w-full border-ivory/25 text-ivory hover:border-gold hover:text-gold-light sm:w-auto">
      <Icon name="phone" size={18} />
      Call {firm.phone}
    </a>
  )
}
function EmeraldPrimary({ label = 'Schedule a meeting' }) {
  const openSchedule = useSchedule()
  return <button type="button" onClick={openSchedule} className="btn-primary w-full sm:w-auto">{label}</button>
}
function CallTextLink() {
  return (
    <a href={firm.phoneHref} className="link-gold font-sans text-[0.95rem] text-ink-soft">
      or call {firm.phone}
    </a>
  )
}

// ── DARK: centered band (primary) ───────────────────────────────────
function BandCTA({ eyebrow, heading, sub }) {
  return (
    <section className="relative overflow-hidden py-16 text-ivory sm:py-20" style={{ background: EMERALD_BG }}>
      <div className="pointer-events-none absolute inset-0 opacity-80" style={{ background: 'radial-gradient(70% 100% at 50% 0%, rgba(198,162,83,0.16), transparent 60%)' }} />
      <div className="container-lux relative z-10">
        <Reveal className="mx-auto max-w-2xl text-center" variant="scale">
          <Fleuron className="mx-auto" />
          <p className="eyebrow eyebrow--center mt-6 justify-center text-gold-light">{eyebrow}</p>
          <h2 className="mt-5 font-display text-[2rem] leading-[1.12] text-ivory sm:text-[2.6rem]">{heading}</h2>
          {sub && <p className="mx-auto mt-5 max-w-xl text-body text-sage-light">{sub}</p>}
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <GoldPrimary />
            <CallGhost />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── DARK: asymmetric split panel ────────────────────────────────────
function PanelCTA({ eyebrow, heading, sub }) {
  const openSchedule = useSchedule()
  return (
    <section className="relative overflow-hidden py-16 text-ivory sm:py-20" style={{ background: EMERALD_BG }}>
      <div className="pointer-events-none absolute inset-0 opacity-70" style={{ background: 'radial-gradient(60% 90% at 100% 100%, rgba(198,162,83,0.14), transparent 60%)' }} />
      <div className="container-lux relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal variant="left">
            <p className="eyebrow text-gold-light">{eyebrow}</p>
            <h2 className="mt-4 font-display text-[1.9rem] leading-[1.14] text-ivory sm:text-[2.4rem]">{heading}</h2>
            {sub && <p className="mt-4 max-w-lg text-body text-sage-light">{sub}</p>}
          </Reveal>
          <Reveal variant="right" delay={120}>
            <div className="rounded-2xl border border-gold/30 bg-ivory/[0.04] p-7 backdrop-blur-sm">
              <p className="font-sans text-[0.72rem] uppercase tracking-[0.22em] text-gold-light">Prefer to talk now?</p>
              <a href={firm.phoneHref} className="mt-3 block font-display text-[1.6rem] text-ivory transition-colors hover:text-gold-light">{firm.phone}</a>
              <p className="mt-2 text-[0.9rem] text-sage-light">Monday to Friday, a real person answers.</p>
              <button type="button" onClick={openSchedule} className="btn-gold mt-6 w-full justify-center">Schedule a meeting</button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ── DARK: monogram seal watermark, single action ────────────────────
function SealCTA({ eyebrow, heading, sub }) {
  const openSchedule = useSchedule()
  return (
    <section className="relative overflow-hidden py-16 text-ivory sm:py-20" style={{ background: EMERALD_BG }}>
      <div className="pointer-events-none absolute inset-0 grid place-items-center opacity-[0.06]">
        <span className="font-display text-[22rem] leading-none text-gold-light">AS</span>
      </div>
      <div className="container-lux relative z-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-gold/50 font-display text-lg text-gold-light">AS</span>
          <p className="eyebrow eyebrow--center mt-6 justify-center text-gold-light">{eyebrow}</p>
          <h2 className="mt-4 font-display text-[2rem] leading-[1.12] text-ivory sm:text-[2.5rem]">{heading}</h2>
          {sub && <p className="mx-auto mt-5 max-w-xl text-body text-sage-light">{sub}</p>}
          <button type="button" onClick={openSchedule} className="btn-gold mt-9">Book a consultation</button>
        </Reveal>
      </div>
    </section>
  )
}

// ── DARK: info chips, left aligned ──────────────────────────────────
function ContactCTA({ eyebrow, heading, sub }) {
  const openSchedule = useSchedule()
  return (
    <section className="relative overflow-hidden py-16 text-ivory sm:py-20" style={{ background: EMERALD_BG }}>
      <div className="container-lux relative z-10">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-gold-light">{eyebrow}</p>
          <h2 className="mt-4 font-display text-[1.9rem] leading-[1.14] text-ivory sm:text-[2.4rem]">{heading}</h2>
          {sub && <p className="mt-4 max-w-xl text-body text-sage-light">{sub}</p>}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button type="button" onClick={openSchedule} className="btn-gold">Schedule a meeting</button>
            <a href={firm.phoneHref} className="inline-flex items-center gap-2.5 rounded-full border border-ivory/20 px-5 py-3 font-sans text-[0.92rem] text-ivory transition-all hover:border-gold hover:bg-gold/10">
              <Icon name="phone" size={17} className="text-gold-light" /> {firm.phone}
            </a>
            <a href={`mailto:${firm.email}`} className="inline-flex items-center gap-2.5 rounded-full border border-ivory/20 px-5 py-3 font-sans text-[0.92rem] text-ivory transition-all hover:border-gold hover:bg-gold/10">
              <Icon name="mail" size={17} className="text-gold-light" /> {firm.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── DARK: gold left-bar editorial plate ─────────────────────────────
function EditorialCTA({ eyebrow, heading, sub }) {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20" style={{ background: EMERALD_BG }}>
      <div className="container-lux relative z-10">
        <Reveal variant="left">
          <div className="relative overflow-hidden rounded-2xl border border-gold/20 bg-ivory/[0.03] py-9 pl-10 pr-8 text-ivory sm:pl-14">
            <span className="absolute inset-y-0 left-0 w-1.5" style={{ background: 'linear-gradient(180deg, var(--gold-light), var(--gold-deep))' }} />
            <p className="eyebrow text-gold-light">{eyebrow}</p>
            <h2 className="mt-4 max-w-2xl font-display text-[1.9rem] leading-[1.14] text-ivory sm:text-[2.35rem]">{heading}</h2>
            {sub && <p className="mt-4 max-w-xl text-body text-sage-light">{sub}</p>}
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <GoldPrimary label="Start a conversation" />
              <CallGhost />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── DARK: watch-and-learn ring motif ────────────────────────────────
function RingCTA({ eyebrow, heading, sub }) {
  return (
    <section className="relative overflow-hidden py-16 text-ivory sm:py-20" style={{ background: EMERALD_BG }}>
      <div className="container-lux relative z-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="relative mx-auto grid h-16 w-16 place-items-center">
            <span className="absolute inset-0 rounded-full border border-gold/40" />
            <span className="absolute inset-[6px] rounded-full border border-gold/25" />
            <Icon name="play" size={22} className="relative text-gold-light" />
          </span>
          <p className="eyebrow eyebrow--center mt-6 justify-center text-gold-light">{eyebrow}</p>
          <h2 className="mt-4 font-display text-[2rem] leading-[1.12] text-ivory sm:text-[2.5rem]">{heading}</h2>
          {sub && <p className="mx-auto mt-5 max-w-xl text-body text-sage-light">{sub}</p>}
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <GoldPrimary label="Talk with Ashok" />
            <CallGhost />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── LIGHT: editorial pull-quote ─────────────────────────────────────
function QuoteCTA({ eyebrow, heading, sub }) {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20" style={{ background: 'var(--cream)' }}>
      <div className="container-lux relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="block font-display text-[4.5rem] leading-[0.6] text-gold/50">&ldquo;</span>
          <p className="eyebrow eyebrow--center mt-4 justify-center">{eyebrow}</p>
          <h2 className="mt-4 font-display text-[2rem] italic leading-[1.16] text-emerald sm:text-[2.5rem]">{heading}</h2>
          <hr className="rule-gold mx-auto mt-6 w-20" />
          {sub && <p className="mx-auto mt-5 max-w-xl text-body text-ink-soft">{sub}</p>}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
            <EmeraldPrimary label="Book a consultation" />
            <CallTextLink />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── LIGHT: ultra-slim single line ───────────────────────────────────
function MinimalCTA({ eyebrow, heading, sub }) {
  const openSchedule = useSchedule()
  return (
    <section className="relative overflow-hidden py-14 sm:py-16" style={{ background: 'var(--ivory)' }}>
      <div className="container-lux relative">
        <Reveal className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="flex items-center gap-5">
            <span className="hidden h-10 w-px bg-gold/40 lg:block" />
            <div>
              <p className="eyebrow">{eyebrow}</p>
              <h2 className="mt-2 font-display text-[1.65rem] leading-tight text-emerald sm:text-[2.05rem]">{heading}</h2>
            </div>
          </div>
          <button type="button" onClick={openSchedule} className="btn-primary shrink-0">Book a consultation</button>
        </Reveal>
      </div>
    </section>
  )
}

// ── LIGHT: compact bordered note card ───────────────────────────────
function NoteCTA({ eyebrow, heading, sub }) {
  return (
    <section className="relative overflow-hidden py-14 sm:py-16" style={{ background: 'var(--ivory)' }}>
      <div className="container-lux relative">
        <Reveal className="mx-auto max-w-2xl" variant="scale">
          <div className="relative rounded-[1.3rem] border border-gold/30 bg-cream p-8 text-center sm:p-10">
            <span className="absolute left-1/2 top-0 h-px w-24 -translate-x-1/2" style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
            <p className="eyebrow eyebrow--center justify-center">{eyebrow}</p>
            <h2 className="mt-3 font-display text-[1.7rem] leading-snug text-emerald sm:text-[2.05rem]">{heading}</h2>
            {sub && <p className="mx-auto mt-4 max-w-lg text-body text-ink-soft">{sub}</p>}
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5">
              <EmeraldPrimary label="Start the conversation" />
              <CallTextLink />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── LIGHT: airy gold-diamond divider ────────────────────────────────
function DividerCTA({ eyebrow, heading, sub }) {
  return (
    <section className="relative overflow-hidden py-14 sm:py-20" style={{ background: 'var(--ivory)' }}>
      <div className="container-lux relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="mx-auto block h-3 w-3 rotate-45 rounded-[2px] bg-gold" />
          <p className="eyebrow eyebrow--center mt-6 justify-center">{eyebrow}</p>
          <h2 className="mt-4 font-display text-[1.9rem] leading-[1.14] text-emerald sm:text-[2.4rem]">{heading}</h2>
          {sub && <p className="mx-auto mt-5 max-w-xl text-body text-ink-soft">{sub}</p>}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
            <EmeraldPrimary label="Talk with Ashok" />
            <CallTextLink />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const VARIANTS = {
  band: BandCTA,
  panel: PanelCTA,
  seal: SealCTA,
  contact: ContactCTA,
  editorial: EditorialCTA,
  ring: RingCTA,
  quote: QuoteCTA,
  minimal: MinimalCTA,
  note: NoteCTA,
  divider: DividerCTA,
}

export default function CTASection({
  eyebrow = 'Let us begin',
  heading = 'A no cost, no obligation conversation about your future.',
  sub = 'A calm, unhurried conversation about where you are and where you want to be.',
  variant = 'band',
}) {
  const Cmp = VARIANTS[variant] || BandCTA
  return <Cmp eyebrow={eyebrow} heading={heading} sub={sub} />
}
