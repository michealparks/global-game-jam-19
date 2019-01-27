const furyElStyle = document.getElementById('furylevel').style

const dec = 0.001
const inc = 0.0025

let furylevel = 1.0

export function furyLevel_update (punches) {
  furylevel -= dec
  furylevel += (inc * punches)

  if (furylevel > 1.0) {
    furylevel = 1.0
  }

  const r1 = Math.random()
  const r2 = Math.random()

  const x = (((1 - furylevel) * 10)) * Math.random()
  const y = (((1 - furylevel) * 10)) * Math.random()

  furyElStyle.transform = `scale(${furylevel}, 1) translate(${x}px, ${y}px)`

  return furylevel
}
