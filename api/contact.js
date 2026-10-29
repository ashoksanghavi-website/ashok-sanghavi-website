import { sql } from './_lib/db.js'

// Where form notifications are emailed. The database is always the source of
// truth (admin Inbox), so email is strictly best-effort and never blocks a save.
const NOTIFY_EMAIL = 'asanghavi@aol.com'

// Primary provider: Web3Forms. Reliable, needs no custom domain and no
// per-form activation — just one free access key bound to the inbox above.
// Set it in Vercel → Project → Settings → Environment Variables as WEB3FORMS_KEY.
const WEB3FORMS_KEY = process.env.WEB3FORMS_KEY

async function sendWeb3Forms({ name, email, phone, message, source }) {
  if (!WEB3FORMS_KEY) return false
  try {
    const r = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `New ${source || 'contact'} enquiry from ${name}`,
        from_name: 'Ashok Sanghavi Website',
        email,            // enquirer's address → becomes the reply-to
        replyto: email,
        Name: name,
        Email: email,
        Phone: phone || '—',
        Message: message || '—',
        Source: source || 'contact',
      }),
    })
    const j = await r.json().catch(() => ({}))
    return r.ok && j && j.success
  } catch {
    return false
  }
}

// Fallback provider: FormSubmit. Requires a one-time activation click and can be
// flaky, so it is only used when Web3Forms is not configured or is unavailable.
// FormSubmit rejects requests without a real Origin/Referer, so we pass the
// site's own origin (works on any domain).
async function sendFormSubmit({ name, email, phone, message, source }, origin) {
  try {
    const r = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(NOTIFY_EMAIL)}`, {
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
    return r.ok
  } catch {
    return false
  }
}

// Emails the submission, trying the reliable provider first and falling back.
async function notifyByEmail(fields, origin) {
  if (await sendWeb3Forms(fields)) return
  await sendFormSubmit(fields, origin)
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
