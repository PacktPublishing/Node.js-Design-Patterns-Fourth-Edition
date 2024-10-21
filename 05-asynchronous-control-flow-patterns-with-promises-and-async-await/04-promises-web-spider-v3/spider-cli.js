import { spider } from './spider.js'

const url = process.argv[2]
const maxDepth = Number.parseInt(process.argv[3], 10) || 1

spider(url, maxDepth)
  .then(() => console.log('Downloaded complete'))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
