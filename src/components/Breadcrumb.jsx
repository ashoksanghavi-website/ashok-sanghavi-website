import { Link } from 'react-router-dom'

// items: [{ label, to }] — the final item renders as the current page (no link).
export default function Breadcrumb({ items = [], light = false }) {
  const base = light ? 'text-ivory/70' : 'text-ink-muted'
  const sep = light ? 'text-ivory/40' : 'text-gold/60'
  const current = light ? 'text-ivory' : 'text-emerald'
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 font-sans text-[0.78rem] tracking-wide">
      {items.map((it, i) => {
        const last = i === items.length - 1
        return (
          <span key={i} className="flex items-center gap-2">
            {last || !it.to ? (
              <span className={`${current} font-semibold`}>{it.label}</span>
            ) : (
              <Link to={it.to} className={`${base} transition-colors hover:text-gold`}>
                {it.label}
              </Link>
            )}
            {!last && <span className={sep}>/</span>}
          </span>
        )
      })}
    </nav>
  )
}
