# 09-writable-http-entropy-server

This example shows how to write into a readable stream, specifically an HTTP
response sent by a server.

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
npm install
```

## Run

To run the server:

```bash
node entropy-server.js
```

Now you can make requests to the server by pointing your browser to
[http://localhost:3000] or with curl as follows:

```bash
curl -i --raw http://localhost:3000/
```
