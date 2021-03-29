export function randInt (range) {
  return Math.random() * range | 0
}

export function degToRad (d) {
  return d * Math.PI / 180
}

export function clamp (n, min, max) {
  return Math.min(max, Math.max(min, n))
}

export function distance2d (x1, y1, x2, y2) {
  return Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)))
}

export function transformVector(m4, v) {
  const dst = new Float32Array(4)

  for (let i = 0, j; i < 4; ++i) {
    dst[i] = 0.0
    for (j = 0; j < 4; ++j) {
      dst[i] += v[j] * m4[j * 4 + i]
    }
  }

  return dst
}
