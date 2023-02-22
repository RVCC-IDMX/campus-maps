let pathSet = [];
let nonAccessibleSet = [];
let wallSet = [];
let allNodes = []; let nIndex = 0;
let gridWidth;
let gridHeight;

let scale = 10;

let startPos;
let endPos;

function makeGrid(pathS, nonAPathS, wallS, gridx, gridy, nodes)
{
    pathSet = pathS;
    nonAccessibleSet = nonAPathS;
    wallSet = wallS;

    gridWidth = gridx;
    gridHeight = gridy;

    allNodes = nodes;

    //console.log(pathSet, nonAccessibleSet,  wallSet);
    //console.log(gridWidth, gridHeight);

    let canvas = document.createElement('canvas');
    let c = canvas.getContext("2d");
    canvas.width=gridWidth * scale;
    canvas.height=gridHeight * scale;

    for(let y = 0; y < gridHeight; y++)
    {
        for(let x = 0;  x < gridWidth; x++)
        {
            if(allNodes[nIndex].color === 'empty')
            {
                allNodes[nIndex].color = 'black';
            }

            c.fillStyle = allNodes[nIndex].color;

            //console.log(allNodes[nIndex].color);

            nIndex++;
            c.fillRect(x*scale, y*scale, scale, scale);
        }
    }

    startPos = new Node(0, 0, 'blue');
    endPos = new Node(0, 9, 'green');

    c.fillStyle = startPos.color;
    c.fillRect(startPos.x*scale, startPos.y*scale, scale, scale);

    c.fillStyle = endPos.color;
    c.fillRect(endPos.x * scale, endPos.y * scale, scale, scale)

    document.body.appendChild(canvas);

    beginPathFinding(startPos, endPos, false)
}

function beginPathFinding(startNode, endNode, requireAccessibility)
{

}