let pathSet = [];
let nonAccessibleSet = [];
let wallSet = [];


let allNodes = [[]]; let nIndex = 0;
let gridWidth;
let gridHeight;

let scale = 10;

let openNodes = [];
let closedNodes = [];

let startPos;
let endPos;
let requireElevators = false;

let tracedPath = [];

let pixelScale = 5; // How big is a pixel relative to the map, in feet

function makeGrid(pathS, nonAPathS, wallS, gridx, gridy, nodes) {
    pathSet = pathS;
    nonAccessibleSet = nonAPathS;
    wallSet = wallS;

    gridWidth = gridx;
    gridHeight = gridy;

    allNodes = nodes;

    console.log(allNodes);//~~~~~~~~~~~~ Log

    //console.log(pathSet, nonAccessibleSet,  wallSet);
    //console.log(gridWidth, gridHeight);

    let canvas = document.createElement('canvas');
    let c = canvas.getContext("2d");
    canvas.width = gridWidth * scale;
    canvas.height = gridHeight * scale;

    for (let x = 0; x < gridWidth; x++) {
        for (let y = 0; y < gridHeight; y++) {
            if (allNodes[x][y].color === 'empty') {
                allNodes[x][y].color = 'black';
            }

            c.fillStyle = allNodes[x][y].color;

            //console.log(allNodes[nIndex].color);//~~~~~~~~~~~~ Log

            nIndex++;
            c.fillRect(x * scale, y * scale, scale, scale);
        }
    }

    startPos = allNodes[21][35]; //westmap: 44, 27
    startPos.color = 'blue';
    endPos = allNodes[7][0]; //westmap: 184, 27
    endPos.color = 'orange';

    c.fillStyle = startPos.color;
    c.fillRect(startPos.x * scale, startPos.y * scale, scale, scale);

    c.fillStyle = endPos.color;
    c.fillRect(endPos.x * scale, endPos.y * scale, scale, scale)

    document.body.appendChild(canvas);

    generateTPMap();

    beginPathFinding(startPos, endPos, false, c);

    //Test Methods
    runUnitTests(c);
}


/*
A* algorythem

G cost = distance from start node
H cost = distance from end node

F cost = G cost + H cost

Start with lowest F cost, in case of tie, choose lowest H cost, if H cost is equal, choose random
Update all neighbors, keeping the lowest F cost. (Only update neighbors F cost if it would lower the F cost)

update a nodes 'previous node' to reflect where it came from, use this to back trace a path from end to start

openNodes is the array of nodes to be evaluated
closedNodes is the array of nodes that have already been visted/evaluated

start node is in openNodes

psudo-code

loop
    current = node in openNodes with lowest f cost
    remove current from openNodes
    add current to closedNodes

    if(current is end node)
        return //found the path

    foreach neighbour of current
        if neighbour is not traverable (wall, non accessible) or neighbour is in closedNode
            skip to next neighbour (continue)

        if(new path to neighbour is shorter or neighbour is not in openNodes)
            set f cost of neighbour (using G and H cost)
            set perviousNode of neighbour to current
            if neighbour is not in openNodes
                add neighbour to openNodes


using accesibility settings, filter out non accessible nodes and treat them as walls

*/
function beginPathFinding(startNode, endNode, requireAccessibility, canvas) {
    openNodes.push(startNode);
    let stepCount = 0;
    let i = 0;

    loopStep();

    function loopStep() {
        //get the node in the openNodes that is the 'cheapest' to travel to
        //and recalculate its costs
        let current = getLowestFCost();

        if (current !== null) {

            let gMod = 0;
            if (current.previousNode != null) {
                gMod = current.previousNode.gCost;
            }

            current.gCost = 1 + gMod; //getDist(current, startNode);
            current.hCost = getDist(current, endNode);
            current.fCost = current.calcFCost();

            //console.log('~~~~~~~~~~~~~');//~~~~~~~~~~~~ Log
            //console.log(current.x + " : " + current.y);//~~~~~~~~~~~~ Log
            //console.log(getneighbours(current).length);//~~~~~~~~~~~~ Log
            //console.log('end pos ' + endNode.x + ', ' + endNode.y);//~~~~~~~~~~~~ Log

            //Check if the end is found (using orange for now)
            if (current.color === 'orange') {
                console.log('==== FOUND THE END ====');
                console.log('==== ' + current.x + ', ' + current.y);

                backTrace(i, current, canvas);
                return;
            }

            //iterate over all the current nodes neighbours
            getneighbours(current).forEach(element => {

                //we don't want to recheck previously checked nodes
                if (closedNodes.includes(element) || element.visted === true) {
                    //skip
                }
                else {
                    //getDist(element, current);

                    element.gCost = 1 + current.gCost;
                    element.hCost = getDist(element, endNode);
                    element.fCost = element.calcFCost();

                    element.previousNode = current;

                    //console.log(element.x + " : " + element.y + " element: " + element.fCost + ' : ' + element.color);//~~~~~~~~~~~~ Log

                    //if we have not already, put the current neighbour into the openNodes for future evaluation
                    if (!openNodes.includes(element)) {
                        openNodes.push(element);
                    }
                }
            });

            //the current node has been checked
            current.visted = true;
            closedNodes.push(current);

            //visual repersentation
            if (current.gCost % 2 == 0) {
                paintNode(current, canvas, 'grey');
            }
            else {
                paintNode(current, canvas, 'lightgrey');
            }

            if (i < 1000 /*End step to prevent infinte loop*/) {
                i++;
                //loopStep();
                setTimeout(() => { loopStep(); }, 25);        //slow things down for testing
            }
        }
    }
}

function backTrace(step, endPoint, canvas) {
    console.log('backtrace');//~~~~~~~~~~~~ Log
    console.log(step);//~~~~~~~~~~~~ Log
    let n = endPoint;

    while (n !== startPos) {
        paintNode(n, canvas, 'orange');
        n = n.previousNode;
        tracedPath.push(n);
    }

    tracedPath.reverse();
    console.log(tracedPath); //~~~~~~~~~~~~ Log

    //console.log(getDir(allNodes[5][5], allNodes[5][6])); //~~~~~~~~~~~~ Log

    paintNode(findNodeFromCoords(15, 32), canvas, 'magenta');
    paintNode(findNodeFromCoords(28, 2), canvas, 'magenta');

    generateDirections();
}

function generateDirections() {
    let directions = [];
    let previousDir = '';
    let pixelStepCount = 1;

    for (let i = 1; i < tracedPath.length; i++) {
        let tDir = getDir(tracedPath[i - 1], tracedPath[i])
        if (tDir !== previousDir) {
            directions.push('In ' + (pixelStepCount * pixelScale) + ' feet turn ' + tDir);// + ' : ' + tracedPath[i].x + ', ' + tracedPath[i].y);
            previousDir = tDir;
            pixelStepCount = 1;
        }
        else {
            pixelStepCount++;
        }
    }

    console.log(directions); //~~~~~~~~~~~~ Log
}

//Utility Methods

//map of coordinates to direction
const direArr = new Map();
direArr.set('0, 1', 'down');
direArr.set('1, 0', 'right');
direArr.set('-1, 0', 'left');
direArr.set('0, -1', 'up');

//get the vector direction using two points
function getDir(originNode, travelToNode) {
    let x = travelToNode.x - originNode.x;
    let y = travelToNode.y - originNode.y;
    // (x, y) is the vector of these points
    // need to convert the vector into a *useable* direction
    let coords = `${x}, ${y}`;
    //console.log(coords); //~~~~~~~~~~~~ Log

    return direArr.get(coords);
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
        neighbours.push(tpContains(allNodes[nx - 1][ny]));
    }

    if (nx + 1 < gridWidth + 1 && allNodes[nx + 1][ny].isAccessible(requireElevators)) {
        neighbours.push(tpContains(allNodes[nx + 1][ny]));
    }

    if (ny - 1 > -1 && allNodes[nx][ny - 1].isAccessible(requireElevators)) {
        neighbours.push(tpContains(allNodes[nx][ny - 1]));
    }

    if (ny + 1 < gridHeight + 1 && allNodes[nx][ny + 1].isAccessible(requireElevators)) {
        neighbours.push(tpContains(allNodes[nx][ny + 1]));
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
    canvas.fillStyle = color;
    canvas.fillRect(node.x * scale, node.y * scale, scale, scale);
}

//get a specific node from provided coordinates. 
//Room/destinates will have a set of coords, this will translate that into a node
function findNodeFromCoords(nx, ny) {
    for (let x = 0; x < gridWidth; x++) {
        for (let y = 0; y < gridHeight; y++) {
            if (allNodes[x][y].x == nx && allNodes[x][y].y == ny) {
                return allNodes[x][y];
            }
        }
    }

    return null;
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

    let n = allNodes[0][27];
    n.color = 'magenta';
    paintNode(n, canvas);

    console.log(getneighbours(n));
}


/*
Teleport: Check node, if has tp location, feed in other node coords instead of your own

*/