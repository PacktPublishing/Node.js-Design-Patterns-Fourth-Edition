import { readFile } from 'node:fs'

function readJsonThrows(filename, callback) {
  readFile(filename, 'utf8', (err, data) => {
    if (err) {
      return callback(err)
    }
    callback(null, JSON.parse(data))
  })
}

// The error is not propagated to the final callback nor is caught
// by a try/catch statement
try {
  readJsonThrows(new URL('invalid_json.json', import.meta.url), err =>
    console.error(err)
  )
} catch (_err) {
  console.log('This will NOT catch the JSON parsing exception')
}

// Our last chance to intercept any uncaught error
process.on('uncaughtException', err => {
  console.error(
    `This will catch at last the JSON parsing exception: ${err.message}`
  )
  // Terminates the application with 1 (error) as exit code.
  // Without the following line, the application would continue
  process.exit(1)
})
