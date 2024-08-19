import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

const jsonPath = join(import.meta.dirname, 'sample.json')
try {
  const dataRaw = await readFile(jsonPath, 'utf-8')
  const data = JSON.parse(dataRaw)
  console.log(data)
} catch (error) {
  console.error(error)
}
