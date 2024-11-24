import { ReplaceStream } from './replace-stream.js'

const replaceStream = new ReplaceStream('World', 'Node.js')
replaceStream.on('data', chunk => process.stdout.write(chunk.toString()))

replaceStream.write('Hello W')
replaceStream.write('orld!')
replaceStream.end('\n')
