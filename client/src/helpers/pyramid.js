export default class Pyramid {
    constructor(scene) {
        this.scene = scene;
    }

    preload() {
        this.scene.load.image('pyramid', 'src/assets/pyramid.png');
    }

    create() {
        var scene = this.scene;
        var terrain = scene.add.image(180, 180, 'pyramid').setOrigin(0,0);
        terrain.inputEnabled = true;
        terrain.displayWidth = 300;
        terrain.displayHeight = 300;
        terrain.setInteractive();
        terrain.on('pointerdown', function(pointer, localX, localY, event){
            console.log('pyramid clicked!');
            scene.throwDice();
        });

        terrain.on('pointerover', function(){
            this.setTint(0xec00ec);
        });

        terrain.on('pointerout', function(){
            this.clearTint();
        });
    }
}