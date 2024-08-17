console.log(import.meta.resolve('./utils/example.js')) // file://<project_path>/utils/example.js

console.log(import.meta.resolve('assert')) // node:assert
console.log(import.meta.resolve('node:assert')) // node:assert
console.log(import.meta.resolve('fastify/lib/logger.js')) // file://<project_path>/node_modules/fastify/lib/logger.js
