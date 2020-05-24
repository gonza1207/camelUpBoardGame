export default class TerrainCard {
    constructor(scene) {
        this.scene = scene;
    }

    preload() {
        this.scene.load.image('terrainBack', 'src/assets/terrain_back.png');
    }

    create() {
        var terrain = this.scene.add.sprite(10, 750, 'terrainBack').setScale(0.3).setOrigin(0,0).setInteractive();
        terrain.inputEnabled = true;
        this.scene.input.setDraggable(terrain);

        terrain.on('pointerover', function () {
            this.setTint(0xcfcfcf);
        });
    
    
    
        terrain.on('pointerout', function () {
            this.clearTint();
        });
    }
}