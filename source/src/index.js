import {
  renderer_start,
  renderer_pause,
  renderer_isPaused
} from './engine/renderer.js'
import {updateMatrix} from './objects'
import {sprite, sprite_setAnimation} from './objects/sprite.js'
import {masterSceneInit} from './scenes/master.js'
import {loadAudio} from './engine/audio.js'

Promise.all([
  loadAudio('./music/intro.mp3'),
  loadAudio('./music/party_1.mp3'),
  loadAudio('./music/party_2.mp3'),
  loadAudio('./music/fail.mp3')
]).then(function (arr) {
  renderer_start()

  masterSceneInit({
    intro: arr[0],
    party1: arr[1],
    party2: arr[2],
    fail: arr[3]
  })
})

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
