export default class TerrainCard {
    constructor(scene) {
        var terrain = scene.add.sprite(10, 750, 'terrainBack').setScale(0.3).setOrigin(0,0).setInteractive();
        scene.input.setDraggable(terrain);
        terrain.inputEnabled = true;


        terrain.on('pointerover', function () {
            this.setTint(0xcfcfcf);
        });
    
    
    
        terrain.on('pointerout', function () {
            this.clearTint();
        });


    }
}