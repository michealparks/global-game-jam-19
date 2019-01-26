import {gl} from '../engine/gl.js'

const loadedUrls = []
const textures = []
const transparentPixel = new Uint8Array([0, 0, 0, 0])

function onload (e) {
  const image = e.target
  const index = +image.id

  gl.activeTexture(gl.TEXTURE0 + index)
  gl.bindTexture(gl.TEXTURE_2D, textures[index])

  gl.texImage2D(
    gl.TEXTURE_2D,    /* target */
    0,                /* level */
    gl.RGBA,          /* internalFormat */
    gl.RGBA,          /* format */
    gl.UNSIGNED_BYTE, /* type */
    image)

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
  gl.generateMipmap(gl.TEXTURE_2D)
}

function onerror (e) {
  if (__dev__) console.log(e)
}

export function loadTexture (url) {
  // check if the texture is loaded and return the index
  const urlIndex = loadedUrls.indexOf(url)

  if (urlIndex > -1) return urlIndex

  // create and bind the texture to a new slot
  const index = textures.length
  const texture = gl.createTexture()

  gl.activeTexture(gl.TEXTURE0 + index)
  gl.bindTexture(gl.TEXTURE_2D, texture)
  textures.push(texture)

  // temporarily set a transparent pixel for the texture until it loads
  gl.texImage2D(
    gl.TEXTURE_2D,    /* target */
    0,                /* level */
    gl.RGBA,          /* internalFormat */
    1,                /* width */
    1,                /* height */
    0,                /* border */
    gl.RGBA,          /* format */
    gl.UNSIGNED_BYTE, /* type */
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

export function setTexture (index, uSamplerLocation) {
  gl.activeTexture(gl.TEXTURE0 + index)
  gl.bindTexture(gl.TEXTURE_2D,  textures[index])
  gl.uniform1i(uSamplerLocation, index)
}
