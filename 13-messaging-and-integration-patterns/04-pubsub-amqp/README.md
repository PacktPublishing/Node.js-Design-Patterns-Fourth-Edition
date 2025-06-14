# 04-pubsub-amqp

This sample demonstrates how to integrate a chat application and a microservice
using AMQP

## Dependencies

As pre-requisite to this sample, you first need to
[install RabbitMQ](http://www.rabbitmq.com/download.html)

If you have docker installed, you can run an ephemeral instance of RabbitMQ with
the following command:

```bash
docker run -it -p 5672:5672 --hostname my-rabbit rabbitmq:3
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
