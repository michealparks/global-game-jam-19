import {gl} from './gl.js'
import {m4_identity, m4_multiply} from '../utils/m4.js'
import {program, programUniforms} from './programs.js'
import {viewMatrix} from './camera.js'
import {updatePhysics, updateMatrix} from '../objects/index.js'
import {sprite_update} from '../objects/sprite.js'
import {setTexture} from '../utils/texture.js'
import {sprites, masterSceneUpdate} from '../scenes/master.js'

let elapsedMS = 0.0
let thenMS = performance.now()
let tickID = -1

export let renderer_isPaused = true

let uMatrix = m4_identity()

let object
let i = 0, l = 0

function drawObjects (objects) {
  for (i = 0, l = objects.length; i < l; i++) {
    object = objects[i]

    if (object.static === false) {
      updateMatrix(object)

      if (object.physics === true) {
        updatePhysics(object)
      }

      sprite_update(object, elapsedMS)
    }

    m4_multiply(viewMatrix, object.matrix, uMatrix)

    setTexture(object.textureId, programUniforms.uSampler)

    gl.bindVertexArray(object.vao)
    gl.uniformMatrix4fv(programUniforms.uMatrix, false, uMatrix)
    gl.drawElements(gl.TRIANGLES, object.numIndices, gl.UNSIGNED_SHORT, 0)
  }
}

gl.useProgram(program)
gl.uniform1f(programUniforms.uAlpha, 1.0)

function gameTick (nowMS) {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  elapsedMS = nowMS - thenMS
  thenMS = nowMS

  masterSceneUpdate(elapsedMS)

  drawObjects(sprites)

  tickID = window.requestAnimationFrame(gameTick)
}

export function renderer_start () {
  renderer_isPaused = false
  tickID = window.requestAnimationFrame(gameTick)
}

export function renderer_pause () {
  renderer_isPaused = true
  return window.cancelAnimationFrame(tickID)
}
