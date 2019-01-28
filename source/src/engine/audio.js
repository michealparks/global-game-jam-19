const context = new AudioContext()

function start (loop, vol) {
  this.source = context.createBufferSource()
  this.source.buffer = this.buffer
  this.source.loop = loop || false
  this.source.connect(this.gainNode)

  this.gainNode.gain.value = vol
  this.source.start(1)
}

function stop () {
  this.source.stop(0)
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

  return {source: undefined, buffer, gainNode, start, stop}
}

function arrayBuffer (res) {
  return res.arrayBuffer()
}

export function loadAudio (url) {
  return fetch(url).then(arrayBuffer).then(function (buf) {
    return new Promise(function (resolve) {
      context.decodeAudioData(buf, function (data) {
        return resolve(createSource(data))
      })
    })
  })
}


