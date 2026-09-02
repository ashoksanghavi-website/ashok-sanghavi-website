import { sql } from '../_lib/db.js'
import { requireAdmin } from '../_lib/auth.js'

// Editable page content (text blocks + image URLs), keyed by a stable string.
// The public site reads the whole map and falls back to the built-in defaults
// for any key that has no override, so the site never breaks if this is empty.
export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const rows = await sql`SELECT key, value FROM site_content`
      const map = {}
      for (const r of rows) map[r.key] = r.value
      res.setHeader('Cache-Control', 'no-store')
      return res.status(200).json(map)
    } catch {
      return res.status(200).json({}) // never break the site
    }
  }

  // Mutations — admin only.
  const admin = await requireAdmin(req)
  if (!admin) return res.status(401).json({ error: 'Unauthorized' })

  if (req.method === 'PUT') {
    const { key, value } = req.body || {}
    if (!key) return res.status(400).json({ error: 'key is required' })
    // Empty / null value clears the override (reverts to the built-in default).
    if (value == null || value === '') {
      await sql`DELETE FROM site_content WHERE key = ${key}`
      return res.status(200).json({ ok: true, cleared: true })
    }
    await sql`INSERT INTO site_content (key, value, updated_at) VALUES (${key}, ${value}, now())
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`
    return res.status(200).json({ ok: true })
  }

  res.status(405).json({ error: 'Method not allowed' })
}
