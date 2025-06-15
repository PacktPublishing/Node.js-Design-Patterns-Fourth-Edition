import { AmqpReply } from './amqpReply.js'

const reply = new AmqpReply('requests_queue')
await reply.initialize()

reply.handleRequests(req => {
  console.log('Request received', req)
  return { sum: req.a + req.b }
})
