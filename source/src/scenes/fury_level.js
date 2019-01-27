const furylevelContainerStyle = document.getElementById('furylevel-container').style
const furyElStyle = document.getElementById('furylevel').style

const dec = 0.001
const inc = 0.0025

let furylevel = 1.0

export function furyLevel_update (punches) {
  let mult = punches === 0
    ? 0
    : punches === 2
    ? 3
    : punches === 3
    ? 6
    : punches >= 4
    ? 9
    : 1

  furylevel -= dec
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
