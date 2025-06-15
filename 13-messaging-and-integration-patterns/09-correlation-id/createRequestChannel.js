import { nanoid } from 'nanoid' // v5.1.5

export function createRequestChannel(channel) {
  const correlationMap = new Map()

  function sendRequest(data) {
    console.log('Sending request', data)
    return new Promise((resolve, reject) => {
      const correlationId = nanoid()

      const replyTimeout = setTimeout(() => {
        correlationMap.delete(correlationId)
        reject(new Error('Request timeout'))
      }, 10000)

      correlationMap.set(correlationId, replyData => {
        correlationMap.delete(correlationId)
        clearTimeout(replyTimeout)
        resolve(replyData)
      })

      channel.send({
        type: 'request',
        data,
        id: correlationId,
      })
    })
  }

  channel.on('message', message => {
    const replyCb = correlationMap.get(message.inReplyTo)
    if (replyCb) {
      replyCb(message.data)
    }
  })

  return sendRequest
}
