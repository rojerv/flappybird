import Phaser from 'phaser'
import { Skin } from '../../assets/graphics'
import { WORLD } from '../../config/common'
import { Depth } from '../../config/client'

enum GroundAnims {
  move = 'move',
}

/**
 * Ground
 */

export class Ground extends Phaser.Physics.Arcade.Sprite {
  private _scene: Phaser.Scene

  constructor(scene: Phaser.Scene) {
    super(scene, WORLD.WIDTH / 2, WORLD.HEIGHT, Skin.ground)

    this._scene = scene

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setDepth(Depth.GROUND)
    this.setCollideWorldBounds(true)
  }

  createAnims() {
    this._scene.anims.create({
      key: GroundAnims.move,
      frames: this._scene.anims.generateFrameNumbers(Skin.ground, {
        start: 0,
        end: 2,
      }),
      frameRate: 15,
      repeat: -1,
    })
    return this
  }

  animate() {
    this.anims.play(GroundAnims.move)
    return this
  }

  static init(scene: Phaser.Scene) {
    return new this(scene)
  }
}
