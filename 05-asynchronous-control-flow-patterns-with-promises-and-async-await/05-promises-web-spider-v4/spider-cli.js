import { TaskQueue } from './TaskQueue.js'
import { spider } from './spider.js'

const url = process.argv[2]
const maxDepth = Number.parseInt(process.argv[3], 10) || 1
const concurrency = Number.parseInt(process.argv[4], 10) || 2

const queue = new TaskQueue(concurrency)
spider(url, maxDepth, queue)
queue.on('error', console.error)
queue.on('empty', () => {
  console.log('Download complete')
})
