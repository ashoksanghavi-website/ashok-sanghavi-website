import { useCallback, useEffect, useRef, useState } from 'react'
import { api } from './api'
import { fileToUpload } from './mediaUtils'

const btnGold =
  'rounded-lg bg-gold px-4 py-2 text-[0.88rem] font-semibold text-emerald-deep transition hover:bg-gold-light disabled:opacity-60'
const btnGhost =
  'rounded-lg border border-emerald/20 px-4 py-2 text-[0.88rem] font-semibold text-emerald transition hover:border-emerald hover:bg-emerald/5'

// Shared data hook: list, upload (with client-side downscale), delete.
export function useMedia() {
  const [items, setItems] = useState(null)
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  const reload = useCallback(() => {
    api.get('/api/media').then(setItems).catch((e) => setErr(e.message))
  }, [])
  useEffect(reload, [reload])

  const upload = useCallback(async (file) => {
    setErr('')
    setBusy(true)
    try {
      const payload = await fileToUpload(file)
      const saved = await api.post('/api/media', {
        filename: payload.filename,
        mime: payload.mime,
        data: payload.data,
      })
      reload()
      return saved // { id, url }
    } catch (e) {
      setErr(e.message)
      throw e
    } finally {
      setBusy(false)
    }
  }, [reload])

  const remove = useCallback(async (id) => {
    await api.del('/api/media', { id })
    reload()
  }, [reload])

  return { items, err, busy, reload, upload, remove }
}

// A reusable grid of thumbnails. onPick(url) is optional (picker mode).
function MediaGrid({ items, onPick, onDelete }) {
  if (!items) return <p className="text-ink-muted">Loading…</p>
  if (items.length === 0)
    return (
      <div className="rounded-xl border border-dashed border-emerald/20 bg-white p-10 text-center text-ink-muted">
        No images yet. Upload your first one.
      </div>
    )
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {items.map((m) => (
        <div key={m.id} className="group relative overflow-hidden rounded-lg border border-emerald/10 bg-white">
          <button
            type="button"
            onClick={() => onPick && onPick(m.url)}
            className={`block aspect-[4/3] w-full ${onPick ? 'cursor-pointer' : 'cursor-default'}`}
            title={onPick ? 'Use this image' : m.filename}
          >
            <img src={m.url} alt={m.filename} className="h-full w-full object-cover" loading="lazy" />
          </button>
          <div className="flex items-center justify-between gap-2 px-2 py-1.5">
            <span className="truncate text-[0.72rem] text-ink-muted" title={m.filename}>{m.filename}</span>
            {onDelete && (
              <button
                type="button"
                onClick={() => onDelete(m)}
                className="shrink-0 text-[0.72rem] font-semibold text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function UploadButton({ onFiles, busy, label = 'Upload image' }) {
  const ref = useRef(null)
  return (
    <>
      <button type="button" className={btnGold} disabled={busy} onClick={() => ref.current?.click()}>
        {busy ? 'Uploading…' : label}
      </button>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) onFiles(f)
          e.target.value = ''
        }}
      />
    </>
  )
}

// Modal picker — used from the post editor to choose/insert an image.
export function MediaPickerModal({ open, onClose, onPick }) {
  const { items, err, busy, upload } = useMedia()
  if (!open) return null

  async function handleUpload(file) {
    try {
      const saved = await upload(file)
      onPick(saved.url) // auto-use the freshly uploaded image
    } catch { /* handled in hook */ }
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-emerald-deep/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative flex max-h-[80vh] w-[min(48rem,100%)] flex-col overflow-hidden rounded-2xl border border-emerald/15 bg-cream">
        <div className="flex items-center justify-between border-b border-emerald/10 bg-white px-5 py-3">
          <h3 className="font-display text-lg text-emerald">Media library</h3>
          <div className="flex items-center gap-2">
            <UploadButton onFiles={handleUpload} busy={busy} />
            <button type="button" onClick={onClose} className={btnGhost}>Close</button>
          </div>
        </div>
        {err && <p className="px-5 pt-3 text-[0.85rem] text-red-600">{err}</p>}
        <div className="overflow-y-auto p-5">
          <MediaGrid items={items} onPick={onPick} />
        </div>
      </div>
    </div>
  )
}

// Full "Media" admin page.
export function MediaManager() {
  const { items, err, busy, upload, remove } = useMedia()
  const [copied, setCopied] = useState(null)

  async function onDelete(m) {
    if (!confirm(`Delete "${m.filename}"? Anything using it will break.`)) return
    await remove(m.id)
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl text-emerald">Media</h1>
        <UploadButton onFiles={upload} busy={busy} />
      </div>
      {err && <p className="mb-3 text-red-600">{err}</p>}
      {copied && <p className="mb-3 text-[0.85rem] text-emerald">Link copied: {copied}</p>}
      <MediaGrid
        items={items}
        onPick={(url) => {
          navigator.clipboard?.writeText(location.origin + url).then(() => setCopied(url)).catch(() => {})
        }}
        onDelete={onDelete}
      />
      <p className="mt-4 text-[0.8rem] text-ink-muted">Tip: click an image to copy its link.</p>
    </div>
  )
}
