import { renderer } from './engine/renderer.js'
import { mainScene } from './scenes/main.js'
import { audio } from './engine/audio.js'

const init = () => {
  const Context = window.AudioContext || window.webkitAudioContext
  audio.init(new Context())
  renderer.start()
  mainScene.init()

  audio.load('intro', './music/intro.mp3')
  audio.load('party', './music/party_1.mp3')
  audio.load('fail', './music/fail.mp3')
  audio.load('hit_0', './music/hit_1.wav')
  audio.load('hit_1', './music/hit_2.wav')
  audio.load('hit_2', './music/hit_3.wav')
  audio.load('hit_3', './music/hit_4.wav')
  audio.load('hit_4', './music/hit_5.wav')
  audio.load('coin', './music/coin.wav')
  audio.load('crowd', './music/crowd.wav')

  let wasPaused = false
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      wasPaused = framesPaused
      renderer.pause()
    } else if (wasPaused === false) {
      renderer.start()
    }
  }, { passive: true })
}

init()
