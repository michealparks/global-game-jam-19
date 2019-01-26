import {camera_update, camera_setShake} from '../engine/camera.js'
import {updateMatrix} from '../objects/index.js'
import {player, player_update} from '../actors/player.js'
import {sprite, sprite_setAnimation} from '../objects/sprite.js'
import {startInspire, endInspire} from '../engine/text.js'

let sceneID = -1
let nextRoomX = 0

const teenagers = [
  // {name: 'bro', frames: 1},
  {name: 'tall_punk', frames: 6},
  {name: 'beer_bong', frames: 6},
  {name: 'yoga_gal', frames: 6},
  {name: 'slice', frames: 6},
  {name: 'hover_bro', frames: 6}
]

const rooms = [
  {name: 'room_1', width: 128, height: 48}
]

export const primitives = []
export const sprites = []
export const people = []

sprites.push(player)

export function removeSprite (sprite) {
  const index = sprites.indexOf(sprite)

  if (index > -1) sprites.splice(index, 1)
}

export function createScene () {
  const roomInfo = rooms[(Math.random() * rooms.length - 1) | 0]
  const room = createRoom(roomInfo, nextRoomX)
  sprites.push(room)

  for (let x, i = 0; i < teenagers.length; i++) {
    x = 32 + (Math.random() * (roomInfo.width - 32)) + nextRoomX

    const person = createPerson(teenagers[i], x)

    people.push(person)
    sprites.push(person)
  }

  nextRoomX += roomInfo.width

  return ++sceneID
}

export function removeScene () {

}

export function createRoom (info, x) {
  const room = sprite(
    info.name, /* filename */
    info.width,    /* width */
    info.height,       /* height */
    1,        /* frames */
  )

  room.translation.x = (info.width / 2) + x
  updateMatrix(room)

  return room
}

let translateZ = 0.1

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

startInspire()

let shaking = false
let a = 0

export function masterSceneUpdate (elapsedMS) {
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

    for (let p, i = 0, l = people.length; i < l; i++) {
      p = people[i]


      if (p.dead) continue

      if (Math.abs(player.translation.x - p.translation.x) < 10) {
        sprite_setAnimation(p, 'fly')

        p.velocity.x = player.velocity.x * 2

        if (a === 1) {
          p.velocity.y = 0.4
          p.angularVelocity.z = 0.25
        } else if (a == 2) {
          p.velocity.y = 1.0
          p.angularVelocity.z = 0.4
          p.scaleVelocity.x = p.scaleVelocity.y = p.scaleVelocity.z = 0.01
        } else if (a === 3) {
          p.velocity.x = player.velocity.x * 3
          p.velocity.y = 1.5
          p.angularVelocity.z = 0.6
          p.scaleVelocity.x = p.scaleVelocity.y = p.scaleVelocity.z = 0.09
        }

        p.dead = true
        p.physics = true

        a++
      }
    }

  } else {
    if (shaking) {
      camera_setShake(0.00001, 0.0)
      shaking = false
    }

    a = 0
  }

  camera_update(player.translation.x, player.translation.z)
  player_update(elapsedMS)
}

