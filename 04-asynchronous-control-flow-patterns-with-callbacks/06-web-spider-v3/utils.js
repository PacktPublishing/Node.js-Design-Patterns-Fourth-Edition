import { constants, access } from 'node:fs'
import { extname, join } from 'node:path'
import { Parser } from 'htmlparser2'
import { mkdirp } from 'mkdirp'
import slug from 'slug'

export function exists(filePath, cb) {
  access(filePath, constants.F_OK, err => {
    if (err) {
      if (err.code === 'ENOENT') {
        // the file does not exist
        return cb(null, false)
      }
      // unexpected error checking the file
      return cb(err)
    }

    // the file exists
    return cb(null, true)
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
// fetch in a callback-based API because at this point of the book we want
// to demonstrate callback based patterns
export function get(url, cb) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.statusText}`)
      }
      // NOTE: this loads all the content in memory and therefore is not suitable
      // to handle large payloads.
      // For large payloads, we would need to use a stream-based approach
      return response.arrayBuffer()
    })
    .then(content => cb(null, Buffer.from(content)))
    .catch(err => cb(err))
}

// NOTE: this function is just for illustrative purposes. We are wrapping
// mkdirp in a callback-based API because at this point of the book we want
// to demonstrate callback based patterns
export function recursiveMkdir(path, cb) {
  mkdirp(path)
    .then(() => cb(null))
    .catch(e => cb(e))
}

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
