import io from 'socket.io-client';
import TerrainCard from "../helpers/terrain_card";
import Zone from '../helpers/zone';
import Pyramid from '../helpers/pyramid';

export default class Game extends Phaser.Scene {

    constructor() {
        super({
            key: 'Game'
        });
        this.pyramid = new Pyramid(this);
        this.terrainCard = new TerrainCard(this);
    }

    preload() {
        this.load.image('board', 'src/assets/board.png');
        this.pyramid.preload();
        this.terrainCard.preload();
    }

    create() {
        let self = this;
        this.isPlayerA = false;
        this.opponentCards = [];
        var sprite = this.add.sprite(0, 0, 'board').setOrigin(0);

        this.pyramid.create();
        this.terrainCard.create();
        this.socket = io('http://localhost:3000');

        
          this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        })

        this.zone = new Zone(this);

        this.input.on('dragend', function (pointer, gameObject, dropped) {
            
            //gameObject.setTint();
            self.children.bringToTop(gameObject);
            if (!dropped) {
                gameObject.x = 10
                gameObject.y = 750;
            }
        })

        this.input.on('drop', function (pointer, gameObject, dropZone) {
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;
            //gameObject.disableInteractive();
            //self.socket.emit('cardPlayed', gameObject, self.isPlayerA);
        })

       // this.dropZone = this.zone.renderZone();
       // this.outline = this.zone.renderOutline(this.dropZone);


        // sprite.on('pointerdown', function (pointer) {
        //     console.log('pointer down!');

        //     this.setTint(0xfff000);
    
        // });
    
        // sprite.on('pointerout', function (pointer) {
    
        //     this.clearTint();
    
        // });
    
        // sprite.on('pointerup', function (pointer) {
    
        //     this.clearTint();
    
        // });


        // this.zone = new Zone(this);
        // this.dropZone = this.zone.renderZone();
        // this.outline = this.zone.renderOutline(this.dropZone);

        // this.dealer = new Dealer(this);

        // let self = this;

        // this.socket.on('connect', function () {
        //     console.log('Connected!');
        // });

        // this.socket.on('isPlayerA', function () {
        //     self.isPlayerA = true;
        // })

        // this.socket.on('dealCards', function () {
        //     self.dealer.dealCards();
        //     self.dealText.disableInteractive();
        // })

        // this.socket.on('cardPlayed', function (gameObject, isPlayerA) {
        //     if (isPlayerA !== self.isPlayerA) {
        //         let sprite = gameObject.textureKey;
        //         self.opponentCards.shift().destroy();
        //         self.dropZone.data.values.cards++;
        //         let card = new Card(self);
        //         card.render(((self.dropZone.x - 350) + (self.dropZone.data.values.cards * 50)), (self.dropZone.y), sprite).disableInteractive();
        //     }
        // })

        // this.dealText = this.add.text(75, 350, ['DEAL CARDS']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();
    
        // this.dealText.on('pointerdown', function () {
        //     self.socket.emit("dealCards");
        // })

        // this.dealText.on('pointerover', function () {
        //     self.dealText.setColor('#ff69b4');
        // })

        // this.dealText.on('pointerout', function () {
        //     self.dealText.setColor('#00ffff');
        // })

        // this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        //     gameObject.x = dragX;
        //     gameObject.y = dragY;
        // })

        // this.input.on('dragstart', function (pointer, gameObject) {
        //     gameObject.setTint(0xff69b4);
        //     self.children.bringToTop(gameObject);
        // })

        // this.input.on('dragend', function (pointer, gameObject, dropped) {
        //     gameObject.setTint();
        //     if (!dropped) {
        //         gameObject.x = gameObject.input.dragStartX;
        //         gameObject.y = gameObject.input.dragStartY;
        //     }
        // })

        // this.input.on('drop', function (pointer, gameObject, dropZone) {
        //     dropZone.data.values.cards++;
        //     gameObject.x = (dropZone.x - 350) + (dropZone.data.values.cards * 50);
        //     gameObject.y = dropZone.y;
        //     gameObject.disableInteractive();
        //     self.socket.emit('cardPlayed', gameObject, self.isPlayerA);
        // })

        this.throwDice = function(){
            console.log("throwdice called");
            self.socket.emit("diceThrown", "player1");
        }

        this.socket.on('serverThrowDice', function () {
            console.log("serverThrowDice");
        })
    }

    update() {

    }

    
}