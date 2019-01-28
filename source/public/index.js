/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!***********************************!*\
  !*** ./src/index.js + 23 modules ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./src/utils/m4.js
const EPSILON = 0.000001

function m4_identity () {
  const m = new Float32Array(16)

  m[0] = m[5] = m[10] = m[15] = 1.0

  return m
}

function m4_identityFrom (m) {
  m[0] = m[5] = m[10] = m[15] = 1.0
  m[1] = m[2] = m[3] = m[4] = m[6] = m[7] = m[8] = m[9] = m[11] = m[12] = m[13] = m[14] = 0.0

  return m
}

function m4_copy (a) {
  const m = new Float32Array(16)

  m[0] = a[0]; m[1] = a[1]; m[2] = a[2]; m[3] = a[3]
  m[4] = a[4]; m[5] = a[5]; m[6] = a[6]; m[7] = a[7]
  m[8] = a[8]; m[9] = a[9]; m[10] = a[10]; m[11] = a[11]
  m[12] = a[12]; m[13] = a[13]; m[14] = a[14]; m[15] = a[15]

  return m
}

function m4_multiply (a, b, m) {
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

function m4_translate (m, x, y, z) {
  m[12] = m[0] * x + m[4] * y + m[8] * z + m[12]
  m[13] = m[1] * x + m[5] * y + m[9] * z + m[13]
  m[14] = m[2] * x + m[6] * y + m[10] * z + m[14]
  m[15] = m[3] * x + m[7] * y + m[11] * z + m[15]
}

function m4_rotate (m, a, inx, iny, inz) {
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

function m4_scale (m, x, y, z) {
  m[0] *= x; m[1] *= x; m[2] *= x; m[3] *= x
  m[4] *= y; m[5] *= y; m[6] *= y; m[7] *= y
  m[8] *= z; m[9] *= z; m[10] *= z; m[11] *= z
}

function m4_inverse (a, m) {
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

function m4_transpose (m) {
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

function m4_perspective (fovy, aspect, near, far) {
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


// CONCATENATED MODULE: ./src/utils/math.js
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

function scaleBetween(n, minAllowed, maxAllowed, min, max) {
  return (maxAllowed - minAllowed) * (n - min) / (max - min) + minAllowed;
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

// CONCATENATED MODULE: ./src/engine/gl.js



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

const canvas = document.getElementById('canvas')

const gl = canvas.getContext('webgl2', {
  antialias: true,
  powerPreference: 'high-performance'
})

const fov = degToRad(30.0)
const zNear = 10.0
const zFar = 5000.0

let projectionMatrix
let aspectRatio = 0.0

canvas.addEventListener('webglcontextlost', function (e) {
  e.preventDefault()
}, false)

canvas.addEventListener('webglcontextrestored', function (e) {
  // TODO: set up webGL state and resources
}, false)

resizeCanvas()
addEventListener('resize', resizeCanvas, {passive: true})

gl.clearColor(0.0, 0.0, 0.0, 0.0)
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

// CONCATENATED MODULE: ./src/shaders/vertex.glsl
/* harmony default export */ var shaders_vertex = ("#version 300 es\r\n\r\nprecision highp float;\r\n\r\nin vec4 aVertexPosition;\r\nin mediump vec2 aTexturePosition;\r\n\r\nuniform mat4 uMatrix;\r\n\r\nout mediump vec2 texCoord;\r\n\r\nvoid main() {\r\n  texCoord = aTexturePosition;\r\n  gl_Position = uMatrix * aVertexPosition;\r\n}\r\n");
// CONCATENATED MODULE: ./src/shaders/fragment.glsl
/* harmony default export */ var shaders_fragment = ("#version 300 es\r\n\r\nprecision mediump float;\r\n\r\nuniform sampler2D uSampler;\r\nuniform lowp float uAlpha;\r\n\r\nin vec2 texCoord;\r\n\r\nout lowp vec4 outColor;\r\n\r\nvoid main() {\r\n  vec4 result = texture(uSampler, texCoord);\r\n\r\n  if (result.a < 0.1f) {\r\n    discard;\r\n  }\r\n\r\n  outColor = result;\r\n}\r\n");
// CONCATENATED MODULE: ./src/utils/webgl.js


function createShader (type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    return shader
  }

  if (false) {}

  gl.deleteShader(shader)
}

function createProgram (vertex, fragment, attribs, locations) {
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

  if (false) {}

  gl.deleteProgram(program)
}

// CONCATENATED MODULE: ./src/engine/programs.js






const programs_program = createProgram(
  createShader(gl.VERTEX_SHADER, shaders_vertex),
  createShader(gl.FRAGMENT_SHADER, shaders_fragment)
)

const programUniforms = {
  uMatrix: gl.getUniformLocation(programs_program, 'uMatrix'),
  uAlpha: gl.getUniformLocation(programs_program, 'uAlpha'),
  uSampler: gl.getUniformLocation(programs_program, 'uSampler'),
}

function initVao (pName, indices, attribs) {
  const vao = gl.createVertexArray()
  gl.bindVertexArray(vao)

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer())
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW)

  for (let a, loc, i = 0, l = attribs.length; i < l; i++) {
    a = attribs[i]
    loc = gl.getAttribLocation(programs_program, a.name)

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
    gl.bufferData(gl.ARRAY_BUFFER, a.data, gl.STATIC_DRAW)
    gl.vertexAttribPointer(loc, a.size, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(loc)
  }

  gl.bindVertexArray(null)

  return vao
}

// CONCATENATED MODULE: ./src/utils/easing.js
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
// CONCATENATED MODULE: ./src/engine/camera.js





let cameraMatrix = m4_identity()
let viewMatrix = m4_identity()

let zoom = 130.0
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

function camera_setZoom (n, s) {
  steps = s || 800
  nextZoom = n
  curStep = 0
  zooming = true
}

function camera_setShake (magnitude, speed) {
  shakeMagnitude = magnitude
  shakeSpeed = speed
}

function zoomTick () {
  zoom += ((nextZoom - zoom) * easeOutQuint(curStep / steps))
  curStep += 1

  if (curStep === steps - 1) {
    zooming = false
  }
}

function camera_update (x) {
  delta += 0.01
  if (zooming) zoomTick()

  cameraAngleX += Math.sin(delta * shakeSpeed) * shakeMagnitude
  cameraAngleY += Math.sin(delta * shakeSpeed) * shakeMagnitude

  m4_identityFrom(cameraMatrix)
  m4_rotate(cameraMatrix, -cameraAngleY, 1, 0, 0)
  m4_rotate(cameraMatrix, -cameraAngleX, 0, 1, 0)
  m4_translate(cameraMatrix, -x, -24, -(zoom * 2))
  m4_multiply(projectionMatrix, cameraMatrix, viewMatrix)
}

// CONCATENATED MODULE: ./src/objects/index.js


function updateMatrix (object) {
  const m = object.matrix
  const t = object.translation
  const r = object.rotation
  const s = object.scale

  m4_identityFrom(object.matrix)
  m4_translate(m, t.x, t.y, t.z)

  if (r.x !== 0.0) m4_rotate(m, r.x, 1, 0, 0)
  if (r.y !== 0.0) m4_rotate(m, r.y, 0, 1, 0)
  if (r.z !== 0.0) m4_rotate(m, r.z, 0, 0, 1)

  m4_scale(m, s.x, s.y, s.z)
}

function updatePhysics (object) {
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

let objects_id = -1

function objects_object () {
  return {
    id: ++objects_id,
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

    matrix: m4_identity(),
  }
}

// CONCATENATED MODULE: ./src/utils/texture.js


const loadedUrls = []
const textures = []
const transparentPixel = new Uint8Array([0, 0, 0, 0])

function texture_onload (e) {
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

function texture_onerror (e) {
  if (false) {}
}

function loadTexture (url) {
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
  image.onload = texture_onload
  image.onerror = texture_onerror
  image.src = url
  loadedUrls.push(url)

  return index
}

function setTexture (index, uSamplerLocation) {
  gl.activeTexture(gl.TEXTURE0 + index)
  gl.bindTexture(gl.TEXTURE_2D,  textures[index])
  gl.uniform1i(uSamplerLocation, index)
}

// CONCATENATED MODULE: ./src/objects/sprite.js





const template = new Float32Array([
  -1, +1, // 0 lb    2---3
  +1, +1, // 1 rb    |   |
  -1, -1, // 2 lt    |   |
  +1, -1, // 3 rt    0---1
])

const sprite_indices = new Uint16Array([3, 2, 0, 3, 0, 1])

function sprite_sprite (
  filename,
  width,
  height,
  frames = 1,
  animations
) {
  const halfWidth = width / 2.0
  const halfHeight = height / 2.0
  const positions = new Float32Array(template)
  const vaos = []

  for (let i = 0; i < positions.length; i+= 2) {
    positions[i + 0] *= halfWidth
    positions[i + 1] *= halfHeight
  }

  for (let n, s = 1 / frames, i = 0; i < frames; i++) {
    n = s * i

    vaos.push(initVao('sprite', sprite_indices, [
      {
        name: 'aVertexPosition',
        data: positions,
        size: 2,
      }, {
        name: 'aTexturePosition',
        data: new Float32Array([
          0 + n, 0.01,
          s + n, 0.01,
          0 + n, 0.99,
          s + n, 0.99,
        ]),
        size: 2
      }
    ]))
  }

  const sprite = {
    ...objects_object(),

    // Sprite props
    animations,

    sprite: true,
    animating: false,
    currentAnimation: animations !== undefined
      ? animations.idle
      : undefined,
    vaos,
    vao: vaos[0],
    numIndices: sprite_indices.length,
    textureId: loadTexture(`./sprites/${filename}.png`),
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

function sprite_setAnimation (sprite, name) {
  sprite.currentAnimation = sprite.animations[name]
  sprite.step = sprite.currentAnimation.start
  sprite.vao = sprite.vaos[sprite.step]
}

function sprite_update (sprite, elapsedMS) {
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

// CONCATENATED MODULE: ./src/input/input_codes.js
const INPUT_NULL = 0
const INPUT_UP = 1
const INPUT_LEFT = 2
const INPUT_RIGHT = 3
const INPUT_DOWN = 4

const INPUT_RUN = 5

const INPUT_PUNCH_LEFT = 6
const INPUT_PUNCH_RIGHT = 7
const INPUT_PUNCH_UP = 8
const INPUT_PUNCH_DOWN = 9

const INPUT_PUNCH = 10
// CONCATENATED MODULE: ./src/input/joycon.js
const joycon_input = document.querySelector('#input');



const AXIS_NULL = -1
const AXIS_RIGHT = 0
const AXIS_UP_RIGHT = 1
const AXIS_UP = 2
const AXIS_UP_LEFT = 3
const AXIS_LEFT = 4
const AXIS_DOWN_LEFT = 5
const AXIS_DOWN = 6
const AXIS_DOWN_RIGHT = 7

const BUTTON_A = 0
const BUTTON_X = 1
const BUTTON_B = 2
const BUTTON_Y = 3
const BUTTON_RSL = 4
const BUTTON_RSR = 5
const BUTTON_PLUS = 9
const BUTTON_RA = 11
const BUTTON_HOME = 12
const BUTTON_R = 14
const BUTTON_RT = 15
const BUTTON_LEFT = 16
const BUTTON_DOWN = 17
const BUTTON_UP = 18
const BUTTON_RIGHT = 19
const BUTTON_LSL = 20
const BUTTON_LSR = 21
const BUTTON_MINUS = 24
const BUTTON_LA = 26
const BUTTON_CAPTURE = 29
const BUTTON_L = 30
const BUTTON_LT = 31

// Mapping button index to each button
// Each joycon contains 16 buttons indexed
const axisMap = new Map()
axisMap.set(1285, AXIS_NULL)
axisMap.set(142, AXIS_LEFT)
axisMap.set(-142, AXIS_DOWN_LEFT)
axisMap.set(-428, AXIS_DOWN)
axisMap.set(-714, AXIS_DOWN_RIGHT)

axisMap.set(428, AXIS_UP_LEFT)
axisMap.set(-1000, AXIS_RIGHT)
axisMap.set(1000, AXIS_UP_RIGHT)
axisMap.set(714, AXIS_UP)

let leftPad, rightPad

const movements = [INPUT_UP, INPUT_DOWN, INPUT_LEFT, INPUT_RIGHT]
const actions = [INPUT_RUN]

function polljoycons (gamepads, inputs) {
  while (inputs.length > 0) inputs.pop()

  for (let g, i = 0, l = gamepads.length; i < l; i++) {
    g = gamepads[i]

    if (g === null) continue

    if (g.id.indexOf('Joy-Con (L)') !== -1) {
      leftPad = g
    } else if (g.id.indexOf('Joy-Con (R)') !== -1) {
      rightPad = g
    }
  }

  const input = axisMap.get(leftPad.axes[9] * 1000 | 0)
  const orderedGamepads = [rightPad, leftPad]

  for (let gp, g = 0; g < orderedGamepads.length; g++) {
    gp = orderedGamepads[g]

    if (gp !== undefined) {
      // for (let match, i = 0; i < movements.length; i++)
      for (let id, button, i = 0; i < gp.buttons.length; i++) {
        if (gp.buttons[i].pressed) {
          id = (g * 15) + i + g

          switch (id) {
            case BUTTON_B:
              inputs.push(INPUT_RUN)
              break
          }
        }
      }
    }
  }

  switch (input) {
    case AXIS_RIGHT:
      inputs.push(INPUT_RIGHT)
      break
    case AXIS_UP_RIGHT:
      inputs.push(INPUT_UP, INPUT_RIGHT)
      break
    case AXIS_UP:
      inputs.push(INPUT_UP)
      break
    case AXIS_UP_LEFT:
      inputs.push(INPUT_UP, INPUT_LEFT)
      break
    case AXIS_LEFT:
      inputs.push(INPUT_LEFT)
      break
    case AXIS_DOWN_LEFT:
      inputs.push(INPUT_DOWN, INPUT_LEFT)
      break
    case AXIS_DOWN:
      inputs.push(INPUT_DOWN)
      break
    case AXIS_DOWN_RIGHT:
      inputs.push(INPUT_DOWN, INPUT_RIGHT)
      break
  }
}
// CONCATENATED MODULE: ./src/input/xbox.js


const moveTypes = [INPUT_UP, INPUT_LEFT, INPUT_RIGHT, INPUT_DOWN]

function pollxbox (gamepads, inputs) {
  const [lx, lz, rx, rz] = gamepads[0].axes

  for (let match, i = 0, l = moveTypes.length; i < l; i++) {
    match = inputs.indexOf(moveTypes[i])
    if (match !== -1) inputs.splice(match, 1)
  }

  if (lx > 0.15) {
    inputs.push(INPUT_RIGHT)
  } else if (lx < -0.15) {
    inputs.push(INPUT_LEFT)
  }

  if (lz > 0.15) {
    inputs.push(INPUT_DOWN)
  } else if (lz < -0.15) {
    inputs.push(INPUT_UP)
  }
}

// CONCATENATED MODULE: ./src/input/index.js





const GAMEPAD_NULL = -1
const GAMEPAD_JOYCONS = 0
const GAMEPAD_XBOX = 1

const input_inputs = []

let gamepadIntervalId = -1
let gamepadType = GAMEPAD_NULL

const inputMap = {
  // wasd
  87: INPUT_UP,
  83: INPUT_DOWN,
  65: INPUT_LEFT,
  68: INPUT_RIGHT,

  // arrow keys
  38: INPUT_PUNCH_UP,
  40: INPUT_PUNCH_DOWN,
  37: INPUT_PUNCH_LEFT,
  39: INPUT_PUNCH_RIGHT,

  16: INPUT_RUN,
  32: INPUT_PUNCH
}

function onKeyDown (e) {
  const input = inputMap[e.keyCode]

  if (input_inputs.indexOf(input) === -1) {
    return input_inputs.push(input)
  }
}

function onKeyUp (e) {
  const input = inputMap[e.keyCode]
  const i = input_inputs.indexOf(input)
  input_inputs.splice(i, 1)
}

function pollGamepads (e) {
  const gamepads = navigator.getGamepads()

  if (gamepadType === GAMEPAD_JOYCONS) {
    polljoycons(gamepads, input_inputs)
  } else if (gamepadType === GAMEPAD_XBOX) {
    pollxbox(gamepads, input_inputs)
  }
}

window.addEventListener('keydown', onKeyDown, {passive: true})
window.addEventListener('keyup', onKeyUp, {passive: true})

window.addEventListener('gamepadconnected', function (e) {
  // Don't start more than one poll function, you silly
  if (gamepadIntervalId !== -1) return

  const id = e.gamepad.id

  if (id.indexOf('Joy-Con') > -1) {
    gamepadType = GAMEPAD_JOYCONS
  } else if (id.indexOf('Xbox') > -1) {
    gamepadType = GAMEPAD_XBOX
  }

  gamepadIntervalId = setInterval(pollGamepads, 1000 / 30)
}, {passive: true})

window.addEventListener('gamepaddisconnected', function (e) {
  // Don't allow any hanging inputs
  while (input_inputs.length > 0) input_inputs.pop()

  // Stop the polling function
  clearInterval(gamepadIntervalId)

  // Signify that there's no current polling
  gamepadIntervalId = -1
}, {passive: true})

// CONCATENATED MODULE: ./src/actors/player.js




const SPEED_WALK = 1.6
const SPEED_RUN = 3.0
const PUNCH_TIME = 300.0

const player = {
  ...sprite_sprite(
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
    }
  ),

  speed: SPEED_WALK,
  static: false,
  physics: true,
  animating: true,
  punching: false,
  control: true,
  direction: 1
}

player.translation.z = 0.6

let player_x = 0.0, player_lx = 0.0, llx = 0.0
let accumulator = 0.0
let punchtime = 0.0

function setRunAnimation (x, lx) {
  if (x > 0.0) {
    sprite_setAnimation(player, 'run_right')
    player.direction = 1
  } else if (x < 0.0) {
    sprite_setAnimation(player, 'run_left')
    player.direction = -1
  } else if (lx > 0.0) {
    sprite_setAnimation(player, 'idle_right')
    player.direction = 1
  } else if (lx < 0.0) {
    sprite_setAnimation(player, 'idle_left')
    player.direction = -1
  }
}

function player_update (dt) {
  accumulator += dt
  punchtime += dt

  if (accumulator < 40.0) return

  accumulator = 0.0
  player_x = 0.0

  if (player.control === false) return
  
  if (input_inputs.indexOf(INPUT_RUN) > -1) {
    player.speed = SPEED_RUN
  } else {
    player.speed = SPEED_WALK
  }

  // Set player speed
  for (let i = 0, l = input_inputs.length; i < l; i++) {
    switch (input_inputs[i]) {
      case INPUT_LEFT:
        player_x = -player.speed
        break
      case INPUT_RIGHT:
        player_x = player.speed
        break
    }
  }

  // Set a punching animation
  for (let i = 0, l = input_inputs.length; i < l; i++) {
    switch (input_inputs[i]) {
      case INPUT_PUNCH:
        if (player.punching) break
        player.punching = true
        sprite_setAnimation(player, player.direction > 0 ? 'punch_right' : 'punch_left')
        return 

      default:
        if (player.punching && punchtime > PUNCH_TIME) {
          player.punching = false
          setRunAnimation(player_x, player_lx)
        }
    }
  }

  if (player_lx !== player_x) {
    setRunAnimation(player_x, player_lx)
    player.velocity.x = player_x
  }

  player_lx = player_x
}

window.addEventListener('blur', function () {
  player.velocity.x = 0.0
}, {passive: true})

// CONCATENATED MODULE: ./src/engine/util.js


function util_createShader (type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    return shader
  }

  if (false) {}

  gl.deleteShader(shader)
}

function util_createProgram (vertex, fragment, attribs, locations) {
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

  if (false) {}

  gl.deleteProgram(program)
}

function shuffleArray (array) {
  for (let i = array.length - 1, j, t; i > 0; --i) {
    j = Math.floor(Math.random() * (i + 1))
    t = array[i]
    array[i] = array[j]
    array[j] = t
  }
}

// CONCATENATED MODULE: ./src/engine/text.js


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
  'REX IS DUE FOR A CHECKUP.'
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

// CONCATENATED MODULE: ./src/scenes/fury_level.js
const furylevelContainer = document.getElementById('furylevel-container')
const furyElStyle = document.getElementById('furylevel').style
const furylevelContainerStyle = furylevelContainer.style

const dec = 0.0011
const fury_level_inc = 0.0025

let furylevel = 1.0
let isActive = false

function furyLevel_update (punches) {
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

function furyLevel_show (toShow) {
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
// CONCATENATED MODULE: ./src/engine/audio.js
const context = new AudioContext()

function start (loop, vol) {
  this.source = context.createBufferSource()
  this.source.buffer = this.buffer
  this.source.loop = loop || false
  this.source.connect(this.gainNode)

  this.gainNode.gain.value = vol
  this.source.start(1)
}

function stop () {
  this.source.stop(0)
}

function crossfade (val, max, el) {
  const x = val / max
  // Use an equal-power crossfading curve:
  const gain1 = Math.cos(x * 0.5 * Math.PI)
  const gain2 = Math.cos((1.0 - x) * 0.5 * Math.PI)
  this.gainNode.gain.value = gain1
  el.gainNode.gain.value = gain2
}

function createSource (buffer) {
  const gainNode = context.createGain()
  gainNode.connect(context.destination)

  return {source: undefined, buffer, gainNode, start, stop}
}

function arrayBuffer (res) {
  return res.arrayBuffer()
}

function loadAudio (url) {
  return fetch(url).then(arrayBuffer).then(function (buf) {
    return new Promise(function (resolve) {
      context.decodeAudioData(buf, function (data) {
        return resolve(createSource(data))
      })
    })
  })
}



// CONCATENATED MODULE: ./src/scenes/master.js









let nextRoomX = 0
let translateZ = 0.1

const SPEED = 1.8
const ROOM_WIDTH = 48 * 3
const VOLUME = 0.8
const BYPASS = false

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

const sprites = [player]
const people = []

let sounds
let shaking = false
let master_a = 0, b = 0
let numKilled = 0
let didLose = false
let didPregame = false
let didStart = false
let didFirstPunch = false

let home

function removeSprite (sprite) {
  const index = sprites.indexOf(sprite)

  if (index > -1) sprites.splice(index, 1)
}

function createScene (first) {
  const r1 = (Math.random() * bgs.length - 1) | 0
  const r2 = (Math.random() * bgs.length - 1) | 0
  const r3 = (Math.random() * bgs.length - 1) | 0

  const p1 = createRoom(bgs[r1], nextRoomX)
  const p2 = createRoom(bgs[r2], nextRoomX + 48)
  const p3 = createRoom(bgs[r3], nextRoomX + 48 + 48)

  nextRoomX += ROOM_WIDTH

  sprites.push(p1)
  sprites.push(p2)
  sprites.push(p3)

  if (first) {
    const person = createPerson(teenagers[0], ROOM_WIDTH / 2)
    people.push(person)
    sprites.push(person)
  }

  for (let x, i = 0; i < teenagers.length; i++) {
    x = 32 + (Math.random() * (ROOM_WIDTH - 32)) + nextRoomX

    const person = createPerson(teenagers[i], x)

    people.push(person)
    sprites.push(person)
  }
}

function createSprite (name, w, h, x) {
  const item = {
    ...sprite_sprite(
      name,   /* filename */
      w,          /* width */
      h,          /* height */
      1
    ),
    static: true
  }

  item.translation.x = (w / 2) + x
  item.translation.z = -0.1
  updateMatrix(item)

  return item
}

function createRoom (info, x) {
  const room = {
    ...sprite_sprite(
      info.name,   /* filename */
      48,          /* width */
      48,          /* height */
      info.frames, /* frames */
      {idle: {start: 0, end: frames - 1, speed: 200}}
    ),
    static: frames > 1
  }

  room.translation.x = (48 / 2) + x
  updateMatrix(room)

  return room
}

function setTranslateZ () {
  if (translateZ === 0.5) {
    translateZ = 0.1
  } else {
    translateZ += 0.1
  }

  return translateZ
}

function createPerson (info, x) {
  const person = {
    ...sprite_sprite(
      info.name,
      32,
      32,
      info.frames,
      {
        idle: {start: 0, end: 1, speed: 400},
        fly: {start: 2, end: 2, speed: 400}
      }
    ),
    dead: false,
    timeDead: 0.0,
    static: false,
  }

  setTimeout(function () {
    person.animating = true
  }, Math.random() * 3000)

  person.translation.z = setTranslateZ()
  person.translation.x = x || 0
  updateMatrix(person)

  return person
}

function masterSceneInit (s) {
  sounds = s

  player.control = BYPASS
  player.translation.x = -80
  sounds.intro.start(true, VOLUME)

  const t = 3000

  sprites.push(createSprite('car', 96, 48, -180))

  home = createSprite('home', 128, 128, -20)
  sprites.push(home)
  
  setTimeout(function () {
    displayText('"I\'m glad I cancelled that trip to Milwaukee."')
  }, t * 1)

  setTimeout(function () {
    displayText('')
  }, t * 2)

  setTimeout(function () {
    displayText('"...and didn\'t tell the kids."')
  }, t * 2.5)

  setTimeout(function () {
    displayText('')
  }, t * 3.5)

  setTimeout(function () {
    displayText('"They\'ll be so delighted and surprised."')
  }, t * 4)

  setTimeout(function () {
    displayText('')
  }, t * 5)

  setTimeout(function () {
    player.control = true
    displayText('<- W   D ->')
  }, t * 5.5)

  setTimeout(function () {
    displayText('')
  }, t * 6)
}

function playRandomPunch (v = VOLUME) {
  const r = Math.random() * sounds.hits.length | 0
  sounds.hits[r].start(false, v)
}

function startPregame () {
  removeSprite(home)
  createScene(true)
  createScene()

  window.nightsky.style.display = 'none'

  sounds.intro.stop()

  setTimeout(function () {
    player.velocity.x = 0.0
    sprite_setAnimation(player, 'idle_right')
  }, 200)
  
  player.control = false
  didPregame = true

  displayText('')

  sounds.crowd.start(true, VOLUME - 0.4)

  const t = 2500

  setTimeout(function () {
    displayText('"Sup bro?"')
  }, t * 1)

  setTimeout(function () {
    displayText('')
  }, t * 2)

  setTimeout(function () {
    displayText('...')
  }, t * 2.5)

  setTimeout(function () {
    displayText('')
  }, t * 3)

  setTimeout(function () {
    displayText('"Aren\'t you a little old for this party?"')
  }, t * 3.5)

  setTimeout(function () {
    displayText('')
  }, t * 4.5)

  setTimeout(function () {
    displayText('PUNCH.')
    playRandomPunch(1.0)
  }, t * 5)

  setTimeout(function () {
    displayText('PUNCH. THIS.')
    playRandomPunch(1.0)
  }, t * 5.25)

  setTimeout(function () {
    displayText('PUNCH. THIS. GUY.')
    playRandomPunch(1.0)
  }, t * 5.5)

  setTimeout(function () {
    displayText('PUNCH. THIS. GUY. [spacebar]')
    playRandomPunch(1.0)
  }, t * 5.75)

  setTimeout(startGame, t * 6.5)
}

function startGame () {
  displayText('')
  
  sounds.party1.start(true, VOLUME)
  player.control = true

  didStart = true
}

function onFirstPunch () {
  furyLevel_show(true)

  const t = 3000

  setTimeout(function () {
    displayText('MAINTAIN YOUR PARENTAL FURY.')
  }, t * 1 + 1000)

  setTimeout(function () {
    displayText('')
  }, (t * 2) + 1000)

  setTimeout(function () {
    displayText('MISSED PUNCHES HURT YOUR SOUL.')
  }, (t * 3) + 1000)

  setTimeout(function () {
    displayText('')
    startInspire()
  }, (t * 4) + 1000)
}

function endGame () {
  sounds.party1.stop()
  sounds.fail.start(true, VOLUME)

  gl.canvas.classList.add('game-over')

  player.velocity.x = 0
  sprite_setAnimation(player, 'idle_right')

  endInspire()

  furyLevel_show(false)

  camera_setZoom(150.0, 1500)
  camera_setShake(0.0, 0.0)

  setTimeout(function () {
    displayText(`YOU VANQUISHED ${numKilled} PARTYGOERS`)

    setTimeout(function () {
      displayText(`YOU VANQUISHED ${numKilled} PARTYGOERS`, 'BEFORE YOU LOST YOUR PASSION')

      function reload () {
        location.reload(false)
      }

      document.addEventListener('keydown', reload)
      document.addEventListener('click', reload)
    }, 2000)
  }, 2000)
}

function masterSceneUpdate (elapsedMS) {
  const {x} = player.translation

  camera_update(x)

  if (didLose) return

  player_update(elapsedMS)

  if (!didPregame && x > nextRoomX) {
    startPregame()
  }

  if (!didStart) {
    return
  }

  b = 0

  if (x + window.innerWidth > nextRoomX) {
    createScene()
  }

  for (let p, i = 0, l = people.length; i < l; i++) {
    p = people[i]

    if (p === undefined) continue
    if (!p.dead) continue

    p.timeDead += elapsedMS

    if (p.timeDead > 2000) {
      people.splice(i, 1)
      removeSprite(p)
    }
  }

  if (player.punching) {
    b = 1

    if (!shaking) {
      camera_setShake(0.001, 100.0)
      shaking = true
    }

    const v = (player.velocity.x > 0 ? SPEED : -SPEED)

    for (let r, p, i = 0, l = people.length; i < l; i++) {
      p = people[i]

      if (p.dead) continue

      if (Math.abs(x - p.translation.x) < 10) {
        sprite_setAnimation(p, 'fly')

        p.velocity.x = v * 2

        if (master_a === 1) {
          p.velocity.y = 0.4
          p.angularVelocity.z = 0.25
        } else if (master_a == 2) {
          p.velocity.y = 1.0
          p.angularVelocity.z = 0.4
          p.scaleVelocity.x = p.scaleVelocity.y = p.scaleVelocity.z = 0.01
        } else if (master_a === 3) {
          p.velocity.x = v * 3
          p.velocity.y = 1.5
          p.angularVelocity.z = 0.6
          p.scaleVelocity.x = p.scaleVelocity.y = p.scaleVelocity.z = 0.09
        }

        if (!didFirstPunch) {
          didFirstPunch = true
          onFirstPunch()
        }

        p.dead = true
        p.physics = true

        master_a++
        numKilled++

        if (master_a === 1) {
          r = Math.random() * sounds.hits.length | 0
          sounds.hits[r].start(false, VOLUME)
        }
      }
    }

  } else {
    if (shaking) {
      camera_setShake(0.00001, 0.0)
      shaking = false
    }

    master_a = 0
  }

  if (b === 1 && master_a === 0) {
    master_a = -1
  }

  if (furyLevel_update(master_a) <= 0.0) {
    didLose = true
    endGame()
  }
}

// CONCATENATED MODULE: ./src/engine/renderer.js









let renderer_elapsedMS = 0.0
let thenMS = performance.now()
let tickID = -1

let renderer_isPaused = true

let uMatrix = m4_identity()

let renderer_object
let renderer_i = 0, renderer_l = 0

function drawObjects (objects) {
  for (renderer_i = 0, renderer_l = objects.length; renderer_i < renderer_l; renderer_i++) {
    renderer_object = objects[renderer_i]

    if (renderer_object.static === false) {
      updateMatrix(renderer_object)

      if (renderer_object.physics === true) {
        updatePhysics(renderer_object)
      }

      sprite_update(renderer_object, renderer_elapsedMS)
    }

    m4_multiply(viewMatrix, renderer_object.matrix, uMatrix)

    setTexture(renderer_object.textureId, programUniforms.uSampler)

    gl.bindVertexArray(renderer_object.vao)
    gl.uniformMatrix4fv(programUniforms.uMatrix, false, uMatrix)
    gl.drawElements(gl.TRIANGLES, renderer_object.numIndices, gl.UNSIGNED_SHORT, 0)
  }
}

gl.useProgram(programs_program)
gl.uniform1f(programUniforms.uAlpha, 1.0)

function gameTick (nowMS) {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  renderer_elapsedMS = nowMS - thenMS
  thenMS = nowMS

  masterSceneUpdate(renderer_elapsedMS)

  drawObjects(sprites)

  tickID = window.requestAnimationFrame(gameTick)
}

function renderer_start () {
  renderer_isPaused = false
  tickID = window.requestAnimationFrame(gameTick)
}

function renderer_pause () {
  renderer_isPaused = true
  return window.cancelAnimationFrame(tickID)
}

// CONCATENATED MODULE: ./src/index.js






Promise.all([
  loadAudio('./music/intro.mp3'),
  loadAudio('./music/party_1.mp3'),
  loadAudio('./music/fail.mp3'),
  loadAudio('./music/hit_1.wav'),
  loadAudio('./music/hit_2.wav'),
  loadAudio('./music/hit_3.wav'),
  loadAudio('./music/hit_4.wav'),
  loadAudio('./music/hit_5.wav'),
  loadAudio('./music/coin.wav'),
  loadAudio('./music/crowd.wav')
]).then(function (arr) {
  renderer_start()

  masterSceneInit({
    intro: arr[0],
    party1: arr[1],
    fail: arr[2],
    hits: [arr[3], arr[4], arr[5], arr[6], arr[7]],
    coin: arr[8],
    crowd: arr[9]
  })
})

let wasPaused = renderer_isPaused
document.addEventListener('visibilitychange', function () {
  if (document.hidden) {
    wasPaused = renderer_isPaused
    renderer_pause()
  } else if (wasPaused === false) {
    renderer_start()
  }
}, {passive: true, capture: false})

new FontFace('FreePixel', './FreePixel.woff2')


/***/ })

/******/ });