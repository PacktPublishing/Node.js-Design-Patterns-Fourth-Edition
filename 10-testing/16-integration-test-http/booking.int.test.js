import assert from 'node:assert/strict'
import { suite, test } from 'node:test'
import { createApp } from './app.js'
import { DbClient } from './dbClient.js'
import { createTables } from './dbSetup.js'

suite('Booking integration tests', { concurrency: true }, () => {
  test('Reserving a seat works until full', async () => {
    const db = new DbClient(':memory:')
    await createTables(db)
    const app = await createApp(db)

    const createEventResponse = await app.inject({
      method: 'POST',
      url: '/events',
      payload: { name: 'Event 1', totalSeats: 2 },
    })
    assert.equal(createEventResponse.statusCode, 201)
    const eventData = createEventResponse.json()
    const reserveUrl = `/events/${eventData.eventId}/reservations`

    const res1 = await app.inject({
      method: 'POST',
      url: reserveUrl,
      payload: { userId: 'u1' },
    })
    assert.equal(res1.statusCode, 201)

    const res2 = await app.inject({
      method: 'POST',
      url: reserveUrl,
      payload: { userId: 'u2' },
    })
    assert.equal(res2.statusCode, 201)

    const res3 = await app.inject({
      method: 'POST',
      url: reserveUrl,
      payload: { userId: 'u3' },
    })
    assert.equal(res3.statusCode, 403)
    assert.deepEqual(await res3.json(), { error: 'Event is fully booked' })

    await db.close()
    await app.close()
  })

  test('Returns 404 if event does not exist', async () => {
    const db = new DbClient(':memory:')
    await createTables(db)
    const app = await createApp(db)

    const res = await app.inject({
      method: 'POST',
      url: '/events/unknown/reservations',
      payload: { userId: 'u1' },
    })

    assert.equal(res.statusCode, 404)
    assert.deepEqual(await res.json(), { error: 'Event not found' })

    await db.close()
    await app.close()
  })
})
