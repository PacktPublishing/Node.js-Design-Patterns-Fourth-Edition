import { Parser } from 'htmlparser2' // v9.1.0

export async function getInternalLinks(pageUrl) {
  const url = new URL(pageUrl)
  const response = await fetch(pageUrl)
  if (!response.ok) {
    throw new Error(`Failed to fetch ${pageUrl}: ${response.statusText}`)
  }

  const contentType = response.headers.get('content-type')
  if (contentType === null || !contentType.includes('text/html')) {
    throw new Error('The current URL is not a HTML page')
  }

  const body = await response.text()

  const internalLinks = new Set()
  const parser = new Parser({
    onopentag(name, attribs) {
      if (name === 'a' && attribs.href) {
        const newUrl = new URL(attribs.href, url)
        if (
          newUrl.hostname === url.hostname &&
          newUrl.pathname !== url.pathname
        ) {
          internalLinks.add(newUrl.toString())
        }
      }
    },
  })
  parser.end(body)
  return internalLinks
}
