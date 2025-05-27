# 07-peer-to-peer-load-balancing

This example demonstrates how to implement peer-to-peer load balancing

## Run

Run 2 instances of the app with:

```bash
node app.js 8081
node app.js 8082
```

Now run the client with:

```bash
node client.js
```

We should notice how each request is sent to a different server, confirming that
we are now able to balance the load without a dedicated reverse proxy!
