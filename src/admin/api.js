// Tiny fetch wrapper for the admin panel. Always sends the session cookie.
const handle = async (r) => {
  const data = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(data.error || `Request failed (${r.status})`)
  return data
}
const opts = (method, body) => ({
  method,
  credentials: 'include',
  headers: body ? { 'Content-Type': 'application/json' } : undefined,
  body: body ? JSON.stringify(body) : undefined,
})

export const api = {
  get: (u) => fetch(u, { credentials: 'include' }).then(handle),
  post: (u, b) => fetch(u, opts('POST', b)).then(handle),
  put: (u, b) => fetch(u, opts('PUT', b)).then(handle),
  patch: (u, b) => fetch(u, opts('PATCH', b)).then(handle),
  del: (u, b) => fetch(u, opts('DELETE', b)).then(handle),
}
