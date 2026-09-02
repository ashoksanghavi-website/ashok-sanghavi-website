import { createContext, useContext, useEffect, useState } from 'react'
import { contentDefaults } from './editable'

// Serves editable page content. Overrides come from /api/content and are layered
// over the built-in defaults, so a missing key (or a failed/empty API) always
// falls back to what ships — the site can never break for lack of content.
const SiteContentContext = createContext(null)

export function SiteContentProvider({ children }) {
  const [overrides, setOverrides] = useState({})

  useEffect(() => {
    let alive = true
    fetch('/api/content', { headers: { Accept: 'application/json' } })
      .then((r) => (r.ok ? r.json() : {}))
      .then((map) => { if (alive && map && typeof map === 'object') setOverrides(map) })
      .catch(() => { /* keep defaults */ })
    return () => { alive = false }
  }, [])

  return <SiteContentContext.Provider value={overrides}>{children}</SiteContentContext.Provider>
}

// Returns { t, img }. `t(key)` gives the override text or the built-in default;
// `img(key)` is the same but intended for image URLs. A per-call fallback can be
// passed as the second arg for keys not in the registry.
export function useSiteContent() {
  const overrides = useContext(SiteContentContext) || {}
  const pick = (key, fallback) => {
    const v = overrides[key]
    if (v != null && v !== '') return v
    if (key in contentDefaults) return contentDefaults[key]
    return fallback ?? ''
  }
  return { t: pick, img: pick }
}
