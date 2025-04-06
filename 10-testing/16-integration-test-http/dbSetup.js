export async function createTables(db) {
  await db.query(`
    CREATE TABLE IF NOT EXISTS events (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      totalSeats INTEGER NOT NULL
    )
  `)

  await db.query(`
    CREATE TABLE IF NOT EXISTS reservations (
      id TEXT PRIMARY KEY,
      eventId TEXT NOT NULL,
      userId TEXT NOT NULL,
      UNIQUE(eventId, userId)
    )
  `)
}
