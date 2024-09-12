# 07-io-starvation

This example demonstrates how you can starve the event loop by constantly
scheduling tasks with `process.nextTick()`.

## Run

To run the example launch:

```bash
node index.js
```
