import { deepEqual } from 'node:assert/strict'
import { test } from 'node:test'
import { urlToFilename } from './utils.js'

test('urlToFilename', () => {
  const cases = [
    ['https://example.com', 'example.com/index.html'],
    ['https://example.com/test', 'example.com/test/index.html'],
    ['https://example.com/test/', 'example.com/test/index.html'],
    ['https://example.com/image.jpg', 'example.com/image.jpg'],
    ['https://example.com/image.jpg?size=md', 'example.com/image.jpg'],
  ]
  for (const [url, expected] of cases) {
    deepEqual(urlToFilename(url), expected)
  }
})
