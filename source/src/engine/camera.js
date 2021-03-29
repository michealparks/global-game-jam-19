import { m4 } from '../utils/m4.js'
import { gl } from './gl'
import { easeOutQuint } from '../utils/easing.js'

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

export function update (x) {
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

export const camera = {
  setZoom,
  setShake,
  update,
  viewMatrix
}