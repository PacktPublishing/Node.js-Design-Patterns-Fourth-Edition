import { readFile } from 'node:fs'

function readJson(filename, callback) {
  readFile(filename, 'utf8', (err, data) => {
    let parsed
    if (err) {
      // error reading the file
      // propagate the error and exit the current function
      return callback(err)
    }

    try {
      // parse the file contents
      parsed = JSON.parse(data)
    } catch (err) {
      // catch parsing errors
      return callback(err)
    }
    // no errors, propagate just the data
    callback(null, parsed)
  })
}

const cb = (err, data) => {
  if (err) {
    return console.error(err)
  }
  console.log(data)
}

readJson(new URL('valid_json.json', import.meta.url), cb) // dumps the content
readJson(new URL('invalid_json.json', import.meta.url), cb) // prints error (SyntaxError)
