class Building {

    constructor(floorArr, buildingName, buildingDesc) {
        this.buildingName = buildingName;

        this.floorArr = [];
        this.floorArr = floorArr;
        this.buildingDesc = buildingDesc;
    }
}

class Floor {

    constructor(roomArr, floorName) {
        this.floorName = floorName;

        this.roomArr = [];
        this.roomArr = roomArr;
    }
}

class Room {

    constructor(x, y, roomName, roomDesc) {
        this.x = x,
            this.y = y,
            this.roomName = roomName
        this.roomDesc = roomDesc;

        this.nodeActual = findNodeFromCoords(x, y);
    }


}