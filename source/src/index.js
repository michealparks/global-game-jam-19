import {
  renderer_start,
  renderer_pause,
  framesPaused
} from './engine/renderer.js'
import {masterSceneInit} from './scenes/master.js'
import {initAudio, loadAudio} from './engine/audio.js'

document.addEventListener('touchstart', init)

function init () {
  const Context = window.AudioContext || window.webkitAudioContext
  initAudio(new Context())
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

  document.removeEventListener('touchstart', init)
}

renderer_start()
masterSceneInit()

let wasPaused = framesPaused
document.addEventListener('visibilitychange', function () {
  if (document.hidden) {
    wasPaused = framesPaused
    renderer_pause()
  } else if (wasPaused === false) {
    renderer_start()
  }
}, {passive: true, capture: false})
