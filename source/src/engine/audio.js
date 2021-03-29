const files = []
const toPlay = {}

let context

const start = (file, loop, vol) => {
  file.source = context.createBufferSource()
  file.source.buffer = file.buffer
  file.source.loop = loop || false
  file.source.connect(file.gainNode)

  file.gainNode.gain.value = vol
  file.source.start(1)
}

const crossfade = (val, max, el) => {
  const x = val / max
  // Use an equal-power crossfading curve:
  const gain1 = Math.cos(x * 0.5 * Math.PI)
  const gain2 = Math.cos((1.0 - x) * 0.5 * Math.PI)
  this.gainNode.gain.value = gain1
  el.gainNode.gain.value = gain2
}

const createSource = (buffer) => {
  const gainNode = context.createGain()
  gainNode.connect(context.destination)

  return {source: undefined, buffer, gainNode}
}

const init = (c) => {
  context = c
}

const load = async (key, url) => {
  const response = await fetch(url)
  const buffer = await response.arrayBuffer()
  const data = await context.decodeAudioData(buffer)

  files[key] = createSource(data)

  if (toPlay[key] !== undefined) {
    start(files[key], toPlay[key].loop, toPlay[key].vol)
    delete toPlay[key]
  }
}

const play = (key, loop, vol) => {
  if (files[key] === undefined) {
    toPlay[key] = {loop, vol}
    return
  }

  start(files[key], loop, vol)
}

const stop = (key, loop, vol) => {
  const file = files[key]

  if (file === undefined || file.source === undefined) {
    throw new Error(`${key} is undefined`)
  }

  file.source.stop(0)
}

export const audio = {
  init,
  load,
  play,
  stop
}