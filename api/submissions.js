import { sql } from './_lib/db.js'
import { requireAdmin } from './_lib/auth.js'

// Admin-only inbox for contact / get-in-touch submissions.
export default async function handler(req, res) {
  const admin = await requireAdmin(req)
  if (!admin) return res.status(401).json({ error: 'Unauthorized' })

  if (req.method === 'GET') {
    const rows = await sql`SELECT * FROM contact_submissions ORDER BY created_at DESC`
    return res.status(200).json(rows)
  }

  if (req.method === 'PATCH') {
    const { id, status } = req.body || {}
    if (!id || !status) return res.status(400).json({ error: 'id and status are required' })
    if (!['new', 'read', 'archived'].includes(status)) return res.status(400).json({ error: 'Invalid status' })
    await sql`UPDATE contact_submissions SET status = ${status} WHERE id = ${id}`
    return res.status(200).json({ ok: true })
  }

  if (req.method === 'DELETE') {
    const { id } = req.body || {}
    if (!id) return res.status(400).json({ error: 'id is required' })
    await sql`DELETE FROM contact_submissions WHERE id = ${id}`
    return res.status(200).json({ ok: true })
  }

  res.status(405).json({ error: 'Method not allowed' })
}
