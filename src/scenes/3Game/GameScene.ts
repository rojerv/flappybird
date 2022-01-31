import Phaser from 'phaser'
import { Scene } from '../index'
import { Player } from '../../objects/characters/Player'
import { Ground } from '../../objects/buildings/Ground'
import { City } from '../../objects/buildings/City'
import { Pipes } from '../../objects/buildings/Pipes'
import { Gaps } from '../../objects/buildings/Gaps'
import { Skin } from '../../assets/graphics'
import { WORLD } from '../../config/common'
import { Depth } from '../../config/client'
const { HEIGHT, WIDTH } = WORLD

type GameObject = Phaser.GameObjects.GameObject

export class GameScene extends Phaser.Scene {
  private player!: Player
  private ground!: Ground
  private pipes!: Pipes
  private gaps!: Gaps
  private points = 0
  private pointsText!: Phaser.GameObjects.Text
  private gameOver!: Phaser.GameObjects.Image

  constructor() {
    super({ key: Scene.GAME })
  }

  create() {
    // objects
    this.player = Player.init(this).createAnims().animate()
    this.ground = Ground.init(this).createAnims().animate()
    this.pipes = new Pipes(this)
    this.gaps = new Gaps(this)

    // info
    this.pointsText = this.add.text(16, 16, '0', { fontSize: '32px' })
    this.pointsText.setDepth(Depth.POINTS)

    this.gameOver = this.add.image(WIDTH / 2, HEIGHT / 2, Skin.gameOver)
    this.gameOver.setVisible(false)
    this.gameOver.setDepth(Depth.GAME_OVER)

    // handlers
    City.init(this).subscribe(this.clickOnGame)

    this.physics.add.collider(this.player, this.ground, this.hit, undefined, this)
    this.physics.add.collider(this.player, this.pipes, this.hit, undefined, this)
    this.physics.add.overlap(this.player, this.gaps, this.getPoint, undefined, this)

    // init game
    this.pipes.generatePipes()
  }

  clickOnGame() {
    const gameOver = this.gameOver.visible

    if (!gameOver) this.player.fly()
    else this.scene.start(Scene.LOBBY)
  }

  getPoint(player: GameObject, gap: GameObject) {
    gap.destroy()
    this.points++
    this.pointsText.setText(`${this.points}`)
  }

  hit() {
    this.physics.pause()

    this.gameOver.setVisible(true)
    this.pipes.stopPipes()
    this.player.stopPlayer()
  }
}
