import bcrypt from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'
import { sql } from './db.js'

export const COOKIE = 'as_admin'
const MAX_AGE = 7 * 24 * 3600 // 7 days

// The signing secret lives in the DB (app_settings) so the only env var the
// deployment needs is DATABASE_URL. Cached in memory after the first read.
let cachedKey = null
async function secretKey() {
  if (cachedKey) return cachedKey
  let value = process.env.JWT_SECRET || 'dev-only-insecure-secret'
  try {
    const rows = await sql`SELECT value FROM app_settings WHERE key = 'jwt_secret' LIMIT 1`
    if (rows[0]?.value) value = rows[0].value
  } catch { /* fall back to env/default */ }
  cachedKey = new TextEncoder().encode(value)
  return cachedKey
}

export async function createToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(await secretKey())
}

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, await secretKey())
    return payload
  } catch {
    return null
  }
}

export function parseCookies(req) {
  const header = req.headers.cookie || ''
  const out = {}
  header.split(';').forEach((part) => {
    const idx = part.indexOf('=')
    if (idx > -1) out[part.slice(0, idx).trim()] = decodeURIComponent(part.slice(idx + 1).trim())
  })
  return out
}

export function setAuthCookie(res, token) {
  res.setHeader('Set-Cookie', `${COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=${MAX_AGE}`)
}

export function clearAuthCookie(res) {
  res.setHeader('Set-Cookie', `${COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=0`)
}

// Returns the admin payload if the request carries a valid session, else null.
export async function requireAdmin(req) {
  const token = parseCookies(req)[COOKIE]
  if (!token) return null
  return await verifyToken(token)
}

export { bcrypt }
