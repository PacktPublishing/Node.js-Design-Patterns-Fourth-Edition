import { readFile, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import {
  exists,
  get,
  getPageLinks,
  recursiveMkdir,
  urlToFilename,
} from './utils.js'

async function saveFile(filename, content) {
  await recursiveMkdir(dirname(filename))
  return writeFile(filename, content)
}

async function download(url, filename) {
  console.log(`Downloading ${url} into ${filename}`)
  const content = await get(url)
  await saveFile(filename, content)
  return content
}

async function spiderLinks(currentUrl, body, maxDepth) {
  if (maxDepth === 0) {
    return
  }

  const links = getPageLinks(currentUrl, body)
  const promises = links.map(link => spider(link, maxDepth - 1))

  return Promise.all(promises)
}

export async function spider(url, maxDepth) {
  const filename = urlToFilename(url)

  let content
  if (!(await exists(filename))) {
    // if the file does not exist, download it
    content = await download(url, filename)
  }

  // if the file is not an HTML file, stop here
  if (!filename.endsWith('.html')) {
    return
  }

  // if file content is not already loaded, load it from disk
  if (!content) {
    content = await readFile(filename)
  }

  // spider the links in the file
  return spiderLinks(url, content.toString('utf8'), maxDepth)
}
