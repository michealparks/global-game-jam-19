import { m4 } from '../utils/m4.js'
import { degToRad } from '../utils/math.js'
import gl2vertex from '../shaders/gl2-vertex.glsl'
import gl2frag from '../shaders/gl2-frag.glsl'
import vertex from '../shaders/gl1-vertex.glsl'
import frag from '../shaders/gl1-frag.glsl'

const fov = degToRad(30.0)
const zNear = 10.0
const zFar = 5000.0
const canvas = document.getElementById('canvas')
const context = canvas.getContext(__webgl2 ? 'webgl2' : 'webgl', {
  antialias: true,
  powerPreference: 'high-performance'
})

const shaders = __webgl2
  ? {vertex: gl2vertex, frag: gl2frag}
  : {vertex, frag}

if (__webgl2 === false) {
  const vaoExt = context.getExtension('OES_vertex_array_object')
  context.createVertexArray = () => vaoExt.createVertexArrayOES()
  context.bindVertexArray = (vao) => vaoExt.bindVertexArrayOES(vao)
}

const resizeCanvas = () => {
  const realToCSSPixels = window.devicePixelRatio
  const width = canvas.clientWidth * realToCSSPixels | 0
  const height = canvas.clientHeight * realToCSSPixels | 0

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width
    canvas.height = height
    aspectRatio = canvas.clientWidth / canvas.clientHeight
    projectionMatrix = m4.perspective(fov, aspectRatio, zNear, zFar)

    // Tell WebGL how to convert from clip space to pixels
    context.viewport(0, 0, canvas.width, canvas.height)
  }
}

let projectionMatrix
let aspectRatio = 0.0

resizeCanvas()
addEventListener('resize', resizeCanvas, { passive: true })

context.clearColor(0.0, 0.0, 0.0, 0.0)
context.clearDepth(1.0)

// Turn on depth testing
context.enable(context.DEPTH_TEST)

context.depthFunc(context.LEQUAL)

context.depthMask(true)

context.enable(context.BLEND)

context.blendFunc(context.SRC_ALPHA, context.ONE_MINUS_SRC_ALPHA)

// Tell webgl to cull faces
context.enable(context.CULL_FACE)

context.cullFace(context.FRONT)

export let gl = {
  canvas,
  context,
  shaders,
  projectionMatrix,
  aspectRatio
}