import { EventEmitter } from 'node:events'
import { get } from 'node:https'

function download(url, cb) {
  const eventEmitter = new EventEmitter()
  get(url, resp => {
    const len = Number.parseInt(resp.headers['content-length'], 10)
    const chunks = []
    let downloaded = 0
    resp.on('data', chunk => {
      chunks.push(chunk)
      downloaded += chunk.length
      eventEmitter.emit('progress', downloaded, len)
    })
    resp.on('end', () => {
      const data = Buffer.concat(chunks)
      eventEmitter.emit('complete', data)
      cb(null, data)
    })
  }).on('error', err => {
    cb(err)
  })

  return eventEmitter
}

download(
  'https://www.nodejsdesignpatterns.com/img/node-js-design-patterns.jpg',
  (err, data) => {
    if (err) {
      return console.error(`Error downloading data: ${err.message}`)
    }
    console.log('Downloaded', data)
  }
).on('progress', (downloaded, total) => {
  console.log(
    `${downloaded}/${total} (${((downloaded / total) * 100).toFixed(2)}%)`
  )
})
