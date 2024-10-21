import { constants } from 'node:fs'
import { access } from 'node:fs/promises'
import { extname, join } from 'node:path'
import { Parser } from 'htmlparser2'
import { mkdirp } from 'mkdirp'
import slug from 'slug'

export function exists(filePath) {
  return access(filePath, constants.F_OK)
    .then(() => true)
    .catch(err => {
      if (err.code === 'ENOENT') {
        return false
      }

      throw err
    })
}

export function urlToFilename(url) {
  const parsedUrl = new URL(url)
  const urlComponents = parsedUrl.pathname.split('/')
  const originalFileName = urlComponents.pop()
  const urlPath = urlComponents
    .filter(component => component !== '')
    .map(component => slug(component, { remove: null }))
    .join('/')
  const basePath = join(parsedUrl.hostname, urlPath)
  const missingExtension = !originalFileName || extname(originalFileName) === ''
  if (missingExtension) {
    return join(basePath, originalFileName, 'index.html')
  }

  return join(basePath, originalFileName)
}

// NOTE: this function is just for illustrative purposes. We are wrapping
// fetch in a simplified API because at this point of the book we want
// to demonstrate some promise based patterns
export function get(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.statusText}`)
      }
      // NOTE: this loads all the content in memory and therefore is not suitable
      // to handle large payloads.
      // For large payloads, we would need to use a stream-based approach
      return response.arrayBuffer()
    })
    .then(content => Buffer.from(content))
}

// NOTE: this function is just for illustrative purposes. We are aliasing
// `mkdirp` just to keep the same naming conventions as the ones we had in the callback-based
// version of this example
export const recursiveMkdir = mkdirp

export function getPageLinks(currentUrl, body) {
  const url = new URL(currentUrl)
  const internalLinks = []
  const parser = new Parser({
    onopentag(name, attribs) {
      if (name === 'a' && attribs.href) {
        const newUrl = new URL(attribs.href, url)
        if (
          newUrl.hostname === url.hostname &&
          newUrl.pathname !== url.pathname
        ) {
          internalLinks.push(newUrl.toString())
        }
      }
    },
  })
  parser.end(body)

  return internalLinks
}
