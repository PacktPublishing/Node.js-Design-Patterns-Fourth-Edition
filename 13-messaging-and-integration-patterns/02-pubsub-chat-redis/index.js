import { createServer } from 'node:http'
import Redis from 'ioredis' // v5.6.1
import staticHandler from 'serve-handler' // v6.1.6
import { WebSocketServer } from 'ws' // v8.18.2

const redisPub = new Redis()
const redisSub = new Redis()

// serve static files
const server = createServer((req, res) => {
  return staticHandler(req, res, { public: 'web' })
})

const wss = new WebSocketServer({ server })
wss.on('connection', client => {
  console.log('Client connected')
  client.on('message', msg => {
    console.log(`Sending message to Redis: ${msg}`)
    redisPub.publish('chat_messages', msg)
  })
})

redisSub.subscribe('chat_messages')
redisSub.on('message', (channel, msg) => {
  if (channel === 'chat_messages') {
    console.log(`Received message from Redis: ${msg}`)
    for (const client of wss.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(Buffer.from(msg))
      }
    }
  }
})

server.listen(process.argv[2] || 8080)
