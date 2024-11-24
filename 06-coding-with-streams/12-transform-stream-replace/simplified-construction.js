import { Transform } from 'node:stream'

const searchStr = 'World'
const replaceStr = 'Node.js'
let tail = ''

const replaceStream = new Transform({
  defaultEncoding: 'utf8',

  transform(chunk, _encoding, cb) {
    const pieces = (tail + chunk).split(searchStr)
    const lastPiece = pieces[pieces.length - 1]
    const tailLen = searchStr.length - 1
    tail = lastPiece.slice(-tailLen)
    pieces[pieces.length - 1] = lastPiece.slice(0, -tailLen)
    this.push(pieces.join(replaceStr))
    cb()
  },

  flush(cb) {
    this.push(tail)
    cb()
  },
})

replaceStream.on('data', chunk => process.stdout.write(chunk.toString()))
replaceStream.write('Hello W')
replaceStream.write('orld!')
replaceStream.end('\n')
