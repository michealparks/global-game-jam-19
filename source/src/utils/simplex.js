const F2 = 0.5 * (Math.sqrt(3.0) - 1.0)
const G2 = (3.0 - Math.sqrt(3.0)) / 6.0
const F3 = 1.0 / 3.0
const G3 = 1.0 / 6.0
const F4 = (Math.sqrt(5.0) - 1.0) / 4.0
const G4 = (5.0 - Math.sqrt(5.0)) / 20.0

const grad3 = new Float32Array([
  +1, +1, +0,
  -1, +1, +0,
  +1, -1, +0,

  -1, -1, +0,
  +1, +0, +1,
  -1, +0, +1,

  +1, +0, -1,
  -1, +0, -1,
  +0, +1, +1,

  +0, -1, +1,
  +0, +1, -1,
  +0, -1, -1
])

export class SimplexNoise {
  constructor () {
    const p = new Uint8Array(256)

    for (let i = 0; i < 256; i++) {
      p[i] = i
    }

    for (let i = 0; i < 256; i++) {
      const r = i + ~~(Math.random() * (256 - i))
      const aux = p[i]
      p[i] = p[r]
      p[r] = aux
    }

    this.perm = new Uint8Array(512)
    this.permMod12 = new Uint8Array(512)

    for (let i = 0; i < 512; i++) {
      this.perm[i] = p[i & 255]
      this.permMod12[i] = this.perm[i] % 12
    }
  }

  noise2D (x, y) {
    const permMod12 = this.permMod12
    const perm = this.perm
    
    let n0 = 0 // Noise contributions from the three corners
    let n1 = 0
    let n2 = 0
    
    // Skew the input space to determine which simplex cell we're in
    const s = (x + y) * F2 // Hairy factor for 2D
    const i = (x + s) | 0
    const j = (y + s) | 0
    const t = (i + j) * G2
    const X0 = i - t // Unskew the cell origin back to (x,y) space
    const Y0 = j - t
    const x0 = x - X0 // The x,y distances from the cell origin
    const y0 = y - Y0
    
    // For the 2D case, the simplex shape is an equilateral triangle.
    // Determine which simplex we are in.
    let i1, j1 // Offsets for second (middle) corner of simplex in (i,j) coords
    
    if (x0 > y0) {
      i1 = 1
      j1 = 0
    // lower triangle, XY order: (0,0)->(1,0)->(1,1)
    } else {
      i1 = 0
      j1 = 1
    } // upper triangle, YX order: (0,0)->(0,1)->(1,1)

    // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
    // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
    // c = (3-sqrt(3))/6
    const x1 = x0 - i1 + G2 // Offsets for middle corner in (x,y) unskewed coords
    const y1 = y0 - j1 + G2
    const x2 = x0 - 1.0 + 2.0 * G2 // Offsets for last corner in (x,y) unskewed coords
    const y2 = y0 - 1.0 + 2.0 * G2

    // Work out the hashed gradient indices of the three simplex corners
    const ii = i & 255
    const jj = j & 255

    // Calculate the contribution from the three corners
    let t0 = 0.5 - x0 * x0 - y0 * y0
    
    if (t0 >= 0) {
      const gi0 = permMod12[ii + perm[jj]] * 3
      t0 *= t0
      n0 = t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0) // (x,y) of grad3 used for 2D gradient
    }

    let t1 = 0.5 - x1 * x1 - y1 * y1
    
    if (t1 >= 0) {
      const gi1 = permMod12[ii + i1 + perm[jj + j1]] * 3
      t1 *= t1
      n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1)
    }
    
    let t2 = 0.5 - x2 * x2 - y2 * y2
    
    if (t2 >= 0) {
      const gi2 = permMod12[ii + 1 + perm[jj + 1]] * 3
      t2 *= t2
      n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2)
    }
    
    // Add contributions from each corner to get the final noise value.
    // The result is scaled to return values in the interval [-1,1].
    return 70.0 * (n0 + n1 + n2)
  }
}
