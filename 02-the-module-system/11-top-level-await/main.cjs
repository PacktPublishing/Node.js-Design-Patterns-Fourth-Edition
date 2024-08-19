'use strict'

const { loadData } = require('./nobel.cjs')

// console.log(await loadData()) // SyntaxError

async function main() {
  console.log(await loadData())
}

main()
