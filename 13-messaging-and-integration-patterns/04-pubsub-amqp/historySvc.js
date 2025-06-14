import { createServer } from 'node:http'
import amqp from 'amqplib' // v0.10.8
import { Level } from 'level' // v10.0.0
import { monotonicFactory } from 'ulid' // v3.0.1

const ulid = monotonicFactory()
const db = new Level('msgHistory', { valueEncoding: 'json' })

const connection = await amqp.connect('amqp://localhost')
const channel = await connection.createChannel()
await channel.assertExchange('chat', 'fanout')
const { queue } = channel.assertQueue('chat_history')
await channel.bindQueue(queue, 'chat')

channel.consume(queue, async msg => {
  const data = JSON.parse(msg.content.toString())
  console.log(`Saving message: ${msg.content.toString()}`)
  await db.put(ulid(), data)
  channel.ack(msg)
})

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost')
  const lt = url.searchParams.get('lt')
  res.writeHead(200, { 'Content-Type': 'application/json' })
  const messages = []
  for await (const [key, value] of db.iterator({
    reverse: true,
    limit: 10,
    lt,
  })) {
    messages.unshift({ id: key, ...value })
  }
  res.end(JSON.stringify(messages, null, 2))
}).listen(8090)
