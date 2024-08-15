const SUPPORTED_LANGUAGES = ['el', 'en', 'es', 'it', 'pl'] // (1)
const selectedLanguage = process.argv[2] // (2)

if (!selectedLanguage) {
  // (3)
  console.error(
    `Please specify a language
    
    Usage: node ${process.argv[1]} <language_code>
    Supported languages: ${SUPPORTED_LANGUAGES.join(', ')}`
  )
  process.exit(1)
}

if (!SUPPORTED_LANGUAGES.includes(selectedLanguage)) {
  // (4)
  console.error('The specified language is not supported')
  process.exit(1)
}

const translationModule = `./strings-${selectedLanguage}.js` // (5)
const strings = await import(translationModule) // (6)
console.log(strings.HELLO) // (7)
