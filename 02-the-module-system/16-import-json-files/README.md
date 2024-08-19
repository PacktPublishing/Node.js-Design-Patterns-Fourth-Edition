# 16-import-json-files

This sample demonstrates different ways to import a JSON file in ESM and CJS.

## Run

```bash
node main.cjs # CommonJS (require)
node main.mjs # ESM (import with { type: 'json' })
node main2.mjs # ESM (load and parse the file with readFile)
node main3.mjs # ESM (require)
```