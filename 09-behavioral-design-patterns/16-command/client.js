import { createPostStatusCmd } from './createPostStatusCmd.js'
import { Invoker } from './invoker.js'
import { statusUpdateService } from './statusUpdateService.js'

// The Client code
const invoker = new Invoker()
const command = createPostStatusCmd(statusUpdateService, 'HI!')
invoker.run(command)
invoker.undo()
invoker.delay(command, 1000 * 3)
invoker.runRemotely(command)
