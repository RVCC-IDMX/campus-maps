const teleportArray = new Map();

function generateTPMap() {
    // Set the array of nodes that will be teleport points. Each node can only have one destination
    //teleportArray.set(findNodeFromCoords(15, 32), findNodeFromCoords(28, 2)); // used with maze file
    //teleportArray.set(findNodeFromCoords(28, 2), findNodeFromCoords(15, 32)); //no longer needed?

    //teleportArray.set(findNodeFromCoords(11, 13), findNodeFromCoords(15, 5)); //used with 32x32 files for tests

    teleportArray.set(findNodeFromCoords(94, 379), findNodeFromCoords(95, 238));
    teleportArray.set(findNodeFromCoords(95, 236), findNodeFromCoords(96, 101));

    teleportArray.set(findNodeFromCoords(83, 417), findNodeFromCoords(74, 277));
    teleportArray.set(findNodeFromCoords(74, 275), findNodeFromCoords(87, 129));

    teleportArray.set(findNodeFromCoords(243, 372), findNodeFromCoords(253, 232));
    teleportArray.set(findNodeFromCoords(253, 230), findNodeFromCoords(239, 102));

    // console.log('check TP');
    // console.log(tpContains(findNodeFromCoords(15, 34)));
    // console.log(tpContains(findNodeFromCoords(0, 0)));
    // console.log('/check TP');

    // Nodes get flaged if they are teleport nodes, and an end point is auto-generated
    let tempArr = Array.from(teleportArray.keys());
    for (let i = 0; i < tempArr.length; i++) {

        tempArr[i].color = 'white';
        teleportArray.set(teleportArray.get(tempArr[i]), tempArr[i]);
    }

    let tpFlagArr = Array.from(teleportArray.keys());
    for (let i = 0; i < tpFlagArr.length; i++) {
        tpFlagArr[i].hasTeleport = true;
    }

    //Removing the North-East stair well from West building second floor, to West building first floor.
    //Fire door prevents travel down from this stairwell.
    //Travel up these stairs is permitted, travel down is not
    teleportArray.delete(findNodeFromCoords(253, 232));
}

function tpContains(node) {
    if (teleportArray.has(node)) {
        //console.log("//~~//~~//~~//");
        //console.log(teleportArray.get(node));
        return teleportArray.get(node);
    }
    else {
        return node;
    }
}