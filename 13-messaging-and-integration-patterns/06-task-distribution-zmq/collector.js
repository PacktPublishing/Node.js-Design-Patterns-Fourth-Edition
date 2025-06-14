import zmq from 'zeromq' // v6.3.0

const sink = new zmq.Pull()
await sink.bind('tcp://*:5017')

for await (const rawMessage of sink) {
  console.log('Message from worker: ', rawMessage.toString())
}
