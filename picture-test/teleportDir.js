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
    teleportArray.set(findNodeFromCoords(800, 1431), findNodeFromCoords(504, 757));
    teleportArray.set(findNodeFromCoords(764, 1433), findNodeFromCoords(430, 741));
    teleportArray.set(findNodeFromCoords(834, 1425), findNodeFromCoords(564, 741));

    teleportArray.set(findNodeFromCoords(798, 1426), findNodeFromCoords(510, 647));
    teleportArray.set(findNodeFromCoords(834, 1422), findNodeFromCoords(587, 622));

    //campus to Library/Theatre
    teleportArray.set(findNodeFromCoords(833, 1515), findNodeFromCoords(964, 773));
    teleportArray.set(findNodeFromCoords(838, 1486), findNodeFromCoords(980, 387));
    teleportArray.set(findNodeFromCoords(836, 1485), findNodeFromCoords(1089, 149));
    //Library/Theatre to Somerset
    teleportArray.set(findNodeFromCoords(1156, 671), findNodeFromCoords(1253, 69));
    teleportArray.set(findNodeFromCoords(1082, 396), findNodeFromCoords(1499, 67));

    //campus to college center
    teleportArray.set(findNodeFromCoords(866, 1447), findNodeFromCoords(1597, 613));
    teleportArray.set(findNodeFromCoords(874, 1452), findNodeFromCoords(1594, 655));
    teleportArray.set(findNodeFromCoords(886, 1447), findNodeFromCoords(1612, 719));
    teleportArray.set(findNodeFromCoords(840, 1424), findNodeFromCoords(1713, 535));
    teleportArray.set(findNodeFromCoords(1595, 409), findNodeFromCoords(861, 1443));
    teleportArray.set(findNodeFromCoords(1595, 446), findNodeFromCoords(871, 1443));
    teleportArray.set(findNodeFromCoords(839, 1422), findNodeFromCoords(1678, 336));
    teleportArray.set(findNodeFromCoords(1591, 367), findNodeFromCoords(852, 1443));
    //college center to somerset-hunterdon
    teleportArray.set(findNodeFromCoords(1294, 20), findNodeFromCoords(1513, 875));
    teleportArray.set(findNodeFromCoords(1649, 726), findNodeFromCoords(1266, 224));

    //campus to somerset
    teleportArray.set(findNodeFromCoords(866, 1504), findNodeFromCoords(1273, 116));
    teleportArray.set(findNodeFromCoords(922, 1494), findNodeFromCoords(1465, 93));
    teleportArray.set(findNodeFromCoords(924, 1487), findNodeFromCoords(1730, 67));
    teleportArray.set(findNodeFromCoords(1636, 24), findNodeFromCoords(890, 1475));
    teleportArray.set(findNodeFromCoords(840, 1486), findNodeFromCoords(1546, 36));
    teleportArray.set(findNodeFromCoords(856, 1485), findNodeFromCoords(1789, 44));
    teleportArray.set(findNodeFromCoords(1942, 57), findNodeFromCoords(920, 1478));
    //somerset to event
    teleportArray.set(findNodeFromCoords(1320, 112), findNodeFromCoords(1300, 564));
    teleportArray.set(findNodeFromCoords(1567, 117), findNodeFromCoords(1297, 716));

    //campus to hunterdon
    teleportArray.set(findNodeFromCoords(927, 1437), findNodeFromCoords(1358, 228));
    teleportArray.set(findNodeFromCoords(1387, 229), findNodeFromCoords(939, 1437));
    teleportArray.set(findNodeFromCoords(899, 1447), findNodeFromCoords(1324, 249));
    teleportArray.set(findNodeFromCoords(927, 1424), findNodeFromCoords(1603, 244));
    teleportArray.set(findNodeFromCoords(1631, 262), findNodeFromCoords(920, 1444));
    teleportArray.set(findNodeFromCoords(893, 1444), findNodeFromCoords(1463, 282));

    //campus to planetarium
    teleportArray.set(findNodeFromCoords(941, 1481), findNodeFromCoords(1314, 499));

    //campus to event center
    teleportArray.set(findNodeFromCoords(871, 1509), findNodeFromCoords(1279, 593));

    //campus to campus (the raised walkways that cross over paths)
    teleportArray.set(findNodeFromCoords(798, 1434), findNodeFromCoords(798, 1430));
    teleportArray.set(findNodeFromCoords(836, 1423), findNodeFromCoords(836, 1427));
    teleportArray.set(findNodeFromCoords(836, 1443), findNodeFromCoords(836, 1447));
    teleportArray.set(findNodeFromCoords(836, 1442), findNodeFromCoords(840, 1443));
    teleportArray.set(findNodeFromCoords(837, 1484), findNodeFromCoords(841, 1484));
    teleportArray.set(findNodeFromCoords(920, 1477), findNodeFromCoords(924, 1477));
    teleportArray.set(findNodeFromCoords(920, 1445), findNodeFromCoords(924, 1445));
    teleportArray.set(findNodeFromCoords(918, 1460), findNodeFromCoords(922, 1460));

    //Stairs/Elevators
    //west
    teleportArray.set(findNodeFromCoords(62, 863), findNodeFromCoords(46, 761));
    teleportArray.set(findNodeFromCoords(42, 766), findNodeFromCoords(45, 682));
    teleportArray.set(findNodeFromCoords(55, 668), findNodeFromCoords(59, 745));
    teleportArray.set(findNodeFromCoords(59, 747), findNodeFromCoords(74, 845));
    teleportArray.set(findNodeFromCoords(148, 838), findNodeFromCoords(121, 743));
    teleportArray.set(findNodeFromCoords(121, 737), findNodeFromCoords(98, 656));

    //wordforce
    teleportArray.set(findNodeFromCoords(117, 436), findNodeFromCoords(60, 555));
    teleportArray.set(findNodeFromCoords(128, 459), findNodeFromCoords(89, 591));
    teleportArray.set(findNodeFromCoords(165, 561), findNodeFromCoords(185, 441));

    //science
    teleportArray.set(findNodeFromCoords(238, 395), findNodeFromCoords(233, 135));
    teleportArray.set(findNodeFromCoords(279, 104), findNodeFromCoords(281, 366));
    teleportArray.set(findNodeFromCoords(489, 412), findNodeFromCoords(489, 147));
    teleportArray.set(findNodeFromCoords(503, 358), findNodeFromCoords(511, 98));
    teleportArray.set(findNodeFromCoords(675, 100), findNodeFromCoords(664, 361));

    //bateman/phys-ed
    teleportArray.set(findNodeFromCoords(265, 817), findNodeFromCoords(263, 724));
    teleportArray.set(findNodeFromCoords(350, 596), findNodeFromCoords(367, 689));
    teleportArray.set(findNodeFromCoords(372, 692), findNodeFromCoords(382, 778));
    teleportArray.set(findNodeFromCoords(379, 783), findNodeFromCoords(501, 670));
    teleportArray.set(findNodeFromCoords(509, 675), findNodeFromCoords(384, 803));
    teleportArray.set(findNodeFromCoords(384, 801), findNodeFromCoords(372, 712));
    teleportArray.set(findNodeFromCoords(372, 710), findNodeFromCoords(352, 617));

    //somerset
    teleportArray.set(findNodeFromCoords(1310, 59), findNodeFromCoords(1558, 57));
    teleportArray.set(findNodeFromCoords(1560, 57), findNodeFromCoords(1798, 59));
    teleportArray.set(findNodeFromCoords(1800, 59), findNodeFromCoords(2047, 56));
    teleportArray.set(findNodeFromCoords(2219, 89), findNodeFromCoords(1951, 89));
    teleportArray.set(findNodeFromCoords(1948, 85), findNodeFromCoords(1722, 93));
    teleportArray.set(findNodeFromCoords(1719, 84), findNodeFromCoords(1475, 92));
    teleportArray.set(findNodeFromCoords(1312, 34), findNodeFromCoords(1560, 27));
    teleportArray.set(findNodeFromCoords(1562, 34), findNodeFromCoords(1798, 37));
    teleportArray.set(findNodeFromCoords(1801, 41), findNodeFromCoords(2045, 30));
    teleportArray.set(findNodeFromCoords(1643, 48), findNodeFromCoords(1395, 51));

    //hunterdon
    teleportArray.set(findNodeFromCoords(1277, 215), findNodeFromCoords(1456, 224));
    teleportArray.set(findNodeFromCoords(1454, 237), findNodeFromCoords(1680, 231));
    teleportArray.set(findNodeFromCoords(1853, 232), findNodeFromCoords(1610, 235));
    teleportArray.set(findNodeFromCoords(1615, 229), findNodeFromCoords(1365, 210));
    teleportArray.set(findNodeFromCoords(1364, 231), findNodeFromCoords(1610, 263));
    teleportArray.set(findNodeFromCoords(1612, 263), findNodeFromCoords(1851, 263));

    //college center
    teleportArray.set(findNodeFromCoords(1594, 418), findNodeFromCoords(1606, 640));
    teleportArray.set(findNodeFromCoords(1604, 628), findNodeFromCoords(1647, 866));
    teleportArray.set(findNodeFromCoords(1677, 436), findNodeFromCoords(1726, 627));
    teleportArray.set(findNodeFromCoords(1724, 639), findNodeFromCoords(1746, 856));
    teleportArray.set(findNodeFromCoords(1731, 884), findNodeFromCoords(1713, 660));
    teleportArray.set(findNodeFromCoords(1715, 660), findNodeFromCoords(1682, 451));

    //event center
    teleportArray.set(findNodeFromCoords(1410, 733), findNodeFromCoords(1437, 619));
    teleportArray.set(findNodeFromCoords(1330, 586), findNodeFromCoords(1335, 698));

    //library-theatre

    // Nodes get flaged if they are teleport nodes, and an end point is auto-generate
    let tempArr = [];
    tempArr = [...teleportArray.keys()];

    console.log(tempArr.length);

    // for (let i = 0; i < tempArr.length; i++) {
    //     let c = 0;

    //     for (let t = 0; t < tempArr.length; t++) {
    //         if (teleportArray.get(tempArr[i]) == teleportArray.get(tempArr[t])) {
    //             c++;
    //         }
    //     }

    //     if (c == 2) {
    //         console.log(tempArr[i]);
    //     }
    // }

    for (let i = 0; i < tempArr.length; i += 1) {
        tempArr[i].color = 'white';
        teleportArray.set(teleportArray.get(tempArr[i]), tempArr[i]);
    }

    let tpFlagArr = [...teleportArray.keys()];
    console.log(tpFlagArr.length);

    for (let i = 0; i < tpFlagArr.length; i++) {
        tpFlagArr[i].hasTeleport = true;
    }

    //Removing the North-East stair well from West building second floor, to West building first floor.
    //Fire door prevents travel down from this stairwell.
    //Travel up these stairs is permitted, travel down is not
    teleportArray.delete(findNodeFromCoords(121, 743));
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