import {
  CST
} from '../CST';
import {
  ENGINE_METHOD_ALL
} from 'constants';
import {
  log
} from 'util';
import {
  logicalExpression
} from 'babel-types';


export class PlayScene extends Phaser.Scene {

  mapKeyArray!: Array < string > ;
  player!: Phaser.Physics.Arcade.Sprite;
  playerStartPosition!: {x: number, y: number};
  explosion!: Phaser.Physics.Arcade.Sprite;
  isExplosion!: boolean;
  playerLifes!: integer;
  playerLifesGroup!: Phaser.GameObjects.Group;
  playerBullets!: Phaser.Physics.Arcade.Group;
  isPlayerShooting!: boolean;
  cursors!: Phaser.Input.Keyboard.CursorKeys;
  fire!: Phaser.Input.Keyboard.CursorKeys;
  directions!: Array < string > ;
  enemy!: Phaser.Physics.Arcade.Sprite;
  enemyBehaviors!: Array < string > ;
  enemySpawn1Counter!: integer;
  enemySpawnArray!: Array < Phaser.GameObjects.Group > ;
  enemyAliveArray!: Array < Phaser.Physics.Arcade.Sprite > ;
  factories!: Phaser.Tilemaps.DynamicTilemapLayer;
  factoryCounter!: number;
  factoriesTiles!: Array < Phaser.Tilemaps.Tile > ;
  wallLayer!: Phaser.Tilemaps.DynamicTilemapLayer;
  eventsLayer!: Phaser.Tilemaps.DynamicTilemapLayer;
  floorLayer!: Phaser.Tilemaps.DynamicTilemapLayer;
  grassLayer!: Phaser.Tilemaps.DynamicTilemapLayer;
  enemyBullets!: Phaser.Physics.Arcade.Group;
  counter!: integer;
  aiCounter!: integer;
  max!: integer;
  min!: integer;
  maxEnemy!: integer;
  minEnemy!: integer;
  maxBullet!: integer;
  minBullet!: integer;
  explosionSound!: Phaser.Sound.BaseSound;
  hitSound!: Phaser.Sound.BaseSound;
  shootSound!: Phaser.Sound.BaseSound;
  tankIdleSound!: Phaser.Sound.BaseSound;
  tankMoveSound!: Phaser.Sound.BaseSound;

  constructor() {
    super({
      key: CST.SCENES.TESTLEVEL
    })
  }

  init(data: object) {
    this.data.set('level', data.level);
  }

  create() {
    this.sound.stopAll();
    this.explosionSound = this.sound.add(CST.SOUNDS.FX.EXPLOSION);
    this.hitSound = this.sound.add(CST.SOUNDS.FX.HIT);
    this.shootSound = this.sound.add(CST.SOUNDS.FX.SHOOT);
    this.tankIdleSound = this.sound.add(CST.SOUNDS.FX.TANK_IDLE);
    this.tankMoveSound = this.sound.add(CST.SOUNDS.FX.TANK_MOVE);
    this.min = 2000;
    this.max = 3000;
    this.maxEnemy = 0;
    this.factoryCounter = 0;
    this.minEnemy = 1;
    this.maxBullet = 3000;
    this.minBullet = 1500;
    this.counter = 0;
    this.aiCounter = 0;
    this.directions = ['00', '01', '10', '11']
    this.enemySpawnArray = [];
    this.enemyBehaviors = ['aggressive', 'defensive', 'roam'];
    this.enemyAliveArray = [];
    this.mapKeyArray = [];
    this.playerLifes = 3;
    this.playerStartPosition = {
      x: 0,
      y: 0
    };
    for (let key in CST.LEVELS) {
      this.mapKeyArray.push(CST.LEVELS[key]);
    }
    const map = this.make.tilemap({
      key: this.mapKeyArray[this.data.get('level')]
    });
    const world = map.addTilesetImage(CST.SPRITES.TILESETS.CRAZY_TANK_TEXTURES, CST.SPRITES.WORLD.CRAZY_TANK_TEXTURES);
    this.floorLayer = map.createDynamicLayer("Floor", world, 0, 0);
    this.wallLayer = map.createDynamicLayer("Walls", world, 0, 0);
    this.grassLayer = map.createDynamicLayer("Grass", world, 0, 0);
    this.grassLayer.setDepth(3);
    this.factories = map.createDynamicLayer("Factories", world, 0, 0);
    this.eventsLayer = map.createDynamicLayer("Events", world, 0, 0);
    this.eventsLayer.setVisible(false);
    this.playerLifesGroup = this.add.group();
    this.playerLifesGroup.createMultiple({
      key: CST.SPRITES.MISC.LIFE,
      repeat: this.playerLifes - 1
    })
    this.playerLifesGroup.getChildren().forEach((playerLife: Phaser.Physics.Arcade.Sprite, index) => {
      let widthHelper = 32 * index + 1
      playerLife.setPosition(this.game.canvas.width - 32 - widthHelper, this.game.canvas.height - 32);
      playerLife.setOrigin(0);
      playerLife.setDepth(2);
      playerLife.setActive(true);
      playerLife.setVisible(true);

    })
    this.getTilesFromLayer(this.factories, (factory) => {
      this.maxEnemy += 3;
      this.factoryCounter += 1;
      this.enemySpawnArray.push(this.physics.add.group({
        defaultKey: CST.SPRITES.GAME.ENEMIES.TANK,
        classType: Phaser.Physics.Arcade.Sprite,
      })) 
    })
    this.getTilesFromLayer(this.eventsLayer, (event) => {
      this.playerStartPosition.x = event.pixelX;
      this.playerStartPosition.y = event.pixelY;
    });
    this.wallLayer.setCollisionByProperty({
      collides: true
    });
    this.factories.setCollisionByProperty({
      collides: true
    });
    this.enemyBullets = this.physics.add.group({
      defaultKey: CST.SPRITES.MISC.BULLET,
      maxSize: 20,
      classType: Phaser.Physics.Arcade.Sprite
    });
    this.enemySpawn1Counter = 10000;
    this.isExplosion = false;
    this.player = this.physics.add.sprite(
      this.playerStartPosition.x + 16, 
      this.playerStartPosition.y + 16, 
      CST.SPRITES.PLAYER.PLAYER)
      .setDepth(2)
      .setData('direction', '10')
      .setData('type', 'player')
      .setData('immortal', false);
    this.isPlayerShooting = false;
    this.cursors = this.input.keyboard.createCursorKeys();
    this.playerBullets = this.physics.add.group({
      defaultKey: CST.SPRITES.MISC.BULLET,
      maxSize: 3,
      classType: Phaser.Physics.Arcade.Sprite
    });
    this.enemySpawnArray.forEach((enemySpawn, index) => {
      this.physics.world.addCollider(enemySpawn, this.player, (player: Phaser.Physics.Arcade.Sprite, enemy: Phaser.Physics.Arcade.Group) => {
        this.changeEnemyDirection(enemy, this.turnBack(enemy));
        if (!player.getData('immortal')) {
          this.killPlayer(player);
        }
      });
      this.physics.world.addCollider(enemySpawn, this.wallLayer, (enemy: Phaser.Physics.Arcade.Group, wall: Phaser.Physics.Arcade.Sprite) => {
        this.time.addEvent({
          delay: 100,
          callback: () => {
            this.changeEnemyDirection(enemy, this.changeDirectionAtCollision(enemy));
          }
        });
      });
      this.physics.world.addCollider(this.playerBullets,
         enemySpawn, (
          bullet: Phaser.Physics.Arcade.Sprite, 
          enemy: Phaser.Physics.Arcade.Sprite) => {
        enemy.destroy();
        this.explosion = this.spawnExplosion(enemy.x, enemy.y, CST.SPRITES.EFFECTS.EXPLOSION);
        this.isExplosion = true;
        this.enemyAliveArray.splice(-1, 1);
        bullet.setActive(false);
        bullet.destroy();
      })
    });
    this.physics.world.addCollider(this.player, this.wallLayer, (player: Phaser.Physics.Arcade.Sprite, wall: Phaser.Physics.Arcade.Sprite) => {});
    this.physics.world.addCollider(this.enemyBullets, this.wallLayer, (bullet: Phaser.Physics.Arcade.Sprite, wall: Phaser.Tilemaps.Tile) => {
      this.collisionBulletWall(bullet, wall);
    })
    this.physics.world.addCollider(this.enemyBullets, this.player, (player: Phaser.Physics.Arcade.Sprite, bullet: Phaser.Physics.Arcade.Sprite) => {
      bullet.setActive(false);
      bullet.destroy();
      if (!player.getData('immortal')) {
        this.killPlayer(player);
      }
    })
    this.physics.world.addCollider(this.playerBullets, this.wallLayer, (bullet: Phaser.Physics.Arcade.Sprite, wall: Phaser.Tilemaps.Tile) => {
      this.collisionBulletWall(bullet, wall);
    })

    this.physics.world.addCollider(this.playerBullets, this.factories, (bullet: Phaser.Physics.Arcade.Sprite, factory: Phaser.Tilemaps.Tile) => {
      bullet.setActive(false);
      bullet.destroy();
      factory.properties.life--;
      switch (factory.properties.life) {
        case 4:
        case 3:
        case 2:
        case 1:
          this.factoryUpdate(factory, factory.properties.life);
          break;

        case 0:
          this.factories.removeTileAt(factory.x, factory.y);
          this.factoryCounter--;
          if (this.factoryCounter === 0) {
            this.enemySpawnArray.forEach(enemySpawn => {
              enemySpawn.getChildren().forEach(enemy => {
                this.add.existing(enemy);
                enemy.setData('behavior', 'aggressive');
              })
            })
          }
          this.explosion = this.spawnExplosion(factory.pixelX + factory.width / 2, factory.pixelY + factory.height / 2, CST.SPRITES.EFFECTS.EXPLOSION);
          this.factories.putTileAt(Math.floor(Math.random() * (19 - 17 + 1) + 17), factory.x, factory.y).setFlip(Math.round(Math.random()), Math.round(Math.random()));
          break;
        default:
          break;
      }
    })
  }

  factoryUpdate(factory: Phaser.Tilemaps.Tile, caseNumber: number) {
    this.hitSound.play();
    this.factories.putTileAt(24 - caseNumber, factory.x, factory.y, true);
    this.factories.setCollisionByProperty({
      collides: true
    })
  }

  update(time, delta) {
    this.counter += delta;
    this.aiCounter += delta;
    this.enemySpawn1Counter += delta;
    this.stopPlayer();
    this.finishLevel();
    this.makeAiDecisions();
    this.onExplosion();
    if (this.cursors.up.isDown && this.player.active === true) {
      this.movePlayerTank({x: 0, y: -128}, '10', 0);
    }
    if (this.cursors.down.isDown && this.player.active === true) {
      this.movePlayerTank({x: 0, y: 128}, '11', 180);
    }
    if (this.cursors.right.isDown && this.player.active === true) {
      this.movePlayerTank({x: 128, y: 0}, '01', 90);
    }
    if (this.cursors.left.isDown && this.player.active === true) {
      this.movePlayerTank({x: -128, y: 0}, '00', -90);
    }
    if (this.input.keyboard.checkDown(this.cursors.space, 1000)) {
      this.shootBullet(this.player);
    }
  }

  getTilesFromLayer(layer: Phaser.Tilemaps.DynamicTilemapLayer, callback: EachTileCallback){
    layer.forEachTile(callback, undefined, undefined, undefined, undefined, undefined, {
      isNotEmpty: true
    });
  }

  movePlayerTank(velocity: {
    x: number,
    y: number
  }, direction: string, angle: number) {
    this.player.setVelocity(velocity.x, velocity.y)
    .setData('direction', direction)
    .setAngle(angle)
    .play('move', true);
    this.tankIdleSound.stop();
    this.tankMoveSound.play(undefined, {
      loop: true,
      volume: .3
    });
  }

  spawnExplosion(x: number, y: number, key: string) {
    this.explosionSound.play();
    this.isExplosion = true;
    return this.physics.add.sprite(x, y, key).play('explo');
  }

  killPlayer(player) {
    this.playerLifes--;
    this.explosion = this.spawnExplosion(player.x, player.y, CST.SPRITES.EFFECTS.EXPLOSION);
    if (this.playerLifes !== 0) {
      this.playerLifesGroup.remove(this.playerLifesGroup.getChildren()[this.playerLifesGroup.getChildren().length - 1], true);
      player.setX(this.playerStartPosition.x + 16);
      player.setY(this.playerStartPosition.y + 16);
    } else if (this.playerLifes === 0) {
      this.scene.start(CST.SCENES.MENU);
    }
    player.setData('immortal', true);
    this.time.addEvent({
      delay: 2000,
      callback: () => {
        player.setData('immortal', false);
      }
    })
  }

  shootBullet(shooter: Phaser.Physics.Arcade.Sprite) {
    let bullet: Phaser.Physics.Arcade.Sprite;
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
  }

  aiShoot() {
    this.enemySpawnArray.forEach(enemySpawn => {
      enemySpawn.getChildren().forEach(enemy => {
        setTimeout(() => {
          this.shootBullet(enemy);
        }, Math.round(Math.random() * (this.maxBullet - this.minBullet + 1) + this.minBullet))
        this.counter = 0;
      })
    })
  }

  makeAiDecision() {
    this.enemySpawnArray.forEach(enemySpawn => {
      enemySpawn.getChildren().forEach(enemy => {
        this.randomAiDecision(enemy);
      })
    })
    this.aiCounter = 0;
  }

  spawnEnemy() {
    this.spawnEnemyAtLocation(this.getFactoriesCoordinates());
    this.enemySpawn1Counter = 0;
  }

  getFactoriesCoordinates() {
    let factoryCoordinates: Array < Object > = []
    this.factories.forEachTile((factory, index) => {
      if (factory.canCollide === true)
        factoryCoordinates.push({
          x: factory.pixelX,
          y: factory.pixelY
        })
    }, undefined, undefined, undefined, undefined, undefined, {
      isNotEmpty: true
    });
    return factoryCoordinates;
  }

  randomAiDecision(enemy: Phaser.Physics.Arcade.Sprite) {
    setTimeout(() => {
      this.changeDirectionAtRandom(enemy)
    }, Math.round(Math.random() * (this.max - this.min - 1000 + 1) + this.min - 1000));
  }

  changeEnemyDirection(enemy: Phaser.Physics.Arcade.Sprite, direction: string) {
    if (direction === '00') {
      enemy.setVelocity(-128, 0)
      .setData('direction', '00')
      .setAngle(-90);
    } else if (direction === '01') {
      enemy.setVelocity(128, 0)
      .setData('direction', '01')
      .setAngle(90);
    } else if (direction === '10') {
      enemy.setVelocity(0, -128)
      .setData('direction', '10')
      .setAngle(0);
    } else if (direction === '11') {
      enemy.setVelocity(0, 128)
      .setData('direction', '11')
      .setAngle(180);
    }
  }

  changeDirectionAtCollision(enemy) {
    let direction = enemy.getData('direction');
    if (direction === '00' || direction === '01') {
      direction = ['10', '11'][Math.round(Math.random() * 1 - 0)];
    } else if (direction === '10' || direction === '11') {
      direction = ['00', '01'][Math.round(Math.random() * 1 - 0)];
    }
    return direction;
  }

  turnBack(enemy) {
    let direction = enemy.getData('direction');
    if (direction === '00') {
      direction = '01'
    } else if (direction === '01') {
      direction = '00'
    } else if (direction === '10') {
      direction = '11'
    } else if (direction === '11') {
      direction = '10'
    }
    return direction;
  }

  changeDirectionAtRandom(enemy: Phaser.Physics.Arcade.Sprite) {
    let enemyBehavior = enemy.getData('behavior');
    let direction;

    if (enemyBehavior === 'aggressive') {
      direction = this.decideOnDirection(this.player, enemy);
    } else if (enemyBehavior === 'defensive') {
      direction = this.decideOnDirection(this.getClosestTarget(enemy, this.getFactoriesCoordinates()), enemy);
    } else if (enemyBehavior === 'roam') {
      direction = this.directions[(Math.round(Math.random() * (3 - 0) + 0))]
    }
    this.changeEnemyDirection(enemy, direction);
  }

  decideOnDirection(target: any, enemy: Phaser.Physics.Arcade.Sprite) {
    let direction;
    if(target.x != enemy.x && target.y != enemy.y) {
      direction = this.primarySituations(target, enemy);
    }
    if((target.x !== enemy.x && target.y === enemy.y) || (target.x === enemy.x && target.y !== enemy.y)) {
      direction = this.advancedSituations(target, enemy);
    }
    if (target.x === enemy.x && target.y === enemy.y) {
      direction = this.directions[(Math.round(Math.random() * (3 - 0) + 0))];
    }
    return direction;
  }

  primarySituations(target: any, enemy: Phaser.Physics.Arcade.Sprite) {
    let direction = null;
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
  }

  advancedSituations(target: any, enemy: Phaser.Physics.Arcade.Sprite) {
    let direction = null;
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
  }

  getClosestTarget(target1: any, target2: any) {
    let distance = 0;
    let distanceArray: any[] = [];
    let closestTarget: object;
    target2.forEach((target) => {
      distance = Math.abs((Math.pow((target1.x - target.x), 2) + Math.pow((target1.y - target.y), 2)));
      target.distance = distance;
      distanceArray.push(distance);
    })
    distanceArray.sort();
    target2.forEach((target: any) => {
      if (target.distance === distanceArray[0]) {
        closestTarget = target;
      }
    })
    return closestTarget;
  }

  spawnEnemyAtLocation(factoryCoordinates: Array < Object > ) {
    for (let index = 0; index < this.factoryCounter; index++) {
      if (this.enemyAliveArray.length < this.maxEnemy) {
        let enemy: Phaser.Physics.Arcade.Sprite = this.enemySpawnArray[index].get();
        //@ts-ignore
        enemy.setPosition(factoryCoordinates[index].x + enemy.width / 2,
                          factoryCoordinates[index].y + enemy.height / 2);
        enemy.setDepth(2);
        enemy.setData('type', 'enemy');
        enemy.setData('behavior', this.enemyBehaviors[
          Math.floor(Math.random() * (this.enemyBehaviors.length - 0) + 0)
        ])
        enemy.setActive(true);
        enemy.setVisible(true);
        enemy.play('move-enemy');
        this.enemyAliveArray = [...this.enemyAliveArray, enemy];
        this.changeDirectionAtRandom(enemy);
      }
    }
  }

  collisionBulletWall(bullet: Phaser.Physics.Arcade.Sprite, wall: Phaser.Tilemaps.Tile) {
    this.hitSound.play();
    bullet.setActive(false);
    bullet.destroy();
    let facingDirection: string;
    let angleToSet: number;
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
    wall.properties.life--;
    //@ts-ignore
    if (wall.properties.destroyable === true && wall.properties.life === 2) {
      this.wallLayer.putTileAt(15, wall.x, wall.y, true);
      this.wallLayer.setCollisionByProperty({
        collides: true
      })
    }
    //@ts-ignore
    else if (wall.properties.destroyable === true && wall.properties.life === 1) {
      this.wallLayer.putTileAt(16, wall.x, wall.y);
      this.wallLayer.setCollisionByProperty({
        collides: true
      })
    }
    // //@ts-ignore
    else if (wall.properties.destroyable === true && wall.properties.life === 0) {
      this.explosion = this.spawnExplosion(
        wall.pixelX + wall.width / 2, 
        wall.pixelY + wall.height / 2, 
        CST.SPRITES.EFFECTS.EXPLOSION);
      this.wallLayer.removeTileAt(wall.x, wall.y);
      this.wallLayer.putTileAt(
        Math.floor(Math.random() * (19 - 17 + 1) + 17), 
        wall.x, 
        wall.y
        )
      .setFlip(Math.round(Math.random()), Math.round(Math.random()));
    }
  }

  finishLevel() {
    if (this.factoryCounter === 0 && this.enemyAliveArray.length === 0) {
      this.scene.start(CST.SCENES.TESTLEVEL, {
        level: this.data.get('level') + 1
      });
    }
  }

  stopPlayer() {
    if (this.player.active === true) {
      this.player.setVelocity(0, 0);
      this.tankIdleSound.play(undefined, {
        loop: true,
        volume: .3
      })
      this.tankMoveSound.stop();
    }
  }

  makeAiDecisions() {
    if (this.aiCounter > Math.round(Math.random() * (this.max - this.min + 1) + this.min)) {
      this.makeAiDecision();
    }
    if (this.counter > Math.round(Math.random() * (this.maxBullet - this.minBullet + 1) + this.minBullet)) {
      this.aiShoot();
    }
    if (this.enemySpawn1Counter > 10000) {
      this.spawnEnemy();
    }
  }

  onExplosion() {
    if (this.isExplosion) {
      if (!this.explosion.anims.isPlaying) {
        this.explosion.destroy();
        this.isExplosion = false;
      }
    }
  }
}