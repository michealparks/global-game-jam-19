import { gl } from '../engine/gl.js'
import { camera } from '../engine/camera.js'
import { updateMatrix } from '../objects/index.js'
import { player } from '../actors/player.js'
import { sprite, setAnimation } from '../objects/sprite.js'
import { startInspire, endInspire, displayText } from '../engine/text.js'
import { furyMeter } from './fury_level.js'
import { audio } from '../engine/audio.js'

let nextRoomX = 0
let translateZ = 0.1

const SPEED = 0.7
const ROOM_WIDTH = 48 * 3
const VOLUME = 0.8
const BYPASS = true

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

export const sprites = new Set([player])
export const people = new Set()

let shaking = false
let a = 0
let numKilled = 0
let didLose = false
let didIntro = false
let didStart = false
let didFirstPunch = false

let home

const createScene = (first) => {
  const r1 = (Math.random() * bgs.length - 1) | 0
  const r2 = (Math.random() * bgs.length - 1) | 0
  const r3 = (Math.random() * bgs.length - 1) | 0

  const p1 = createRoom(bgs[r1], nextRoomX)
  const p2 = createRoom(bgs[r2], nextRoomX + 48)
  const p3 = createRoom(bgs[r3], nextRoomX + 48 + 48)

  nextRoomX += ROOM_WIDTH

  sprites.add(p1)
  sprites.add(p2)
  sprites.add(p3)

  if (first) {
    const person = createPerson(teenagers[0], ROOM_WIDTH / 2)
    people.add(person)
    sprites.add(person)
  }

  for (const teenager of teenagers) {
    const x = 32 + (Math.random() * (ROOM_WIDTH - 32)) + nextRoomX

    const person = createPerson(teenager, x)

    people.add(person)
    sprites.add(person)
  }
}

const createSprite = (name, w, h, x, texture) => {
  const item = {
    ...sprite(
      name,   /* filename */
      w,      /* width */
      h,      /* height */
      1,
      undefined,
      texture
    ),
    static: true
  }

  item.translation.x = (w / 2) + x
  item.translation.z = -0.1
  updateMatrix(item)

  return item
}

const createRoom = (info, x) => {
  const room = {
    ...sprite(
      info.name,   /* filename */
      48,          /* width */
      48,          /* height */
      info.frames, /* frames */
      {idle: {start: 0, end: info.frames - 1, speed: 200}},
      {width: 64 * info.frames, height: 64, frameWidth: 48, frameHeight: 48}
    ),
    static: frames > 1
  }

  room.translation.x = (48 / 2) + x
  updateMatrix(room)

  return room
}

const setTranslateZ = () => {
  if (translateZ === 0.5) {
    translateZ = 0.1
  } else {
    translateZ += 0.1
  }

  return translateZ
}

const startPersonAnim = (person) => {
  person.animating = true
}

const createPerson = (info, x) => {
  const person = {
    ...sprite(
      info.name,
      32,
      32,
      info.frames,
      // animations
      {
        idle: {start: 0, end: 1, speed: 400},
        fly: {start: 2, end: 2, speed: 400}
      },
      // texture
      {width: 128, height: 64, frameWidth: 32, frameHeight: 32}
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

const setEvent = (time, config) => {
  setTimeout(onEvent, time * 1000, config)
}

const onEvent = (config) => {
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

const onTextEnd = () => {
  displayText('')
}

export const init = () => {
  player.control = BYPASS
  player.translation.x = -80
  audio.play('intro', true, VOLUME)

  sprites.add(createSprite('car', 96, 48, -180, {width: 64, height: 32, frameWidth: 64, frameHeight: 32}))

  home = createSprite('home', 128, 128, -20, {width: 64, height: 64, frameWidth: 64, frameHeight: 64})
  sprites.add(home)

  setEvent( 3.0, {dur: 3.0, text: '"I\'m glad I cancelled that trip to Milwaukee."'})
  setEvent( 7.5, {dur: 3.0, text: '"...and didn\'t tell the kids."'})
  setEvent(12.0, {dur: 3.0, text: '"They\'ll be so delighted and surprised."'})
  setEvent(16.5, {dur: 3.0, text: '<- A D ->', control: true, fn: () => {
    setAnimation(player, 'run_right')
    player.velocity.x = 1.6
  }})
}

const playRandomPunch = (v = VOLUME) => {
  audio.play(`hit_${Math.random() * 5 | 0}`, false, v)
}

export const startIntro = () => {
  audio.stop('intro')
  audio.play('crowd', true, VOLUME - 0.4 < 0.0 ? 0.0 : VOLUME - 0.4)
  displayText('')

  window.nightsky.style.display = 'none'
  sprites.delete(home)

  createScene(true)
  createScene()

  setTimeout(() => {
    player.velocity.x = 0.0
    setAnimation(player, 'idle_right')
  }, 200)
  
  player.control = false
  didIntro = true

  setEvent(2.5, {dur: 2.5, text: '"Sup bro?"'})
  setEvent(6.0, {dur: 2.5, text: '...'})
  setEvent(9.0, {dur: 2.5, text: '"Aren\'t you a little old for this party?"'})

  setEvent(12.0, {text: 'PUNCH.', fn: playRandomPunch})
  setEvent(12.5, {text: 'PUNCH. THIS.', fn: playRandomPunch})
  setEvent(13.0, {text: 'PUNCH. THIS. GUY.', fn: playRandomPunch})
  setEvent(13.5, {dur: 0.5, text: 'PUNCH. THIS. GUY. [spacebar]', fn: playRandomPunch})

  setTimeout(startGame, 14 * 1000)
}

const startGame = () => {
  displayText('')
  audio.play('party', true, VOLUME)
  
  player.control = true
  player.velocity.x = 1.6
  setAnimation(player, 'run_right')
  didStart = true
}

const onFirstPunch = () => {
  furyMeter.show(true)
  setEvent( 4.0, {dur: 3.0, text: 'MAINTAIN YOUR PARENTAL FURY.'})
  setEvent( 8.0, {fn: () => startInspire() })
}

const endGame = () => {
  audio.stop('party')
  audio.play('fail', true, VOLUME)

  gl.canvas.classList.add('game-over')

  player.velocity.x = 0
  setAnimation(player, 'idle_right')

  endInspire()

  furyMeter.show(false)

  camera.setZoom(180.0, 1500)
  camera.setShake(0.0, 0.0)

  setEvent(2.0, {text: `YOU VANQUISHED ${numKilled} PARTYGOERS`})
  setEvent(4.0, {text: `YOU VANQUISHED ${numKilled} PARTYGOERS`, text2: 'BEFORE YOU LOST YOUR PASSION'})
  setEvent(4.0, {fn: () => {
    const reload = () => location.reload(false)
    document.addEventListener('touchstart', reload)
    document.addEventListener('keydown', reload)
    document.addEventListener('click', reload)
  }})
}

const update = (dt) => {
  const { x } = player.translation

  let numHit = 0

  camera.update(x + 20)

  if (didLose) return

  player.update(dt)

  if (!didIntro && x > nextRoomX) {
    startIntro()
  }

  if (!didStart) {
    return
  }

  if (x + window.innerWidth > nextRoomX) {
    createScene()
  }

  for (const person of people) {
    if (person.dead === false) continue
  
    person.timeDead += dt

    if (person.timeDead > 2000) {
      people.delete(person)
      sprites.delete(person)
    }
  }

  if (player.punching) {
    if (!shaking) {
      camera.setShake(0.001, 100.0)
      shaking = true
    }

    const v = (player.velocity.x > 0 ? SPEED : -SPEED)

    for (const person of people) {
      if (person.dead) continue

      if (Math.abs(x - person.translation.x) < 10) {
        setAnimation(person, 'fly')

        numHit += 1
        numKilled += 1

        person.dead = true
        person.physics = true
        person.velocity.x = v * 3

        if (numHit === 1) {
          person.velocity.y = 0.4
          person.angularVelocity.z = 0.25
        } else if (numHit === 2) {
          person.velocity.y = 1.0
          person.angularVelocity.z = 0.4
          person.scaleVelocity.x = person.scaleVelocity.y = person.scaleVelocity.z = 0.01
        } else if (numHit === 3) {
          person.velocity.x = v * 3
          person.velocity.y = 1.5
          person.angularVelocity.z = 0.6
          person.scaleVelocity.x = person.scaleVelocity.y = person.scaleVelocity.z = 0.09
        }
      }
    }

    if (!didFirstPunch) {
      didFirstPunch = true
      onFirstPunch()
    }

    if (numHit > 0) {
      audio.play(`hit_${Math.random * 5 | 0}`, false, VOLUME)
    }

  } else {
    if (shaking) {
      camera.setShake(0.00001, 0.0)
      shaking = false
    }
  }

  if (furyMeter.update(numHit) <= 0.0) {
    didLose = true
    endGame()
  }
}

export const mainScene = {
  init,
  update,
  startGame,
  endGame
}
