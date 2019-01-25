import {WebGLRenderer} from 'three'
import {onResize} from './util'

const renderer = new WebGLRenderer({
  canvas: window.canvas,
  antialias: true,
  powerPreference: 'high-performance'
})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0x000000, 1.0)
renderer.setPixelRatio(window.devicePixelRatio)

onResize(function () {
  camera.aspect = window.innerWidth / window.innerHeight,
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

let frameId = -1
let lastMS

function frame (nowMS) {
  renderer.render()

  frameId = window.requestAnimationFrame(frame)
}

export function startFrames () {
  frameId = window.requestAnimationFrame(frame)
}

export function pauseFrames () {
  window.cancelAnimationFrame(frameId)
}
