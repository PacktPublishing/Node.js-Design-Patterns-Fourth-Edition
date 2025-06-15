import Redis from 'ioredis' // v5.6.1
import { generateTasks } from './generateTasks.js'

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'
const BATCH_SIZE = 10000

const [, , maxLength, searchHash] = process.argv

const redisClient = new Redis()

const generatorObj = generateTasks(searchHash, ALPHABET, maxLength, BATCH_SIZE)
for (const task of generatorObj) {
  console.log(`Sending task: ${task}`)
  await redisClient.xadd('tasks_stream', '*', 'task', task)
}

redisClient.disconnect()
