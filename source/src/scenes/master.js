import {gl} from '../engine/gl.js'
import {camera_update, camera_setZoom, camera_setShake} from '../engine/camera.js'
import {updateMatrix} from '../objects/index.js'
import {player, player_update} from '../actors/player.js'
import {sprite, sprite_setAnimation} from '../objects/sprite.js'
import {startInspire, endInspire, displayText} from '../engine/text.js'
import {furyLevel_update} from './fury_level.js'
import {loadAudio} from '../engine/audio.js'

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

export const sprites = [player]
export const people = []

let sounds
let shaking = false
let a = 0
let numKilled = 0
let didLose = false
let didPregame = false
let didStart = false

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
  const room = {
    ...sprite(
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

export function masterSceneInit (s) {
  sounds = s

  player.translation.x = -100
  sounds.intro.start(true, 0.5)
}

export function startPregame () {
  createScene()
  createScene()

  sounds.intro.stop()

  player.velocity.x = 0.0
  sprite_setAnimation(player, 'idle_right')
  player.control = false
  didPregame = true

  setTimeout(startGame, 5000)
}

export function startGame () {
  startInspire()

  sounds.party1.start(true, 0.5)
  player.control = true

  didStart = true
}

function endGame () {
  sounds.party1.stop()
  sounds.fail.start(true, 0.5)

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

export function masterSceneUpdate (elapsedMS) {
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
    if (!shaking) {
      camera_setShake(0.001, 100.0)
      shaking = true
    }

    const v = (player.velocity.x > 0 ? SPEED : -SPEED)

    for (let p, i = 0, l = people.length; i < l; i++) {
      p = people[i]

      if (p.dead) continue

      if (Math.abs(x - p.translation.x) < 10) {
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

  if (furyLevel_update(a) <= 0.0) {
    didLose = true
    endGame()
  }
}
