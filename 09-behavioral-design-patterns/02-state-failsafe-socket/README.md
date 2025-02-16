# 02-state-failsafe-socket

This sample demonstrates how to use the State pattern to create a client socket
that doesn't break when it loses connection with the server.

## Run

Open two different terminal windows.

In the first terminal window type:

```bash
node server.js
```

In the second window type:

```bash
node client.js
```

You can try shutting down (`ctrl+c`) and restarting the server several times to
see the state in the client changing from online to offline and then back to
online when the server is restarted.

You can also try to run multiple clients at the same time to see different
processes sending messages to the server.
