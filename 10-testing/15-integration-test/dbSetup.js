export async function createTables(db) {
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL
    )
  `)

  await db.query(`
    CREATE TABLE IF NOT EXISTS vouchers (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      balance REAL NOT NULL,
      expiresAt TIMESTAMP NOT NULL
    )
  `)
}
