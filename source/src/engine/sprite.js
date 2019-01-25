import {TextureLoader, SpriteMaterial, Sprite} from 'three'

const loader = new TextureLoader()

export function createSprite (filename, width, height) {
  const spriteMap = loader.load(`./sprites/${filename}.png`)
  const material = new SpriteMaterial({map: spriteMap, color: 0xffffff})
  const sprite = new Sprite(material)

  sprite.scale.set(width, height, 1)

  return sprite
}
