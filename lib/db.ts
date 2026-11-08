import "server-only"

import { attachDatabasePool } from "@vercel/functions"
import { Pool } from "pg"

// Neon recommends node-postgres + Vercel Fluid compute: one pool per function
// instance, attached so Vercel can drain idle clients before suspending.
// DATABASE_URL is Neon's pooled (-pooler) connection string.

const globalForDb = globalThis as unknown as { pgPool?: Pool }

function createPool() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set")
  }
  const pool = new Pool({ connectionString, max: 5 })
  attachDatabasePool(pool)
  return pool
}

export function getPool() {
  // Reuse across hot reloads in dev and across requests in production.
  globalForDb.pgPool ??= createPool()
  return globalForDb.pgPool
}
