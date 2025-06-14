# 05-pubsub-redis-streams

This sample demonstrates how to use Redis streams to provide persistent message
storage and real-time capabilities to a chat application

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

To run the various components, run in different terminals the following
commands:

```bash
node index.js 8080 # runs a version of the chat application on port 8080
node index.js 8081 # runs a version of the chat application on port 8081
node historySvc.js # runs the history service
```

Then you can access the chat application by opening your browser and navigating
to:

```
http://localhost:8080
```

or

```
http://localhost:8081
```
