import { sql } from '../_lib/db.js'
import { requireAdmin } from '../_lib/auth.js'

export default async function handler(req, res) {
  // GET — admins see everything, the public sees only published posts.
  if (req.method === 'GET') {
    const admin = await requireAdmin(req)
    if (admin) {
      const rows = await sql`SELECT * FROM blog_posts ORDER BY COALESCE(published_at, created_at) DESC`
      return res.status(200).json(rows)
    }
    const rows = await sql`SELECT id, slug, title, excerpt, cover_url, category, author, read_minutes, published_at
      FROM blog_posts WHERE published = true ORDER BY published_at DESC NULLS LAST`
    return res.status(200).json(rows)
  }

  // POST — create (admin only).
  if (req.method === 'POST') {
    const admin = await requireAdmin(req)
    if (!admin) return res.status(401).json({ error: 'Unauthorized' })
    const b = req.body || {}
    if (!b.slug || !b.title) return res.status(400).json({ error: 'slug and title are required' })
    try {
      const rows = await sql`INSERT INTO blog_posts
        (slug, title, excerpt, body, cover_url, category, author, read_minutes, published, published_at)
        VALUES (${b.slug}, ${b.title}, ${b.excerpt || null}, ${b.body || null}, ${b.cover_url || null},
          ${b.category || null}, ${b.author || 'Ashok Sanghavi'}, ${b.read_minutes || null},
          ${!!b.published}, ${b.published ? b.published_at || new Date().toISOString() : null})
        RETURNING *`
      return res.status(201).json(rows[0])
    } catch (e) {
      if (String(e).includes('duplicate')) return res.status(409).json({ error: 'A post with that slug already exists' })
      return res.status(500).json({ error: 'Could not create the post' })
    }
  }

  res.status(405).json({ error: 'Method not allowed' })
}
