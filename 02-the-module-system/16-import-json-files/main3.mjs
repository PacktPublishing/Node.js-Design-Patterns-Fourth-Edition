const { default: data } = await import('./sample.json', {
  with: { type: 'json' },
})
console.log(data)
