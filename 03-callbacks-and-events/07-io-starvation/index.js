import { readFile } from 'node:fs'

const filePath = new URL('data.txt', import.meta.url)
readFile(filePath, 'utf8', (_err, data) => {
  console.log(`Data from file: ${data}`)
})

let scheduledNextTicks = 0
function recursiveNextTick() {
  if (scheduledNextTicks++ >= 1000) {
    return
  }
  console.log('Keeping the event loop busy')
  process.nextTick(() => recursiveNextTick())
}
recursiveNextTick()
