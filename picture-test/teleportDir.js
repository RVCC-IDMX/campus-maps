const teleportArray = new Map();

function generateTPMap() {
    // Set the array of nodes that will be teleport points. Each node can only have one destination
    //teleportArray.set(findNodeFromCoords(15, 32), findNodeFromCoords(28, 2)); // used with maze file
    //teleportArray.set(findNodeFromCoords(28, 2), findNodeFromCoords(15, 32)); //no longer needed?

    //teleportArray.set(findNodeFromCoords(11, 13), findNodeFromCoords(15, 5)); //used with 32x32 files for tests

    // teleportArray.set(findNodeFromCoords(94, 379), findNodeFromCoords(95, 238));
    // teleportArray.set(findNodeFromCoords(95, 236), findNodeFromCoords(96, 101));

    // teleportArray.set(findNodeFromCoords(83, 417), findNodeFromCoords(74, 277));
    // teleportArray.set(findNodeFromCoords(74, 275), findNodeFromCoords(87, 129));

    // teleportArray.set(findNodeFromCoords(243, 372), findNodeFromCoords(253, 232));
    // teleportArray.set(findNodeFromCoords(253, 230), findNodeFromCoords(239, 102));

    // console.log('check TP');
    // console.log(tpContains(findNodeFromCoords(15, 34)));
    // console.log(tpContains(findNodeFromCoords(0, 0)));
    // console.log('/check TP');

    //! Teleports (Stairs, Elevators, and Building connections) For the current Map atlas
    //campus to arts
    teleportArray.set(findNodeFromCoords(637, 1281), findNodeFromCoords(1860, 788));
    teleportArray.set(findNodeFromCoords(661, 1280), findNodeFromCoords(1863, 877));
    teleportArray.set(findNodeFromCoords(627, 1258), findNodeFromCoords(1958, 759));
    teleportArray.set(findNodeFromCoords(626, 1222), findNodeFromCoords(2105, 760));
    teleportArray.set(findNodeFromCoords(645, 1194), findNodeFromCoords(2219, 841));
    teleportArray.set(findNodeFromCoords(678, 1234), findNodeFromCoords(2045, 935));

    //campus to bateman
    teleportArray.set(findNodeFromCoords(758, 1394), findNodeFromCoords(270, 792));
    teleportArray.set(findNodeFromCoords(800, 1391), findNodeFromCoords(390, 770));
    teleportArray.set(findNodeFromCoords(762, 1378), findNodeFromCoords(269, 662));
    //bateman to phys-ed
    teleportArray.set(findNodeFromCoords(314, 905), findNodeFromCoords(505, 667));
    teleportArray.set(findNodeFromCoords(379, 820), findNodeFromCoords(505, 570));

    //campus to west
    teleportArray.set(findNodeFromCoords(715, 1497), findNodeFromCoords(73, 870));
    teleportArray.set(findNodeFromCoords(714, 1479), findNodeFromCoords(43, 732));
    teleportArray.set(findNodeFromCoords(753, 1480), findNodeFromCoords(138, 728));

    //campus to science
    teleportArray.set(findNodeFromCoords(719, 1462), findNodeFromCoords(450, 517));
    teleportArray.set(findNodeFromCoords(730, 1440), findNodeFromCoords(525, 434));
    teleportArray.set(findNodeFromCoords(675, 429), findNodeFromCoords(748, 1434));
    teleportArray.set(findNodeFromCoords(384, 89), findNodeFromCoords(748, 1416));

    //campus to work force training
    teleportArray.set(findNodeFromCoords(440, 1506), findNodeFromCoords(131, 411));

    //campus to phys-ed
    teleportArray.set(findNodeFromCoords(0, 0), findNodeFromCoords(0, 0));
    teleportArray.set(findNodeFromCoords(0, 0), findNodeFromCoords(0, 0));


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