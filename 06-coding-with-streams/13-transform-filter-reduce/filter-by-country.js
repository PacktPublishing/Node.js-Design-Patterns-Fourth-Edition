import { Transform } from 'node:stream'

export class FilterByCountry extends Transform {
  constructor(country, options = {}) {
    options.objectMode = true
    super(options)
    this.country = country
  }

  _transform(record, _enc, cb) {
    if (record.country === this.country) {
      this.push(record)
    }
    cb()
  }
}
