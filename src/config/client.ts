import Phaser from "phaser";

import { BootScene, LobbyScene, GameScene } from "../scenes";
import { WORLD } from "../config/common";

/**
 * Pathes
 */

export const path = {
  assets: {
    graphics: "/flappybird/img",
  },
};

/**
 * Depth levels
 */

export enum Depth {
  CITY = -10,
  GROUND = 1,
  POINTS = 10,
  GAME_OVER = 11,
}

/**
 * client config for Phaser
 */

const clientConfig: Phaser.Types.Core.GameConfig = {
  width: WORLD.WIDTH,
  height: WORLD.HEIGHT,
  type: Phaser.AUTO,
  parent: "game",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [BootScene, LobbyScene, GameScene],
  title: "Flappy Bird",
  version: "1.0.0",
};

export default clientConfig;
