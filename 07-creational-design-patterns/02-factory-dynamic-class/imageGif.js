import { Image } from './image.js'
import { gifRgx } from './index.js'

export class ImageGif extends Image {
  constructor(path) {
    if (!path.match(gifRgx)) {
      throw new Error(`${path} is not a GIF image`)
    }
    super(path)
  }
}
