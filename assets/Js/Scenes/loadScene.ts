import { CST } from '../CST';

export class LoadScene extends Phaser.Scene {
    constructor() {
        super({key: CST.SCENES.LOAD})
    }
    loadImages() {
        this.load.setPath('./assets/Sprites/bg');       
        for (const prop in CST.SPRITES.BG.MENU_BG) {
            //@ts-ignore
            this.load.image(CST.SPRITES.BG.MENU_BG[prop], CST.SPRITES.BG.MENU_BG[prop]);
        }
        this.load.setPath('./assets/Sprites/world');
        for (const prop in CST.SPRITES.WORLD) {
            //@ts-ignore
            this.load.image(CST.SPRITES.WORLD[prop], CST.SPRITES.WORLD[prop])
        }
        this.load.setPath('./assets/Sprites/misc');
        for (const prop in CST.SPRITES.MISC) {
            //@ts-ignore
            this.load.image(CST.SPRITES.MISC[prop], CST.SPRITES.MISC[prop])
        }
    }

    loadLevels() {
        this.load.setPath('./assets/Levels');
        for (const prop in CST.LEVELS) {
            //@ts-ignore
            this.load.tilemapTiledJSON(CST.LEVELS[prop], CST.LEVELS[prop])
        }
    }

    loadSpritesheets() {
        this.load.spritesheet(CST.SPRITES.PLAYER.PLAYER, 'assets/Sprites/player/Player.png', {frameHeight: 32, frameWidth: 32})
        this.load.spritesheet(CST.SPRITES.GAME.ENEMIES.TANK, 'assets/Sprites/enemies/Enemy.png', {frameHeight: 32, frameWidth: 32})
        this.load.spritesheet(CST.SPRITES.EFFECTS.EXPLOSION, 'assets/Sprites/effects/Explosion.png', {frameHeight: 32, frameWidth: 32})
        this.load.spritesheet(CST.SPRITES.GAME.FACTORY, 'assets/Sprites/world/factoryEnemy.png', {frameHeight: 32, frameWidth: 32})
        this.load.spritesheet(CST.SPRITES.UI.START, 'assets/Sprites/ui/Start.png', {frameHeight: 28, frameWidth: 124})
        this.load.spritesheet(CST.SPRITES.UI.PLAYER, 'assets/Sprites/ui/2playerIcon.png', {frameHeight: 34, frameWidth: 34})
    }

    loadAudio() {
        this.load.setPath('./assets/Sounds/fx');
        for (const prop in CST.SOUNDS.FX) {
            //@ts-ignore
            this.load.audio(CST.SOUNDS.FX[prop], CST.SOUNDS.FX[prop])  
        }
    }

    preload() { 
        this.loadSpritesheets(); 
        this.loadImages();
        this.loadLevels();
        this.loadAudio();
        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0x32cd32
            }
        })
        this.load.on("progress", (percent) => {
            loadingBar.fillRect(0, this.game.renderer.height/2, this.game.renderer.width * percent, 80)
        })
    }

    create(){
        this.anims.create({
            key: 'move-enemy',
            frames: this.anims.generateFrameNumbers(CST.SPRITES.GAME.ENEMIES.TANK, {
                start: 0,
                end: 2
            }),
            frameRate: 15,
            repeat: -1
        })
        this.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNumbers(CST.SPRITES.PLAYER.PLAYER, {
                start: 0,
                end: 2
            }),
            frameRate: 15,
        })
        this.anims.create({
            key: 'explo',
            frames: this.anims.generateFrameNumbers(CST.SPRITES.EFFECTS.EXPLOSION, {
                start: 0,
                end: 6
            }),
            frameRate: 15,
        })
        this.scene.start(CST.SCENES.MENU);
    }
}