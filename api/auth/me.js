import { requireAdmin } from '../_lib/auth.js'

export default async function handler(req, res) {
  const admin = await requireAdmin(req)
  if (!admin) return res.status(401).json({ authenticated: false })
  res.status(200).json({ authenticated: true, email: admin.email })
}
