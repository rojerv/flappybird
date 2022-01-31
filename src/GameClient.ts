import clientConfig from './config/client'

export class GameClient {
  game?: Phaser.Game

  /**
   *  Start Game
   * @param containerId html div ID
   */
  start(containerId: string) {
    const config = clientConfig
    config.parent = containerId

    this.game = new Phaser.Game(config)
  }
}
