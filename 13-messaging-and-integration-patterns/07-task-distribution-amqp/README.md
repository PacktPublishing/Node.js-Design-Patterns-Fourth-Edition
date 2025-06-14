# 07-task-distribution-amqp

This sample demonstrates how to distribute tasks to a set of remote workers
using RabbitMQ and AMQP.

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

To run the various components, run in different terminals the following
commands:

```bash
node worker.js # runs a worker that will process tasks
node worker.js # runs a second worker that will process tasks (you can run as many as you want)
node collector.js # runs a collector that will collect results from the workers
node producer.js 4 f8e966d1e207d02c44511a58dccff2f5429e9a3b # runs a producer that will send tasks to the workers
```

> [!TIP] If you want to test other hashes, you can generate them with the
> following code:
>
> ```js
> import { createHash } from "node:crypto";
> console.log(createHash("sha1").update("your-string-here").digest("hex"));
> ```
