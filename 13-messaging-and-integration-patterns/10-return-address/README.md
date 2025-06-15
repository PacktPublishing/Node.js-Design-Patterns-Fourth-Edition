# 09-correlation-id

This sample demonstrates how to implement a request/reply pattern on top of a
simple point-to-point one-way asynchronous channel.

## Dependencies

As pre-requisite to this sample, you first need to
[install RabbitMQ](http://www.rabbitmq.com/download.html)

If you have docker installed, you can run an ephemeral instance of RabbitMQ with
the following command:

```bash
docker run -it -p 5672:5672 --hostname my-rabbit rabbitmq:4
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

To run this example, use the following commands (in different terminals):

```bash
node replier.js
node requestor.js
node requestor.js # you can run as many requestors as you want
```
