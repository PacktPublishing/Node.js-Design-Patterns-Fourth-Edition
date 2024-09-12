import { readFile } from 'node:fs'

const cache = new Map()

function consistentReadAsync(filename, callback) {
  if (cache.has(filename)) {
    // deferred callback invocation
    process.nextTick(() => callback(cache.get(filename)))
  } else {
    // asynchronous function
    readFile(filename, 'utf8', (_err, data) => {
      cache.set(filename, data)
      callback(data)
    })
  }
}

function createFileReader(filename) {
  const listeners = []
  consistentReadAsync(filename, value => {
    for (const listener of listeners) {
      listener(value)
    }
  })

  return {
    onDataReady: listener => listeners.push(listener),
  }
}

const filename = new URL('data.txt', import.meta.url)
const reader1 = createFileReader(filename)
reader1.onDataReady(data => {
  console.log(`First call data: ${data}`)

  // ...sometime later we try to read again from
  // the same file
  const reader2 = createFileReader(filename)
  reader2.onDataReady(data => {
    console.log(`Second call data: ${data}`)
  })
})
