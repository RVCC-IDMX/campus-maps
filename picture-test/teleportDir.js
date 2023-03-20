const teleportArray = new Map();

function generateTPMap() {
    // Set the array of nodes that will be teleport points. Each node can only have one destination
    teleportArray.set(findNodeFromCoords(15, 32), findNodeFromCoords(28, 2)); // used with maze file
    //teleportArray.set(findNodeFromCoords(28, 2), findNodeFromCoords(15, 32)); //no longer needed?

    //teleportArray.set(findNodeFromCoords(11, 13), findNodeFromCoords(15, 5)); //used with 32x32 files for tests

    //console.log(teleportArray); //~~~~~~~~~~~~ Log

    // console.log('check TP');
    // console.log(tpContains(findNodeFromCoords(15, 34)));
    // console.log(tpContains(findNodeFromCoords(0, 0)));
    // console.log('/check TP');

    // Nodes get flaged if they are teleport nodes, and an end point is auto-generated
    let tempArr = Array.from(teleportArray.keys());
    for (let i = 0; i < tempArr.length; i++) {
        tempArr[i].hasTeleport = true;
        teleportArray.set(teleportArray.get(tempArr[i]), tempArr[i]);
    }
}

function tpContains(node) {
    if (teleportArray.has(node)) {
        console.log("//~~//~~//~~//");
        console.log(teleportArray.get(node));
        return teleportArray.get(node);
    }
    else {
        return node;
    }
}