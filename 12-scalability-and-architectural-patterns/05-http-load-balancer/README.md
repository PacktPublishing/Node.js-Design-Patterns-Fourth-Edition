# 05-http-load-balancer

This example demonstrates how to run a set of Node.js servers behind a load
balancer.

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

You will also need to install nginx locally using the
[instructions for your system](https://nodejsdp.link/nginx-install), or by
running:

```bash
sudo apt-get install nginx # on debian / ubuntu based systems
# or
brew install nginx # on mac with brew installed
```

## Run

To run 4 instances of the example server using `forever`:

```bash
npm start # or `pm2 start --namespace 'app' --name 'app1' app.js -- 8081 && pm2 start --namespace 'app' --name 'app2' app.js -- 8082 && pm2 start --namespace 'app' --name 'app3' app.js -- 8083 && pm2 start --namespace 'app' --name 'app4' app.js -- 8084`
```

Now run nginx with:

```bash
npm run start:nginx # or `nginx -c ${PWD}/nginx.conf`
```

**Note**: On some systems, the command above might fail because of permission
issues. If you can't figure out how to set the right permissions for your
system, you could try to run the command as admin (`sudo npm run start:nginx`).

To run a benchmark (in another terminal):

```bash
npm run benchmark # or `npx autocannon http://localhost:8080`
```

You can stop nginx with ctrl+c in the terminal.

To stop all the Node.js servers use:

```bash
npm run stop # or `pm2 stop app`
```
