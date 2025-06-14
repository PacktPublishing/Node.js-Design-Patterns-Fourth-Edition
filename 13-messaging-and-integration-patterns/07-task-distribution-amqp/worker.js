import amqp from 'amqplib' // v0.10.8
import { processTask } from './processTask.js'

const connection = await amqp.connect('amqp://localhost')
const channel = await connection.createChannel()
const { queue } = await channel.assertQueue('tasks_queue')

channel.prefetch(1) // Ensure only one message is processed at a time
channel.consume(queue, async rawMessage => {
  const found = processTask(JSON.parse(rawMessage.content.toString()))
  await channel.ack(rawMessage)
  if (found) {
    console.log(`Found! => ${found}`)
    await channel.sendToQueue('results_queue', Buffer.from(`Found: ${found}`))
    // shuts down the worker
    await channel.close()
    await connection.close()
  }
})
