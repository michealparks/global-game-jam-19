import gl2vertex from '../shaders/gl2-vertex.glsl'
import gl2frag from '../shaders/gl2-frag.glsl'
import vertex from '../shaders/gl1-vertex.glsl'
import frag from '../shaders/gl1-frag.glsl'

export const canvas = document.getElementById('canvas')

export const gl = canvas.getContext(__webgl2 ? 'webgl2' : 'webgl', {
  antialias: true,
  powerPreference: 'high-performance'
})

export const shaders = __webgl2
  ? {vertex: gl2vertex, frag: gl2frag}
  : {vertex, frag}

if (__webgl2 === false) {
  const vaoExt = gl.getExtension('OES_vertex_array_object')

  function createVertexArray () {
    return vaoExt.createVertexArrayOES()
  }

  function bindVertexArray (vao) {
    return vaoExt.bindVertexArrayOES(vao)
  }

  gl.createVertexArray = createVertexArray
  gl.bindVertexArray = bindVertexArray
}
