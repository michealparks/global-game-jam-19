import {
  renderer_start,
  renderer_pause,
  renderer_isPaused
} from './engine/renderer.js'
import {masterSceneInit} from './scenes/master.js'
import {loadAudio} from './engine/audio.js'

loadAudio('intro', './music/intro.mp3')
loadAudio('party', './music/party_1.mp3')
loadAudio('fail', './music/fail.mp3')
loadAudio('hit_0', './music/hit_1.wav')
loadAudio('hit_1', './music/hit_2.wav')
loadAudio('hit_2', './music/hit_3.wav')
loadAudio('hit_3', './music/hit_4.wav')
loadAudio('hit_4', './music/hit_5.wav')
loadAudio('coin', './music/coin.wav')
loadAudio('crowd', './music/crowd.wav')

renderer_start()

masterSceneInit()

let wasPaused = renderer_isPaused
document.addEventListener('visibilitychange', function () {
  if (document.hidden) {
    wasPaused = renderer_isPaused
    renderer_pause()
  } else if (wasPaused === false) {
    renderer_start()
  }
}, {passive: true, capture: false})
