import amqp from 'amqplib' // v0.10.8
import { generateTasks } from './generateTasks.js'

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'
const BATCH_SIZE = 10000

const [, , maxLength, searchHash] = process.argv

const connection = await amqp.connect('amqp://localhost')
const channel = await connection.createConfirmChannel()
await channel.assertQueue('tasks_queue')

const generatorObj = generateTasks(searchHash, ALPHABET, maxLength, BATCH_SIZE)
for (const task of generatorObj) {
  console.log(`Sending task: ${task}`)
  await channel.sendToQueue('tasks_queue', Buffer.from(task))
}

await channel.waitForConfirms()
channel.close()
connection.close()
