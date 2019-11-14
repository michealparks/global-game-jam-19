import {
  INPUT_UP, INPUT_LEFT, INPUT_RIGHT, INPUT_DOWN,
  INPUT_PUNCH,
  INPUT_PUNCH_LEFT, INPUT_PUNCH_RIGHT, INPUT_PUNCH_UP, INPUT_PUNCH_DOWN,
  INPUT_RUN,
  translateInputs
} from './input_codes.js'

import {polljoycons} from './joycon.js'
import {pollxbox} from './xbox.js'

export const inputs = []

/**
 * KEYBOARD
 */
const inputMap = {
  // wasd
  87: INPUT_UP,
  83: INPUT_DOWN,
  65: INPUT_LEFT,
  68: INPUT_RIGHT,

  // arrow keys
  38: INPUT_PUNCH_UP,
  40: INPUT_PUNCH_DOWN,
  37: INPUT_PUNCH_LEFT,
  39: INPUT_PUNCH_RIGHT,

  16: INPUT_RUN,
  32: INPUT_PUNCH
}

window.addEventListener('keydown', function (e) {
  const input = inputMap[e.keyCode]
  if (input !== undefined) {
    inputs.push(input)
  }
}, {passive: true})

window.addEventListener('keyup', function (e) {
  const input = inputMap[e.keyCode]
  if (input !== undefined) {
    inputs.splice(inputs.indexOf(input), 1)
  }
}, {passive: true})

/**
 * TOUCH
 */
let touchStartX = -1.0
let touchStartY = -1.0
let touchLastX = -1.0
let touchLastY = -1.0
let touchMoveX = -1.0
let touchMoveY = -1.0
let touchIntervalId = -1

function pollTouchEvents () {
  // This allows us to detect new swipes
  // without the user lifting their finger
  if (touchLastX === touchMoveX && touchLastY === touchMoveY) {
    touchStartX = touchLastX
    touchStartY = touchLastY

    while (inputs.length > 0) inputs.pop()
  }

  const dx = touchMoveX - touchStartX
  const dy = touchMoveY - touchStartY

  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx > 0) {
      if (inputs.indexOf(INPUT_PUNCH_RIGHT) > -1) return
      inputs.push(INPUT_PUNCH_RIGHT)
    } else {
      if (inputs.indexOf(INPUT_PUNCH_LEFT) > -1) return
      inputs.push(INPUT_PUNCH_LEFT)
    }
  } else {
    if (dy > 0) {
      if (inputs.indexOf(INPUT_PUNCH_UP) > -1) return
      inputs.push(INPUT_PUNCH_UP)
    } else {
      if (inputs.indexOf(INPUT_PUNCH_DOWN) > -1) return
      inputs.push(INPUT_PUNCH_DOWN)
    }
  }

  console.log(translateInputs(inputs))
}

function onTouchEnd () {
  touchStartX = touchStartY =
  touchMoveX = touchMoveY =
  touchLastX = touchLastY = -1.0

  while (inputs.length > 0) inputs.pop()
}

touchIntervalId = setInterval(pollTouchEvents, 1000.0 / 40.0)

window.addEventListener('touchstart', function (e) {
  const t = e.touches[0]
  touchStartX = touchMoveX = t.pageX
  touchStartY = touchMoveY = t.pageY
}, {passive: true})

window.addEventListener('touchmove', function (e) {
  const t = e.touches[0]
  touchLastX = touchMoveX
  touchLastY = touchMoveY
  touchMoveX = t.pageX
  touchMoveY = t.pageY
}, {passive: true})

window.addEventListener('touchend', onTouchEnd, {passive: true})
window.addEventListener('touchcancel', onTouchEnd, {passive: true})

/**
 * GAMEPADS
 */
const GAMEPAD_JOYCONS = 0
const GAMEPAD_XBOX = 1

let gamepadIntervalId = -1
let gamepadType = -1

function pollGamepads (e) {
  const gamepads = navigator.getGamepads()

  if (gamepadType === GAMEPAD_JOYCONS) {
    polljoycons(gamepads, inputs)
  } else if (gamepadType === GAMEPAD_XBOX) {
    pollxbox(gamepads, inputs)
  }
}

window.addEventListener('gamepadconnected', function (e) {
  // Don't start more than one poll function, you silly
  if (gamepadIntervalId !== -1) return

  const id = e.gamepad.id

  if (id.indexOf('Joy-Con') > -1) {
    gamepadType = GAMEPAD_JOYCONS
  } else if (id.indexOf('Xbox') > -1) {
    gamepadType = GAMEPAD_XBOX
  }

  gamepadIntervalId = setInterval(pollGamepads, 1000.0 / 30.0)
}, {passive: true})

window.addEventListener('gamepaddisconnected', function (e) {
  // Don't allow any hanging inputs
  while (inputs.length > 0) inputs.pop()

  // Stop the polling function
  clearInterval(gamepadIntervalId)

  // Signify that there's no current polling
  gamepadIntervalId = -1
}, {passive: true})
