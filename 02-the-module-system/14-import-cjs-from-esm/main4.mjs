import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { someFeature } = require('./someModule.cjs')

console.log(someFeature)
