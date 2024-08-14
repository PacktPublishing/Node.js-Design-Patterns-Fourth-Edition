// import multiple members of the module
import { Logger, log } from './logger.js'

log('Hello World')
const logger = new Logger('DEFAULT')
logger.log('Hello world')
