export default class Zone {
    constructor(scene) {
        let dropZone = scene.add.zone(30, 30, 120, 120).setRectangleDropZone(120, 120).setOrigin(0,0);
        let dropZoneOutline = scene.add.graphics();
        dropZoneOutline.lineStyle(4, 0xff69b4);
        dropZoneOutline.strokeRect(30, 30, dropZone.input.hitArea.width, dropZone.input.hitArea.height);


        // dropZone = scene.add.zone(180,180 , 240, 240).setRectangleDropZone(240, 240).setOrigin(0,0);
        // dropZoneOutline = scene.add.graphics();
        // dropZoneOutline.lineStyle(4, 0xff69b4);
        // dropZoneOutline.strokeRect(180, 180, dropZone.input.hitArea.width, dropZone.input.hitArea.height);
    }
}