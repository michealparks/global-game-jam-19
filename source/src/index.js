import {
  renderer_start,
  renderer_pause,
  renderer_isPaused
} from './engine/renderer.js'
import {updateMatrix} from './objects'
import {sprite, sprite_setAnimation} from './objects/sprite.js'
import {createScene} from './scenes/master.js'

createScene()
renderer_start()

let wasPaused = renderer_isPaused
document.addEventListener('visibilitychange', function () {
  if (document.hidden) {
    wasPaused = renderer_isPaused
    renderer_pause()
  } else if (wasPaused === false) {
    renderer_start()
  }
}, {passive: true, capture: false})

new FontFace('FreePixel', './FreePixel.woff2')
