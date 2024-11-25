# 17-pipeline-helper

This example shows how to create an advanced pipeline using `stream.pipeline()`.

## Run

To run the example:

```bash
echo 'Hello World!' | gzip | node uppercasify-gzipped.js | gunzip
```

If you want to make the stream fail you could simply remove the `gzip` step:

```bash
echo 'Hello World!' | gzip | node uppercasify-gzipped.js
```

You can also look at the file `uppercasify-gzipped-promise.js` for an example on
how to promisify the `pipeline()` helper.
