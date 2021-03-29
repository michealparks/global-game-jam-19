const furylevelContainer = document.getElementById('furylevel-container')
const furyElStyle = document.getElementById('furylevel').style
const furylevelContainerStyle = furylevelContainer.style

const dec = 0.0011
const inc = 0.0025

let furylevel = 1.0
let isActive = false

export const update = (punches) => {
  if (!isActive) return 1.0

  let mult = punches === 0
    ? 0
    : punches === 2
    ? 3
    : punches === 3
    ? 6
    : punches >= 4
    ? 9
    : 1

  furylevel -= (punches === -1 ? dec * 10 : dec)
  furylevel += (inc * mult)

  if (furylevel > 1.0) {
    furylevel = 1.0
  }

  const r1 = Math.random()
  const r2 = Math.random()
  const x = (((1 - furylevel) * 10)) * Math.random()
  const y = (((1 - furylevel) * 10)) * Math.random()

  furylevelContainerStyle.transform = `translate(${x}px, ${y}px)`
  furyElStyle.transform = `scale(${furylevel}, 1)`

  return furylevel
}

export const show = (toShow) => {
  isActive = toShow

  if (toShow) {
    furylevelContainer.classList.add('animating', 'shown')
    setTimeout(function () {
      furylevelContainer.classList.remove('animating')
    }, 400)
  } else {
    furylevelContainer.classList.add('animating')
    furylevelContainer.classList.remove('shown')
  }
}

export const furyMeter = {
  update,
  show 
}