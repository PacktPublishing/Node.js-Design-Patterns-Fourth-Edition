import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const data = require('./sample.json')

console.log(data)
