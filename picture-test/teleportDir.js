const teleportArray = new Map();

function generateTPMap() {
    teleportArray.set(findNodeFromCoords(15, 32), findNodeFromCoords(28, 2));
    teleportArray.set(findNodeFromCoords(28, 2), findNodeFromCoords(15, 32));

    //console.log(teleportArray); //~~~~~~~~~~~~ Log

    // console.log('check TP');
    // console.log(tpContains(findNodeFromCoords(15, 34)));
    // console.log(tpContains(findNodeFromCoords(0, 0)));
    // console.log('/check TP');
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