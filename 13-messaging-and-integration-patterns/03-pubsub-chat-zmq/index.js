import { createServer } from 'node:http'
import { parseArgs } from 'node:util'
import staticHandler from 'serve-handler' // v6.1.6
import { WebSocketServer } from 'ws' // v8.18.2
import zmq from 'zeromq' // v6.3.0

const { values: args } = parseArgs({
  options: {
    http: {
      type: 'string',
    },
    pub: {
      type: 'string',
    },
    sub: {
      type: 'string',
      multiple: true,
    },
  },
  args: process.argv.slice(2),
})

if (!(args.http && args.pub && args.sub)) {
  console.error(
    'Usage: node index.js --http <port> --pub <port> --sub <port1> [--sub <port2> ...]'
  )
  process.exit(1)
}

// serve static files
const server = createServer((req, res) => {
  return staticHandler(req, res, { public: 'web' })
})

// Inizialize ZeroMq sockets
const pubSocket = new zmq.Publisher()
await pubSocket.bind(`tcp://127.0.0.1:${args.pub}`)
const subSocket = new zmq.Subscriber()
for (const port of args.sub) {
  console.log(`Subscribing to port ${port}`)
  await subSocket.connect(`tcp://127.0.0.1:${port}`)
}
subSocket.subscribe('chat_messages')

// Receive messages from other servers
async function receiveMessages() {
  for await (const [_topic, msg] of subSocket) {
    console.log(`Received message from another server: ${msg.toString()}`)
    broadcast(Buffer.from(msg))
  }
}
receiveMessages()

const wss = new WebSocketServer({ server })
wss.on('connection', client => {
  console.log('Client connected')
  client.on('message', msg => {
    console.log(`Message: ${msg}`)
    broadcast(msg)
    pubSocket.send(['chat_messages', msg])
  })
})

function broadcast(msg) {
  for (const client of wss.clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg)
    }
  }
}

server.listen(args.http)
