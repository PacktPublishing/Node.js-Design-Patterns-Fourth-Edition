import { createServer } from 'node:http'
import amqp from 'amqplib' // v0.10.8
import staticHandler from 'serve-handler' // v6.1.6
import { WebSocketServer } from 'ws' // v8.18.2

const httpPort = process.argv[2] || 8080

// register the server with RabbitMQ and create a queue
const connection = await amqp.connect('amqp://localhost')
const channel = await connection.createChannel()
await channel.assertExchange('chat', 'fanout')
const { queue } = await channel.assertQueue(`chat_srv_${httpPort}`, {
  exclusive: true,
})
await channel.bindQueue(queue, 'chat')
channel.consume(
  queue,
  msg => {
    msg = msg.content.toString()
    console.log(`From queue: ${msg}`)
    broadcast(Buffer.from(msg))
  },
  { noAck: true }
)

// serve static files
const server = createServer((req, res) => {
  return staticHandler(req, res, { public: 'web' })
})

const wss = new WebSocketServer({ server })
wss.on('connection', async client => {
  console.log('Client connected')
  client.on('message', msg => {
    console.log(`Sending message: ${msg}`)
    channel.publish(
      'chat',
      '',
      Buffer.from(
        JSON.stringify({
          text: msg.toString(),
          timestamp: Date.now(),
        })
      )
    )
  })

  // load previous messages from the history service
  const res = await fetch('http://localhost:8090')
  const messages = await res.json()
  for (const message of messages) {
    client.send(Buffer.from(JSON.stringify(message)))
  }
})

function broadcast(msg) {
  for (const client of wss.clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg)
    }
  }
}

server.listen(httpPort)
