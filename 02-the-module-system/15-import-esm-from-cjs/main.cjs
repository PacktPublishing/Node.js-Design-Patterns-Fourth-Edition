'use strict'

// This will throw an ERR_REQUIRE_ESM error
// unless you use the node flag `--experimental-require-module`
const { someFeature } = require('./someModule.mjs')

console.log(someFeature)
