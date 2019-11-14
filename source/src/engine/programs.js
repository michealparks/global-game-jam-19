import {shaders} from './gl-compat.js'
import {gl} from './gl.js'
import {createShader, createProgram} from './util.js'

export const program = createProgram(
  createShader(gl.VERTEX_SHADER, shaders.vertex),
  createShader(gl.FRAGMENT_SHADER, shaders.frag)
)

export const programUniforms = {
  uMatrix: gl.getUniformLocation(program, 'uMatrix'),
  uAlpha: gl.getUniformLocation(program, 'uAlpha'),
  uSampler: gl.getUniformLocation(program, 'uSampler'),
}

export function initVao (pName, indices, attribs) {
  const vao = gl.createVertexArray()
  gl.bindVertexArray(vao)

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer())
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW)

  for (let a, loc, i = 0, l = attribs.length; i < l; i++) {
    a = attribs[i]
    loc = gl.getAttribLocation(program, a.name)

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
    gl.bufferData(gl.ARRAY_BUFFER, a.data, gl.STATIC_DRAW)
    gl.vertexAttribPointer(loc, a.size, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(loc)
  }

  gl.bindVertexArray(null)

  return vao
}
