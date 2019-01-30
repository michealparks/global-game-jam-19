const context = new AudioContext()
const audio = []
const toPlay = {}

function start (audio, loop, vol) {
  audio.source = context.createBufferSource()
  audio.source.buffer = audio.buffer
  audio.source.loop = loop || false
  audio.source.connect(audio.gainNode)

  audio.gainNode.gain.value = vol
  audio.source.start(1)
}

function crossfade (val, max, el) {
  const x = val / max
  // Use an equal-power crossfading curve:
  const gain1 = Math.cos(x * 0.5 * Math.PI)
  const gain2 = Math.cos((1.0 - x) * 0.5 * Math.PI)
  this.gainNode.gain.value = gain1
  el.gainNode.gain.value = gain2
}

function createSource (buffer) {
  const gainNode = context.createGain()
  gainNode.connect(context.destination)

  return {source: undefined, buffer, gainNode}
}

function arrayBuffer (res) {
  return res.arrayBuffer()
}

export function loadAudio (key, url) {
  fetch(url).then(arrayBuffer).then(function (buf) {
    context.decodeAudioData(buf, function (data) {
      audio[key] = createSource(data)

      if (toPlay[key] !== undefined) {
        start(audio[key], toPlay[key].loop, toPlay[key].vol)
        delete toPlay[key]
      }
    })
  })
}

export function playAudio (key, loop, vol) {
  if (audio[key] === undefined) {
    toPlay[key] = {loop, vol}
    return
  }

  start(audio[key], loop, vol)
}

export function stopAudio (key, loop, vol) {
  const a = audio[key]
  if (a === undefined) return
  if (a.source === undefined) return

  a.source.stop(0)
}
