import split from 'split2' // v4.2.0

const stream = process.stdin.pipe(split())
for await (const line of stream) {
  console.log(`You wrote: ${line}`)
}
