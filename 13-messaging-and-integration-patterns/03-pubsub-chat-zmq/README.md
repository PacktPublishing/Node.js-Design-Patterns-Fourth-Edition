# 03-pubsub-chat-zmq

This sample demonstrates how to integrate different server instances of a chat
application using ZeroMQ.

## Dependencies

This example requires you to install some third-party dependencies from npm.

If you have `pnpm` installed, you can do that with:

```bash
pnpm install
```

Alternatively, if you prefer to use another package manager, make sure to delete
the `pnpm-lock.yaml` file before using it.

If you want to use `npm`, you can run:

```bash
npm install
```

If you want to use `yarn`, you can run:

```bash
yarn install
```

## Run

To run 3 instances of the server and connect them to each other, you can run the
following commands in separate terminal windows:

```bash
node index.js --http 8080 --pub 5000 --sub 5001 --sub 5002
node index.js --http 8081 --pub 5001 --sub 5000 --sub 5002
node index.js --http 8082 --pub 5002 --sub 5000 --sub 5001
```

You can try to access those three addresses from 3 different browser windows,
and see how messages are exchanged from one instance to the others:

```
http://localhost:8080
http://localhost:8081
http://localhost:8082
```
