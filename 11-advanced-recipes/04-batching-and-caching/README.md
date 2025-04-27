# 04-batching-and-caching

This sample shocases how asynchronous batching and caching work.

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

First, populate the database with some sample data:

```
node populateDb.js
```

The command above will create 100000 random sales transactions in the format:

```
{amount, product}
```

Next, to start the server, run:

```
node server.js
```

To test the server with multiple concurrent request, simply run:

```
autocannon 'http://localhost:8000/?product=book'
```

In the file `server.js`, try to swap between the various implementations of the
`totalSales()` API to compare their performances. Please note that using the
vanilla implementation (`totalSales`).

```
import { totalSales } from './totalSales.js'
// import {totalSales} from './totalSalesBatch.js'
// import {totalSales} from './totalSalesCache.js'
```

NOTE: remember to restart the server after changing the implementation before
running the benchmark again.
