import {m4_perspective} from '../utils/m4.js'
import {degToRad} from '../utils/math.js'

/**
 * Webgl and canvas related boilerplate setup
 */
function resizeCanvas () {
  const c = gl.canvas
  const realToCSSPixels = window.devicePixelRatio
  const w = c.clientWidth * realToCSSPixels | 0
  const h = c.clientHeight * realToCSSPixels | 0

  if (c.width !== w || c.height !== h) {
    c.width = w
    c.height = h
    aspectRatio = c.clientWidth / c.clientHeight
    projectionMatrix = m4_perspective(fov, aspectRatio, zNear, zFar)

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, c.width, c.height)
  }
}

export const canvas = document.getElementById('canvas')

export const gl = canvas.getContext('webgl2', {
  antialias: true,
  powerPreference: 'high-performance'
})

const fov = degToRad(30.0)
const zNear = 10.0
const zFar = 5000.0

export let projectionMatrix
export let aspectRatio = 0.0

canvas.addEventListener('webglcontextlost', function (e) {
  e.preventDefault()
}, false)

canvas.addEventListener('webglcontextrestored', function (e) {
  // TODO: set up webGL state and resources
}, false)

resizeCanvas()
addEventListener('resize', resizeCanvas, {passive: true})

gl.clearColor(0.0, 0.0, 0.0, 1.0)
gl.clearDepth(1.0)

// Turn on depth testing
gl.enable(gl.DEPTH_TEST)

gl.depthFunc(gl.LEQUAL)

gl.depthMask(true)

gl.enable(gl.BLEND)

gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

// Tell webgl to cull faces
gl.enable(gl.CULL_FACE)

gl.cullFace(gl.FRONT)
