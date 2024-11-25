import { createCipheriv, createDecipheriv, scryptSync } from 'node:crypto'
import { compose } from 'node:stream'
import { createGunzip, createGzip } from 'node:zlib'

function createKey(password) {
  return scryptSync(password, 'salt', 24)
}

export function createCompressAndEncrypt(password, iv) {
  const key = createKey(password)
  const combinedStream = compose(
    createGzip(),
    createCipheriv('aes192', key, iv)
  )
  combinedStream.iv = iv

  return combinedStream
}

export function createDecryptAndDecompress(password, iv) {
  const key = createKey(password)
  return compose(createDecipheriv('aes192', key, iv), createGunzip())
}
