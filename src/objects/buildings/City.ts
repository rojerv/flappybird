import Phaser from 'phaser'
import { Skin } from '../../assets/graphics'
import { WORLD } from '../../config/common'
import { EventsClick } from '../../services/EventsService'
import { Depth } from '../../config/client'

/**
 * City Background
 * clickable for bird fly
 */

export class City extends Phaser.GameObjects.Image {
  private _scene: Phaser.Scene

  constructor(scene: Phaser.Scene) {
    super(scene, WORLD.WIDTH / 2, WORLD.HEIGHT / 2, Skin.bg)
    this._scene = scene
    scene.add.existing(this)
    this.setDepth(Depth.CITY)
    this.setInteractive()
  }

  subscribe(handler: () => void) {
    this.on(EventsClick.CLICK_CITY, handler, this._scene)
  }

  static init(scene: Phaser.Scene) {
    return new this(scene)
  }
}
