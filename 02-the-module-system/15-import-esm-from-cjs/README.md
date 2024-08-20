# 15-import-esm-from-cjs

This sample demonstrates different ways to import ES modules from CommonJS.

## Run

```bash
node main.cjs # will fail with ERR_REQUIRE_ESM
node --experimental-require-module main.cjs # uses experimental support for loading ESM from CJS
node main2.cjs # dynamic import with import()
```