import {
  INPUT_UP, INPUT_LEFT, INPUT_RIGHT, INPUT_DOWN,
  INPUT_PUNCH_LEFT, INPUT_PUNCH_RIGHT,
  INPUT_RUN
} from '../input/input_codes.js'
import {sprite, sprite_setAnimation} from '../objects/sprite.js'
import {inputs} from '../input/index.js'

const SPEED_WALK = 1.6
const SPEED_RUN = 3.0
const PUNCH_TIME = 300.0

export const player = {
  ...sprite(
    'dad', /* filename */
    32,    /* width */
    32,    /* height */
    20,    /* frames */
    /* animations */
    {      
      idle_right: {start: 0, end: 0, speed: 2000},
      idle_left: {start: 1, end: 1, speed: 2000},
      run_left: {start: 2, end: 8, speed: 80},
      run_right: {start: 9, end: 15, speed: 80},
      punch_right: {start: 16, end: 17, speed: PUNCH_TIME},
      punch_left: {start: 18, end: 19, speed: PUNCH_TIME}
    }
  ),

  speed: SPEED_WALK,
  static: false,
  physics: true,
  animating: true,
  punching: false
}

player.translation.z = 0.6

let x = 0.0, lx = 0.0, llx = 0.0
let accumulator = 0.0
let punchtime = 0.0

function setRunAnimation (x, lx) {
  if (x > 0.0) {
    sprite_setAnimation(player, 'run_right')
  } else if (x < 0.0) {
    sprite_setAnimation(player, 'run_left')
  } else if (lx > 0.0) {
    sprite_setAnimation(player, 'idle_right')
  } else if (lx < 0.0) {
    sprite_setAnimation(player, 'idle_left')
  }
}

export function player_update (dt) {
  accumulator += dt
  punchtime += dt

  if (accumulator < 40.0) return

  accumulator = 0.0
  x = 0.0
  
  if (inputs.indexOf(INPUT_RUN) > -1) {
    player.speed = SPEED_RUN
  } else {
    player.speed = SPEED_WALK
  }

  // Set player speed
  for (let i = 0, l = inputs.length; i < l; i++) {
    switch (inputs[i]) {
      case INPUT_LEFT:
        x = -player.speed
        break
      case INPUT_RIGHT:
        x = player.speed
        break
    }
  }

  // Set a punching animation
  for (let i = 0, l = inputs.length; i < l; i++) {
    switch (inputs[i]) {
      case INPUT_PUNCH_LEFT:
        if (player.punching) break
        player.punching = true
        sprite_setAnimation(player, 'punch_left')
        return
      case INPUT_PUNCH_RIGHT:
        if (player.punching) break
        player.punching = true
        sprite_setAnimation(player, 'punch_right')
        return
      default:
        if (player.punching && punchtime > PUNCH_TIME) {
          player.punching = false
          setRunAnimation(x, lx)
        }
    }
  }

  if (lx !== x) {
    setRunAnimation(x, lx)

    player.velocity.x = x
  }

  lx = x
}

window.addEventListener('blur', function () {
  player.velocity.x = 0.0
}, {passive: true})
