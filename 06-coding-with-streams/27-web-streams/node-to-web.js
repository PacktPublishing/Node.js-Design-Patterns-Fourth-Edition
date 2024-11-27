import { Readable, Transform, Writable } from 'node:stream'

const nodeReadable = new Readable({
  read() {
    this.push('Hello, ')
    this.push('world!')
    this.push(null)
  },
})

const webReadable = Readable.toWeb(nodeReadable)
console.log(webReadable)

const nodeWritable = new Writable({
  write(chunk, _enc, cb) {
    console.log(chunk.toString())
    cb()
  },
})

const webWritable = Writable.toWeb(nodeWritable)
console.log(webWritable)

const nodeTransform = new Transform({
  transform(chunk, _enc, cb) {
    cb(null, chunk.toString().toUpperCase())
  },
})

const webTransform = Transform.toWeb(nodeTransform)
console.log(webTransform)

nodeReadable.pipe(process.stdout)
webReadable.pipeTo(Writable.toWeb(process.stdout))
