import Phaser from 'phaser'
import { Skin } from '../../assets/graphics'
import { WORLD } from '../../config/common'
import { EventsScene } from '../../services/EventsService'

const { MOVE_FRAMES, SPEED } = WORLD.PLAYER
const PLAYER_X = 50

enum PlayerAnims {
  fly = 'fly',
}

export class Player extends Phaser.Physics.Arcade.Sprite {
  private _scene: Phaser.Scene
  private moveFrames = 0

  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0, Skin.bird)

    this._scene = scene

    this.setX(PLAYER_X)
    this.setY(this._scene.game.canvas.height / 2)
    this.setAngle(0)

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setCollideWorldBounds(true)
    this.setGravityY(WORLD.GRAVITY)

    scene.events.on(EventsScene.UPDATE, this.update, this)
  }

  stopPlayer() {
    this.setGravityY(0)
  }

  fly() {
    if (this.moveFrames > 0) return

    this.setVelocityY(-SPEED)
    this.setAngle(-50)
    this.moveFrames = MOVE_FRAMES
  }

  update() {
    if (!this.body?.gravity?.y) return

    if (this.moveFrames > 0) this.moveFrames--
    const angle = this.angle
    if (angle < 90) this.setAngle(angle + 1)
  }

  createAnims() {
    this._scene.anims.create({
      key: PlayerAnims.fly,
      frames: this._scene.anims.generateFrameNumbers(Skin.bird, {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    })
    return this
  }

  animate() {
    this.anims.play(PlayerAnims.fly)
    return this
  }

  static init(scene: Phaser.Scene) {
    return new this(scene)
  }
}
