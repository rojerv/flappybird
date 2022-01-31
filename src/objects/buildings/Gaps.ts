import Phaser from 'phaser'
import { WORLD } from '../../config/common'
import { EventsService, EventsGame } from '../../services/EventsService'

const { PIPE_WIDTH, SPEED } = WORLD.PIPES

type Line = Phaser.GameObjects.Line

/**
 * Gaps for get points on collide
 */

export class Gaps extends Phaser.Physics.Arcade.Group {
  _scene: Phaser.Scene

  constructor(scene: Phaser.Scene) {
    super(scene.physics.world, scene)
    this._scene = scene
    this.subscribe()
  }
  subscribe() {
    EventsService.on(EventsGame.ADD_PIPES, this.addGap.bind(this))
  }

  addGap(x: number) {
    const lineX = x + PIPE_WIDTH / 2 // add pipe margin
    const lineY = WORLD.HEIGHT / 2
    const gap: Line = this._scene.add.line(lineX, lineY, 0, 0, 0, WORLD.HEIGHT)

    this.add(gap)
    this.setVelocityX(-SPEED)
    return gap
  }
}
