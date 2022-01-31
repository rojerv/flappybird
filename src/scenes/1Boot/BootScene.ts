import Phaser from 'phaser'
import { path } from '../../config/client'
import { Skin, Skins } from '../../assets/graphics'
import { Scene } from '../index'

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: Scene.BOOT })
  }

  preload() {
    this.load.setBaseURL(path.assets.graphics)

    for (const skinKey of Object.keys(Skin)) {
      const skin = skinKey as Skin

      if (skin === Skin.bird) {
        this.load.spritesheet(skin, Skins[skin], {
          frameWidth: 34,
          frameHeight: 24,
        })
        continue
      }

      if (skin === Skin.ground) {
        this.load.spritesheet(skin, Skins[skin], {
          frameWidth: 336,
          frameHeight: 112,
        })
        continue
      }

      this.load.image(skin, Skins[skin])
    }
  }

  create() {
    this.scene.start(Scene.LOBBY)
  }
}
