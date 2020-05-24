export default class Camel {
    constructor(scene) {
        
        this.position = 0;

        this.sprite = scene.add.sprite(0, 0, 'camel').setOrigin(0,0);
        this.sprite.visible = false;
    }
}