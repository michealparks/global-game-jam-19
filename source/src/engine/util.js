import {gl} from '../engine/gl.js'

export function createShader (type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    return shader
  }

  console.error('Error compiling shader: ', gl.getShaderInfoLog(shader))

  gl.deleteShader(shader)
}

export function createProgram (vertex, fragment, attribs, locations) {
  const program = gl.createProgram()
  gl.attachShader(program, vertex)
  gl.attachShader(program, fragment)

  if (attribs !== undefined) {
    for (let i = 0; i < attribs.length; i++) {
      gl.bindAttribLocation(program, locations !== undefined ? locations[i] : i, attribs[i])
    }
  }
  
  gl.linkProgram(program)
  
  if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
    return program
  }

  if (__dev__) {
    console.error('Error compiling program: ', gl.getProgramInfoLog(program))
  }

  gl.deleteProgram(program)
}

export function shuffleArray (array) {
  for (let i = array.length - 1, j, t; i > 0; --i) {
    j = Math.floor(Math.random() * (i + 1))
    t = array[i]
    array[i] = array[j]
    array[j] = t
  }
}
