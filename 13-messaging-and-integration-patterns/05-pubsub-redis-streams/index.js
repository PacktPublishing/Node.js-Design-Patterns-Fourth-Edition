import { createServer } from 'node:http'
import Redis from 'ioredis' // v5.6.1
import staticHandler from 'serve-handler' // v6.1.6
import { WebSocketServer } from 'ws' // v8.18.2

const redisClient = new Redis()
const redisClientXread = new Redis()

// serve static files
const server = createServer((req, res) => {
  return staticHandler(req, res, { public: 'web' })
})

const wss = new WebSocketServer({ server })
wss.on('connection', async client => {
  console.log('Client connected')
  client.on('message', msg => {
    console.log(`Sending message: ${msg}`)
    redisClient.xadd(
      'chat_stream',
      '*',
      'message',
      JSON.stringify({
        text: msg.toString(),
        timestamp: Date.now(),
      })
    )
  })

  // load previous messages from the history service
  const logs = await redisClient.xrange('chat_stream', '-', '+')
  for (const [, [, message]] of logs) {
    client.send(Buffer.from(message))
  }
})

function broadcast(msg) {
  for (const client of wss.clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg)
    }
  }
}
let lastRecordId = '$'

async function processStreamMessages() {
  while (true) {
    const [[, records]] = await redisClientXread.xread(
      'BLOCK',
      '0',
      'STREAMS',
      'chat_stream',
      lastRecordId
    )
    for (const [recordId, [, message]] of records) {
      console.log(`Message from stream: ${message}`)
      broadcast(Buffer.from(message))
      lastRecordId = recordId
    }
  }
}

processStreamMessages().catch(err => console.error(err))

server.listen(process.argv[2] || 8080)
