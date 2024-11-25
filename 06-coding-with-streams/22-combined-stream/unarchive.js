import { createReadStream, createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream'
import { createDecryptAndDecompress } from './combined-streams.js'

// usage: node unarchive.js <password> <ivHex> <sourceFile> <destFile>
// example:
//  node unarchive.js alovelypassword 158bc6bb3648afc1415371ae0c240715 package.json.gz.enc decoded-package.json
const [, , password, ivHex, source, destination] = process.argv
const iv = Buffer.from(ivHex, 'hex')

pipeline(
  createReadStream(source),
  createDecryptAndDecompress(password, iv),
  createWriteStream(destination),
  err => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`${destination} created`)
  }
)
