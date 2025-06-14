export function* generateTasks(searchHash, alphabet, maxWordLength, batchSize) {
  const alphabetLength = BigInt(alphabet.length)
  const maxWordLengthBigInt = BigInt(maxWordLength)
  let nVariations = 0n
  for (let n = 1n; n <= maxWordLengthBigInt; n++) {
    nVariations += alphabetLength ** n
  }
  console.log(
    `Finding the hashsum source string over ${nVariations} possible variations`
  )

  let batchStart = 1n
  while (batchStart <= nVariations) {
    const expectedBatchSize = batchStart + BigInt(batchSize) - 1n
    const batchEnd =
      expectedBatchSize > nVariations ? nVariations : expectedBatchSize
    yield JSON.stringify({
      searchHash,
      alphabet: alphabet,
      // convert BigInt to string for JSON serialization
      batchStart: batchStart.toString(),
      batchEnd: batchEnd.toString(),
    })

    batchStart = batchEnd + 1n
  }
}
