# 16-integration-test-http

Demonstrates how to create an integration test for an HTTP server using Fastify.

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

To run the example launch:

```
node --test
```

## Try the app

Start the webserver with:

```bash
node server.js
```

This will make the server available at `http://localhost:3000/`

You can now create a new event with a request like the following:

```bash
curl \ 
  -X POST \ 
  -H 'Content-Type: application/json' \ 
  -d '{"name":"sample event", "totalSeats": 22}' \ 
  http://localhost:3000/events
```

This should return a 201 Created response with the event id in the body, for
example:

```json
{
  "success":true,
  "eventId":"21cd8fdf-95e5-4253-9ca4-7291c63f25e7"
}⏎
```

Now you can create reservations for the event with a request like the following
(make sure to update the event id in the URL):

```bash
curl \
  -X POST \
  -H 'Content-Type: application/json' \
  -d '{"userId": "John"}' \
  http://localhost:3000/events/21cd8fdf-95e5-4253-9ca4-7291c63f25e7/reservations
```

If the reservation is successful, you should get a 201 Created response with the
reservation id in the body, for example:

```json
{
  "success": true,
  "reservationId": "21cd8fdf-95e5-4253-9ca4-7291c63f25e7"
}
```
