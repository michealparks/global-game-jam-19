const input = document.querySelector('#input');

import {
  INPUT_UP, INPUT_LEFT, INPUT_RIGHT, INPUT_DOWN,
  INPUT_RUN
} from './input_codes.js'

const AXIS_NULL = -1
const AXIS_RIGHT = 0
const AXIS_UP_RIGHT = 1
const AXIS_UP = 2
const AXIS_UP_LEFT = 3
const AXIS_LEFT = 4
const AXIS_DOWN_LEFT = 5
const AXIS_DOWN = 6
const AXIS_DOWN_RIGHT = 7

const BUTTON_A = 0
const BUTTON_X = 1
const BUTTON_B = 2
const BUTTON_Y = 3
const BUTTON_RSL = 4
const BUTTON_RSR = 5
const BUTTON_PLUS = 9
const BUTTON_RA = 11
const BUTTON_HOME = 12
const BUTTON_R = 14
const BUTTON_RT = 15
const BUTTON_LEFT = 16
const BUTTON_DOWN = 17
const BUTTON_UP = 18
const BUTTON_RIGHT = 19
const BUTTON_LSL = 20
const BUTTON_LSR = 21
const BUTTON_MINUS = 24
const BUTTON_LA = 26
const BUTTON_CAPTURE = 29
const BUTTON_L = 30
const BUTTON_LT = 31

// Mapping button index to each button
// Each joycon contains 16 buttons indexed
const axisMap = new Map()
axisMap.set(1285, AXIS_NULL)
axisMap.set(142, AXIS_LEFT)
axisMap.set(-142, AXIS_DOWN_LEFT)
axisMap.set(-428, AXIS_DOWN)
axisMap.set(-714, AXIS_DOWN_RIGHT)

axisMap.set(428, AXIS_UP_LEFT)
axisMap.set(-1000, AXIS_RIGHT)
axisMap.set(1000, AXIS_UP_RIGHT)
axisMap.set(714, AXIS_UP)

let leftPad, rightPad

const movements = [INPUT_UP, INPUT_DOWN, INPUT_LEFT, INPUT_RIGHT]
const actions = [INPUT_RUN]

export function polljoycons (gamepads, inputs) {
  while (inputs.length > 0) inputs.pop()

  for (let g, i = 0, l = gamepads.length; i < l; i++) {
    g = gamepads[i]

    if (g === null) continue

    if (g.id.indexOf('Joy-Con (L)') !== -1) {
      leftPad = g
    } else if (g.id.indexOf('Joy-Con (R)') !== -1) {
      rightPad = g
    }
  }

  const input = axisMap.get(leftPad.axes[9] * 1000 | 0)
  const orderedGamepads = [rightPad, leftPad]

  for (let gp, g = 0; g < orderedGamepads.length; g++) {
    gp = orderedGamepads[g]

    if (gp !== undefined) {
      // for (let match, i = 0; i < movements.length; i++)
      for (let id, button, i = 0; i < gp.buttons.length; i++) {
        if (gp.buttons[i].pressed) {
          id = (g * 15) + i + g

          switch (id) {
            case BUTTON_B:
              inputs.push(INPUT_RUN)
              break
          }
        }
      }
    }
  }

  switch (input) {
    case AXIS_RIGHT:
      inputs.push(INPUT_RIGHT)
      break
    case AXIS_UP_RIGHT:
      inputs.push(INPUT_UP, INPUT_RIGHT)
      break
    case AXIS_UP:
      inputs.push(INPUT_UP)
      break
    case AXIS_UP_LEFT:
      inputs.push(INPUT_UP, INPUT_LEFT)
      break
    case AXIS_LEFT:
      inputs.push(INPUT_LEFT)
      break
    case AXIS_DOWN_LEFT:
      inputs.push(INPUT_DOWN, INPUT_LEFT)
      break
    case AXIS_DOWN:
      inputs.push(INPUT_DOWN)
      break
    case AXIS_DOWN_RIGHT:
      inputs.push(INPUT_DOWN, INPUT_RIGHT)
      break
  }
}