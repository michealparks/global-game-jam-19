import {
  INPUT_UP, INPUT_LEFT, INPUT_RIGHT, INPUT_DOWN,
  INPUT_PUNCH,
  INPUT_PUNCH_LEFT, INPUT_PUNCH_RIGHT, INPUT_PUNCH_UP, INPUT_PUNCH_DOWN,
  INPUT_RUN
} from './input_codes.js'

import {polljoycons} from './joycon.js'
import {pollxbox} from './xbox.js'

const GAMEPAD_NULL = -1
const GAMEPAD_JOYCONS = 0
const GAMEPAD_XBOX = 1

export const inputs = []

let gamepadIntervalId = -1
let gamepadType = GAMEPAD_NULL

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

function onKeyDown (e) {
  const input = inputMap[e.keyCode]

  if (inputs.indexOf(input) === -1) {
    return inputs.push(input)
  }
}

function onKeyUp (e) {
  const input = inputMap[e.keyCode]
  const i = inputs.indexOf(input)
  inputs.splice(i, 1)
}

function pollGamepads (e) {
  const gamepads = navigator.getGamepads()

  if (gamepadType === GAMEPAD_JOYCONS) {
    polljoycons(gamepads, inputs)
  } else if (gamepadType === GAMEPAD_XBOX) {
    pollxbox(gamepads, inputs)
  }
}

window.addEventListener('keydown', onKeyDown, {passive: true})
window.addEventListener('keyup', onKeyUp, {passive: true})

window.addEventListener('gamepadconnected', function (e) {
  // Don't start more than one poll function, you silly
  if (gamepadIntervalId !== -1) return

  const id = e.gamepad.id

  if (id.indexOf('Joy-Con') > -1) {
    gamepadType = GAMEPAD_JOYCONS
  } else if (id.indexOf('Xbox') > -1) {
    gamepadType = GAMEPAD_XBOX
  }

  gamepadIntervalId = setInterval(pollGamepads, 1000 / 30)
}, {passive: true})

window.addEventListener('gamepaddisconnected', function (e) {
  // Don't allow any hanging inputs
  while (inputs.length > 0) inputs.pop()

  // Stop the polling function
  clearInterval(gamepadIntervalId)

  // Signify that there's no current polling
  gamepadIntervalId = -1
}, {passive: true})
