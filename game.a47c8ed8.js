// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"dist/assets/Js/CST.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CST = {
  SCENES: {
    LOAD: "LOAD_SCENE",
    MENU: "MENU_SCENE",
    TESTLEVEL: "PLAY_SCENE"
  },
  SPRITES: {
    UI: {
      PLAYER: "2playerIcon.png",
      START: "Start.png"
    },
    BG: {
      MENU_BG: {
        BG: "background.png"
      }
    },
    GAME: {
      ENEMIES: {
        TANK: "Enemy.png"
      },
      FACTORY: "factoryEnemy.png"
    },
    WORLD: {
      CRAZY_TANK_TEXTURES: "CrazyTankTextures.png"
    },
    TILESETS: {
      CRAZY_TANK_TEXTURES: "CrazyTankTextures"
    },
    MISC: {
      BULLET: "Bullet.png",
      LIFE: "Life-icon.png"
    },
    PLAYER: {
      PLAYER: "Player.png"
    },
    EFFECTS: {
      EXPLOSION: "Explosion.png"
    }
  },
  LEVELS: {
    LEVEL0: "level0.json",
    LEVEL2: "level2.json",
    LEVEL3: "level3.json",
    LEVEL4: "level4.json",
    LEVEL5: "level5.json"
  },
  SOUNDS: {
    BGM: {},
    FX: {
      EXPLOSION: "explosion.wav",
      SHOOT: "shoot.wav",
      HIT: "hit.wav",
      TANK_IDLE: "tank-idle.wav",
      TANK_MOVE: "tank-move.wav"
    }
  }
};
},{}],"dist/assets/Js/Scenes/loadScene.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var CST_1 = require("../CST");

var LoadScene =
/** @class */
function (_super) {
  __extends(LoadScene, _super);

  function LoadScene() {
    return _super.call(this, {
      key: CST_1.CST.SCENES.LOAD
    }) || this;
  }

  LoadScene.prototype.loadImages = function () {
    this.load.setPath('./assets/Sprites/bg');

    for (var prop in CST_1.CST.SPRITES.BG.MENU_BG) {
      //@ts-ignore
      this.load.image(CST_1.CST.SPRITES.BG.MENU_BG[prop], CST_1.CST.SPRITES.BG.MENU_BG[prop]);
    }

    this.load.setPath('./assets/Sprites/world');

    for (var prop in CST_1.CST.SPRITES.WORLD) {
      //@ts-ignore
      this.load.image(CST_1.CST.SPRITES.WORLD[prop], CST_1.CST.SPRITES.WORLD[prop]);
    }

    this.load.setPath('./assets/Sprites/misc');

    for (var prop in CST_1.CST.SPRITES.MISC) {
      //@ts-ignore
      this.load.image(CST_1.CST.SPRITES.MISC[prop], CST_1.CST.SPRITES.MISC[prop]);
    }
  };

  LoadScene.prototype.loadLevels = function () {
    this.load.setPath('./assets/Levels');

    for (var prop in CST_1.CST.LEVELS) {
      //@ts-ignore
      this.load.tilemapTiledJSON(CST_1.CST.LEVELS[prop], CST_1.CST.LEVELS[prop]);
    }
  };

  LoadScene.prototype.loadSpritesheets = function () {
    this.load.spritesheet(CST_1.CST.SPRITES.PLAYER.PLAYER, 'assets/Sprites/player/Player.png', {
      frameHeight: 32,
      frameWidth: 32
    });
    this.load.spritesheet(CST_1.CST.SPRITES.GAME.ENEMIES.TANK, 'assets/Sprites/enemies/Enemy.png', {
      frameHeight: 32,
      frameWidth: 32
    });
    this.load.spritesheet(CST_1.CST.SPRITES.EFFECTS.EXPLOSION, 'assets/Sprites/effects/Explosion.png', {
      frameHeight: 32,
      frameWidth: 32
    });
    this.load.spritesheet(CST_1.CST.SPRITES.GAME.FACTORY, 'assets/Sprites/world/factoryEnemy.png', {
      frameHeight: 32,
      frameWidth: 32
    });
    this.load.spritesheet(CST_1.CST.SPRITES.UI.START, 'assets/Sprites/ui/Start.png', {
      frameHeight: 28,
      frameWidth: 124
    });
    this.load.spritesheet(CST_1.CST.SPRITES.UI.PLAYER, 'assets/Sprites/ui/2playerIcon.png', {
      frameHeight: 34,
      frameWidth: 34
    });
  };

  LoadScene.prototype.loadAudio = function () {
    this.load.setPath('./assets/Sounds/fx');

    for (var prop in CST_1.CST.SOUNDS.FX) {
      //@ts-ignore
      this.load.audio(CST_1.CST.SOUNDS.FX[prop], CST_1.CST.SOUNDS.FX[prop]);
    }
  };

  LoadScene.prototype.preload = function () {
    var _this = this;

    this.loadSpritesheets();
    this.loadImages();
    this.loadLevels();
    this.loadAudio();
    var loadingBar = this.add.graphics({
      fillStyle: {
        color: 0x32cd32
      }
    });
    this.load.on("progress", function (percent) {
      loadingBar.fillRect(0, _this.game.renderer.height / 2, _this.game.renderer.width * percent, 80);
    });
  };

  LoadScene.prototype.create = function () {
    this.anims.create({
      key: 'move-enemy',
      frames: this.anims.generateFrameNumbers(CST_1.CST.SPRITES.GAME.ENEMIES.TANK, {
        start: 0,
        end: 2
      }),
      frameRate: 15,
      repeat: -1
    });
    this.anims.create({
      key: 'move',
      frames: this.anims.generateFrameNumbers(CST_1.CST.SPRITES.PLAYER.PLAYER, {
        start: 0,
        end: 2
      }),
      frameRate: 15
    });
    this.anims.create({
      key: 'explo',
      frames: this.anims.generateFrameNumbers(CST_1.CST.SPRITES.EFFECTS.EXPLOSION, {
        start: 0,
        end: 6
      }),
      frameRate: 15
    });
    this.scene.start(CST_1.CST.SCENES.MENU);
  };

  return LoadScene;
}(Phaser.Scene);

exports.LoadScene = LoadScene;
},{"../CST":"dist/assets/Js/CST.ts"}],"dist/assets/Js/Scenes/menuScene.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var CST_1 = require("../CST");

var MenuScene =
/** @class */
function (_super) {
  __extends(MenuScene, _super);

  function MenuScene() {
    return _super.call(this, {
      key: CST_1.CST.SCENES.MENU
    }) || this;
  }

  MenuScene.prototype.init = function () {};

  MenuScene.prototype.create = function () {
    var _this = this;

    this.sound.stopAll();
    var explosion = this.sound.add(CST_1.CST.SOUNDS.FX.EXPLOSION);
    var isSecondPlayer = false;
    var image = this.add.image(0, 0, CST_1.CST.SPRITES.BG.MENU_BG.BG).setOrigin(0).setDepth(0);
    image.displayHeight = 640;
    image.displayWidth = 800;
    var startButton = this.add.image(319, 453, CST_1.CST.SPRITES.UI.START, 0);
    startButton.setDepth(1);
    startButton.setInteractive();
    startButton.on('pointerover', function () {
      startButton.setTexture(CST_1.CST.SPRITES.UI.START, 1);
    });
    startButton.on('pointerout', function () {
      startButton.setTexture(CST_1.CST.SPRITES.UI.START, 0);
    });
    startButton.on('pointerdown', function () {
      startButton.setTexture(CST_1.CST.SPRITES.UI.START, 2);
      startButton.removeInteractive();
      explosion.play();

      _this.time.addEvent({
        delay: 2000,
        callback: function callback() {
          _this.scene.start(CST_1.CST.SCENES.TESTLEVEL, {
            level: 0
          });
        }
      });
    });
    var secondPlayerIcon = this.add.image(346, 492, CST_1.CST.SPRITES.UI.PLAYER, 0);
    secondPlayerIcon.setInteractive();
    secondPlayerIcon.on('pointerdown', function () {
      if (!isSecondPlayer) {
        secondPlayerIcon.setTexture(CST_1.CST.SPRITES.UI.PLAYER, 1);
        isSecondPlayer = true;
      } else if (isSecondPlayer) {
        secondPlayerIcon.setTexture(CST_1.CST.SPRITES.UI.PLAYER, 0);
        isSecondPlayer = false;
      }
    });
  };

  return MenuScene;
}(Phaser.Scene);

exports.MenuScene = MenuScene;
},{"../CST":"dist/assets/Js/CST.ts"}],"dist/assets/Js/Scenes/playScene.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var CST_1 = require("../CST");

var PlayScene =
/** @class */
function (_super) {
  __extends(PlayScene, _super);

  function PlayScene() {
    return _super.call(this, {
      key: CST_1.CST.SCENES.TESTLEVEL
    }) || this;
  }

  PlayScene.prototype.init = function (data) {
    this.data.set('level', data.level);
  };

  PlayScene.prototype.create = function () {
    var _this = this;

    this.sound.stopAll();
    this.explosionSound = this.sound.add(CST_1.CST.SOUNDS.FX.EXPLOSION);
    this.hitSound = this.sound.add(CST_1.CST.SOUNDS.FX.HIT);
    this.shootSound = this.sound.add(CST_1.CST.SOUNDS.FX.SHOOT);
    this.tankIdleSound = this.sound.add(CST_1.CST.SOUNDS.FX.TANK_IDLE);
    this.tankMoveSound = this.sound.add(CST_1.CST.SOUNDS.FX.TANK_MOVE);
    this.min = 2000;
    this.max = 3000;
    this.maxEnemy = 0;
    this.factoryCounter = 0;
    this.minEnemy = 1;
    this.maxBullet = 3000;
    this.minBullet = 1500;
    this.counter = 0;
    this.aiCounter = 0;
    this.directions = ['00', '01', '10', '11'];
    this.enemySpawnArray = [];
    this.enemyBehaviors = ['aggressive', 'defensive', 'roam'];
    this.enemyAliveArray = [];
    this.mapKeyArray = [];
    this.playerLifes = 3;
    this.playerStartPosition = {
      x: 0,
      y: 0
    };

    for (var key in CST_1.CST.LEVELS) {
      this.mapKeyArray.push(CST_1.CST.LEVELS[key]);
    }

    var map = this.make.tilemap({
      key: this.mapKeyArray[this.data.get('level')]
    });
    var world = map.addTilesetImage(CST_1.CST.SPRITES.TILESETS.CRAZY_TANK_TEXTURES, CST_1.CST.SPRITES.WORLD.CRAZY_TANK_TEXTURES);
    this.floorLayer = map.createDynamicLayer("Floor", world, 0, 0);
    this.wallLayer = map.createDynamicLayer("Walls", world, 0, 0);
    this.grassLayer = map.createDynamicLayer("Grass", world, 0, 0);
    this.grassLayer.setDepth(3);
    this.factories = map.createDynamicLayer("Factories", world, 0, 0);
    this.eventsLayer = map.createDynamicLayer("Events", world, 0, 0);
    this.eventsLayer.setVisible(false);
    this.playerLifesGroup = this.add.group();
    this.playerLifesGroup.createMultiple({
      key: CST_1.CST.SPRITES.MISC.LIFE,
      repeat: this.playerLifes - 1
    });
    this.playerLifesGroup.getChildren().forEach(function (playerLife, index) {
      var widthHelper = 32 * index + 1;
      playerLife.setPosition(_this.game.canvas.width - 32 - widthHelper, _this.game.canvas.height - 32);
      playerLife.setOrigin(0);
      playerLife.setDepth(2);
      playerLife.setActive(true);
      playerLife.setVisible(true);
    });
    this.getTilesFromLayer(this.factories, function (factory) {
      _this.maxEnemy += 3;
      _this.factoryCounter += 1;

      _this.enemySpawnArray.push(_this.physics.add.group({
        defaultKey: CST_1.CST.SPRITES.GAME.ENEMIES.TANK,
        classType: Phaser.Physics.Arcade.Sprite
      }));
    });
    this.getTilesFromLayer(this.eventsLayer, function (event) {
      _this.playerStartPosition.x = event.pixelX;
      _this.playerStartPosition.y = event.pixelY;
    });
    this.wallLayer.setCollisionByProperty({
      collides: true
    });
    this.factories.setCollisionByProperty({
      collides: true
    });
    this.enemyBullets = this.physics.add.group({
      defaultKey: CST_1.CST.SPRITES.MISC.BULLET,
      maxSize: 20,
      classType: Phaser.Physics.Arcade.Sprite
    });
    this.enemySpawn1Counter = 10000;
    this.isExplosion = false;
    this.player = this.physics.add.sprite(this.playerStartPosition.x + 16, this.playerStartPosition.y + 16, CST_1.CST.SPRITES.PLAYER.PLAYER).setDepth(2).setData('direction', '10').setData('type', 'player').setData('immortal', false);
    this.isPlayerShooting = false;
    this.cursors = this.input.keyboard.createCursorKeys();
    this.playerBullets = this.physics.add.group({
      defaultKey: CST_1.CST.SPRITES.MISC.BULLET,
      maxSize: 3,
      classType: Phaser.Physics.Arcade.Sprite
    });
    this.enemySpawnArray.forEach(function (enemySpawn, index) {
      _this.physics.world.addCollider(enemySpawn, _this.player, function (player, enemy) {
        _this.changeEnemyDirection(enemy, _this.turnBack(enemy));

        if (!player.getData('immortal')) {
          _this.killPlayer(player);
        }
      });

      _this.physics.world.addCollider(enemySpawn, _this.wallLayer, function (enemy, wall) {
        _this.time.addEvent({
          delay: 100,
          callback: function callback() {
            _this.changeEnemyDirection(enemy, _this.changeDirectionAtCollision(enemy));
          }
        });
      });

      _this.physics.world.addCollider(_this.playerBullets, enemySpawn, function (bullet, enemy) {
        enemy.destroy();
        _this.explosion = _this.spawnExplosion(enemy.x, enemy.y, CST_1.CST.SPRITES.EFFECTS.EXPLOSION);
        _this.isExplosion = true;

        _this.enemyAliveArray.splice(-1, 1);

        bullet.setActive(false);
        bullet.destroy();
      });
    });
    this.physics.world.addCollider(this.player, this.wallLayer, function (player, wall) {});
    this.physics.world.addCollider(this.enemyBullets, this.wallLayer, function (bullet, wall) {
      _this.collisionBulletWall(bullet, wall);
    });
    this.physics.world.addCollider(this.enemyBullets, this.player, function (player, bullet) {
      bullet.setActive(false);
      bullet.destroy();

      if (!player.getData('immortal')) {
        _this.killPlayer(player);
      }
    });
    this.physics.world.addCollider(this.playerBullets, this.wallLayer, function (bullet, wall) {
      _this.collisionBulletWall(bullet, wall);
    });
    this.physics.world.addCollider(this.playerBullets, this.factories, function (bullet, factory) {
      bullet.setActive(false);
      bullet.destroy();
      factory.properties.life--;

      switch (factory.properties.life) {
        case 4:
        case 3:
        case 2:
        case 1:
          _this.factoryUpdate(factory, factory.properties.life);

          break;

        case 0:
          _this.factories.removeTileAt(factory.x, factory.y);

          _this.factoryCounter--;

          if (_this.factoryCounter === 0) {
            _this.enemySpawnArray.forEach(function (enemySpawn) {
              enemySpawn.getChildren().forEach(function (enemy) {
                _this.add.existing(enemy);

                enemy.setData('behavior', 'aggressive');
              });
            });
          }

          _this.explosion = _this.spawnExplosion(factory.pixelX + factory.width / 2, factory.pixelY + factory.height / 2, CST_1.CST.SPRITES.EFFECTS.EXPLOSION);

          _this.factories.putTileAt(Math.floor(Math.random() * (19 - 17 + 1) + 17), factory.x, factory.y).setFlip(Math.round(Math.random()), Math.round(Math.random()));

          break;

        default:
          break;
      }
    });
  };

  PlayScene.prototype.factoryUpdate = function (factory, caseNumber) {
    this.hitSound.play();
    this.factories.putTileAt(24 - caseNumber, factory.x, factory.y, true);
    this.factories.setCollisionByProperty({
      collides: true
    });
  };

  PlayScene.prototype.update = function (time, delta) {
    this.counter += delta;
    this.aiCounter += delta;
    this.enemySpawn1Counter += delta;
    this.stopPlayer();
    this.finishLevel();
    this.makeAiDecisions();
    this.onExplosion();

    if (this.cursors.up.isDown && this.player.active === true) {
      this.movePlayerTank({
        x: 0,
        y: -128
      }, '10', 0);
    }

    if (this.cursors.down.isDown && this.player.active === true) {
      this.movePlayerTank({
        x: 0,
        y: 128
      }, '11', 180);
    }

    if (this.cursors.right.isDown && this.player.active === true) {
      this.movePlayerTank({
        x: 128,
        y: 0
      }, '01', 90);
    }

    if (this.cursors.left.isDown && this.player.active === true) {
      this.movePlayerTank({
        x: -128,
        y: 0
      }, '00', -90);
    }

    if (this.input.keyboard.checkDown(this.cursors.space, 1000)) {
      this.shootBullet(this.player);
    }
  };

  PlayScene.prototype.getTilesFromLayer = function (layer, callback) {
    layer.forEachTile(callback, undefined, undefined, undefined, undefined, undefined, {
      isNotEmpty: true
    });
  };

  PlayScene.prototype.movePlayerTank = function (velocity, direction, angle) {
    this.player.setVelocity(velocity.x, velocity.y).setData('direction', direction).setAngle(angle).play('move', true);
    this.tankIdleSound.stop();
    this.tankMoveSound.play(undefined, {
      loop: true,
      volume: .3
    });
  };

  PlayScene.prototype.spawnExplosion = function (x, y, key) {
    this.explosionSound.play();
    this.isExplosion = true;
    return this.physics.add.sprite(x, y, key).play('explo');
  };

  PlayScene.prototype.killPlayer = function (player) {
    this.playerLifes--;
    this.explosion = this.spawnExplosion(player.x, player.y, CST_1.CST.SPRITES.EFFECTS.EXPLOSION);

    if (this.playerLifes !== 0) {
      this.playerLifesGroup.remove(this.playerLifesGroup.getChildren()[this.playerLifesGroup.getChildren().length - 1], true);
      player.setX(this.playerStartPosition.x + 16);
      player.setY(this.playerStartPosition.y + 16);
    } else if (this.playerLifes === 0) {
      this.scene.start(CST_1.CST.SCENES.MENU);
    }

    player.setData('immortal', true);
    this.time.addEvent({
      delay: 2000,
      callback: function callback() {
        player.setData('immortal', false);
      }
    });
  };

  PlayScene.prototype.shootBullet = function (shooter) {
    var bullet;

    if (shooter.getData('type') === 'enemy') {
      bullet = this.enemyBullets.get(shooter.x, shooter.y);
    } else if (shooter.getData('type') === 'player') {
      this.shootSound.play();
      bullet = this.playerBullets.get(shooter.x, shooter.y);
    }

    if (bullet) {
      bullet.setActive(true);
      bullet.setVisible(true);
      bullet.depth = 1;

      if (shooter.data.get('direction') === '00') {
        bullet.setVelocity(-160, 0);
        bullet.setAngle(0);
      } else if (shooter.data.get('direction') === '01') {
        bullet.setVelocity(160, 0);
        bullet.setAngle(180);
      } else if (shooter.data.get('direction') === '10') {
        bullet.setVelocity(0, -160);
        bullet.setAngle(90);
      } else if (shooter.data.get('direction') === '11') {
        bullet.setVelocity(0, 160);
        bullet.setAngle(-90);
      }
    }
  };

  PlayScene.prototype.aiShoot = function () {
    var _this = this;

    this.enemySpawnArray.forEach(function (enemySpawn) {
      enemySpawn.getChildren().forEach(function (enemy) {
        setTimeout(function () {
          _this.shootBullet(enemy);
        }, Math.round(Math.random() * (_this.maxBullet - _this.minBullet + 1) + _this.minBullet));
        _this.counter = 0;
      });
    });
  };

  PlayScene.prototype.makeAiDecision = function () {
    var _this = this;

    this.enemySpawnArray.forEach(function (enemySpawn) {
      enemySpawn.getChildren().forEach(function (enemy) {
        _this.randomAiDecision(enemy);
      });
    });
    this.aiCounter = 0;
  };

  PlayScene.prototype.spawnEnemy = function () {
    this.spawnEnemyAtLocation(this.getFactoriesCoordinates());
    this.enemySpawn1Counter = 0;
  };

  PlayScene.prototype.getFactoriesCoordinates = function () {
    var factoryCoordinates = [];
    this.factories.forEachTile(function (factory, index) {
      if (factory.canCollide === true) factoryCoordinates.push({
        x: factory.pixelX,
        y: factory.pixelY
      });
    }, undefined, undefined, undefined, undefined, undefined, {
      isNotEmpty: true
    });
    return factoryCoordinates;
  };

  PlayScene.prototype.randomAiDecision = function (enemy) {
    var _this = this;

    setTimeout(function () {
      _this.changeDirectionAtRandom(enemy);
    }, Math.round(Math.random() * (this.max - this.min - 1000 + 1) + this.min - 1000));
  };

  PlayScene.prototype.changeEnemyDirection = function (enemy, direction) {
    if (direction === '00') {
      enemy.setVelocity(-128, 0).setData('direction', '00').setAngle(-90);
    } else if (direction === '01') {
      enemy.setVelocity(128, 0).setData('direction', '01').setAngle(90);
    } else if (direction === '10') {
      enemy.setVelocity(0, -128).setData('direction', '10').setAngle(0);
    } else if (direction === '11') {
      enemy.setVelocity(0, 128).setData('direction', '11').setAngle(180);
    }
  };

  PlayScene.prototype.changeDirectionAtCollision = function (enemy) {
    var direction = enemy.getData('direction');

    if (direction === '00' || direction === '01') {
      direction = ['10', '11'][Math.round(Math.random() * 1 - 0)];
    } else if (direction === '10' || direction === '11') {
      direction = ['00', '01'][Math.round(Math.random() * 1 - 0)];
    }

    return direction;
  };

  PlayScene.prototype.turnBack = function (enemy) {
    var direction = enemy.getData('direction');

    if (direction === '00') {
      direction = '01';
    } else if (direction === '01') {
      direction = '00';
    } else if (direction === '10') {
      direction = '11';
    } else if (direction === '11') {
      direction = '10';
    }

    return direction;
  };

  PlayScene.prototype.changeDirectionAtRandom = function (enemy) {
    var enemyBehavior = enemy.getData('behavior');
    var direction;

    if (enemyBehavior === 'aggressive') {
      direction = this.decideOnDirection(this.player, enemy);
    } else if (enemyBehavior === 'defensive') {
      direction = this.decideOnDirection(this.getClosestTarget(enemy, this.getFactoriesCoordinates()), enemy);
    } else if (enemyBehavior === 'roam') {
      direction = this.directions[Math.round(Math.random() * (3 - 0) + 0)];
    }

    this.changeEnemyDirection(enemy, direction);
  };

  PlayScene.prototype.decideOnDirection = function (target, enemy) {
    var direction;

    if (target.x != enemy.x && target.y != enemy.y) {
      direction = this.primarySituations(target, enemy);
    }

    if (target.x !== enemy.x && target.y === enemy.y || target.x === enemy.x && target.y !== enemy.y) {
      direction = this.advancedSituations(target, enemy);
    }

    if (target.x === enemy.x && target.y === enemy.y) {
      direction = this.directions[Math.round(Math.random() * (3 - 0) + 0)];
    }

    return direction;
  };

  PlayScene.prototype.primarySituations = function (target, enemy) {
    var direction = null;

    if (target.x > enemy.x && target.y > enemy.y) {
      direction = ['01', '11'][Math.round(Math.random() * 1 - 0)];
    } else if (target.x < enemy.x && target.y < enemy.y) {
      direction = ['00', '10'][Math.round(Math.random() * 1 - 0)];
    } else if (target.x > enemy.x && target.y < enemy.y) {
      direction = ['01', '10'][Math.round(Math.random() * 1 - 0)];
    } else if (target.x < enemy.x && target.y > enemy.y) {
      direction = ['00', '11'][Math.round(Math.random() * 1 - 0)];
    }

    return direction;
  };

  PlayScene.prototype.advancedSituations = function (target, enemy) {
    var direction = null;

    if (target.x == enemy.x && target.y > enemy.y) {
      direction = '11';
    } else if (target.x == enemy.x && target.y < enemy.y) {
      direction = '10';
    } else if (target.x > enemy.x && target.y == enemy.y) {
      direction = '01';
    } else if (target.x < enemy.x && target.y == enemy.y) {
      direction = '00';
    }

    return direction;
  };

  PlayScene.prototype.getClosestTarget = function (target1, target2) {
    var distance = 0;
    var distanceArray = [];
    var closestTarget;
    target2.forEach(function (target) {
      distance = Math.abs(Math.pow(target1.x - target.x, 2) + Math.pow(target1.y - target.y, 2));
      target.distance = distance;
      distanceArray.push(distance);
    });
    distanceArray.sort();
    target2.forEach(function (target) {
      if (target.distance === distanceArray[0]) {
        closestTarget = target;
      }
    });
    return closestTarget;
  };

  PlayScene.prototype.spawnEnemyAtLocation = function (factoryCoordinates) {
    for (var index = 0; index < this.factoryCounter; index++) {
      if (this.enemyAliveArray.length < this.maxEnemy) {
        var enemy = this.enemySpawnArray[index].get(); //@ts-ignore

        enemy.setPosition(factoryCoordinates[index].x + enemy.width / 2, factoryCoordinates[index].y + enemy.height / 2);
        enemy.setDepth(2);
        enemy.setData('type', 'enemy');
        enemy.setData('behavior', this.enemyBehaviors[Math.floor(Math.random() * (this.enemyBehaviors.length - 0) + 0)]);
        enemy.setActive(true);
        enemy.setVisible(true);
        enemy.play('move-enemy');
        this.enemyAliveArray = this.enemyAliveArray.concat([enemy]);
        this.changeDirectionAtRandom(enemy);
      }
    }
  };

  PlayScene.prototype.collisionBulletWall = function (bullet, wall) {
    this.hitSound.play();
    bullet.setActive(false);
    bullet.destroy();
    var facingDirection;
    var angleToSet;

    if (wall.faceBottom === false) {
      facingDirection = '11';
      angleToSet = 180;
    } else if (wall.faceTop === false) {
      facingDirection = '10';
      angleToSet = 0;
    } else if (wall.faceLeft === false) {
      facingDirection = '00';
      angleToSet = -90;
    } else if (wall.faceRight === false) {
      facingDirection = '01';
      angleToSet = 90;
    }

    wall.properties.life--; //@ts-ignore

    if (wall.properties.destroyable === true && wall.properties.life === 2) {
      this.wallLayer.putTileAt(15, wall.x, wall.y, true);
      this.wallLayer.setCollisionByProperty({
        collides: true
      });
    } //@ts-ignore
    else if (wall.properties.destroyable === true && wall.properties.life === 1) {
        this.wallLayer.putTileAt(16, wall.x, wall.y);
        this.wallLayer.setCollisionByProperty({
          collides: true
        });
      } // //@ts-ignore
      else if (wall.properties.destroyable === true && wall.properties.life === 0) {
          this.explosion = this.spawnExplosion(wall.pixelX + wall.width / 2, wall.pixelY + wall.height / 2, CST_1.CST.SPRITES.EFFECTS.EXPLOSION);
          this.wallLayer.removeTileAt(wall.x, wall.y);
          this.wallLayer.putTileAt(Math.floor(Math.random() * (19 - 17 + 1) + 17), wall.x, wall.y).setFlip(Math.round(Math.random()), Math.round(Math.random()));
        }
  };

  PlayScene.prototype.finishLevel = function () {
    if (this.factoryCounter === 0 && this.enemyAliveArray.length === 0) {
      this.scene.start(CST_1.CST.SCENES.TESTLEVEL, {
        level: this.data.get('level') + 1
      });
    }
  };

  PlayScene.prototype.stopPlayer = function () {
    if (this.player.active === true) {
      this.player.setVelocity(0, 0);
      this.tankIdleSound.play(undefined, {
        loop: true,
        volume: .3
      });
      this.tankMoveSound.stop();
    }
  };

  PlayScene.prototype.makeAiDecisions = function () {
    if (this.aiCounter > Math.round(Math.random() * (this.max - this.min + 1) + this.min)) {
      this.makeAiDecision();
    }

    if (this.counter > Math.round(Math.random() * (this.maxBullet - this.minBullet + 1) + this.minBullet)) {
      this.aiShoot();
    }

    if (this.enemySpawn1Counter > 10000) {
      this.spawnEnemy();
    }
  };

  PlayScene.prototype.onExplosion = function () {
    if (this.isExplosion) {
      if (!this.explosion.anims.isPlaying) {
        this.explosion.destroy();
        this.isExplosion = false;
      }
    }
  };

  return PlayScene;
}(Phaser.Scene);

exports.PlayScene = PlayScene;
},{"../CST":"dist/assets/Js/CST.ts"}],"dist/assets/Js/game.ts":[function(require,module,exports) {
"use strict";
/**
  @type {import("../typings/phaser")}
 */

Object.defineProperty(exports, "__esModule", {
  value: true
}); // var game = new Phaser.Game(1920, 1600, Phaser.AUTO, 'gameWindow')

var loadScene_1 = require("./Scenes/loadScene");

var menuScene_1 = require("./Scenes/menuScene");

var playScene_1 = require("./Scenes/playScene");

var game = new Phaser.Game({
  width: 800,
  height: 640,
  scene: [loadScene_1.LoadScene, menuScene_1.MenuScene, playScene_1.PlayScene],
  render: {
    pixelArt: true
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  }
});
},{"./Scenes/loadScene":"dist/assets/Js/Scenes/loadScene.ts","./Scenes/menuScene":"dist/assets/Js/Scenes/menuScene.ts","./Scenes/playScene":"dist/assets/Js/Scenes/playScene.ts"}],"../../../../usr/local/lib/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58919" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../../usr/local/lib/node_modules/parcel/src/builtins/hmr-runtime.js","dist/assets/Js/game.ts"], null)
//# sourceMappingURL=/game.a47c8ed8.map