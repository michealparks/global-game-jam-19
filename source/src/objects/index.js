import {m4_identity, m4_identityFrom, m4_translate, m4_rotate, m4_scale} from '../utils/m4.js'

export function updateMatrix (object) {
  const m = object.matrix
  const t = object.translation
  const r = object.rotation
  const s = object.scale

  m4_identityFrom(object.matrix)
  m4_translate(m, t.x, t.y, t.z)

  if (r.x !== 0.0) m4_rotate(m, r.x, 1, 0, 0)
  if (r.y !== 0.0) m4_rotate(m, r.y, 0, 1, 0)
  if (r.z !== 0.0) m4_rotate(m, r.z, 0, 0, 1)

  m4_scale(m, s.x, s.y, s.z)
}

export function updatePhysics (object) {
  const t = object.translation, v = object.velocity
  t.x += v.x
  t.y += v.y
  t.z += v.z

  const r = object.rotation, av = object.angularVelocity
  r.x += av.x
  r.y += av.y
  r.z += av.z

  const s = object.scale, sv = object.scaleVelocity
  s.x += sv.x
  s.y += sv.y
  s.z += sv.z
}

let id = -1

export function object () {
  return {
    id: ++id,
    static: true,
    physics: false,
    collision: false,

    box: {w: 0.0, d: 0.0, h: 0.0},
    translation: {x: 0.0, y: 0.0, z: 0.0},
    rotation: {x: 0.0, y: 0.0, z: 0.0},
    scale: {x: 1.0, y: 1.0, z: 1.0},
    velocity: {x: 0.0, y: 0.0, z: 0.0},
    angularVelocity: {x: 0.0, y: 0.0, z: 0.0},
    scaleVelocity: {x: 0.0, y: 0.0, z: 0.0},

    matrix: m4_identity(),
  }
}
