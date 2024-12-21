import { Image } from './image.js'
import { pngRgx } from './index.js'

export class ImagePng extends Image {
  constructor(path) {
    if (!path.match(pngRgx)) {
      throw new Error(`${path} is not a PNG image`)
    }
    super(path)
  }
}
