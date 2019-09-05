import {
  CST
} from '../CST';
import {
  start
} from 'repl';
import {
  Input
} from 'phaser';

export class MenuScene extends Phaser.Scene {

  explosion!: Phaser.Sound.WebAudioSound;

  constructor() {
    super({
      key: CST.SCENES.MENU
    })
  }

  init() {}

  create() {
    this.sound.stopAll();
    const explosion = this.sound.add(CST.SOUNDS.FX.EXPLOSION);
    let isSecondPlayer = false;
    let image = this.add.image(0, 0, CST.SPRITES.BG.MENU_BG.BG).setOrigin(0).setDepth(0);
    image.displayHeight = 640;
    image.displayWidth = 800;
    let startButton: Phaser.GameObjects.Image = this.add.image(319, 453, CST.SPRITES.UI.START, 0);
    startButton.setDepth(1);
    startButton.setInteractive();
    startButton.on('pointerover', () => {
      startButton.setTexture(CST.SPRITES.UI.START, 1);
    });
    startButton.on('pointerout', () => {
      startButton.setTexture(CST.SPRITES.UI.START, 0);
    });
    startButton.on('pointerdown', () => {
      startButton.setTexture(CST.SPRITES.UI.START, 2);
      startButton.removeInteractive();
      explosion.play();
      this.time.addEvent({
        delay: 2000,
        callback: () => {
          this.scene.start(CST.SCENES.TESTLEVEL, {
            level: 0
          });
        }
      })
    })
    let secondPlayerIcon = this.add.image(346, 492, CST.SPRITES.UI.PLAYER, 0);
    secondPlayerIcon.setInteractive();
    secondPlayerIcon.on('pointerdown', () => {
      if (!isSecondPlayer) {
        secondPlayerIcon.setTexture(CST.SPRITES.UI.PLAYER, 1);
        isSecondPlayer = true;
      } else if (isSecondPlayer) {
        secondPlayerIcon.setTexture(CST.SPRITES.UI.PLAYER, 0);
        isSecondPlayer = false;
      }
    })
  }
}