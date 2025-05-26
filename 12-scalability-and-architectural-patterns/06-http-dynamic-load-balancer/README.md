# 06-http-dynamic-load-balancer

This example demonstrates how to implement a dynamic load balancer in Node.js
using consul as a service discovery mechanism.

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

You will also need to install Consul following the
[instructions for your system](https://nodejsdp.link/consul-install), or by
running:

```bash
sudo apt-get install consul # on debian / ubuntu based systems
# or
brew install consul # on mac with brew installed
```

## Run

Start the Consul service registry locally:

```bash
consul agent -dev
```

Start the load balancer:

```bash
node loadBalancer.js
```

If you try to access a service before starting any servers, you'll get a 502
error:

```bash
curl localhost:8080/api
# Output: Bad Gateway
```

In separate terminals, start your service instances (e.g., two api-service and
one webapp-service):

```bash
app.js api-service
app.js api-service
app.js webapp-service
```

Now, requests to the load balancer will be distributed among the running
services:

```bash
curl localhost:8080/api
# Output: api-service response from <port>
```

Run the curl command multiple times to see responses from different servers,
confirming load balancing is working.
