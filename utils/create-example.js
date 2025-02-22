import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
/*
 * Utility script that scaffolds a new example in the book including a README.md, index.js and package.json
 *
 * Usage:
 *   node utils/create-example.js <chapter> <exampleName> <exampleDescription>
 */
import { mkdirp } from 'mkdirp'

const [, , chapter, exampleName, exampleDescription] = process.argv

if (!(chapter && exampleName && exampleDescription)) {
  console.error(
    'Usage: node utils/create-example.js <chapter> <exampleName> <exampleDescription>'
  )
  process.exit(1)
}

// create folder
const BASE_PATH = join(import.meta.dirname, '..', chapter, exampleName)

await mkdirp(BASE_PATH)
console.log(`Created folder: ${BASE_PATH}`)

// create index.js
const INDEX_JS_PATH = join(BASE_PATH, 'index.js')
const INDEX_JS_CONTENT = ''
await writeFile(INDEX_JS_PATH, INDEX_JS_CONTENT)
console.log(`Created file: ${INDEX_JS_PATH}`)

// create README.md
const README_MD_PATH = join(BASE_PATH, 'README.md')
const README_MD_CONTENT = `# ${exampleName}

${exampleDescription}.

## Run

To run the example launch:

\`\`\`
node index.js
\`\`\`

`
await writeFile(README_MD_PATH, README_MD_CONTENT)
console.log(`Created file: ${README_MD_PATH}`)

// create package.json
const PACKAGE_JSON_PATH = join(BASE_PATH, 'package.json')
const PACKAGE_JSON_CONTENT = {
  name: exampleName,
  version: '1.0.0',
  description: exampleDescription,
  type: 'module',
  scripts: {},
  engines: {
    node: '>=23',
  },
  engineStrict: true,
  keywords: [],
  author: 'Luciano Mammino and Mario Casciaro',
  license: 'MIT',
  dependencies: {},
  devDependencies: {},
}
await writeFile(
  PACKAGE_JSON_PATH,
  JSON.stringify(PACKAGE_JSON_CONTENT, null, 2)
)
console.log(`Created file: ${PACKAGE_JSON_PATH}`)
