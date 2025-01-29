# 11-async-await-web-spider-v2

Web spider example to demonstrate sequential asynchronous execution with
async/await

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

You can run the example with:

```bash
node spider-cli.js https://loige.co
```

You can optionally specify the maximum depth of crawling by passing a second
parameter:

```bash
node spider-cli.js https://loige.co 5
```
