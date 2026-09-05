import { sql } from './_lib/db.js'

// Where form notifications are emailed (via FormSubmit). The address owner must
// click the one-time activation link FormSubmit emails on the first submission.
const NOTIFY_EMAIL = 'asanghavi@aol.com'

// Emails the submission through FormSubmit's AJAX endpoint. Best-effort: the
// database is the source of truth, so a mail hiccup never fails the request.
// FormSubmit rejects requests without a real Origin/Referer, so we pass the
// site's own origin (works on any domain).
async function notifyByEmail({ name, email, phone, message, source }, origin) {
  try {
    await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(NOTIFY_EMAIL)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(origin ? { Origin: origin, Referer: `${origin}/contact` } : {}),
      },
      body: JSON.stringify({
        _subject: `New ${source || 'contact'} enquiry from ${name}`,
        _template: 'table',
        _captcha: 'false',
        Name: name,
        Email: email,
        Phone: phone || '—',
        Message: message || '—',
        Source: source || 'contact',
      }),
    })
  } catch { /* email is best-effort; the submission is already saved */ }
}

// Public endpoint — stores a contact / get-in-touch submission and emails it.
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { name, email, phone, message, source } = req.body || {}
  if (!name || !email) return res.status(400).json({ error: 'Name and email are required' })
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
    return res.status(400).json({ error: 'Please enter a valid email' })
  }

  const clip = (v, n) => (v == null ? null : String(v).slice(0, n))
  const origin = req.headers.origin || (req.headers.host ? `https://${req.headers.host}` : '')
  try {
    await sql`INSERT INTO contact_submissions (name, email, phone, message, source)
      VALUES (${clip(name, 120)}, ${clip(email, 160)}, ${clip(phone, 40)}, ${clip(message, 4000)}, ${clip(source || 'contact', 20)})`
    await notifyByEmail({ name, email, phone, message, source }, origin)
    res.status(200).json({ ok: true })
  } catch {
    res.status(500).json({ error: 'Could not save your message. Please try again.' })
  }
}
