/**
  @type {import("../typings/phaser")}
 */

// var game = new Phaser.Game(1920, 1600, Phaser.AUTO, 'gameWindow')
import { LoadScene } from "./Scenes/loadScene";
import { MenuScene } from "./Scenes/menuScene";
import { PlayScene } from "./Scenes/playScene";

let game = new Phaser.Game({
    width: 800,
    height: 640,
    scene:[
        LoadScene,
        MenuScene,
        PlayScene
    ],
    render: {
        pixelArt: true
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    }
})


