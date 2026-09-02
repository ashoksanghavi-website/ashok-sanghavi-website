import { sql } from '../_lib/db.js'
import { bcrypt, createToken, setAuthCookie } from '../_lib/auth.js'

// Single-admin login against the admin_users table (email + bcrypt hash), so
// credentials can be changed from the panel and no env vars are needed for auth.
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { email, password } = req.body || {}
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' })

  const rows = await sql`SELECT email, password_hash FROM admin_users WHERE lower(email) = lower(${String(email)}) LIMIT 1`
  const ok = rows.length ? await bcrypt.compare(String(password), rows[0].password_hash) : false
  if (!ok) return res.status(401).json({ error: 'Invalid email or password' })

  const token = await createToken({ email: rows[0].email, role: 'admin' })
  setAuthCookie(res, token)
  res.status(200).json({ ok: true, email: rows[0].email })
}
