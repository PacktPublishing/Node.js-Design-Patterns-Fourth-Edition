# 16-import-json-files

This sample demonstrates different ways to import a JSON file in ESM and CJS.

## Run

```bash
node main.cjs # CommonJS (require)
node main.mjs # Broken ESM (import)
node main2.mjs # ESM (import with { type: 'json' })
node main3.mjs # ESM (dynamic import with { type: 'json' })
node main4.js # ESM (load and parse the file with readFile)
node main5.mjs # ESM (require)
```