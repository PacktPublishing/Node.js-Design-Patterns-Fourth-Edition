import { randomUUID } from 'node:crypto'

export async function reserveSeat(db, eventId, userId) {
  const [event] = await db.query('SELECT * FROM events WHERE id = ?', [eventId])
  if (!event) {
    throw new Error('Event not found')
  }

  const existing = await db.query(
    'SELECT COUNT(*) AS count FROM reservations WHERE eventId = ?',
    [eventId]
  )

  if (existing[0].count >= event.totalSeats) {
    throw new Error('Event is fully booked')
  }

  const reservationId = randomUUID()

  await db.query(
    'INSERT INTO reservations (id, eventId, userId) VALUES (?, ?, ?)',
    [reservationId, eventId, userId]
  )

  return reservationId
}

export async function createEvent(db, name, totalSeats) {
  const eventId = randomUUID()
  await db.query('INSERT INTO events (id, name, totalSeats) VALUES (?, ?, ?)', [
    eventId,
    name,
    totalSeats,
  ])
  return eventId
}
