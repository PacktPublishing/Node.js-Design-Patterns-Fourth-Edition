import { EventEmitter } from 'node:events'
import { join } from 'node:path'
import { ProcessPool } from './processPool.js'

const workerFile = join(
  import.meta.dirname,
  'workers',
  'subsetSumProcessWorker.js'
)
const workers = new ProcessPool(workerFile, 2)

export class SubsetSum extends EventEmitter {
  constructor(sum, set) {
    super()
    this.sum = sum
    this.set = set
  }

  async start() {
    const worker = await workers.acquire()
    worker.send({ sum: this.sum, set: this.set })

    const onMessage = msg => {
      if (msg.event === 'end') {
        worker.removeListener('message', onMessage)
        workers.release(worker)
      }

      this.emit(msg.event, msg.data)
    }

    worker.on('message', onMessage)
  }
}
