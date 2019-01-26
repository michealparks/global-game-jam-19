import {gl} from './gl.js'
import {m4_identity, m4_multiply} from '../utils/m4.js'
import {program, programUniforms} from './programs.js'
import {viewMatrix} from './camera.js'
import {updatePhysics, updateMatrix} from '../objects/index.js'
import {sprite_update} from '../objects/sprite.js'
import {setTexture} from '../utils/texture.js'
import {primitives, sprites, masterSceneUpdate} from '../scenes/master.js'

const fadeSpeed = 0.05

let curScene, curSceneUpdate, curSprites, curPrimitives

let elapsedMS = 0.0
let thenMS = performance.now()
let tickID = -1

let lastSceneAlpha = 1.0, curSceneAlpha = 0.0

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

      if (object.sprite === true) {
        sprite_update(object, elapsedMS)
      }
    }

    m4_multiply(viewMatrix, object.matrix, uMatrix)

    if (object.sprite === true) {
      setTexture(object.textureId, programUniforms.uSampler)
    } else {
      gl.uniform3fv(programUniforms.uColor, object.color)
    }

    gl.bindVertexArray(object.vao)
    gl.uniformMatrix4fv(programUniforms.uMatrix, false, uMatrix)
    gl.drawElements(gl.TRIANGLES, object.numIndices, gl.UNSIGNED_SHORT, 0)
  }
}

gl.useProgram(program)

function gameTick (nowMS) {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  elapsedMS = nowMS - thenMS
  thenMS = nowMS

  masterSceneUpdate(elapsedMS)

  gl.uniform1f(programUniforms.uAlpha, 1.0)

  // render current scene flat shaded objects
  gl.uniform1i(programUniforms.uHasTexture, 0)

  drawObjects(primitives)

  gl.uniform1i(programUniforms.uHasTexture, 1)

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
