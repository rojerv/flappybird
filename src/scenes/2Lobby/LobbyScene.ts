import Phaser from 'phaser'
import { Scene } from '../index'
import { Ground } from '../../objects/buildings/Ground'
import { City } from '../../objects/buildings/City'

import { Skin } from '../../assets/graphics'
import { WORLD } from '../../config/common'
const { WIDTH } = WORLD

export class LobbyScene extends Phaser.Scene {
  constructor() {
    super({ key: Scene.LOBBY })
  }

  create() {
    City.init(this).subscribe(this.startGame)
    Ground.init(this)
    this.add.image(WIDTH / 2, 160, Skin.intro)
  }
  startGame() {
    this.scene.start(Scene.GAME)
  }
}
