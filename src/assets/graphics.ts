/**
 * Skin Names
 */
export enum Skin {
  bg = 'bg',
  bird = 'bird',
  ground = 'ground',
  pipeBottom = 'pipeBottom',
  pipeTop = 'pipeTop',
  gameOver = 'gameOver',
  intro = 'intro',
}

/**
 * Interface for all Skin names
 */

type SkinsInterface = {
  [key in Skin]: string
}

/**
 * All available skins
 */

export const Skins: SkinsInterface = {
  [Skin.bg]: 'background-day.png',
  [Skin.bird]: 'bird-yellow-sprite.png',
  [Skin.ground]: 'ground-sprite.png',
  [Skin.pipeTop]: 'pipe-green-top.png',
  [Skin.pipeBottom]: 'pipe-green-bottom.png',
  [Skin.gameOver]: 'gameover.png',
  [Skin.intro]: 'message-initial.png',
}
