import { sql } from '../_lib/db.js'

// Public image server. Content is immutable per id, so cache it hard.
export default async function handler(req, res) {
  const { id } = req.query
  const numId = parseInt(id, 10)
  if (!numId) return res.status(400).json({ error: 'Bad id' })

  const rows = await sql`SELECT mime, data FROM media WHERE id = ${numId} LIMIT 1`
  if (!rows.length) return res.status(404).json({ error: 'Not found' })

  const buf = Buffer.from(rows[0].data, 'base64')
  res.setHeader('Content-Type', rows[0].mime || 'image/jpeg')
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
  res.setHeader('Content-Length', buf.length)
  return res.status(200).send(buf)
}
