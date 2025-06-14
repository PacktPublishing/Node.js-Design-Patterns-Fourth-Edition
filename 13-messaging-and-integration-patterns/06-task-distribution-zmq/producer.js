import zmq from 'zeromq' // v6.3.0
import { generateTasks } from './generateTasks.js'

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'
const BATCH_SIZE = 10000

const [, , maxLength, searchHash] = process.argv

const ventilator = new zmq.Push()
await ventilator.bind('tcp://*:5016')

const generatorObj = generateTasks(searchHash, ALPHABET, maxLength, BATCH_SIZE)
for (const task of generatorObj) {
  await ventilator.send(task)
}
