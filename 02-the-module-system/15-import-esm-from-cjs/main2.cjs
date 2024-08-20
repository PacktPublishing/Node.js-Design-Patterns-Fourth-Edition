'use strict'

async function main() {
  const { someFeature } = await import('./someModule.mjs')
  console.log(someFeature)
}

main()
