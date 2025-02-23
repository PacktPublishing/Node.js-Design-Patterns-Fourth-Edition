import zeromq from 'zeromq' // v6.3.0
import { jsonMiddleware } from './jsonMiddleware.js'
import { zlibMiddleware } from './zlibMiddleware.js'
import { ZmqMiddlewareManager } from './zmqMiddlewareManager.js'

const socket = new zeromq.Request()
await socket.connect('tcp://127.0.0.1:5000')

const zmqm = new ZmqMiddlewareManager(socket)
zmqm.use(zlibMiddleware())
zmqm.use(jsonMiddleware())
zmqm.use({
  inbound(message) {
    console.log('Echoed back', message)
    return message
  },
})

setInterval(() => {
  zmqm
    .send({ action: 'ping', echo: Date.now() })
    .catch(err => console.error(err))
}, 1000)

console.log('Client connected')
