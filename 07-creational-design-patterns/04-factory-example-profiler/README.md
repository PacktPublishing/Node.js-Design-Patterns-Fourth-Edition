# 04-factory-example-profiler

This example shows how to use the factory pattern that creates different objects depending on the value of the NODE_ENV environment variable.

## Run

To run the example launch:

```bash
# Launch in development mode (with profiler)
node index.js 2201307499

# Launch in production mode (without profiler)
NODE_ENV=production node index.js 2201307499
```

or, if you are not using a Unix-like OS:

```bash
npx cross-env NODE_ENV=production node index.js 2201307499
```

