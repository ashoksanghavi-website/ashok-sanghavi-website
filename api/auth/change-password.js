import { sql } from '../_lib/db.js'
import { bcrypt, requireAdmin } from '../_lib/auth.js'

export default async function handler(req, res) {
  const admin = await requireAdmin(req)
  if (!admin) return res.status(401).json({ error: 'Unauthorized' })
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { currentPassword, newPassword } = req.body || {}
  if (!currentPassword || !newPassword) return res.status(400).json({ error: 'Both passwords are required' })
  if (String(newPassword).length < 8) return res.status(400).json({ error: 'New password must be at least 8 characters' })

  const rows = await sql`SELECT password_hash FROM admin_users WHERE lower(email) = lower(${admin.email}) LIMIT 1`
  const ok = rows.length ? await bcrypt.compare(String(currentPassword), rows[0].password_hash) : false
  if (!ok) return res.status(401).json({ error: 'Current password is incorrect' })

  const newHash = bcrypt.hashSync(String(newPassword), 10)
  await sql`UPDATE admin_users SET password_hash = ${newHash} WHERE lower(email) = lower(${admin.email})`
  res.status(200).json({ ok: true })
}
