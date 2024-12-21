import { ImageGif } from './imageGif.js'
import { ImageJpeg } from './imageJpeg.js'
import { ImagePng } from './imagePng.js'

export const jpgRgx = /\.jpe?g$/
export const gifRgx = /\.gif$/
export const pngRgx = /\.png$/

function createImage(name) {
  if (name.match(jpgRgx)) {
    return new ImageJpeg(name)
  }
  if (name.match(gifRgx)) {
    return new ImageGif(name)
  }
  if (name.match(pngRgx)) {
    return new ImagePng(name)
  }
  throw new Error('Unsupported format')
}

const image1 = createImage('photo.jpg')
const image2 = createImage('photo.gif')
const image3 = createImage('photo.png')

console.log(image1, image2, image3)
