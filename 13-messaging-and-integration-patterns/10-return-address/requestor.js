import { setTimeout } from 'node:timers/promises'
import { AmqpRequest } from './amqpRequest.js'

const request = new AmqpRequest()
await request.initialize()

async function sendRandomRequest() {
  const a = Math.round(Math.random() * 100)
  const b = Math.round(Math.random() * 100)
  const reply = await request.send('requests_queue', { a, b })
  console.log(`${a} + ${b} = ${reply.sum}`)
}

for (let i = 0; i < 20; i++) {
  await sendRandomRequest()
  await setTimeout(1000)
}

request.destroy()
