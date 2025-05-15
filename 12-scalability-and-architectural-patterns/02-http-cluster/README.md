# 02-http-cluster

This example demonstrates how to benchmark a simple http server that uses the
`node:cluster` module.

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

To run the example server:

```bash
npm start # or `node app.js`
```

To run a benchmark (in another terminal):

```bash
npm run benchmark # or `npx autocannon http://localhost:8080`
```
