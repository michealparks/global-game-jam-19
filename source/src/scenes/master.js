import {gl} from '../engine/gl.js'
import {camera_update, camera_setZoom, camera_setShake} from '../engine/camera.js'
import {updateMatrix} from '../objects/index.js'
import {player, player_update} from '../actors/player.js'
import {sprite, sprite_setAnimation} from '../objects/sprite.js'
import {startInspire, endInspire, displayText} from '../engine/text.js'
import {furyLevel_update} from './fury_level.js'

let nextRoomX = 0
let translateZ = 0.1

const SPEED = 1.8
const ROOM_WIDTH = 48 * 3

const teenagers = [
  // {name: 'bro', frames: 1},
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

const rooms = [
  {name: 'room_1', width: 128, height: 48}
]

export const primitives = []
export const sprites = []
export const people = []

sprites.push(player)

startInspire()

let shaking = false
let a = 0
let numKilled = 0
let didLose = false

export function removeSprite (sprite) {
  const index = sprites.indexOf(sprite)

  if (index > -1) sprites.splice(index, 1)
}

export function createScene () {
  const r1 = (Math.random() * bgs.length - 1) | 0
  const r2 = (Math.random() * bgs.length - 1) | 0
  const r3 = (Math.random() * bgs.length - 1) | 0

  const p1 = createRoom(bgs[r1], nextRoomX)
  const p2 = createRoom(bgs[r2], nextRoomX + 48)
  const p3 = createRoom(bgs[r3], nextRoomX + 48 + 48)

  sprites.push(p1)
  sprites.push(p2)
  sprites.push(p3)

  for (let x, i = 0; i < teenagers.length; i++) {
    x = 32 + (Math.random() * (ROOM_WIDTH - 32)) + nextRoomX

    const person = createPerson(teenagers[i], x)

    people.push(person)
    sprites.push(person)
  }

  nextRoomX += ROOM_WIDTH
}

export function removeScene () {

}

export function createRoom (info, x) {
  const room = sprite(
    info.name,   /* filename */
    48,  /* width */
    48, /* height */
    info.frames, /* frames */
  )

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

export function createPerson (info, x) {
  const person = {
    ...sprite(
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

export function masterSceneUpdate (elapsedMS) {
  camera_update(player.translation.x, player.translation.z)

  if (didLose) return

  if (player.translation.x + window.innerWidth > nextRoomX) {
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
    if (!shaking) {
      camera_setShake(0.001, 100.0)
      shaking = true
    }

    const v = (player.velocity.x > 0 ? SPEED : -SPEED)

    for (let p, i = 0, l = people.length; i < l; i++) {
      p = people[i]

      if (p.dead) continue

      if (Math.abs(player.translation.x - p.translation.x) < 10) {
        sprite_setAnimation(p, 'fly')

        p.velocity.x = v * 2

        if (a === 1) {
          p.velocity.y = 0.4
          p.angularVelocity.z = 0.25
        } else if (a == 2) {
          p.velocity.y = 1.0
          p.angularVelocity.z = 0.4
          p.scaleVelocity.x = p.scaleVelocity.y = p.scaleVelocity.z = 0.01
        } else if (a === 3) {
          p.velocity.x = v * 3
          p.velocity.y = 1.5
          p.angularVelocity.z = 0.6
          p.scaleVelocity.x = p.scaleVelocity.y = p.scaleVelocity.z = 0.09
        }

        p.dead = true
        p.physics = true

        a++
        numKilled++
      }
    }

  } else {
    if (shaking) {
      camera_setShake(0.00001, 0.0)
      shaking = false
    }

    a = 0
  }

  player_update(elapsedMS)

  if (furyLevel_update(a) <= 0.0) {
    didLose = true
    endGame()
  }
}

export function endGame () {
  gl.canvas.classList.add('game-over')
  player.velocity.x = 0
  sprite_setAnimation(player, 'idle_right')
  endInspire()
  camera_setZoom(150.0, 1500)
  camera_setShake(0.0, 0.0)

  setTimeout(function () {
    displayText(`YOU VANQUISHED ${numKilled} PARTYGOERS`)

    setTimeout(function () {
      displayText(`YOU VANQUISHED ${numKilled} PARTYGOERS`, 'BEFORE YOU LOST YOUR PASSION')
    }, 2000)
  }, 2000)
}
