/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!***********************************!*\
  !*** ./src/index.js + 21 modules ***!
  \***********************************/
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

;// CONCATENATED MODULE: ./src/utils/m4.js
const EPSILON = 0.000001

const identity = () => {
  const m = new Float32Array(16)

  m[0] = m[5] = m[10] = m[15] = 1.0

  return m
}

const identityFrom = (m) => {
  m[0] = m[5] = m[10] = m[15] = 1.0
  m[1] = m[2] = m[3] = m[4] = m[6] = m[7] = m[8] = m[9] = m[11] = m[12] = m[13] = m[14] = 0.0

  return m
}

const copy = (a) => {
  const m = new Float32Array(16)

  m[0] = a[0]; m[1] = a[1]; m[2] = a[2]; m[3] = a[3]
  m[4] = a[4]; m[5] = a[5]; m[6] = a[6]; m[7] = a[7]
  m[8] = a[8]; m[9] = a[9]; m[10] = a[10]; m[11] = a[11]
  m[12] = a[12]; m[13] = a[13]; m[14] = a[14]; m[15] = a[15]

  return m
}

const multiply = (a, b, m) => {
  const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3]
  const a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7]
  const a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11]
  const a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15]

  let b0 = 0.0, b1 = 0.0, b2 = 0.0, b3 = 0.0

  // Cache only the current line of the second matrix
  b0 = b[0]; b1 = b[1]; b2 = b[2]; b3 = b[3]
  m[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
  m[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
  m[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
  m[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33

  b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7]
  m[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
  m[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
  m[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
  m[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33

  b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11]
  m[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
  m[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
  m[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
  m[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33

  b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15]
  m[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
  m[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
  m[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
  m[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33

  return m
}

const translate = (m, x, y, z) => {
  m[12] = m[0] * x + m[4] * y + m[8] * z + m[12]
  m[13] = m[1] * x + m[5] * y + m[9] * z + m[13]
  m[14] = m[2] * x + m[6] * y + m[10] * z + m[14]
  m[15] = m[3] * x + m[7] * y + m[11] * z + m[15]
}

const rotate = (m, a, inx, iny, inz) => {
  let l = Math.sqrt(inx * inx + iny * iny + inz * inz)

  if (l < EPSILON) {
    throw new Error('m4_rotate(): matrix length is zero')
  }

  l = 1.0 / l
  
  const x = inx * l
  const y = iny * l
  const z = inz * l

  const s = Math.sin(a)
  const c = Math.cos(a)
  const t = 1 - c

  const a00 = m[0], a01 = m[1], a02 = m[2], a03 = m[3]
  const a10 = m[4], a11 = m[5], a12 = m[6], a13 = m[7]
  const a20 = m[8], a21 = m[9], a22 = m[10], a23 = m[11]

  // construct the elements of the rotation matrix
  const b00 = x * x * t + c,     b01 =  y * x * t + z * s, b02 = z * x * t - y * s
  const b10 = x * y * t - z * s, b11 = y * y * t + c,      b12 = z * y * t + x * s
  const b20 = x * z * t + y * s, b21 = y * z * t - x * s,  b22 = z * z * t + c

  m[0] = a00 * b00 + a10 * b01 + a20 * b02
  m[1] = a01 * b00 + a11 * b01 + a21 * b02
  m[2] = a02 * b00 + a12 * b01 + a22 * b02
  m[3] = a03 * b00 + a13 * b01 + a23 * b02
  m[4] = a00 * b10 + a10 * b11 + a20 * b12
  m[5] = a01 * b10 + a11 * b11 + a21 * b12
  m[6] = a02 * b10 + a12 * b11 + a22 * b12
  m[7] = a03 * b10 + a13 * b11 + a23 * b12
  m[8] = a00 * b20 + a10 * b21 + a20 * b22
  m[9] = a01 * b20 + a11 * b21 + a21 * b22
  m[10] = a02 * b20 + a12 * b21 + a22 * b22
  m[11] = a03 * b20 + a13 * b21 + a23 * b22
}

const scale = (m, x, y, z) => {
  m[0] *= x; m[1] *= x; m[2] *= x; m[3] *= x
  m[4] *= y; m[5] *= y; m[6] *= y; m[7] *= y
  m[8] *= z; m[9] *= z; m[10] *= z; m[11] *= z
}

const inverse = (a, m) => {
  const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3]
  const a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7]
  const a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11]
  const a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15]

  const b00 = a00 * a11 - a01 * a10;
  const b01 = a00 * a12 - a02 * a10;
  const b02 = a00 * a13 - a03 * a10;
  const b03 = a01 * a12 - a02 * a11;
  const b04 = a01 * a13 - a03 * a11;
  const b05 = a02 * a13 - a03 * a12;
  const b06 = a20 * a31 - a21 * a30;
  const b07 = a20 * a32 - a22 * a30;
  const b08 = a20 * a33 - a23 * a30;
  const b09 = a21 * a32 - a22 * a31;
  const b10 = a21 * a33 - a23 * a31;
  const b11 = a22 * a33 - a23 * a32;

  // Calculate the determinant
  const det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    if (false) {}
    return null
  }
  
  const d = 1.0 / det

  m[0] = (a11 * b11 - a12 * b10 + a13 * b09) * d
  m[1] = (a02 * b10 - a01 * b11 - a03 * b09) * d
  m[2] = (a31 * b05 - a32 * b04 + a33 * b03) * d
  m[3] = (a22 * b04 - a21 * b05 - a23 * b03) * d
  m[4] = (a12 * b08 - a10 * b11 - a13 * b07) * d
  m[5] = (a00 * b11 - a02 * b08 + a03 * b07) * d
  m[6] = (a32 * b02 - a30 * b05 - a33 * b01) * d
  m[7] = (a20 * b05 - a22 * b02 + a23 * b01) * d
  m[8] = (a10 * b10 - a11 * b08 + a13 * b06) * d
  m[9] = (a01 * b08 - a00 * b10 - a03 * b06) * d
  m[10] = (a30 * b04 - a31 * b02 + a33 * b00) * d
  m[11] = (a21 * b02 - a20 * b04 - a23 * b00) * d
  m[12] = (a11 * b07 - a10 * b09 - a12 * b06) * d
  m[13] = (a00 * b09 - a01 * b07 + a02 * b06) * d
  m[14] = (a31 * b01 - a30 * b03 - a32 * b00) * d
  m[15] = (a20 * b03 - a21 * b01 + a22 * b00) * d

  return m
}

const transpose = (m) => {
  const a01 = a[1], a02 = a[2], a03 = a[3]
  const a12 = a[6], a13 = a[7]
  const a23 = a[11]

  m[1] = a[4]
  m[2] = a[8]
  m[3] = a[12]
  m[4] = a01
  m[6] = a[9]
  m[7] = a[13]
  m[8] = a02
  m[9] = a12
  m[11] = a[14]
  m[12] = a03
  m[13] = a13
  m[14] = a23
}

const perspective = (fovy, aspect, near, far) => {
  const m = new Float32Array(16)
  const f = 1.0 / Math.tan(fovy / 2)
  const nf = 1.0 / (near - far)

  m[0] = f / aspect
  m[5] = f
  m[10] = (far + near) * nf
  m[11] = -1
  m[14] = (2 * far * near) * nf

  return m
}

const m4 = {
  identity,
  identityFrom,
  copy,
  multiply,
  translate,
  rotate,
  scale,
  inverse,
  transpose,
  perspective
}
;// CONCATENATED MODULE: ./src/utils/math.js
function randInt (range) {
  return Math.random() * range | 0
}

function degToRad (d) {
  return d * Math.PI / 180
}

function clamp (n, min, max) {
  return Math.min(max, Math.max(min, n))
}

function distance2d (x1, y1, x2, y2) {
  return Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)))
}

function transformVector(m4, v) {
  const dst = new Float32Array(4)

  for (let i = 0, j; i < 4; ++i) {
    dst[i] = 0.0
    for (j = 0; j < 4; ++j) {
      dst[i] += v[j] * m4[j * 4 + i]
    }
  }

  return dst
}

;// CONCATENATED MODULE: ./src/shaders/gl2-vertex.glsl
/* harmony default export */ const gl2_vertex = ("#version 300 es\r\n\r\nprecision highp float;\r\n\r\nin vec4 aVertexPosition;\r\nin mediump vec2 aTexturePosition;\r\n\r\nuniform mat4 uMatrix;\r\n\r\nout mediump vec2 texCoord;\r\n\r\nvoid main() {\r\n  texCoord = aTexturePosition;\r\n  gl_Position = uMatrix * aVertexPosition;\r\n}\r\n");
;// CONCATENATED MODULE: ./src/shaders/gl2-frag.glsl
/* harmony default export */ const gl2_frag = ("#version 300 es\r\n\r\nprecision mediump float;\r\n\r\nuniform sampler2D uSampler;\r\nuniform lowp float uAlpha;\r\n\r\nin vec2 texCoord;\r\n\r\nout lowp vec4 outColor;\r\n\r\nvoid main() {\r\n  vec4 result = texture(uSampler, texCoord);\r\n\r\n  if (result.a < 0.1f) {\r\n    discard;\r\n  }\r\n\r\n  outColor = result;\r\n}\r\n");
;// CONCATENATED MODULE: ./src/shaders/gl1-vertex.glsl
/* harmony default export */ const gl1_vertex = ("precision highp float;\r\n\r\nattribute vec4 aVertexPosition;\r\nattribute mediump vec2 aTexturePosition;\r\n\r\nuniform mat4 uMatrix;\r\n\r\nvarying mediump vec2 texCoord;\r\n\r\nvoid main() {\r\n  texCoord = aTexturePosition;\r\n  gl_Position = uMatrix * aVertexPosition;\r\n}\r\n");
;// CONCATENATED MODULE: ./src/shaders/gl1-frag.glsl
/* harmony default export */ const gl1_frag = ("precision mediump float;\r\n\r\nuniform sampler2D uSampler;\r\nuniform lowp float uAlpha;\r\n\r\nvarying vec2 texCoord;\r\n\r\nvoid main() {\r\n  vec4 result = texture2D(uSampler, texCoord);\r\n\r\n  if (result.a < 0.1) {\r\n    discard;\r\n  }\r\n\r\n  gl_FragColor = result;\r\n}\r\n");
;// CONCATENATED MODULE: ./src/engine/gl.js







const fov = degToRad(30.0)
const zNear = 10.0
const zFar = 5000.0
const canvas = document.getElementById('canvas')
const context = canvas.getContext( false ? 0 : 'webgl', {
  antialias: true,
  powerPreference: 'high-performance'
})

const shaders =  false
  ? 0
  : {vertex: gl1_vertex, frag: gl1_frag}

if (true) {
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

let gl = {
  canvas,
  context,
  shaders,
  projectionMatrix,
  aspectRatio
}
;// CONCATENATED MODULE: ./src/engine/programs.js


const { context: programs_context } = gl

const createShader = (type, source) => {
  const shader = programs_context.createShader(type)
  programs_context.shaderSource(shader, source)
  programs_context.compileShader(shader)

  if (programs_context.getShaderParameter(shader, programs_context.COMPILE_STATUS)) {
    return shader
  }

  console.error('Error compiling shader: ', programs_context.getShaderInfoLog(shader))

  programs_context.deleteShader(shader)
}

const createProgram = (vertex, fragment, attribs, locations) => {
  const program = programs_context.createProgram()
  programs_context.attachShader(program, vertex)
  programs_context.attachShader(program, fragment)

  if (attribs !== undefined) {
    for (let i = 0; i < attribs.length; i++) {
      programs_context.bindAttribLocation(program, locations !== undefined ? locations[i] : i, attribs[i])
    }
  }
  
  programs_context.linkProgram(program)
  
  if (programs_context.getProgramParameter(program, programs_context.LINK_STATUS)) {
    return program
  }

  if (false) {}

  programs_context.deleteProgram(program)
}


const program = createProgram(
  createShader(programs_context.VERTEX_SHADER, gl.shaders.vertex),
  createShader(programs_context.FRAGMENT_SHADER, gl.shaders.frag)
)

const programUniforms = {
  uMatrix: programs_context.getUniformLocation(program, 'uMatrix'),
  uAlpha: programs_context.getUniformLocation(program, 'uAlpha'),
  uSampler: programs_context.getUniformLocation(program, 'uSampler'),
}

const initVao = (pName, indices, attribs) => {
  const vao = programs_context.createVertexArray()
  programs_context.bindVertexArray(vao)

  programs_context.bindBuffer(programs_context.ELEMENT_ARRAY_BUFFER, programs_context.createBuffer())
  programs_context.bufferData(programs_context.ELEMENT_ARRAY_BUFFER, indices, programs_context.STATIC_DRAW)

  for (const attrib of attribs) {
    const index = programs_context.getAttribLocation(program, attrib.name)
    programs_context.bindBuffer(programs_context.ARRAY_BUFFER, programs_context.createBuffer())
    programs_context.bufferData(programs_context.ARRAY_BUFFER, attrib.data, programs_context.STATIC_DRAW)

    const type = programs_context.FLOAT
    const normalized = false
    const stride = 0
    const offset = 0
    programs_context.vertexAttribPointer(index, attrib.size, type, normalized, stride, offset)
    programs_context.enableVertexAttribArray(index)
  }

  programs_context.bindVertexArray(null)

  return vao
}

;// CONCATENATED MODULE: ./src/utils/easing.js
// accelerating from zero velocity
function easeInQuad (t) {
  return t * t
}

// decelerating to zero velocity
function easeOutQuad (t) {
  return t * (2 - t)
}

// acceleration until halfway, then deceleration
function  easeInOutQuad (t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

// accelerating from zero velocity
function easeInCubic (t) {
  return t * t * t
}

// decelerating to zero velocity
function easeOutCubic (t) {
  return (--t) * t * t + 1
}

// acceleration until halfway then deceleration
function easeInOutCubic (t) {
  return t < 0.5
    ? 4 * t * t * t
    : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
}

// accelerating from zero velocity
function easeInQuart (t) {
  return t * t * t * t
}

// decelerating to zero velocity
function easeOutQuart (t) {
  return 1 - (--t) * t * t * t
}

// acceleration until halfway then deceleration
function easeInOutQuart (t) {
  return t < 0.5
    ? 8 * t * t * t * t
    : 1 - 8 * (--t) * t * t * t
}

// accelerating from zero velocity
function easeInQuint (t) {
  return t * t * t * t * t
}

// decelerating to zero velocity
function easeOutQuint (t) {
  return 1 + (--t) * t * t * t * t
}

// acceleration until halfway then deceleration
function easeInOutQuint (t) {
  return t < 0.5
    ? 16 * t * t * t * t * t
    : 1 + 16 * (--t) * t * t * t * t
}

// elastic bounce effect at the beginning
function easeInElastic (t) {
  return (0.04 - 0.04 / t) * Math.sin(25.0 * t) + 1.0
}

// elastic bounce effect at the end
function easeOutElastic (t) {
  return 0.04 * t / (--t) * Math.sin(25.0 * t)
}

// elastic bounce effect at the beginning and end
function easeInOutElastic (t) {
  return (t -= .5) < 0
    ? (.02 + .01 / t) * Math.sin(50 * t)
    : (.02 - .01 / t) * Math.sin(50 * t) + 1
}
;// CONCATENATED MODULE: ./src/engine/camera.js




let cameraMatrix = m4.identity()
let viewMatrix = m4.identity()

let zoom = 100.0
let nextZoom = 0.0
let inc = 0.0
let steps = 800
let curStep = 0
let zooming = false

let shakeMagnitude = 0.00001
let shakeSpeed = 0.0

let delta = 0.0
let cameraAngleY = 0.0
let cameraAngleX = 0.0

const setZoom = (n, s) => {
  steps = s || 800
  nextZoom = n
  curStep = 0
  zooming = true
}

const setShake = (magnitude, speed) => {
  shakeMagnitude = magnitude
  shakeSpeed = speed
}

function update (x) {
  delta += 0.01

  if (zooming) {
    zoom += ((nextZoom - zoom) * easeOutQuint(curStep / steps))
    curStep += 1

    if (curStep === steps - 1) {
      zooming = false
    }
  }

  cameraAngleX += Math.sin(delta * shakeSpeed) * shakeMagnitude
  cameraAngleY += Math.sin(delta * shakeSpeed) * shakeMagnitude

  m4.identityFrom(cameraMatrix)
  m4.rotate(cameraMatrix, -cameraAngleY, 1, 0, 0)
  m4.rotate(cameraMatrix, -cameraAngleX, 0, 1, 0)
  m4.translate(cameraMatrix, -x, -24, -(zoom * 2))
  m4.multiply(gl.projectionMatrix, cameraMatrix, viewMatrix)
}

const camera = {
  setZoom,
  setShake,
  update,
  viewMatrix
}
;// CONCATENATED MODULE: ./src/objects/index.js


const updateMatrix = (object) => {
  const m = object.matrix
  const t = object.translation
  const r = object.rotation
  const s = object.scale

  m4.identityFrom(object.matrix)
  m4.translate(m, t.x, t.y, t.z)

  if (r.x !== 0.0) m4.rotate(m, r.x, 1, 0, 0)
  if (r.y !== 0.0) m4.rotate(m, r.y, 0, 1, 0)
  if (r.z !== 0.0) m4.rotate(m, r.z, 0, 0, 1)

  m4.scale(m, s.x, s.y, s.z)
}

const updatePhysics = (object) => {
  const t = object.translation, v = object.velocity
  t.x += v.x
  t.y += v.y
  t.z += v.z

  const r = object.rotation, av = object.angularVelocity
  r.x += av.x
  r.y += av.y
  r.z += av.z

  const s = object.scale, sv = object.scaleVelocity
  s.x += sv.x
  s.y += sv.y
  s.z += sv.z
}

let id = -1

const object = () => {
  return {
    id: ++id,
    static: true,
    physics: false,
    collision: false,

    box: {w: 0.0, d: 0.0, h: 0.0},
    translation: {x: 0.0, y: 0.0, z: 0.0},
    rotation: {x: 0.0, y: 0.0, z: 0.0},
    scale: {x: 1.0, y: 1.0, z: 1.0},
    velocity: {x: 0.0, y: 0.0, z: 0.0},
    angularVelocity: {x: 0.0, y: 0.0, z: 0.0},
    scaleVelocity: {x: 0.0, y: 0.0, z: 0.0},

    matrix: m4.identity(),
  }
}

;// CONCATENATED MODULE: ./src/engine/texture.js


const { context: texture_context } = gl
const loadedUrls = []
const textures = []
const transparentPixel = new Uint8Array([0, 0, 0, 0])

const texture_onload = (e) => {
  const image = e.target

  if (!isPowerOf2(image.width) || !isPowerOf2(image.height)) {
    throw new Error(`${image.src} is not power of 2`)
  }
  
  const index = +image.id

  texture_context.activeTexture(texture_context.TEXTURE0 + index)
  texture_context.bindTexture(texture_context.TEXTURE_2D, textures[index])

  texture_context.texImage2D(
    texture_context.TEXTURE_2D,    /* target */
    0,                /* level */
    texture_context.RGBA,          /* internalFormat */
    texture_context.RGBA,          /* format */
    texture_context.UNSIGNED_BYTE, /* type */
    image)

  texture_context.texParameteri(texture_context.TEXTURE_2D, texture_context.TEXTURE_MAG_FILTER, texture_context.NEAREST)
  texture_context.texParameteri(texture_context.TEXTURE_2D, texture_context.TEXTURE_MIN_FILTER, texture_context.NEAREST)
  texture_context.generateMipmap(texture_context.TEXTURE_2D)
}

const isPowerOf2 = (val) => {
  return (val & (val - 1)) == 0
}

const texture_onerror = (err) => {
  throw new Error(err)
}

const load = (url) => {
  // check if the texture is loaded and return the index
  const urlIndex = loadedUrls.indexOf(url)

  if (urlIndex > -1) return urlIndex

  // create and bind the texture to a new slot
  const index = textures.length
  const texture = texture_context.createTexture()

  texture_context.activeTexture(texture_context.TEXTURE0 + index)
  texture_context.bindTexture(texture_context.TEXTURE_2D, texture)
  textures.push(texture)

  // temporarily set a transparent pixel for the texture until it loads
  texture_context.texImage2D(
    texture_context.TEXTURE_2D,    /* target */
    0,                /* level */
    texture_context.RGBA,          /* internalFormat */
    1,                /* width */
    1,                /* height */
    0,                /* border */
    texture_context.RGBA,          /* format */
    texture_context.UNSIGNED_BYTE, /* type */
    transparentPixel)

  // Load the image for the texture
  const image = new Image()
  image.id = index
  image.onload = texture_onload
  image.onerror = texture_onerror
  image.src = url
  loadedUrls.push(url)

  return index
}

const set = (index, uSamplerLocation) => {
  texture_context.activeTexture(texture_context.TEXTURE0 + index)
  texture_context.bindTexture(texture_context.TEXTURE_2D,  textures[index])
  texture_context.uniform1i(uSamplerLocation, index)
}

const texture = {
  load,
  set
}
;// CONCATENATED MODULE: ./src/objects/sprite.js




const template = new Float32Array([
  -1, +1, // 0 lb    2---3
  +1, +1, // 1 rb    |   |
  -1, -1, // 2 lt    |   |
  +1, -1, // 3 rt    0---1
])

const indices = new Uint16Array([3, 2, 0, 3, 0, 1])

const sprite = (
  filename,
  width,
  height,
  frames = 1,
  animations,
  tex
) => {
  const halfWidth = width / 2.0
  const halfHeight = height / 2.0
  const positions = new Float32Array(template)
  const vaos = []

  for (let i = 0; i < positions.length; i+= 2) {
    positions[i + 0] *= halfWidth
    positions[i + 1] *= halfHeight
  }

  const tw = tex.width
  const th = tex.height
  const w = tex.frameWidth / tw
  const h = tex.frameHeight / th
  const nHoriz = tw / tex.frameWidth

  

  for (let x = 0.0, y = 0.0, i = 0; i < frames; i++) {
    x = (i * w) % nHoriz
    y = ((i / nHoriz) | 0) * h 

    const data = new Float32Array([
      x + 0 + 0.001, y + 0 + 0.001,
      x + w - 0.001, y + 0 + 0.001,
      x + 0 + 0.001, y + h - 0.001,
      x + w - 0.001, y + h - 0.001
    ])

    vaos.push(initVao('sprite', indices, [
      {
        name: 'aVertexPosition',
        data: positions,
        size: 2,
      }, {
        name: 'aTexturePosition',
        data: data,
        size: 2
      }
    ]))
  }

  const sprite = {
    ...object(),

    // Sprite props
    animations,

    sprite: true,
    animating: false,
    currentAnimation: animations !== undefined
      ? animations.idle
      : undefined,
    vaos,
    vao: vaos[0],
    numIndices: indices.length,
    textureId: texture.load(`./sprites/sheets/${filename}.png`),
    step: 0,
    lastStepTime: 0.0,
  }

  sprite.box.w = width
  sprite.box.h = height
  sprite.box.d = 1

  sprite.translation.y = halfHeight

  updateMatrix(sprite)

  return sprite
}

function setAnimation (sprite, name) {
  sprite.currentAnimation = sprite.animations[name]
  sprite.step = sprite.currentAnimation.start
  sprite.vao = sprite.vaos[sprite.step]
}

function updateSprite (sprite, elapsedMS) {
  const anim = sprite.currentAnimation

  if (anim === undefined) {
    return
  }

  sprite.lastStepTime += elapsedMS

  if (sprite.lastStepTime <= anim.speed) {
    return
  }

  if (sprite.step === anim.start && sprite.animating === false) {
    return
  }

  sprite.lastStepTime = 0

  if (sprite.animating === false || sprite.step === anim.end) {
    if (anim.fillMode === 'forwards') return
    sprite.step = anim.start
  } else {
    sprite.step += 1
  }

  sprite.vao = sprite.vaos[sprite.step]
}

;// CONCATENATED MODULE: ./src/input/index.js

const INPUT = {
  up: 'w',
  left: 'a',
  down: 's',
  right: 'd',
  punch: ' '
}

const inputs = new Set()

window.addEventListener('keydown', (e) => {
  inputs.add(e.key.toLowerCase())
}, {passive: true})

window.addEventListener('keyup', (e) => {
  inputs.delete(e.key.toLowerCase())
}, {passive: true})


;// CONCATENATED MODULE: ./src/actors/player.js



const SPEED_WALK = 1.6
const SPEED_RUN = 3.0
const PUNCH_TIME = 300.0

let x = 0.0, lx = 0.0
let accumulator = 0.0
let punchtime = 0.0

const setRunAnimation = (x, lx) => {
  if (x > 0.0) {
    setAnimation(player, 'run_right')
    player.direction = 1
  } else if (x < 0.0) {
    setAnimation(player, 'run_left')
    player.direction = -1
  } else if (lx > 0.0) {
    setAnimation(player, 'idle_right')
    player.direction = 1
  } else if (lx < 0.0) {
    setAnimation(player, 'idle_left')
    player.direction = -1
  }
}

const player_update = (dt) => {
  accumulator += dt
  punchtime += dt

  if (accumulator < 40.0) return

  accumulator = 0.0
  x = 0.0

  if (player.control === false) return

  // Set player speed
  for (const input of inputs) {
    console.log(input)
    switch (input) {
      case INPUT.left:
        x = -player.speed
        break
      case INPUT.right:
        x = player.speed
        break
    }
  }

  if (inputs.has(INPUT.punch) && player.punching === false) {
    player.punching = true
    setAnimation(player, player.direction > 0 ? 'punch_right' : 'punch_left')
    return
  }

  if (player.punching && punchtime > PUNCH_TIME) {
    player.punching = false
    setRunAnimation(player.velocity.x, lx)
  }

  if (lx !== x) {
    setRunAnimation(x, lx)
    player.velocity.x = x
  }

  lx = x
}

const player = {
  ...sprite(
    'dad', /* filename */
    32,    /* width */
    32,    /* height */
    20,    /* frames */
    /* animations */
    {      
      idle_right: {start: 0, end: 0, speed: 2000},
      idle_left: {start: 1, end: 1, speed: 2000},
      run_left: {start: 2, end: 8, speed: 80},
      run_right: {start: 9, end: 15, speed: 80},
      punch_right: {start: 16, end: 17, speed: PUNCH_TIME},
      punch_left: {start: 18, end: 19, speed: PUNCH_TIME}
    },
    /* texture */
    {width: 256, height: 128, frameWidth: 32, frameHeight: 32}
  ),

  speed: SPEED_WALK,
  static: false,
  physics: true,
  animating: true,
  punching: false,
  control: true,
  direction: 1,
  update: player_update
}

player.translation.z = 0.6


window.addEventListener('blur', () => {
  player.velocity.x = 0.0
}, { passive: true })

;// CONCATENATED MODULE: ./src/engine/util.js
const shuffleArray = (array) => {
  for (let i = array.length - 1, j, t; i > 0; --i) {
    j = Math.floor(Math.random() * (i + 1))
    t = array[i]
    array[i] = array[j]
    array[j] = t
  }
}

;// CONCATENATED MODULE: ./src/engine/text.js


const textEl = document.getElementById('inspiration')
const bottomTextEl = document.getElementById('bottomtext')

const quotes = [
  'HOME IS WHERE YOUR FIST IS.',
  'YOU\'VE NEVER FELT SO ALIVE.',
  'HOME IS THE NICEST WORD THERE IS.',
  'YOU WONDER WHAT\'S FOR DINNER.',
  'FOLLOW YOUR BLISS.',
  'WE ARE WHO WE ARE.',
  'HOME IS NOT A PLACE. IT\'S A FEELING.',
  'JUST GO WITH THE FLOW.',
  'IT\'S PAST THEIR BEDTIME.',
  'THERE\'S NO PLACE LIKE HOME.',
  'AGE IS JUST A NUMBER.',
  'WE\'LL ALL BE LAUGHING ABOUT THIS SOON.',
  'DON\'T FORGET TO PAY THE MORTGAGE.', 
  'THINGS COULD BE WORSE.',
  'TAKE LEMONS AND MAKE LEMONADE.',
  'YOU\'LL REGRET THE THINGS YOU DIDN\'T DO.',
  'THE AZALEAS NEED TO BE WATERED.',
  'WORK HARD, PLAY HARD.',
  'GOTTA FIX THAT CREAKY FLOORBOARD.',
  'SOMETIMES YOU JUST GOTTA EAT THE HAM SANDWICH.',
  'REX IS DUE FOR A CHECKUP.',
  'FIND OUT IF THIS IS TAX DEDUCTABLE'
  // HOME IS NO PLACE FOR ARMCHAIR PHILOSOPHERS
]

const order = []

const len = quotes.length
let id1 = -1, id2 = -1

function restart () {
  for (let i = 0, l = len; i < l; i++) {
    order.push(i)
  }

  shuffleArray(order)
}

function inspire () {
  if (order.length === 0) restart()

  textEl.innerText = quotes[order.pop()]
  id2 = setTimeout(function () {
    textEl.innerText = ''
  }, 7000)
}

function startInspire () {
  id1 = setInterval(inspire, 10000)
}

function endInspire () {
  clearTimeout(id1)
  clearTimeout(id2)
  textEl.innerText = ''
}

function displayText (text, bottomText) {
  textEl.innerText = text || ''
  bottomTextEl.innerText = bottomText || ''
}

;// CONCATENATED MODULE: ./src/scenes/fury_level.js
const furylevelContainer = document.getElementById('furylevel-container')
const furyElStyle = document.getElementById('furylevel').style
const furylevelContainerStyle = furylevelContainer.style

const dec = 0.0011
const fury_level_inc = 0.0025

let furylevel = 1.0
let isActive = false

const fury_level_update = (punches) => {
  if (!isActive) return 1.0

  let mult = punches === 0
    ? 0
    : punches === 2
    ? 3
    : punches === 3
    ? 6
    : punches >= 4
    ? 9
    : 1

  furylevel -= (punches === -1 ? dec * 10 : dec)
  furylevel += (fury_level_inc * mult)

  if (furylevel > 1.0) {
    furylevel = 1.0
  }

  const r1 = Math.random()
  const r2 = Math.random()
  const x = (((1 - furylevel) * 10)) * Math.random()
  const y = (((1 - furylevel) * 10)) * Math.random()

  furylevelContainerStyle.transform = `translate(${x}px, ${y}px)`
  furyElStyle.transform = `scale(${furylevel}, 1)`

  return furylevel
}

const show = (toShow) => {
  isActive = toShow

  if (toShow) {
    furylevelContainer.classList.add('animating', 'shown')
    setTimeout(function () {
      furylevelContainer.classList.remove('animating')
    }, 400)
  } else {
    furylevelContainer.classList.add('animating')
    furylevelContainer.classList.remove('shown')
  }
}

const furyMeter = {
  update: fury_level_update,
  show 
}
;// CONCATENATED MODULE: ./src/engine/audio.js
const files = []
const toPlay = {}

let audio_context

const start = (file, loop, vol) => {
  file.source = audio_context.createBufferSource()
  file.source.buffer = file.buffer
  file.source.loop = loop || false
  file.source.connect(file.gainNode)

  file.gainNode.gain.value = vol
  file.source.start(1)
}

const crossfade = (val, max, el) => {
  const x = val / max
  // Use an equal-power crossfading curve:
  const gain1 = Math.cos(x * 0.5 * Math.PI)
  const gain2 = Math.cos((1.0 - x) * 0.5 * Math.PI)
  undefined.gainNode.gain.value = gain1
  el.gainNode.gain.value = gain2
}

const createSource = (buffer) => {
  const gainNode = audio_context.createGain()
  gainNode.connect(audio_context.destination)

  return {source: undefined, buffer, gainNode}
}

const init = (c) => {
  audio_context = c
}

const audio_load = async (key, url) => {
  const response = await fetch(url)
  const buffer = await response.arrayBuffer()
  const data = await audio_context.decodeAudioData(buffer)

  files[key] = createSource(data)

  if (toPlay[key] !== undefined) {
    start(files[key], toPlay[key].loop, toPlay[key].vol)
    delete toPlay[key]
  }
}

const play = (key, loop, vol) => {
  if (files[key] === undefined) {
    toPlay[key] = {loop, vol}
    return
  }

  start(files[key], loop, vol)
}

const stop = (key, loop, vol) => {
  const file = files[key]

  if (file === undefined || file.source === undefined) {
    throw new Error(`${key} is undefined`)
  }

  file.source.stop(0)
}

const audio = {
  init,
  load: audio_load,
  play,
  stop
}
;// CONCATENATED MODULE: ./src/scenes/main.js









let nextRoomX = 0
let translateZ = 0.1

const SPEED = 0.7
const ROOM_WIDTH = 48 * 3
const VOLUME = 0.8
const BYPASS = true

const teenagers = [
  {name: 'tall_punk', frames: 6},
  {name: 'beer_bong', frames: 6},
  {name: 'yoga_gal', frames: 6},
  {name: 'slice', frames: 6},
  {name: 'hover_bro', frames: 6}
]

const bgs = [
  {name: 'bg_bookshelf', frames: 2},
  {name: 'bg_couch', frames: 1},
  {name: 'bg_lamp', frames: 2},
  {name: 'bg_plant', frames: 1},
  {name: 'bg_wallpaper', frames: 1}
]

const sprites = new Set([player])
const people = new Set()

let shaking = false
let main_a = 0
let numKilled = 0
let didLose = false
let didIntro = false
let didStart = false
let didFirstPunch = false

let home

const createScene = (first) => {
  const r1 = (Math.random() * bgs.length - 1) | 0
  const r2 = (Math.random() * bgs.length - 1) | 0
  const r3 = (Math.random() * bgs.length - 1) | 0

  const p1 = createRoom(bgs[r1], nextRoomX)
  const p2 = createRoom(bgs[r2], nextRoomX + 48)
  const p3 = createRoom(bgs[r3], nextRoomX + 48 + 48)

  nextRoomX += ROOM_WIDTH

  sprites.add(p1)
  sprites.add(p2)
  sprites.add(p3)

  if (first) {
    const person = createPerson(teenagers[0], ROOM_WIDTH / 2)
    people.add(person)
    sprites.add(person)
  }

  for (const teenager of teenagers) {
    const x = 32 + (Math.random() * (ROOM_WIDTH - 32)) + nextRoomX

    const person = createPerson(teenager, x)

    people.add(person)
    sprites.add(person)
  }
}

const createSprite = (name, w, h, x, texture) => {
  const item = {
    ...sprite(
      name,   /* filename */
      w,      /* width */
      h,      /* height */
      1,
      undefined,
      texture
    ),
    static: true
  }

  item.translation.x = (w / 2) + x
  item.translation.z = -0.1
  updateMatrix(item)

  return item
}

const createRoom = (info, x) => {
  const room = {
    ...sprite(
      info.name,   /* filename */
      48,          /* width */
      48,          /* height */
      info.frames, /* frames */
      {idle: {start: 0, end: info.frames - 1, speed: 200}},
      {width: 64 * info.frames, height: 64, frameWidth: 48, frameHeight: 48}
    ),
    static: frames > 1
  }

  room.translation.x = (48 / 2) + x
  updateMatrix(room)

  return room
}

const setTranslateZ = () => {
  if (translateZ === 0.5) {
    translateZ = 0.1
  } else {
    translateZ += 0.1
  }

  return translateZ
}

const startPersonAnim = (person) => {
  person.animating = true
}

const createPerson = (info, x) => {
  const person = {
    ...sprite(
      info.name,
      32,
      32,
      info.frames,
      // animations
      {
        idle: {start: 0, end: 1, speed: 400},
        fly: {start: 2, end: 2, speed: 400}
      },
      // texture
      {width: 128, height: 64, frameWidth: 32, frameHeight: 32}
    ),
    dead: false,
    timeDead: 0.0,
    static: false,
  }

  setTimeout(startPersonAnim, Math.random() * 3000, person)

  person.translation.z = setTranslateZ()
  person.translation.x = x || 0
  updateMatrix(person)

  return person
}

const setEvent = (time, config) => {
  setTimeout(onEvent, time * 1000, config)
}

const onEvent = (config) => {
  if (config.text !== undefined) {
    displayText(config.text, config.text2)
    if (config.dur !== undefined) {
      setTimeout(onTextEnd, config.dur * 1000)
    }
  }

  if (config.control !== undefined) {
    player.control = config.control
  }

  if (config.fn !== undefined) {
    config.fn()
  }
}

const onTextEnd = () => {
  displayText('')
}

const main_init = () => {
  player.control = BYPASS
  player.translation.x = -80
  audio.play('intro', true, VOLUME)

  sprites.add(createSprite('car', 96, 48, -180, {width: 64, height: 32, frameWidth: 64, frameHeight: 32}))

  home = createSprite('home', 128, 128, -20, {width: 64, height: 64, frameWidth: 64, frameHeight: 64})
  sprites.add(home)

  setEvent( 3.0, {dur: 3.0, text: '"I\'m glad I cancelled that trip to Milwaukee."'})
  setEvent( 7.5, {dur: 3.0, text: '"...and didn\'t tell the kids."'})
  setEvent(12.0, {dur: 3.0, text: '"They\'ll be so delighted and surprised."'})
  setEvent(16.5, {dur: 3.0, text: '<- A D ->', control: true, fn: () => {
    setAnimation(player, 'run_right')
    player.velocity.x = 1.6
  }})
}

const playRandomPunch = (v = VOLUME) => {
  audio.play(`hit_${Math.random() * 5 | 0}`, false, v)
}

const startIntro = () => {
  audio.stop('intro')
  audio.play('crowd', true, VOLUME - 0.4 < 0.0 ? 0.0 : VOLUME - 0.4)
  displayText('')

  window.nightsky.style.display = 'none'
  sprites.delete(home)

  createScene(true)
  createScene()

  setTimeout(() => {
    player.velocity.x = 0.0
    setAnimation(player, 'idle_right')
  }, 200)
  
  player.control = false
  didIntro = true

  setEvent(2.5, {dur: 2.5, text: '"Sup bro?"'})
  setEvent(6.0, {dur: 2.5, text: '...'})
  setEvent(9.0, {dur: 2.5, text: '"Aren\'t you a little old for this party?"'})

  setEvent(12.0, {text: 'PUNCH.', fn: playRandomPunch})
  setEvent(12.5, {text: 'PUNCH. THIS.', fn: playRandomPunch})
  setEvent(13.0, {text: 'PUNCH. THIS. GUY.', fn: playRandomPunch})
  setEvent(13.5, {dur: 0.5, text: 'PUNCH. THIS. GUY. [spacebar]', fn: playRandomPunch})

  setTimeout(startGame, 14 * 1000)
}

const startGame = () => {
  displayText('')
  audio.play('party', true, VOLUME)
  
  player.control = true
  player.velocity.x = 1.6
  setAnimation(player, 'run_right')
  didStart = true
}

const onFirstPunch = () => {
  furyMeter.show(true)
  setEvent( 4.0, {dur: 3.0, text: 'MAINTAIN YOUR PARENTAL FURY.'})
  setEvent( 8.0, {fn: () => startInspire() })
}

const endGame = () => {
  audio.stop('party')
  audio.play('fail', true, VOLUME)

  gl.canvas.classList.add('game-over')

  player.velocity.x = 0
  setAnimation(player, 'idle_right')

  endInspire()

  furyMeter.show(false)

  camera.setZoom(180.0, 1500)
  camera.setShake(0.0, 0.0)

  setEvent(2.0, {text: `YOU VANQUISHED ${numKilled} PARTYGOERS`})
  setEvent(4.0, {text: `YOU VANQUISHED ${numKilled} PARTYGOERS`, text2: 'BEFORE YOU LOST YOUR PASSION'})
  setEvent(4.0, {fn: () => {
    const reload = () => location.reload(false)
    document.addEventListener('touchstart', reload)
    document.addEventListener('keydown', reload)
    document.addEventListener('click', reload)
  }})
}

const main_update = (dt) => {
  const { x } = player.translation

  let numHit = 0

  camera.update(x + 20)

  if (didLose) return

  player.update(dt)

  if (!didIntro && x > nextRoomX) {
    startIntro()
  }

  if (!didStart) {
    return
  }

  if (x + window.innerWidth > nextRoomX) {
    createScene()
  }

  for (const person of people) {
    if (person.dead === false) continue
  
    person.timeDead += dt

    if (person.timeDead > 2000) {
      people.delete(person)
      sprites.delete(person)
    }
  }

  if (player.punching) {
    if (!shaking) {
      camera.setShake(0.001, 100.0)
      shaking = true
    }

    const v = (player.velocity.x > 0 ? SPEED : -SPEED)

    for (const person of people) {
      if (person.dead) continue

      if (Math.abs(x - person.translation.x) < 10) {
        setAnimation(person, 'fly')

        numHit += 1
        numKilled += 1

        person.dead = true
        person.physics = true
        person.velocity.x = v * 3

        if (numHit === 1) {
          person.velocity.y = 0.4
          person.angularVelocity.z = 0.25
        } else if (numHit === 2) {
          person.velocity.y = 1.0
          person.angularVelocity.z = 0.4
          person.scaleVelocity.x = person.scaleVelocity.y = person.scaleVelocity.z = 0.01
        } else if (numHit === 3) {
          person.velocity.x = v * 3
          person.velocity.y = 1.5
          person.angularVelocity.z = 0.6
          person.scaleVelocity.x = person.scaleVelocity.y = person.scaleVelocity.z = 0.09
        }
      }
    }

    if (!didFirstPunch) {
      didFirstPunch = true
      onFirstPunch()
    }

    if (numHit > 0) {
      audio.play(`hit_${Math.random * 5 | 0}`, false, VOLUME)
    }

  } else {
    if (shaking) {
      camera.setShake(0.00001, 0.0)
      shaking = false
    }
  }

  if (furyMeter.update(numHit) <= 0.0) {
    didLose = true
    endGame()
  }
}

const mainScene = {
  init: main_init,
  update: main_update,
  startGame,
  endGame
}

;// CONCATENATED MODULE: ./src/engine/renderer.js









const { context: renderer_context } = gl
let dt = 0.0
let then = performance.now()
let rafid = -1

let renderer_framesPaused = true

let uMatrix = m4.identity()

const drawObjects = (objects) => {
  for (const object of objects) {
    if (object.static === false) {
      updateMatrix(object)

      if (object.physics === true) {
        updatePhysics(object)
      }

      updateSprite(object, dt)
    }

    m4.multiply(camera.viewMatrix, object.matrix, uMatrix)

    texture.set(object.textureId, programUniforms.uSampler)

    renderer_context.bindVertexArray(object.vao)
    renderer_context.uniformMatrix4fv(programUniforms.uMatrix, false, uMatrix)
    renderer_context.drawElements(renderer_context.TRIANGLES, object.numIndices, renderer_context.UNSIGNED_SHORT, 0)
  }
}

renderer_context.useProgram(program)
renderer_context.uniform1f(programUniforms.uAlpha, 1.0)

const tick = (now) => {
  renderer_context.clear(renderer_context.COLOR_BUFFER_BIT | renderer_context.DEPTH_BUFFER_BIT)

  dt = now - then
  then = now

  mainScene.update(dt)

  drawObjects(sprites)

  rafid = window.requestAnimationFrame(tick)
}

const renderer_start = () => {
  renderer_framesPaused = false
  rafid = window.requestAnimationFrame(tick)
}

const pause = () => {
  renderer_framesPaused = true
  window.cancelAnimationFrame(rafid)
}

const renderer = {
  start: renderer_start,
  pause
}
;// CONCATENATED MODULE: ./src/index.js




const src_init = () => {
  const Context = window.AudioContext || window.webkitAudioContext
  audio.init(new Context())
  renderer.start()
  mainScene.init()

  audio.load('intro', './music/intro.mp3')
  audio.load('party', './music/party_1.mp3')
  audio.load('fail', './music/fail.mp3')
  audio.load('hit_0', './music/hit_1.wav')
  audio.load('hit_1', './music/hit_2.wav')
  audio.load('hit_2', './music/hit_3.wav')
  audio.load('hit_3', './music/hit_4.wav')
  audio.load('hit_4', './music/hit_5.wav')
  audio.load('coin', './music/coin.wav')
  audio.load('crowd', './music/crowd.wav')

  let wasPaused = false
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      wasPaused = framesPaused
      renderer.pause()
    } else if (wasPaused === false) {
      renderer.start()
    }
  }, { passive: true })
}

src_init()

/******/ })()
;