import {gl} from '../engine/gl'
import {initVao} from '../engine/programs'
import {object} from './index'

const templates = {
  front: new Float32Array([
    -1, +1, 0, // 0 lb    2---3
    +1, +1, 0, // 1 rb    |   |
    -1, -1, 0, // 2 lt    |   |
    +1, -1, 0, // 3 rt    0---1
  ]),
  top: new Float32Array([
    -1, 0, -1, // 0 lb      0---1
    +1, 0, -1, // 1 rb     /   /
    -1, 0, +1, // 2 lf    2---3
    +1, 0, +1, // 3 rf
  ]),
  left: new Float32Array([
    0, +1, -1, // 0     1
    0, -1, -1, // 1    /|
    0, +1, +1, // 2   3 |
    0, -1, +1, // 3   | 0
               //     |/
               //     2
  ]),
  right: new Float32Array([
    0, +1, -1, // 0     1
    0, -1, -1, // 1    /|
    0, +1, +1, // 2   3 |
    0, -1, +1, // 3   | 0
               //     |/
               //     2
  ])
}

const indexes = {
  front: new Uint16Array([3, 2, 0, 3, 0, 1]),
  top:   new Uint16Array([2, 1, 3, 2, 0, 1]),
  left:  new Uint16Array([1, 3, 2, 1, 2, 0]),
  right: new Uint16Array([1, 2, 3, 1, 0, 2]),
}

export function quad_construct (type, size, color) {
  const half = size / 2.0

  const positions = new Float32Array(templates[type])
  for (let i = 0, l = positions.length; i < l; i++) {
    positions[i] *= half
  }

  const vao = initVao('primitive', indexes[type], [
    {
      name: 'aVertexPosition',
      data: positions,
      size: 3,
    }
  ])

  const quad = {
    ...object(),

    vao: vao,
    numIndices: indexes[type].length,
    color: [color[0] / 255, color[1] / 255, color[2] / 255]
  }

  quad.box.w = size
  quad.box.h = size
  quad.box.d = 1

  return quad
}
