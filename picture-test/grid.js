// let pathSet = [];
// let nonAccessibleSet = [];
// let wallSet = [];

let allNodes = [[]]; //let nIndex = 0;
let gridWidth;
let gridHeight;

let scale = 3;

let openNodes = [];
let closedNodes = [];

let startPos;
let endPos;
let requireElevators = false;

let tracedPath = [];

let pixelScale = 1; // How big is a pixel relative to the map, in feet

let localCanvas;
let localC;

let jan;

// function download(filename, text) {
//     var element = document.createElement('a');
//     element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
//     element.setAttribute('download', filename);

//     element.style.display = 'none';
//     document.body.appendChild(element);

//     element.click();

//     document.body.removeChild(element);
// }

// Start file download.
// Manual download
// download("allNodes.json", jan);

async function makeGrid(gridx, gridy, nodes, startNode_, endNode_) {
    await getJsonFile();

    // pathSet = pathS;
    // nonAccessibleSet = nonAPathS;
    // wallSet = wallS;

    gridWidth = gridx;
    gridHeight = gridy;

    allNodes = nodes;

    //Json node grid test
    // jan = JSON.stringify(nodes);
    //

    let canvas = document.createElement('canvas');
    let c = canvas.getContext("2d");

    localCanvas = canvas;
    localCanvas.id = "underMap";
    localC = c;

    //console.log(pathSet, nonAccessibleSet,  wallSet);
    //console.log(gridWidth, gridHeight);

    setGrid();

    canvas.width = gridWidth * scale;
    canvas.height = gridHeight * scale;

    localCanvas = canvas;
    localC = c;

    // for (let x = 0; x < gridWidth; x++) {
    //     for (let y = 0; y < gridHeight; y++) {
    //         if (allNodes[x][y].color === 'empty') {
    //             allNodes[x][y].color = 'black';
    //         }

    //         //c.fillStyle = allNodes[x][y].color;

    //         //console.log(allNodes[nIndex].color);//~~~~~~~~~~~~ Log

    //         //nIndex++;
    //         //c.fillRect(x * scale, y * scale, scale, scale);
    //     }
    // }

    //Temp room array for tests
    //let rooms = [new Room(15, 20, 'w412', 'start room: 32x32px'), new Room(21, 35, 'w412', 'start room: maze file'), new Room(15, 0, 'w412', 'end room: 32x32px'), new Room(7, 0, 'w412', 'end room: maze file'), new Room(96, 424, 'entry', 'west-b-test'), new Room(193, 102, 'w310', 'west-b-test')];

    let startRoom;
    // if (startNode_ != null) {
    //     startRoom = startNode_;
    // }
    // else {
    //     startRoom = rooms[4];
    // }

    // paintNode(startRoom.nodeActual, localC, 'blue');

    let endRoom;
    // if (endNode_ != null) {
    //     endRoom = endNode_;
    // }
    // else {
    //     endRoom = rooms[5];
    // }

    // paintNode(startRoom.nodeActual, localC, 'orange');

    startPos = roomOnlySearch('main entrance');
    endPos = roomOnlySearch("security");

    // startPos = startRoom.nodeActual; //allNodes[21][35]; //westmap: 44, 27
    // startPos.color = 'blue';
    // endPos = endRoom.nodeActual;//allNodes[7][0]; //westmap: 184, 27
    // endPos.color = 'orange';

    c.fillStyle = startPos.color;
    c.fillRect(startPos.x * scale, startPos.y * scale, scale, scale);

    c.fillStyle = endPos.color;
    c.fillRect(endPos.x * scale, endPos.y * scale, scale, scale)

    document.body.appendChild(canvas);

    generateTPMap();

    beginPathFinding(startPos, endPos, requireElevators);

    //Test Methods
    //runUnitTests(c);
}

function setGrid() {
    localCanvas.width = gridWidth * scale;
    localCanvas.height = gridHeight * scale;

    for (let x = 0; x < gridWidth; x++) {
        for (let y = 0; y < gridHeight; y++) {
            if (allNodes[x][y].color === 'empty') {
                allNodes[x][y].color = 'black';
            }

            allNodes[x][y].visted = false;

            if (allNodes[x][y].color === 'orange' || allNodes[x][y].color === 'grey' || allNodes[x][y].color === 'magenta') {
                allNodes[x][y].color = 'white';
            }

            localC.fillStyle = allNodes[x][y].color;

            //console.log(allNodes[x][y].color);//~~~~~~~~~~~~ Log

            //nIndex++;
            //localC.fillRect(x * scale, y * scale, scale, scale);
        }
    }

    //console.log(allNodes);
}

/*
A* algorythem


Update all neighbors to openNode list, run through all openNodes to check if any are the end, for each openNode add all its neighbors to the openNodes list.

update a nodes 'previous node' to reflect where it came from, use this to back trace a path from end to start

openNodes is the array of nodes to be evaluated
closedNodes is the array of nodes that have already been visted/evaluated

start node is in openNodes

psudo-code


using accesibility settings, filter out non accessible nodes and treat them as walls

*/
function beginPathFinding(startNode, endNode, requireAccessibility) {

    openNodes = [];
    closedNodes = [];

    setGrid();

    requireElevators = requireAccessibility;

    openNodes.push(startNode);
    let stepCount = 0;
    let i = 0;

    loopStep();

    function loopStep() {
        //get the node in the openNodes that is the 'cheapest' to travel to
        //and recalculate its costs
        let current;// = getLowestFCost();

        for (let i = 0; i < openNodes.length; i++) {
            current = openNodes[i];

            if (current != null) {
                if (closedNodes.includes(current) || current.visted == true) {
                    //skip
                }
                else {
                    if (current === endNode) {
                        console.log('==== FOUND THE END ====');
                        console.log('==== ' + current.x + ', ' + current.y);

                        backTrace(startNode, current, localCanvas);
                        return;
                    }

                    //iterate over all the current nodes neighbours
                    getneighbours(current).forEach(element => {

                        //we don't want to recheck previously checked nodes
                        if (closedNodes.includes(element) || element.visted === true) {
                            //skip
                        }
                        else {

                            element.previousNode = current;
                            //if we have not already, put the current neighbour into the openNodes for future evaluation
                            if (!openNodes.includes(element)) {
                                openNodes.push(element);
                            }
                        }
                    });

                    //the current node has been checked
                    current.visted = true;
                    closedNodes.push(current);
                }
            }
            else {
                console.log('no path');

                let errorMsg = document.querySelector(".searchError-hidden");

                if (errorMsg !== null) {
                    errorMsg.className = 'searchError'
                    errorMsg.innerHTML = 'There is no route between these rooms, the selected room(s) may be inaccessible to students.';

                    setTimeout(() => {
                        document.querySelector(".searchError").className = 'searchError-hidden';
                    }, 3500);
                }
            }
        }

        if (i < 1000000 /* arbitrary end step to prevent infinte loop*/) {
            i++;
            if (i % 100 == 0) {
                setTimeout(() => { loopStep(); }, 1);        //slow things down for testing
            }
            else {
                loopStep();
            }
        }

    }
}

function backTrace(startPoint, endPoint, canvas) {
    //console.log('backtrace');//~~~~~~~~~~~~ Log
    //console.log(step);//~~~~~~~~~~~~ Log
    let n = endPoint;

    tracedPath = [];

    while (n !== startPoint) {
        paintNode(n, canvas, 'orange');
        n = n.previousNode;
        tracedPath.push(n);
    }

    tracedPath.reverse();
    //console.log(tracedPath); //~~~~~~~~~~~~ Log

    //console.log(getDir(allNodes[5][5], allNodes[5][6])); //~~~~~~~~~~~~ Log

    // auto-paints all teleportation nodes
    let tempArr = Array.from(teleportArray.keys());
    for (let i = 0; i < tempArr.length; i++) {
        paintNodeFromCoords(tempArr[i].x, tempArr[i].y, canvas, 'magenta');
    }

    generateDirections();
}

function generateDirections() {
    let directions = [];
    let previousDir = '';
    let pixelStepCount = 1;
    let tDir;
    let displayDir;
    let pathcolor = '';
    let distance = 0;

    let floorDirections = [];
    let coordDirections = [];

    for (let i = 1; i < tracedPath.length; i++) {
        tDir = getDir(tracedPath[i - 1], tracedPath[i]);

        pathcolor = tracedPath[i].color;

        //console.log(tDir, previousDir);//~~~~~~~~~~~~ Log

        if (tDir !== previousDir) {
            displayDir = tDir;//getRelativeDirections(previousDir, tDir, pathcolor);

            getRelativeDirections(previousDir, tDir, pathcolor);
            //console.log(i);

            directions.push('In ' + (pixelStepCount * pixelScale) + ' ' + ((pixelStepCount * pixelScale) > 1 ? "feet " : "foot ") + 'go ' + displayDir);

            previousDir = tDir;
            pixelStepCount = 1;

            //ensures that a waypoint will be placed whenever the direction changes
            //but only if it is not a floor change
            if (!tracedPath[i].hasTeleport) {
                coordDirections.push([tracedPath[i].x, tracedPath[i].y]);
            }
        }
        else {
            pixelStepCount++;

            if (pathcolor == 'blue') {
                distance += 3;
            }
            else {
                distance++;
            }
        }

        //if the current node is a teleport, i.e a floor change, the it pushes the current set of directions to the overall directions
        //this way we have seperate direction lists per floor
        if (tracedPath[i].hasTeleport) {
            if (coordDirections.length > 0) {
                floorDirections.push(coordDirections);
                coordDirections = [];
            }
        }

        //Places a waypoint at every 4th step rather than only at the direction changes to make a smoother line
        if (i % 4 == 0) {
            coordDirections.push([tracedPath[i].x, tracedPath[i].y]);
        }
    }

    //pushes the last point in the sequence so that the end node is shown on the path
    coordDirections.push([tracedPath[tracedPath.length - 1].x, tracedPath[tracedPath.length - 1].y]);

    //pushes the final coordDirections to the overall directions
    floorDirections.push(coordDirections);

    //console.log(tracedPath);//~~~~~~~~~~~~ Log

    console.log(directions); //~~~~~~~~~~~~ Log
    console.log('distance: ' + distance);
    //console.log(coordDirections);//~~~~~~~~~~~~ Log

    //reset the currently shown step
    currentStep = 1;
    drawOvermap(floorDirections, gridWidth, gridHeight);
}

function getRelativeDirections(currentDir, newDir, pathcolor) {

    // console.log(currentDir - newDir);

    if (newDir >= currentDir + 45) {
        console.log('right');
    }
    else if (newDir <= currentDir - 45) {
        console.log('left');
    }
    else {
        console.log('straight');
    }

    console.log(newDir, currentDir);

    // let suffix = '';

    // if (pathcolor == 'red') {
    //     suffix = 'up/down the stairs';
    // }
    // else if (pathcolor == 'green') {
    //     suffix = 'up/down the elevator';
    // }

    // if (currentDir == 'up') {
    //     if (newDir == 'right') {
    //         return 'right ' + suffix;
    //     }
    //     else if (newDir == 'left') {
    //         return 'left ' + suffix;
    //     }
    //     else if (newDir == 'down') {
    //         return 'straight ' + suffix;
    //     }
    // }
    // else if (currentDir == 'down') {
    //     if (newDir == 'right') {
    //         return 'left ' + suffix;
    //     }
    //     else if (newDir == 'left') {
    //         return 'right ' + suffix;
    //     }
    //     else if (newDir == 'up') {
    //         return 'straight ' + suffix;
    //     }
    // }
    // else if (currentDir == 'left') {
    //     if (newDir == 'up') {
    //         return 'right ' + suffix;
    //     }
    //     else if (newDir == 'down') {
    //         return 'left ' + suffix;
    //     }
    //     else if (newDir == 'left') {
    //         return 'straight ' + suffix;
    //     }
    // }
    // else if (currentDir == 'right') {
    //     if (newDir == 'up') {
    //         return 'left ' + suffix;
    //     }
    //     else if (newDir == 'down') {
    //         return 'right ' + suffix;
    //     }
    //     else if (newDir == 'right') {
    //         return 'straight ' + suffix;
    //     }
    // }
    // else if (currentDir == '') {
    //     return 'straight ' + suffix;
    // }
    // else {
    //     console.error('Data entry error: [' + currentDir + '] is not a valid input, please use: up, down, left, or right');
    //     //console.log(currentDir, newDir);
    // }
}

//Utility Methods

//map of coordinates to direction
// const direArr = new Map();
// direArr.set('0, 1', 'down');
// direArr.set('1, 0', 'right');
// direArr.set('-1, 0', 'left');
// direArr.set('0, -1', 'up');

// direArr.set('1, 1', 'down');
// direArr.set('1, -1', 'up');

// direArr.set('-1, 1', 'down');
// direArr.set('-1, -1', 'up');

//get the vector direction using two points
function getDir(originNode, travelToNode) {
    let x = travelToNode.x - originNode.x;
    let y = travelToNode.y - originNode.y;

    //normalize the vector
    let h = Math.sqrt((x * x) + (y * y));
    x /= h;
    y /= h;

    // (x, y) is the vector of these points
    // need to convert the vector into a *useable* direction
    // let coords = `${x}, ${y}`;
    //console.log(coords); //~~~~~~~~~~~~ Log

    // return direArr.get(coords);
    //console.log(angleFromVector(x, y));
    return angleFromVector(x, y);
}

function angleFromVector(x, y) {
    // 0, 1 = 0
    // 1, 1 = 45
    // 1, 0 = 90
    // 1, -1 = 135
    // 0, -1 = 180
    // -1, -1 = 225
    // -1, 0 = 270
    // -1, 1 = 315

    let a = (Math.atan2(y, x) * (180 / Math.PI));

    a -= 90;

    a = roundFloat(a, 10);
    //a += (a < 0) ? 360:0;

    return a;
}

//get all the valid neighbours of a node
function getneighbours(node) {
    let neighbours = [];
    let nx = node.x;
    let ny = node.y;

    /*
 
    ///Get all 9 neighbours
 
    for (let w = -1; w < 2; w++) {
        for (let h = -1; h < 2; h++) {
            if (nx + w < 0 || nx + w > gridWidth || ny + h < 0 || ny + h > gridHeight || (w === 0 && h === 0)) {
                //console.log('skipped');
                // skip to next node
            }
            else {
                //console.log(allNodes[nx + w][ny + h].color);
 
                if (allNodes[nx + w][ny + h].isAccessible(requireElevators)) {
                    neighbours.push(allNodes[nx + w][ny + h]);
                }
            }
        }
    }
    */

    ///Get cardinal neighbours
    if (nx - 1 > -1 && allNodes[nx - 1][ny].isAccessible(requireElevators)) {
        if (allNodes[nx - 1][ny].hasTeleport) {
            neighbours.push(tpContains(allNodes[nx - 1][ny]));
        }
        else {
            neighbours.push(allNodes[nx - 1][ny]);
        }
    }

    if (nx + 1 < gridWidth + 1 && allNodes[nx + 1][ny].isAccessible(requireElevators)) {
        if (allNodes[nx + 1][ny].hasTeleport) {
            neighbours.push(tpContains(allNodes[nx + 1][ny]));
        }
        else {
            neighbours.push(allNodes[nx + 1][ny]);
        }
    }

    if (ny - 1 > -1 && allNodes[nx][ny - 1].isAccessible(requireElevators)) {
        if (allNodes[nx][ny - 1].hasTeleport) {
            neighbours.push(tpContains(allNodes[nx][ny - 1]));
        }
        else {
            neighbours.push(allNodes[nx][ny - 1]);
        }
    }

    if (ny + 1 < gridHeight + 1 && allNodes[nx][ny + 1].isAccessible(requireElevators)) {
        if (allNodes[nx][ny + 1].hasTeleport) {
            neighbours.push(tpContains(allNodes[nx][ny + 1]));
        }
        else {
            neighbours.push(allNodes[nx][ny + 1]);
        }
    }

    return neighbours;
}

function getLowestFCost() {
    let tcost = 0;
    let cost = Infinity;
    let toReturn = null;

    for (let i = 0; i < openNodes.length; i++) {
        tcost = openNodes[i].fCost;

        if (tcost < cost && openNodes[i].visted === false) {
            cost = tcost;
            toReturn = openNodes[i];
        }
    }

    return toReturn;
}

//Get the distance between two nodes
function getDist(nodeA, nodeB) {
    let a = Math.abs(nodeA.x - nodeB.x);
    let b = Math.abs(nodeA.y - nodeB.y);

    return roundFloat(Math.sqrt((a * a) + (b * b)), 10);
}

//Round floats to a specified place
function roundFloat(float, places) {
    let mod = places * 10;

    if (mod < 1) {
        mod = 1;
    }
    return Math.round(float * mod) / mod;
}

//paints a specified node onto a given canvas
function paintNode(node, canvas, color) {
    localC.fillStyle = color;
    localC.fillRect(node.x * scale, node.y * scale, scale, scale);
}

function paintNodeFromCoords(x, y, canvas, color) {
    localC.fillStyle = color;
    localC.fillRect(x * scale, y * scale, scale, scale);
}

//get a specific node from provided coordinates. 
//Room/destinates will have a set of coords, this will translate that into a node
function findNodeFromCoords(nx, ny) {
    // for (let x = 0; x < gridWidth; x++) {
    //     for (let y = 0; y < gridHeight; y++) {
    //         if (allNodes[x][y].x == nx && allNodes[x][y].y == ny) {
    //             return allNodes[x][y];
    //         }
    //     }
    // }

    return allNodes[nx][ny];
}

/* ~~~~~~~~~~~~~~~~
 
Test methods
test any/all new methods! 
*/
function runUnitTests(canvas) {
    console.log(getDist(new Node(1, 3, 'black'), new Node(5, 8, 'black')));
    console.log(getDist(new Node(5, 8, 'black'), new Node(1, 3, 'black')));

    console.log("~~~~~~~~");

    console.log(roundFloat(5.88672, 1) + ' ones place');
    console.log(roundFloat(5.88672, 10) + ' tens place');
    console.log(roundFloat(5.88672, 100) + ' hundreds place');
    console.log(roundFloat(5.88672, 1000) + ' thousands place');

    console.log("~~~~~~~~");

    // let n = allNodes[0][27];
    // n.color = 'magenta';
    // paintNode(n, canvas);
    //console.log(getneighbours(n));
}


/*
Teleport: Check node, if has tp location, feed in other node coords instead of your own

*/