import { readFile, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import {
  exists,
  get,
  getPageLinks,
  recursiveMkdir,
  urlToFilename,
} from './utils.js'

const spidering = new Set()

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

function spiderLinks(currentUrl, body, maxDepth, queue) {
  if (maxDepth === 0) {
    return
  }

  const links = getPageLinks(currentUrl, body)
  for (const link of links) {
    if (!spidering.has(link)) {
      queue.pushTask(() => spider(link, maxDepth - 1, queue))
      spidering.add(link)
    }
  }
}

export async function spider(url, maxDepth, queue) {
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
  return spiderLinks(url, content.toString('utf8'), maxDepth, queue)
}
