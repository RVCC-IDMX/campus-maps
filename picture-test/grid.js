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

function makeGrid(pathS, nonAPathS, wallS, gridx, gridy, nodes) {
    pathSet = pathS;
    nonAccessibleSet = nonAPathS;
    wallSet = wallS;

    gridWidth = gridx;
    gridHeight = gridy;

    allNodes = nodes;

    console.log(allNodes);

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

            //console.log(allNodes[nIndex].color);

            nIndex++;
            c.fillRect(x * scale, y * scale, scale, scale);
        }
    }

    startPos = allNodes[0][0];
    startPos.color = 'blue';
    endPos = allNodes[0][9];
    endPos.color = 'green';

    c.fillStyle = startPos.color;
    c.fillRect(startPos.x * scale, startPos.y * scale, scale, scale);

    c.fillStyle = endPos.color;
    c.fillRect(endPos.x * scale, endPos.y * scale, scale, scale)

    document.body.appendChild(canvas);


    beginPathFinding(startPos, endPos, false);


    //Test Methods
    runUnitTests();
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
function beginPathFinding(startNode, endNode, requireAccessibility) {

}


//Untility Methods

function getneighbours(node) {
    let neighbours = [];

    if (node.x - 1 > 0) {

    }
}

function getNodeFromCoords(x, y) {

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

//Test methods
//test any/all new methods!
function runUnitTests() {
    console.log(getDist(new Node(1, 3, 'black'), new Node(5, 8, 'black')));
    console.log(getDist(new Node(5, 8, 'black'), new Node(1, 3, 'black')));

    console.log("~~~~~~~~");

    console.log(roundFloat(5.88672, 1) + ' ones place');
    console.log(roundFloat(5.88672, 10) + ' tens place');
    console.log(roundFloat(5.88672, 100) + ' hundreds place');
    console.log(roundFloat(5.88672, 1000) + ' thousands place');
}