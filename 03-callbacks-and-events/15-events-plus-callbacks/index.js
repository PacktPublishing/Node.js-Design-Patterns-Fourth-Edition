import { EventEmitter } from 'node:events'
import { get } from 'node:https'

function download(url, cb) {
  const eventEmitter = new EventEmitter()

  const req = get(url, resp => {
    const chunks = []
    let downloadedBytes = 0
    const fileSize = Number.parseInt(resp.headers['content-length'], 10)
    resp
      .on('error', err => {
        cb(err)
      })
      .on('data', chunk => {
        chunks.push(chunk)
        downloadedBytes += chunk.length
        eventEmitter.emit('progress', downloadedBytes, fileSize)
      })
      .on('end', () => {
        const data = Buffer.concat(chunks)
        cb(null, data)
      })
  })

  req.on('error', err => {
    cb(err)
  })

  return eventEmitter
}

download(
  'https://www.nodejsdesignpatterns.com/img/node-js-design-patterns.jpg',
  (err, data) => {
    if (err) {
      return console.error(`Download failed: ${err.message}`)
    }
    console.log('Download completed', data)
  }
).on('progress', (downloaded, total) => {
  console.log(
    `${downloaded}/${total} (${((downloaded / total) * 100).toFixed(2)}%)`
  )
})
