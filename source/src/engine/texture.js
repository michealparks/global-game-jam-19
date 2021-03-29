import { gl } from '../engine/gl.js'

const { context } = gl
const loadedUrls = []
const textures = []
const transparentPixel = new Uint8Array([0, 0, 0, 0])

const onload = (e) => {
  const image = e.target

  if (!isPowerOf2(image.width) || !isPowerOf2(image.height)) {
    throw new Error(`${image.src} is not power of 2`)
  }
  
  const index = +image.id

  context.activeTexture(context.TEXTURE0 + index)
  context.bindTexture(context.TEXTURE_2D, textures[index])

  context.texImage2D(
    context.TEXTURE_2D,    /* target */
    0,                /* level */
    context.RGBA,          /* internalFormat */
    context.RGBA,          /* format */
    context.UNSIGNED_BYTE, /* type */
    image)

  context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.NEAREST)
  context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.NEAREST)
  context.generateMipmap(context.TEXTURE_2D)
}

const isPowerOf2 = (val) => {
  return (val & (val - 1)) == 0
}

const onerror = (err) => {
  throw new Error(err)
}

const load = (url) => {
  // check if the texture is loaded and return the index
  const urlIndex = loadedUrls.indexOf(url)

  if (urlIndex > -1) return urlIndex

  // create and bind the texture to a new slot
  const index = textures.length
  const texture = context.createTexture()

  context.activeTexture(context.TEXTURE0 + index)
  context.bindTexture(context.TEXTURE_2D, texture)
  textures.push(texture)

  // temporarily set a transparent pixel for the texture until it loads
  context.texImage2D(
    context.TEXTURE_2D,    /* target */
    0,                /* level */
    context.RGBA,          /* internalFormat */
    1,                /* width */
    1,                /* height */
    0,                /* border */
    context.RGBA,          /* format */
    context.UNSIGNED_BYTE, /* type */
    transparentPixel)

  // Load the image for the texture
  const image = new Image()
  image.id = index
  image.onload = onload
  image.onerror = onerror
  image.src = url
  loadedUrls.push(url)

  return index
}

const set = (index, uSamplerLocation) => {
  context.activeTexture(context.TEXTURE0 + index)
  context.bindTexture(context.TEXTURE_2D,  textures[index])
  context.uniform1i(uSamplerLocation, index)
}

export const texture = {
  load,
  set
}