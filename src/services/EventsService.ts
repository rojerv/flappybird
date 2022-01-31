// https://blog.ourcade.co/posts/2020/phaser3-how-to-communicate-between-scenes/

import Phaser from 'phaser'

export const EventsService = new Phaser.Events.EventEmitter()

export enum EventsScene {
  UPDATE = 'update',
}

export enum EventsGame {
  ADD_PIPES = 'ADD_PIPES',
}

export enum EventsClick {
  CLICK_CITY = 'pointerdown',
}
