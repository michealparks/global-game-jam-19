import { texture } from '../engine/texture'
import { initVao } from '../engine/programs'
import { object, updateMatrix } from './index'

const template = new Float32Array([
  -1, +1, // 0 lb    2---3
  +1, +1, // 1 rb    |   |
  -1, -1, // 2 lt    |   |
  +1, -1, // 3 rt    0---1
])

const indices = new Uint16Array([3, 2, 0, 3, 0, 1])

export const sprite = (
  filename,
  width,
  height,
  frames = 1,
  animations,
  tex
) => {
  const halfWidth = width / 2.0
  const halfHeight = height / 2.0
  const positions = new Float32Array(template)
  const vaos = []

  for (let i = 0; i < positions.length; i+= 2) {
    positions[i + 0] *= halfWidth
    positions[i + 1] *= halfHeight
  }

  const tw = tex.width
  const th = tex.height
  const w = tex.frameWidth / tw
  const h = tex.frameHeight / th
  const nHoriz = tw / tex.frameWidth

  

  for (let x = 0.0, y = 0.0, i = 0; i < frames; i++) {
    x = (i * w) % nHoriz
    y = ((i / nHoriz) | 0) * h 

    const data = new Float32Array([
      x + 0 + 0.001, y + 0 + 0.001,
      x + w - 0.001, y + 0 + 0.001,
      x + 0 + 0.001, y + h - 0.001,
      x + w - 0.001, y + h - 0.001
    ])

    vaos.push(initVao('sprite', indices, [
      {
        name: 'aVertexPosition',
        data: positions,
        size: 2,
      }, {
        name: 'aTexturePosition',
        data: data,
        size: 2
      }
    ]))
  }

  const sprite = {
    ...object(),

    // Sprite props
    animations,

    sprite: true,
    animating: false,
    currentAnimation: animations !== undefined
      ? animations.idle
      : undefined,
    vaos,
    vao: vaos[0],
    numIndices: indices.length,
    textureId: texture.load(`./sprites/sheets/${filename}.png`),
    step: 0,
    lastStepTime: 0.0,
  }

  sprite.box.w = width
  sprite.box.h = height
  sprite.box.d = 1

  sprite.translation.y = halfHeight

  updateMatrix(sprite)

  return sprite
}

export function setAnimation (sprite, name) {
  sprite.currentAnimation = sprite.animations[name]
  sprite.step = sprite.currentAnimation.start
  sprite.vao = sprite.vaos[sprite.step]
}

export function updateSprite (sprite, elapsedMS) {
  const anim = sprite.currentAnimation

  if (anim === undefined) {
    return
  }

  sprite.lastStepTime += elapsedMS

  if (sprite.lastStepTime <= anim.speed) {
    return
  }

  if (sprite.step === anim.start && sprite.animating === false) {
    return
  }

  sprite.lastStepTime = 0

  if (sprite.animating === false || sprite.step === anim.end) {
    if (anim.fillMode === 'forwards') return
    sprite.step = anim.start
  } else {
    sprite.step += 1
  }

  sprite.vao = sprite.vaos[sprite.step]
}
