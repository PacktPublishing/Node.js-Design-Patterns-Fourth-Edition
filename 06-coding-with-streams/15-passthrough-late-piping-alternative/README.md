# 15-passthrough-late-piping-alternative

This example shows how to create and use a `PassThrough` stream for late writing
into a third party API accepting content from a stream. This is implemented here
through a web server that can receive files and store them locally.

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

To run the example you have to start the server first:

```bash
node server.js
```

Then, in another terminal window you can run:

```bash
node upload-cli.js <path-to-file-to-upload>
```
