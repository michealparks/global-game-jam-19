import { gl } from './gl.js'

const { context } = gl

const createShader = (type, source) => {
  const shader = context.createShader(type)
  context.shaderSource(shader, source)
  context.compileShader(shader)

  if (context.getShaderParameter(shader, context.COMPILE_STATUS)) {
    return shader
  }

  console.error('Error compiling shader: ', context.getShaderInfoLog(shader))

  context.deleteShader(shader)
}

const createProgram = (vertex, fragment, attribs, locations) => {
  const program = context.createProgram()
  context.attachShader(program, vertex)
  context.attachShader(program, fragment)

  if (attribs !== undefined) {
    for (let i = 0; i < attribs.length; i++) {
      context.bindAttribLocation(program, locations !== undefined ? locations[i] : i, attribs[i])
    }
  }
  
  context.linkProgram(program)
  
  if (context.getProgramParameter(program, context.LINK_STATUS)) {
    return program
  }

  if (__dev__) {
    console.error('Error compiling program: ', context.getProgramInfoLog(program))
  }

  context.deleteProgram(program)
}


export const program = createProgram(
  createShader(context.VERTEX_SHADER, gl.shaders.vertex),
  createShader(context.FRAGMENT_SHADER, gl.shaders.frag)
)

export const programUniforms = {
  uMatrix: context.getUniformLocation(program, 'uMatrix'),
  uAlpha: context.getUniformLocation(program, 'uAlpha'),
  uSampler: context.getUniformLocation(program, 'uSampler'),
}

export const initVao = (pName, indices, attribs) => {
  const vao = context.createVertexArray()
  context.bindVertexArray(vao)

  context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, context.createBuffer())
  context.bufferData(context.ELEMENT_ARRAY_BUFFER, indices, context.STATIC_DRAW)

  for (const attrib of attribs) {
    const index = context.getAttribLocation(program, attrib.name)
    context.bindBuffer(context.ARRAY_BUFFER, context.createBuffer())
    context.bufferData(context.ARRAY_BUFFER, attrib.data, context.STATIC_DRAW)

    const type = context.FLOAT
    const normalized = false
    const stride = 0
    const offset = 0
    context.vertexAttribPointer(index, attrib.size, type, normalized, stride, offset)
    context.enableVertexAttribArray(index)
  }

  context.bindVertexArray(null)

  return vao
}
