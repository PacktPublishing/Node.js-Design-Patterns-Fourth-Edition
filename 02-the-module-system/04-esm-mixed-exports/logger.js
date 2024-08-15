// biome-ignore lint/style/noDefaultExport: showcases default exports
export default function log(message) {
  console.log(message)
}

export function info(message) {
  log(`info: ${message}`)
}
