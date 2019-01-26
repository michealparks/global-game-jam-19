const EPSILON = 0.000001

export function m4_identity () {
  const m = new Float32Array(16)

  m[0] = m[5] = m[10] = m[15] = 1.0

  return m
}

export function m4_identityFrom (m) {
  m[0] = m[5] = m[10] = m[15] = 1.0
  m[1] = m[2] = m[3] = m[4] = m[6] = m[7] = m[8] = m[9] = m[11] = m[12] = m[13] = m[14] = 0.0

  return m
}

export function m4_copy (a) {
  const m = new Float32Array(16)

  m[0] = a[0]; m[1] = a[1]; m[2] = a[2]; m[3] = a[3]
  m[4] = a[4]; m[5] = a[5]; m[6] = a[6]; m[7] = a[7]
  m[8] = a[8]; m[9] = a[9]; m[10] = a[10]; m[11] = a[11]
  m[12] = a[12]; m[13] = a[13]; m[14] = a[14]; m[15] = a[15]

  return m
}

export function m4_multiply (a, b, m) {
  const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3]
  const a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7]
  const a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11]
  const a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15]

  let b0 = 0.0, b1 = 0.0, b2 = 0.0, b3 = 0.0

  // Cache only the current line of the second matrix
  b0 = b[0]; b1 = b[1]; b2 = b[2]; b3 = b[3]
  m[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
  m[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
  m[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
  m[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33

  b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7]
  m[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
  m[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
  m[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
  m[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33

  b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11]
  m[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
  m[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
  m[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
  m[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33

  b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15]
  m[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30
  m[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31
  m[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32
  m[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33

  return m
}

export function m4_translate (m, x, y, z) {
  m[12] = m[0] * x + m[4] * y + m[8] * z + m[12]
  m[13] = m[1] * x + m[5] * y + m[9] * z + m[13]
  m[14] = m[2] * x + m[6] * y + m[10] * z + m[14]
  m[15] = m[3] * x + m[7] * y + m[11] * z + m[15]
}

export function m4_rotate (m, a, inx, iny, inz) {
  let l = Math.sqrt(inx * inx + iny * iny + inz * inz)

  if (l < EPSILON) {
    throw new Error('m4_rotate(): matrix length is zero')
  }

  l = 1.0 / l
  
  const x = inx * l
  const y = iny * l
  const z = inz * l

  const s = Math.sin(a)
  const c = Math.cos(a)
  const t = 1 - c

  const a00 = m[0], a01 = m[1], a02 = m[2], a03 = m[3]
  const a10 = m[4], a11 = m[5], a12 = m[6], a13 = m[7]
  const a20 = m[8], a21 = m[9], a22 = m[10], a23 = m[11]

  // construct the elements of the rotation matrix
  const b00 = x * x * t + c,     b01 =  y * x * t + z * s, b02 = z * x * t - y * s
  const b10 = x * y * t - z * s, b11 = y * y * t + c,      b12 = z * y * t + x * s
  const b20 = x * z * t + y * s, b21 = y * z * t - x * s,  b22 = z * z * t + c

  m[0] = a00 * b00 + a10 * b01 + a20 * b02
  m[1] = a01 * b00 + a11 * b01 + a21 * b02
  m[2] = a02 * b00 + a12 * b01 + a22 * b02
  m[3] = a03 * b00 + a13 * b01 + a23 * b02
  m[4] = a00 * b10 + a10 * b11 + a20 * b12
  m[5] = a01 * b10 + a11 * b11 + a21 * b12
  m[6] = a02 * b10 + a12 * b11 + a22 * b12
  m[7] = a03 * b10 + a13 * b11 + a23 * b12
  m[8] = a00 * b20 + a10 * b21 + a20 * b22
  m[9] = a01 * b20 + a11 * b21 + a21 * b22
  m[10] = a02 * b20 + a12 * b21 + a22 * b22
  m[11] = a03 * b20 + a13 * b21 + a23 * b22
}

export function m4_scale (m, x, y, z) {
  m[0] *= x; m[1] *= x; m[2] *= x; m[3] *= x
  m[4] *= y; m[5] *= y; m[6] *= y; m[7] *= y
  m[8] *= z; m[9] *= z; m[10] *= z; m[11] *= z
}

export function m4_inverse (a, m) {
  const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3]
  const a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7]
  const a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11]
  const a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15]

  const b00 = a00 * a11 - a01 * a10;
  const b01 = a00 * a12 - a02 * a10;
  const b02 = a00 * a13 - a03 * a10;
  const b03 = a01 * a12 - a02 * a11;
  const b04 = a01 * a13 - a03 * a11;
  const b05 = a02 * a13 - a03 * a12;
  const b06 = a20 * a31 - a21 * a30;
  const b07 = a20 * a32 - a22 * a30;
  const b08 = a20 * a33 - a23 * a30;
  const b09 = a21 * a32 - a22 * a31;
  const b10 = a21 * a33 - a23 * a31;
  const b11 = a22 * a33 - a23 * a32;

  // Calculate the determinant
  const det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    if (__dev__) console.error('matrix inverse does not exist')
    return null
  }
  
  const d = 1.0 / det

  m[0] = (a11 * b11 - a12 * b10 + a13 * b09) * d
  m[1] = (a02 * b10 - a01 * b11 - a03 * b09) * d
  m[2] = (a31 * b05 - a32 * b04 + a33 * b03) * d
  m[3] = (a22 * b04 - a21 * b05 - a23 * b03) * d
  m[4] = (a12 * b08 - a10 * b11 - a13 * b07) * d
  m[5] = (a00 * b11 - a02 * b08 + a03 * b07) * d
  m[6] = (a32 * b02 - a30 * b05 - a33 * b01) * d
  m[7] = (a20 * b05 - a22 * b02 + a23 * b01) * d
  m[8] = (a10 * b10 - a11 * b08 + a13 * b06) * d
  m[9] = (a01 * b08 - a00 * b10 - a03 * b06) * d
  m[10] = (a30 * b04 - a31 * b02 + a33 * b00) * d
  m[11] = (a21 * b02 - a20 * b04 - a23 * b00) * d
  m[12] = (a11 * b07 - a10 * b09 - a12 * b06) * d
  m[13] = (a00 * b09 - a01 * b07 + a02 * b06) * d
  m[14] = (a31 * b01 - a30 * b03 - a32 * b00) * d
  m[15] = (a20 * b03 - a21 * b01 + a22 * b00) * d

  return m
}

export function m4_transpose (m) {
  const a01 = a[1], a02 = a[2], a03 = a[3]
  const a12 = a[6], a13 = a[7]
  const a23 = a[11]

  m[1] = a[4]
  m[2] = a[8]
  m[3] = a[12]
  m[4] = a01
  m[6] = a[9]
  m[7] = a[13]
  m[8] = a02
  m[9] = a12
  m[11] = a[14]
  m[12] = a03
  m[13] = a13
  m[14] = a23
}

export function m4_perspective (fovy, aspect, near, far) {
  const m = new Float32Array(16)
  const f = 1.0 / Math.tan(fovy / 2)
  const nf = 1.0 / (near - far)

  m[0] = f / aspect
  m[5] = f
  m[10] = (far + near) * nf
  m[11] = -1
  m[14] = (2 * far * near) * nf

  return m
}

