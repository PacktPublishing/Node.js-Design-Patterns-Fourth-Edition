# 02-pubsub-chat-redi

This sample demonstrates how to integrate different server instances of a chat
application using Redis as message broker

## Dependencies

As a pre-requisite to this sample, you first need to install
[Redis](http://redis.io/download) and have it running locally on its default
port.

If you have docker installed you can easily run an ephemeral redis instance
locally with:

```bash
docker run -it -p 6379:6379 redis redis-server --appendonly yes
```

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

To run the example server:

```bash
node index.js <port>
```

For example, to run the server on port 8080:

```bash
node index.js 8080
```

Then you can access the chat application by opening your browser and navigating
to:

```
http://localhost:8080
```
