
export const INPUT = {
  up: 'w',
  left: 'a',
  down: 's',
  right: 'd',
  punch: ' '
}

export const inputs = new Set()

window.addEventListener('keydown', (e) => {
  inputs.add(e.key.toLowerCase())
}, {passive: true})

window.addEventListener('keyup', (e) => {
  inputs.delete(e.key.toLowerCase())
}, {passive: true})

