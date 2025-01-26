import { resolve } from 'node:path'

export function createFsAdapter(db) {
  return {
    async readFile(filename, options = undefined) {
      const valueEncoding =
        typeof options === 'string' ? options : options?.encoding
      const opt = valueEncoding ? { valueEncoding } : undefined
      const value = await db.get(resolve(filename), opt)

      if (typeof value === 'undefined') {
        const e = new Error(
          `ENOENT: no such file or directory, open '${filename}'`
        )
        e.code = 'ENOENT'
        e.errno = 34
        e.path = filename
        throw e
      }
      return value
    },

    async writeFile(filename, contents, options = undefined) {
      const valueEncoding =
        typeof options === 'string' ? options : options?.encoding
      const opt = valueEncoding ? { valueEncoding } : undefined
      await db.put(resolve(filename), contents, opt)
    },
  }
}
