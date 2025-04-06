import Fastify from 'fastify'
import { bookEventRoute } from './routes/bookEvent.js'
import { createEventRoute } from './routes/createEvent.js'

export async function createApp(db) {
  const app = Fastify()
  app.decorate('db', db)

  await app.register(bookEventRoute)
  await app.register(createEventRoute)

  return app
}
