'use strict'

// This will throw an ERR_REQUIRE_ESM error
const { someFeature } = require('./someModule.mjs')

console.log(someFeature)
