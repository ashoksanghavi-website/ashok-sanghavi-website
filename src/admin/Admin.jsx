import { useEffect, useState, useCallback } from 'react'
import { Routes, Route, Link, useNavigate, useParams, useLocation, Navigate } from 'react-router-dom'
import { api } from './api'
import RichText from './RichText'
import { MediaManager, MediaPickerModal } from './Media'
import PagesEditor from './PagesEditor'

const slugify = (s) =>
  String(s).toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')

const field =
  'w-full rounded-lg border border-emerald/15 bg-white px-3.5 py-2.5 text-[0.95rem] text-ink outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20'
const label = 'mb-1.5 block text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-ink-soft'
const btnGold = 'rounded-lg bg-gold px-5 py-2.5 text-[0.9rem] font-semibold text-emerald-deep transition hover:bg-gold-light disabled:opacity-60'
const btnGhost = 'rounded-lg border border-emerald/20 px-4 py-2.5 text-[0.9rem] font-semibold text-emerald transition hover:border-emerald hover:bg-emerald/5'

// ── Login ───────────────────────────────────────────────────────────
function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      await api.post('/api/auth/login', { email, password })
      onLogin()
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-cream px-6">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl border border-emerald/10 bg-white p-8 shadow-lift">
        <div className="mb-6 flex items-center gap-3">
          <img src="/logo.png" alt="" className="h-10 w-10 rounded-full" />
          <div>
            <p className="font-display text-lg leading-none text-emerald">Ashok Sanghavi</p>
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-ink-muted">Admin</p>
          </div>
        </div>
        <label className={label}>Email</label>
        <input className={field} type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus required />
        <label className={`${label} mt-4`}>Password</label>
        <input className={field} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="mt-3 text-[0.85rem] text-red-600">{error}</p>}
        <button className={`${btnGold} mt-6 w-full`} disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
      </form>
    </div>
  )
}

// ── Shell ───────────────────────────────────────────────────────────
function Shell({ email, onLogout, children }) {
  const loc = useLocation()
  const nav = (to, txt) => {
    const active = loc.pathname === to || (to !== '/admin' && loc.pathname.startsWith(to))
    return (
      <Link
        to={to}
        className={`rounded-lg px-3.5 py-2 text-[0.9rem] font-medium transition ${
          active ? 'bg-emerald text-ivory' : 'text-emerald hover:bg-emerald/8'
        }`}
      >
        {txt}
      </Link>
    )
  }
  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="sticky top-0 z-10 border-b border-emerald/10 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="" className="h-8 w-8 rounded-full" />
            <nav className="flex items-center gap-1">
              {nav('/admin/pages', 'Pages')}
              {nav('/admin/posts', 'Blog')}
              {nav('/admin/media', 'Media')}
              {nav('/admin/inbox', 'Inbox')}
            </nav>
          </div>
          <div className="flex items-center gap-3 text-[0.85rem]">
            <a href="/" target="_blank" rel="noreferrer" className="text-ink-soft hover:text-emerald">View site ↗</a>
            <Link to="/admin/account" className="hidden text-ink-soft hover:text-emerald sm:inline">{email}</Link>
            <button onClick={onLogout} className={btnGhost}>Log out</button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
    </div>
  )
}

// ── Posts list ──────────────────────────────────────────────────────
function PostsList() {
  const [posts, setPosts] = useState(null)
  const [err, setErr] = useState('')
  const load = useCallback(() => {
    api.get('/api/posts').then(setPosts).catch((e) => setErr(e.message))
  }, [])
  useEffect(load, [load])

  async function remove(slug) {
    if (!confirm('Delete this post? This cannot be undone.')) return
    await api.del(`/api/posts/${slug}`)
    load()
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl text-emerald">Blog posts</h1>
        <Link to="/admin/posts/new" className={btnGold}>+ New post</Link>
      </div>
      {err && <p className="text-red-600">{err}</p>}
      {!posts ? (
        <p className="text-ink-muted">Loading…</p>
      ) : posts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-emerald/20 bg-white p-10 text-center text-ink-muted">
          No posts yet. Create your first one.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-emerald/10 bg-white">
          {posts.map((p) => (
            <div key={p.id} className="flex items-center justify-between gap-4 border-b border-emerald/8 px-5 py-3.5 last:border-0">
              <div className="min-w-0">
                <p className="truncate font-medium text-emerald">{p.title}</p>
                <p className="text-[0.78rem] text-ink-muted">/{p.slug}</p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className={`rounded-full px-2.5 py-0.5 text-[0.7rem] font-semibold ${p.published ? 'bg-emerald/10 text-emerald' : 'bg-gold/15 text-gold-deep'}`}>
                  {p.published ? 'Published' : 'Draft'}
                </span>
                <Link to={`/admin/posts/${p.slug}`} className="text-[0.85rem] font-semibold text-emerald hover:text-gold-deep">Edit</Link>
                <button onClick={() => remove(p.slug)} className="text-[0.85rem] font-semibold text-red-500 hover:text-red-700">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Post editor ─────────────────────────────────────────────────────
const emptyPost = { slug: '', title: '', excerpt: '', body: '', cover_url: '', category: '', read_minutes: '', published: false }

function PostEditor() {
  const { slug } = useParams()
  const isNew = !slug
  const navigate = useNavigate()
  const [form, setForm] = useState(emptyPost)
  const [loaded, setLoaded] = useState(isNew)
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const [slugTouched, setSlugTouched] = useState(!isNew)
  const [coverPicker, setCoverPicker] = useState(false)

  useEffect(() => {
    if (isNew) return
    api.get(`/api/posts/${slug}`).then((p) => { setForm({ ...emptyPost, ...p, read_minutes: p.read_minutes ?? '' }); setLoaded(true) }).catch((e) => setErr(e.message))
  }, [slug, isNew])

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  async function save(e) {
    e.preventDefault()
    setErr('')
    setBusy(true)
    const payload = {
      ...form,
      slug: form.slug || slugify(form.title),
      read_minutes: form.read_minutes ? Number(form.read_minutes) : null,
    }
    try {
      if (isNew) await api.post('/api/posts', payload)
      else await api.put(`/api/posts/${slug}`, payload)
      navigate('/admin/posts')
    } catch (e2) {
      setErr(e2.message)
    } finally {
      setBusy(false)
    }
  }

  if (!loaded) return <p className="text-ink-muted">Loading…</p>

  return (
    <form onSubmit={save} className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl text-emerald">{isNew ? 'New post' : 'Edit post'}</h1>
        <Link to="/admin/posts" className="text-[0.85rem] text-ink-soft hover:text-emerald">← Back</Link>
      </div>

      <label className={label}>Title</label>
      <input className={field} value={form.title} onChange={(e) => { set('title', e.target.value); if (!slugTouched) set('slug', slugify(e.target.value)) }} required />

      <label className={`${label} mt-4`}>Slug (URL)</label>
      <input className={field} value={form.slug} onChange={(e) => { setSlugTouched(true); set('slug', slugify(e.target.value)) }} placeholder="auto from title" />

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label}>Category</label>
          <input className={field} value={form.category || ''} onChange={(e) => set('category', e.target.value)} />
        </div>
        <div>
          <label className={label}>Read minutes</label>
          <input className={field} type="number" value={form.read_minutes} onChange={(e) => set('read_minutes', e.target.value)} />
        </div>
      </div>

      <label className={`${label} mt-4`}>Cover image</label>
      <div className="flex items-start gap-3">
        <div className="grid h-20 w-28 shrink-0 place-items-center overflow-hidden rounded-lg border border-emerald/15 bg-white text-[0.7rem] text-ink-muted">
          {form.cover_url ? <img src={form.cover_url} alt="" className="h-full w-full object-cover" /> : 'No cover'}
        </div>
        <div className="flex-1">
          <input className={field} value={form.cover_url || ''} onChange={(e) => set('cover_url', e.target.value)} placeholder="Paste a URL or choose from the library" />
          <div className="mt-2 flex gap-2">
            <button type="button" className={btnGhost} onClick={() => setCoverPicker(true)}>Choose / upload</button>
            {form.cover_url && <button type="button" className={btnGhost} onClick={() => set('cover_url', '')}>Remove</button>}
          </div>
        </div>
      </div>

      <label className={`${label} mt-4`}>Excerpt</label>
      <textarea className={`${field} resize-y`} rows={2} value={form.excerpt || ''} onChange={(e) => set('excerpt', e.target.value)} placeholder="A short summary shown on the blog list" />

      <label className={`${label} mt-4`}>Body</label>
      <RichText value={form.body || ''} onChange={(html) => set('body', html)} />

      <MediaPickerModal open={coverPicker} onClose={() => setCoverPicker(false)} onPick={(url) => { set('cover_url', url); setCoverPicker(false) }} />

      <label className="mt-5 flex items-center gap-2.5 text-[0.9rem] text-emerald">
        <input type="checkbox" checked={!!form.published} onChange={(e) => set('published', e.target.checked)} className="h-4 w-4 accent-emerald" />
        Published (visible on the site)
      </label>

      {err && <p className="mt-3 text-red-600">{err}</p>}
      <div className="mt-6 flex gap-3">
        <button className={btnGold} disabled={busy}>{busy ? 'Saving…' : 'Save'}</button>
        <Link to="/admin/posts" className={btnGhost}>Cancel</Link>
      </div>
    </form>
  )
}

// ── Inbox ───────────────────────────────────────────────────────────
function Inbox() {
  const [items, setItems] = useState(null)
  const [err, setErr] = useState('')
  const load = useCallback(() => { api.get('/api/submissions').then(setItems).catch((e) => setErr(e.message)) }, [])
  useEffect(load, [load])

  async function mark(id, status) { await api.patch('/api/submissions', { id, status }); load() }
  async function remove(id) { if (!confirm('Delete this message?')) return; await api.del('/api/submissions', { id }); load() }

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl text-emerald">Contact inbox</h1>
      {err && <p className="text-red-600">{err}</p>}
      {!items ? (
        <p className="text-ink-muted">Loading…</p>
      ) : items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-emerald/20 bg-white p-10 text-center text-ink-muted">No messages yet.</div>
      ) : (
        <div className="space-y-3">
          {items.map((m) => (
            <div key={m.id} className={`rounded-xl border bg-white p-5 ${m.status === 'new' ? 'border-gold/40' : 'border-emerald/10'}`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="font-semibold text-emerald">{m.name || 'Anonymous'}</span>
                  <span className="ml-2 text-[0.85rem] text-ink-muted">{m.email}{m.phone ? ` · ${m.phone}` : ''}</span>
                </div>
                <div className="flex items-center gap-2 text-[0.78rem]">
                  <span className="rounded-full bg-emerald/8 px-2 py-0.5 text-ink-soft">{m.source}</span>
                  <span className="text-ink-muted">{new Date(m.created_at).toLocaleString()}</span>
                </div>
              </div>
              {m.message && <p className="mt-2.5 whitespace-pre-wrap text-[0.92rem] text-ink-soft">{m.message}</p>}
              <div className="mt-3 flex items-center gap-3 text-[0.8rem] font-semibold">
                {m.status !== 'read' && <button onClick={() => mark(m.id, 'read')} className="text-emerald hover:text-gold-deep">Mark read</button>}
                {m.status !== 'archived' && <button onClick={() => mark(m.id, 'archived')} className="text-ink-soft hover:text-emerald">Archive</button>}
                <a href={`mailto:${m.email}`} className="text-emerald hover:text-gold-deep">Reply ↗</a>
                <button onClick={() => remove(m.id)} className="text-red-500 hover:text-red-700">Delete</button>
                <span className={`ml-auto rounded-full px-2 py-0.5 ${m.status === 'new' ? 'bg-gold/15 text-gold-deep' : 'bg-emerald/8 text-ink-soft'}`}>{m.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Account (change password) ───────────────────────────────────────
function Account() {
  const [cur, setCur] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [msg, setMsg] = useState(null)
  const [busy, setBusy] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setMsg(null)
    if (next !== confirm) return setMsg({ type: 'err', text: 'New passwords do not match' })
    setBusy(true)
    try {
      await api.post('/api/auth/change-password', { currentPassword: cur, newPassword: next })
      setMsg({ type: 'ok', text: 'Password changed. Use it next time you log in.' })
      setCur(''); setNext(''); setConfirm('')
    } catch (e2) {
      setMsg({ type: 'err', text: e2.message })
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} className="mx-auto max-w-md">
      <h1 className="mb-6 font-display text-2xl text-emerald">Change password</h1>
      <label className={label}>Current password</label>
      <input className={field} type="password" value={cur} onChange={(e) => setCur(e.target.value)} required />
      <label className={`${label} mt-4`}>New password</label>
      <input className={field} type="password" value={next} onChange={(e) => setNext(e.target.value)} required minLength={8} />
      <label className={`${label} mt-4`}>Confirm new password</label>
      <input className={field} type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
      {msg && <p className={`mt-3 text-[0.9rem] ${msg.type === 'ok' ? 'text-emerald' : 'text-red-600'}`}>{msg.text}</p>}
      <button className={`${btnGold} mt-6`} disabled={busy}>{busy ? 'Saving…' : 'Update password'}</button>
    </form>
  )
}

// ── Root ────────────────────────────────────────────────────────────
export default function Admin() {
  const [auth, setAuth] = useState({ loading: true, user: null })
  const location = useLocation()

  const check = useCallback(() => {
    api.get('/api/auth/me').then((d) => setAuth({ loading: false, user: d.authenticated ? d : null })).catch(() => setAuth({ loading: false, user: null }))
  }, [])
  useEffect(check, [check])

  async function logout() {
    try { await api.post('/api/auth/logout') } catch { /* ignore */ }
    setAuth({ loading: false, user: null })
  }

  if (auth.loading) return <div className="grid min-h-screen place-items-center bg-cream text-ink-muted">Loading…</div>
  if (!auth.user) {
    if (location.pathname !== '/admin/login') return <Navigate to="/admin/login" replace />
    return <Login onLogin={check} />
  }
  if (location.pathname === '/admin/login') return <Navigate to="/admin/posts" replace />

  return (
    <Shell email={auth.user.email} onLogout={logout}>
      <Routes>
        <Route index element={<Navigate to="/admin/pages" replace />} />
        <Route path="pages" element={<PagesEditor />} />
        <Route path="posts" element={<PostsList />} />
        <Route path="posts/new" element={<PostEditor />} />
        <Route path="posts/:slug" element={<PostEditor />} />
        <Route path="media" element={<MediaManager />} />
        <Route path="inbox" element={<Inbox />} />
        <Route path="account" element={<Account />} />
        <Route path="*" element={<Navigate to="/admin/posts" replace />} />
      </Routes>
    </Shell>
  )
}
