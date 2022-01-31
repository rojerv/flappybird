import Phaser from 'phaser'
import { Skin } from '../../assets/graphics'
import { WORLD } from '../../config/common'
import { EventsService, EventsGame, EventsScene } from '../../services/EventsService'

const { MARGIN, PIPE_HEIGHT, SPEED, STEP, BETWEEN } = WORLD.PIPES

const COUNT_PIPES = 3

type Image = Phaser.Physics.Arcade.Image

export class Pipes extends Phaser.Physics.Arcade.Group {
  _scene: Phaser.Scene

  constructor(scene: Phaser.Scene) {
    super(scene.physics.world, scene)

    this._scene = scene
    scene.events.on(EventsScene.UPDATE, this.update, this)
  }

  stopPipes() {
    this.setVelocityX(0)
  }

  generatePipes() {
    let i = 0
    const startGenerate = WORLD.WIDTH

    while (i < COUNT_PIPES) {
      const x = startGenerate + ++i * STEP
      const y = Phaser.Math.Between(BETWEEN[0], BETWEEN[1])

      this.addPipes(x, y)
    }
    return this
  }
  addPipes(x: number, y: number) {
    const pipeTop = this.addPipe(x, y, 'top')
    const pipeBottom = this.addPipe(x, y + MARGIN + PIPE_HEIGHT, 'bottom')
    this.setVelocityX(-SPEED)
    EventsService.emit(EventsGame.ADD_PIPES, x, y)
    return [pipeTop, pipeBottom]
  }
  addPipe(x: number, y: number, type: 'top' | 'bottom') {
    const skin = type === 'top' ? Skin.pipeTop : Skin.pipeBottom
    const pipe: Image = this.create(x, y, skin)
    pipe.setPushable(false)
    return pipe
  }
  update() {
    const pipe: Image = this.getChildren()[0] as Image
    const pipe2: Image = this.getChildren()[1] as Image

    if (!pipe || pipe.x > -100) return

    pipe.destroy()
    pipe2.destroy()

    const lastPipe: Image = this.getLast(true)

    const x = lastPipe.x + STEP
    const y = Phaser.Math.Between(BETWEEN[0], BETWEEN[1])

    this.addPipes(x, y)
  }
}
