import { Image } from './image.js'
import { jpgRgx } from './index.js'

export class ImageJpeg extends Image {
  constructor(path) {
    if (!path.match(jpgRgx)) {
      throw new Error(`${path} is not a JPEG image`)
    }
    super(path)
  }
}
