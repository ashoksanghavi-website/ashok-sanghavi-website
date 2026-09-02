import { neon } from '@neondatabase/serverless'

// One tagged-template SQL client, backed by Neon's HTTP driver (perfect for
// serverless — no pooling headaches). Usage: await sql`SELECT ...`
export const sql = neon(process.env.DATABASE_URL)
