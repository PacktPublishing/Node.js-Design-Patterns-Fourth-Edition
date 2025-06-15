# 08-task-distribution-redis-streams

This sample demonstrates how to distribute tasks to a set of remote workers
using Redis Streams.

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
node worker.js workerA # runs a worker that will process tasks
node worker.js workerB # runs a second worker that will process tasks (you can run as many as you want but make sure to use a different name for each worker)
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
