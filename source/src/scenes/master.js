import {gl} from '../engine/gl.js'
import {camera_update, camera_setZoom, camera_setShake} from '../engine/camera.js'
import {updateMatrix} from '../objects/index.js'
import {player, player_update} from '../actors/player.js'
import {sprite, setAnimation} from '../objects/sprite.js'
import {startInspire, endInspire, displayText} from '../engine/text.js'
import {furyLevel_update, furyLevel_show} from './fury_level.js'
import {playAudio, stopAudio} from '../engine/audio.js'

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

export const sprites = [player]
export const people = []

let shaking = false
let a = 0, b = 0
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

  sprites.push(p1, p2, p3)

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
    ...sprite(
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

function startPersonAnim (person) {
  person.animating = true
}

function createPerson (info, x) {
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

  setTimeout(startPersonAnim, Math.random() * 3000, person)

  person.translation.z = setTranslateZ()
  person.translation.x = x || 0
  updateMatrix(person)

  return person
}

function setEvent (time, config) {
  setTimeout(onEvent, time * 1000, config)
}

function onEvent (config) {
  if (config.text !== undefined) {
    displayText(config.text, config.text2)
    if (config.dur !== undefined) {
      setTimeout(onTextEnd, config.dur * 1000)
    }
  }

  if (config.control !== undefined) {
    player.control = config.control
  }

  if (config.fn !== undefined) {
    config.fn()
  }
}

function onTextEnd () {
  displayText('')
}

export function masterSceneInit () {
  player.control = BYPASS
  player.translation.x = -80
  playAudio('intro', true, VOLUME)

  sprites.push(createSprite('car', 96, 48, -180))

  home = createSprite('home', 128, 128, -20)
  sprites.push(home)

  setEvent( 3.0, {dur: 3.0, text: '"I\'m glad I cancelled that trip to Milwaukee."'})
  setEvent( 7.5, {dur: 3.0, text: '"...and didn\'t tell the kids."'})
  setEvent(12.0, {dur: 3.0, text: '"They\'ll be so delighted and surprised."'})
  setEvent(16.5, {dur: 3.0, text: '<- A D ->', control: true})
}

function playRandomPunch (v = VOLUME) {
  playAudio(`hit_${Math.random() * 5 | 0}`, false, v)
}

export function startPregame () {
  stopAudio('intro')
  playAudio('crowd', true, VOLUME - 0.4 < 0.0 ? 0.0 : VOLUME - 0.4)
  displayText('')

  window.nightsky.style.display = 'none'
  removeSprite(home)

  createScene(true)
  createScene()

  setTimeout(function () {
    player.velocity.x = 0.0
    setAnimation(player, 'idle_right')
  }, 200)
  
  player.control = false
  didPregame = true

  setEvent( 2.5, {dur: 2.5, text: '"Sup bro?"'})
  setEvent( 6.0, {dur: 2.5, text: '...'})
  setEvent( 9.0, {dur: 2.5, text: '"Aren\'t you a little old for this party?"'})

  setEvent(12.0, {text: 'PUNCH.', fn: playRandomPunch})
  setEvent(12.5, {text: 'PUNCH. THIS.', fn: playRandomPunch})
  setEvent(13.0, {text: 'PUNCH. THIS. GUY.', fn: playRandomPunch})
  setEvent(13.5, {dur: 0.5, text: 'PUNCH. THIS. GUY. [spacebar]', fn: playRandomPunch})

  setTimeout(startGame, 14 * 1000)
}

export function startGame () {
  displayText('')
  playAudio('party', true, VOLUME)
  
  player.control = true
  didStart = true
}

function onFirstPunch () {
  furyLevel_show(true)
  setEvent( 4.0, {dur: 3.0, text: 'MAINTAIN YOUR PARENTAL FURY.'})
  setEvent( 8.0, {fn: function () {
    startInspire()
  }})
}

function endGame () {
  stopAudio('party')
  playAudio('fail', true, VOLUME)

  gl.canvas.classList.add('game-over')

  player.velocity.x = 0
  setAnimation(player, 'idle_right')

  endInspire()

  furyLevel_show(false)

  camera_setZoom(150.0, 1500)
  camera_setShake(0.0, 0.0)

  setEvent(2.0, {text: `YOU VANQUISHED ${numKilled} PARTYGOERS`})
  setEvent(4.0, {text: `YOU VANQUISHED ${numKilled} PARTYGOERS`, text2: 'BEFORE YOU LOST YOUR PASSION'})
  setEvent(4.0, {fn: function () {
    function reload () {
      location.reload(false)
    }

    document.addEventListener('keydown', reload)
    document.addEventListener('click', reload)
  }})
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
        setAnimation(p, 'fly')

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

        if (!didFirstPunch) {
          didFirstPunch = true
          onFirstPunch()
        }

        p.dead = true
        p.physics = true

        a++
        numKilled++

        if (a === 1) {
          playAudio(`hit_${Math.random * 5 | 0}`, false, VOLUME)
        }
      }
    }

  } else {
    if (shaking) {
      camera_setShake(0.00001, 0.0)
      shaking = false
    }

    a = 0
  }

  if (b === 1 && a === 0) {
    a = -1
  }

  if (furyLevel_update(a) <= 0.0) {
    didLose = true
    endGame()
  }
}
