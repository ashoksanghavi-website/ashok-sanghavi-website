// Shared submit path for every enquiry form (contact page, get-in-touch popup,
// schedule modal). The database save via /api/contact is the source of truth —
// it is what the admin Inbox reads — and the email alert is a best-effort extra.
//
// The email is sent straight from the browser to Web3Forms, because the free
// Web3Forms plan only accepts client-side calls (server-side needs their Pro
// plan). The access key below is a public, client-side key by design, so it is
// safe to ship in the frontend. To change the key without touching code, set
// VITE_WEB3FORMS_KEY at build time.
const WEB3FORMS_KEY =
  import.meta.env.VITE_WEB3FORMS_KEY || '59da9378-0bff-4ae2-ba56-f3ac982f45c4'

async function emailNotify({ name, email, phone, message, source }) {
  if (!WEB3FORMS_KEY) return
  try {
    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `New ${source || 'contact'} enquiry from ${name || 'the website'}`,
        from_name: 'Ashok Sanghavi Website',
        email: email || 'no-reply@ashoksanghavi.com', // enquirer → reply-to
        replyto: email || '',
        Name: name || '—',
        Email: email || '—',
        Phone: phone || '—',
        Message: message || '—',
        Source: source || 'contact',
      }),
    })
  } catch {
    /* email is best-effort; the submission is already saved */
  }
}

// Saves the enquiry and fires the email alert. Returns the /api/contact
// Response so callers keep using res.ok exactly as before.
export async function submitEnquiry(fields) {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(fields),
  })
  if (res.ok) emailNotify(fields)
  return res
}
