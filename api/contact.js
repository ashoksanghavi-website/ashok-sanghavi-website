import { sql } from './_lib/db.js'

// Public endpoint — stores a contact / get-in-touch submission.
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { name, email, phone, message, source } = req.body || {}
  if (!name || !email) return res.status(400).json({ error: 'Name and email are required' })
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
    return res.status(400).json({ error: 'Please enter a valid email' })
  }

  const clip = (v, n) => (v == null ? null : String(v).slice(0, n))
  try {
    await sql`INSERT INTO contact_submissions (name, email, phone, message, source)
      VALUES (${clip(name, 120)}, ${clip(email, 160)}, ${clip(phone, 40)}, ${clip(message, 4000)}, ${clip(source || 'contact', 20)})`
    res.status(200).json({ ok: true })
  } catch {
    res.status(500).json({ error: 'Could not save your message. Please try again.' })
  }
}
