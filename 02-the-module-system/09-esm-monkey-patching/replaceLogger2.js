// Another flawed alternative implementation of the logger module
// Uncomment this file and import it in main.js to see the error

/*
import * as loggerModule from './logger.js'

const RED = '\x1b[31m'
const YELLOW = '\x1b[33m'
const GREEN = '\x1b[32m'
const WHITE = '\x1b[37m'
const RESET = '\x1b[0m'

// replacing the logger binding inside the loggerModule with a new object
// this will fail with a TypeError: Cannot assign to read only property 'logger' of object '[object Module]'
loggerModule.logger = {
  info: message => {
    console.log(`INFO: ${GREEN}${message}${RESET}`)
  },
  warn: message => {
    console.log(`WARN: ${YELLOW}${message}${RESET}`)
  },
  debug: message => {
    console.log(`DEBUG: ${WHITE}${message}${RESET}`)
  },
  error: message => {
    console.log(`ERROR: ${RED}${message}${RESET}`)
  },
}
*/
