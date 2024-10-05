import { deepEqual } from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { test } from 'node:test'
import { getPageLinks } from './utils.js'

test('getPageLinks', async () => {
  const sampleFile = join(import.meta.dirname, 'fixtures', 'index.html')
  const rawHtml = await readFile(sampleFile, 'utf-8')
  const links = getPageLinks('https://www.nodejsdesignpatterns.com', rawHtml)
  deepEqual(links, [
    'https://www.nodejsdesignpatterns.com/blog/node-js-stream-consumer/',
    'https://www.nodejsdesignpatterns.com/blog/javascript-async-iterators/',
    'https://www.nodejsdesignpatterns.com/blog/node-js-development-with-docker-and-docker-compose/',
    'https://www.nodejsdesignpatterns.com/blog/node-js-race-conditions/',
    'https://www.nodejsdesignpatterns.com/blog/5-ways-to-install-node-js/',
  ])
})
