import zmq from 'zeromq' // v6.3.0
import { processTask } from './processTask.js'

const fromVentilator = new zmq.Pull()
const toSink = new zmq.Push()

fromVentilator.connect('tcp://localhost:5016')
toSink.connect('tcp://localhost:5017')

for await (const rawMessage of fromVentilator) {
  const found = processTask(JSON.parse(rawMessage.toString()))
  if (found) {
    console.log(`Found! => ${found}`)
    await toSink.send(`Found: ${found}`)
    break
  }
}
