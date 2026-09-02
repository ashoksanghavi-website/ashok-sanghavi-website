import { sql } from '../_lib/db.js'
import { requireAdmin } from '../_lib/auth.js'

// Admin media library. Images are stored as base64 in Postgres (small, free,
// no external storage) and served back through /api/media/[id].
export default async function handler(req, res) {
  const admin = await requireAdmin(req)
  if (!admin) return res.status(401).json({ error: 'Unauthorized' })

  // List — metadata only (never the base64 blob).
  if (req.method === 'GET') {
    const rows = await sql`SELECT id, filename, mime, size, created_at FROM media ORDER BY created_at DESC`
    return res.status(200).json(rows.map((r) => ({ ...r, url: `/api/media/${r.id}` })))
  }

  // Upload — expects { filename, mime, data } where data is base64 (raw or a data: URL).
  if (req.method === 'POST') {
    const b = req.body || {}
    let { filename, mime, data } = b
    if (!data) return res.status(400).json({ error: 'No image data' })

    // Accept a full data: URL and split out the mime + payload.
    const m = String(data).match(/^data:([^;]+);base64,(.*)$/s)
    if (m) {
      mime = mime || m[1]
      data = m[2]
    }
    if (!mime || !/^image\//.test(mime)) return res.status(400).json({ error: 'Only image files are allowed' })

    const size = Math.floor((String(data).length * 3) / 4) // approx decoded bytes
    if (size > 6 * 1024 * 1024) return res.status(413).json({ error: 'Image is too large (max ~6MB)' })

    try {
      const rows = await sql`INSERT INTO media (filename, mime, data, size)
        VALUES (${String(filename || 'image').slice(0, 200)}, ${mime}, ${data}, ${size})
        RETURNING id`
      const id = rows[0].id
      return res.status(201).json({ id, url: `/api/media/${id}` })
    } catch {
      return res.status(500).json({ error: 'Could not save the image' })
    }
  }

  if (req.method === 'DELETE') {
    const { id } = req.body || {}
    if (!id) return res.status(400).json({ error: 'id is required' })
    await sql`DELETE FROM media WHERE id = ${id}`
    return res.status(200).json({ ok: true })
  }

  res.status(405).json({ error: 'Method not allowed' })
}
