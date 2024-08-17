import { logger } from './logger.js'

const RED = '\x1b[31m'
const YELLOW = '\x1b[33m'
const GREEN = '\x1b[32m'
const WHITE = '\x1b[37m'
const RESET = '\x1b[0m'

const originalInfo = logger.info
const originalWarn = logger.warn
const originalError = logger.error
const originalDebug = logger.debug

logger.info = message => originalInfo(`${GREEN}${message}${RESET}`)
logger.warn = message => originalWarn(`${YELLOW}${message}${RESET}`)
logger.error = message => originalError(`${RED}${message}${RESET}`)
logger.debug = message => originalDebug(`${WHITE}${message}${RESET}`)
