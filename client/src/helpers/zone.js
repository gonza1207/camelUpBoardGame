export default class Zone {

    constructor(scene, x, y) {
        let width = 160;
        let height = 120;
        this.x = x;
        this.y = y;
        let dropZone = scene.add.zone(x, y, width, height).setRectangleDropZone(width, height).setOrigin(0,0);
        let dropZoneOutline = scene.add.graphics();
        dropZoneOutline.lineStyle(4, 0xff69b4);
        dropZoneOutline.strokeRect(x, y, dropZone.input.hitArea.width, dropZone.input.hitArea.height);


        // dropZone = scene.add.zone(180,180 , 240, 240).setRectangleDropZone(240, 240).setOrigin(0,0);
        // dropZoneOutline = scene.add.graphics();
        // dropZoneOutline.lineStyle(4, 0xff69b4);
        // dropZoneOutline.strokeRect(180, 180, dropZone.input.hitArea.width, dropZone.input.hitArea.height);
    }
}