process.stdin
  .on('readable', () => {
    let chunk
    console.log('New data available')
    // biome-ignore lint/suspicious/noAssignInExpressions: idiomatic
    while ((chunk = process.stdin.read()) !== null) {
      console.log(`Chunk read (${chunk.length} bytes): "${chunk.toString()}"`)
    }
  })
  .on('end', () => console.log('End of stream'))
