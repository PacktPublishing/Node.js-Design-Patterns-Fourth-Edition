import { CheckUrls } from './checkUrls.js'

const checkUrls = new CheckUrls([
  'https://nodejsdesignpatterns.com',
  'https://example.com',
  'https://mustbedownforsurehopefully.com',
  'https://loige.co',
  'https://mario.fyi',
  'https://httpstat.us/200',
  'https://httpstat.us/301',
  'https://httpstat.us/404',
  'https://httpstat.us/500',
  'https://httpstat.us/200?sleep=6000',
])

for await (const status of checkUrls) {
  console.log(status)
}
