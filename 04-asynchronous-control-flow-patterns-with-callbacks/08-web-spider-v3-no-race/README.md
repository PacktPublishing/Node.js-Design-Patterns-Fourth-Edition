# 08-web-spider-v3-no-race

Web spider example to demonstrate unlimited parallel execution (with no race
conditions).

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

Run the example with:

```bash
node spider-cli.js https://loige.co 3
```
