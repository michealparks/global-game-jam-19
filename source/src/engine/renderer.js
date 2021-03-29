import { gl } from './gl.js'
import { m4 } from '../utils/m4.js'
import { program, programUniforms } from './programs.js'
import { camera } from './camera.js'
import { updatePhysics, updateMatrix } from '../objects/index.js'
import { updateSprite } from '../objects/sprite.js'
import { texture } from './texture.js'
import { sprites, mainScene } from '../scenes/main.js'

const { context } = gl
let dt = 0.0
let then = performance.now()
let rafid = -1

export let framesPaused = true

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

    context.bindVertexArray(object.vao)
    context.uniformMatrix4fv(programUniforms.uMatrix, false, uMatrix)
    context.drawElements(context.TRIANGLES, object.numIndices, context.UNSIGNED_SHORT, 0)
  }
}

context.useProgram(program)
context.uniform1f(programUniforms.uAlpha, 1.0)

const tick = (now) => {
  context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT)

  dt = now - then
  then = now

  mainScene.update(dt)

  drawObjects(sprites)

  rafid = window.requestAnimationFrame(tick)
}

const start = () => {
  framesPaused = false
  rafid = window.requestAnimationFrame(tick)
}

const pause = () => {
  framesPaused = true
  window.cancelAnimationFrame(rafid)
}

export const renderer = {
  start,
  pause
}