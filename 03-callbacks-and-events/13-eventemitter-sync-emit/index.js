import { EventEmitter } from 'node:events'
import { readFileSync } from 'node:fs'

class FindRegexSync extends EventEmitter {
  constructor(regex) {
    super()
    this.regex = regex
    this.files = []
  }

  addFile(file) {
    this.files.push(file)
    return this
  }

  find() {
    for (const file of this.files) {
      let content
      try {
        content = readFileSync(file, 'utf8')
      } catch (err) {
        this.emit('error', err)
      }

      this.emit('fileread', file)
      const match = content.match(this.regex)
      if (match) {
        for (const elem of match) {
          this.emit('found', file, elem)
        }
      }
    }
    return this
  }
}

const findRegexSyncInstance = new FindRegexSync(/hello [\w.]+/)
findRegexSyncInstance
  .addFile(new URL('fileA.txt', import.meta.url))
  .addFile(new URL('fileB.json', import.meta.url))
  // this listener is invoked
  .on('found', (_file, match) => console.log(`[Before] Matched "${match}"`))
  .find()
  // this listener is never invoked
  .on('found', (_file, match) => console.log(`[After] Matched "${match}"`))
