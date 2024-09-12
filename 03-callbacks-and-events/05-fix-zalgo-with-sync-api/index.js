import { readFileSync } from 'node:fs'

const cache = new Map()

function consistentReadSync(filename) {
  if (cache.has(filename)) {
    return cache.get(filename)
  }

  const data = readFileSync(filename, 'utf8')
  cache.set(filename, data)
  return data
}

const filename = new URL('data.txt', import.meta.url)
console.log(consistentReadSync(filename))
// the next call will read from the cache
console.log(consistentReadSync(filename))
