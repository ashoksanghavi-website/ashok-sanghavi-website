import { sql } from '../_lib/db.js'
import { requireAdmin } from '../_lib/auth.js'

export default async function handler(req, res) {
  const { slug } = req.query

  // GET one — public gets it only if published; admin gets any.
  if (req.method === 'GET') {
    const admin = await requireAdmin(req)
    const rows = admin
      ? await sql`SELECT * FROM blog_posts WHERE slug = ${slug}`
      : await sql`SELECT * FROM blog_posts WHERE slug = ${slug} AND published = true`
    if (!rows.length) return res.status(404).json({ error: 'Not found' })
    return res.status(200).json(rows[0])
  }

  // Mutations — admin only.
  const admin = await requireAdmin(req)
  if (!admin) return res.status(401).json({ error: 'Unauthorized' })

  if (req.method === 'PUT') {
    const b = req.body || {}
    const rows = await sql`UPDATE blog_posts SET
      title = ${b.title}, excerpt = ${b.excerpt || null}, body = ${b.body || null},
      cover_url = ${b.cover_url || null}, category = ${b.category || null},
      author = ${b.author || 'Ashok Sanghavi'}, read_minutes = ${b.read_minutes || null},
      published = ${!!b.published},
      published_at = ${b.published ? b.published_at || new Date().toISOString() : null},
      updated_at = now()
      WHERE slug = ${slug} RETURNING *`
    if (!rows.length) return res.status(404).json({ error: 'Not found' })
    return res.status(200).json(rows[0])
  }

  if (req.method === 'DELETE') {
    await sql`DELETE FROM blog_posts WHERE slug = ${slug}`
    return res.status(200).json({ ok: true })
  }

  res.status(405).json({ error: 'Method not allowed' })
}
