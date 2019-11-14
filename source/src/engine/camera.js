import {
  m4_identity,
  m4_identityFrom,
  m4_rotate,
  m4_translate,
  m4_multiply
} from '../utils/m4.js'
import {clamp, degToRad} from '../utils/math.js'
import {gl, projectionMatrix} from './gl'
import {easeOutQuint} from '../utils/easing.js'

let cameraMatrix = m4_identity()
export let viewMatrix = m4_identity()

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

export function camera_setZoom (n, s) {
  steps = s || 800
  nextZoom = n
  curStep = 0
  zooming = true
}

export function camera_setShake (magnitude, speed) {
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

export function camera_update (x) {
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
