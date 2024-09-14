import { EventEmitter } from 'node:events'
import { readFile } from 'node:fs'

function findRegex(files, regex) {
  const emitter = new EventEmitter()
  for (const file of files) {
    readFile(file, 'utf8', (err, content) => {
      if (err) {
        return emitter.emit('error', err)
      }

      emitter.emit('fileread', file)
      const match = content.match(regex)
      if (match) {
        for (const elem of match) {
          emitter.emit('found', file, elem)
        }
      }
    })
  }
  return emitter
}

const files = [
  new URL('fileA.txt', import.meta.url),
  new URL('fileB.json', import.meta.url),
]
findRegex(files, /hello [\w.]+/)
  .on('fileread', file => console.log(`${file} was read`))
  .on('found', (file, match) => console.log(`Matched "${match}" in ${file}`))
  .on('error', err => console.error(`Error emitted ${err.message}`))
