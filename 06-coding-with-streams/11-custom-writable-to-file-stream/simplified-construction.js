import { promises as fs } from 'node:fs'
import { dirname, join } from 'node:path'
import { Writable } from 'node:stream'
import { mkdirp } from 'mkdirp'

const tfs = new Writable({
  objectMode: true,
  write(chunk, _encoding, cb) {
    mkdirp(dirname(chunk.path))
      .then(() => fs.writeFile(chunk.path, chunk.content))
      .then(() => cb())
      .catch(cb)
  },
})

const outDir = join(import.meta.dirname, 'files')

tfs.write({ path: join(outDir, 'file1.txt'), content: 'Hello' })
tfs.write({ path: join(outDir, 'file2.txt'), content: 'Node.js' })
tfs.write({ path: join(outDir, 'file3.txt'), content: 'streams' })
tfs.end(() => console.log('All files created'))
