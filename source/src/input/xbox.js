import {
  INPUT_UP, INPUT_LEFT, INPUT_RIGHT, INPUT_DOWN,
} from './input_codes.js'

const moveTypes = [INPUT_UP, INPUT_LEFT, INPUT_RIGHT, INPUT_DOWN]

export function pollxbox (gamepads, inputs) {
  const [lx, lz, rx, rz] = gamepads[0].axes

  for (let match, i = 0, l = moveTypes.length; i < l; i++) {
    match = inputs.indexOf(moveTypes[i])
    if (match !== -1) inputs.splice(match, 1)
  }

  if (lx > 0.15) {
    inputs.push(INPUT_RIGHT)
  } else if (lx < -0.15) {
    inputs.push(INPUT_LEFT)
  }

  if (lz > 0.15) {
    inputs.push(INPUT_DOWN)
  } else if (lz < -0.15) {
    inputs.push(INPUT_UP)
  }
}
