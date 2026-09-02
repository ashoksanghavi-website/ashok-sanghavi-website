import { useCallback, useEffect, useMemo, useState } from 'react'
import { api } from './api'
import { MediaPickerModal } from './Media'
import { contentSchema, contentDefaults } from '../lib/editable'

const field =
  'w-full rounded-lg border border-emerald/15 bg-white px-3.5 py-2.5 text-[0.95rem] text-ink outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20'
const label = 'mb-1.5 block text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-ink-soft'
const btnGold = 'rounded-lg bg-gold px-5 py-2.5 text-[0.9rem] font-semibold text-emerald-deep transition hover:bg-gold-light disabled:opacity-60'
const btnGhost = 'rounded-lg border border-emerald/20 px-4 py-2 text-[0.85rem] font-semibold text-emerald transition hover:border-emerald hover:bg-emerald/5'

const allFields = contentSchema.flatMap((p) => p.groups.flatMap((g) => g.fields))

export default function PagesEditor() {
  const [values, setValues] = useState(null) // key -> current value
  const [initial, setInitial] = useState({})
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const [saved, setSaved] = useState(false)
  const [picker, setPicker] = useState(null) // key currently choosing an image for
  const [activePage, setActivePage] = useState(contentSchema[0]?.page)

  const load = useCallback(() => {
    api.get('/api/content')
      .then((overrides) => {
        const v = {}
        for (const f of allFields) v[f.key] = overrides[f.key] ?? f.default
        setValues(v)
        setInitial(v)
      })
      .catch((e) => setErr(e.message))
  }, [])
  useEffect(load, [load])

  const set = (key, val) => { setValues((v) => ({ ...v, [key]: val })); setSaved(false) }

  const dirty = useMemo(() => {
    if (!values) return []
    return allFields.filter((f) => (values[f.key] ?? '') !== (initial[f.key] ?? '')).map((f) => f.key)
  }, [values, initial])

  async function saveAll() {
    setErr(''); setBusy(true)
    try {
      for (const key of dirty) {
        const f = allFields.find((x) => x.key === key)
        const val = values[key]
        // If it matches the built-in default, clear the override to keep it clean.
        await api.put('/api/content', { key, value: val === f.default ? '' : val })
      }
      setInitial(values)
      setSaved(true)
    } catch (e) {
      setErr(e.message)
    } finally {
      setBusy(false)
    }
  }

  if (!values) return <p className="text-ink-muted">Loading…</p>

  const page = contentSchema.find((p) => p.page === activePage) || contentSchema[0]

  return (
    <div className="pb-24">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl text-emerald">Pages</h1>
        <a href="/" target="_blank" rel="noreferrer" className="text-[0.85rem] text-ink-soft hover:text-emerald">View site ↗</a>
      </div>

      {/* page tabs */}
      <div className="mb-7 flex flex-wrap gap-2">
        {contentSchema.map((p) => (
          <button
            key={p.page}
            onClick={() => setActivePage(p.page)}
            className={`rounded-full px-4 py-1.5 text-[0.85rem] font-semibold transition ${
              p.page === activePage ? 'bg-emerald text-ivory' : 'border border-emerald/20 text-emerald hover:bg-emerald/5'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {err && <p className="mb-3 text-red-600">{err}</p>}

      <div className="space-y-8">
        {page.groups.map((g) => (
          <div key={g.label} className="rounded-xl border border-emerald/10 bg-white p-5">
            <h2 className="mb-4 font-display text-lg text-emerald">{g.label}</h2>
            <div className="space-y-5">
              {g.fields.map((f) => (
                <Field
                  key={f.key}
                  f={f}
                  value={values[f.key]}
                  onChange={(v) => set(f.key, v)}
                  onReset={() => set(f.key, f.default)}
                  onPickImage={() => setPicker(f.key)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* sticky save bar */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-emerald/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <span className="text-[0.85rem] text-ink-muted">
            {saved ? 'All changes saved.' : dirty.length ? `${dirty.length} unsaved change${dirty.length > 1 ? 's' : ''}` : 'No changes'}
          </span>
          <button className={btnGold} disabled={busy || !dirty.length} onClick={saveAll}>
            {busy ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </div>

      <MediaPickerModal
        open={!!picker}
        onClose={() => setPicker(null)}
        onPick={(url) => { set(picker, url); setPicker(null) }}
      />
    </div>
  )
}

function Field({ f, value, onChange, onReset, onPickImage }) {
  const changed = value !== f.default
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className={label}>{f.label}</label>
        {changed && (
          <button type="button" onClick={onReset} className="mb-1.5 text-[0.72rem] font-semibold text-gold-deep hover:text-emerald">
            Reset to default
          </button>
        )}
      </div>

      {f.type === 'image' ? (
        <div className="flex items-start gap-3">
          <div className="grid h-20 w-28 shrink-0 place-items-center overflow-hidden rounded-lg border border-emerald/15 bg-cream text-[0.7rem] text-ink-muted">
            {value ? <img src={value} alt="" className="h-full w-full object-cover" /> : 'No image'}
          </div>
          <div className="flex-1">
            <input className={field} value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder="Image URL" />
            <button type="button" className={`${btnGhost} mt-2`} onClick={onPickImage}>Choose / upload</button>
          </div>
        </div>
      ) : f.type === 'multiline' ? (
        <textarea className={`${field} resize-y`} rows={4} value={value || ''} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input className={field} value={value || ''} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  )
}
