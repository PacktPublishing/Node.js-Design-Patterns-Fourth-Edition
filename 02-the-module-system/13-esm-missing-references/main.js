import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

console.log(import.meta.filename)
console.log(import.meta.dirname)

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
console.log(__filename)
console.log(__dirname)
