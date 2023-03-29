// class Building {

//     constructor(floorArr, buildingName, buildingDesc) {
//         this.buildingName = buildingName;

//         this.floorArr = [];
//         this.floorArr = floorArr;
//         this.buildingDesc = buildingDesc;
//     }
// }

// class Floor {

//     constructor(roomArr, floorName) {
//         this.floorName = floorName;

//         this.roomArr = [];
//         this.roomArr = roomArr;
//     }
// }

// class Room {

//     constructor(x, y, roomName, roomDesc) {
//         this.x = x,
//             this.y = y,
//             this.roomName = roomName
//         this.roomDesc = roomDesc;

//         this.nodeActual = findNodeFromCoords(parseInt(x, 10), parseInt(y, 10));
//     }


//}

let offestX;
let offsetY;

// let x1 = 0, y1 = 0, x2 = 10, y2 = 10;
// let x01 = 0, y01 = 0, x02 = 20, y02 = 20; ///////////////////////////////////////////////////////////!//

// offestX = (x2 - x1) * (x02 - x01) / 100;
// offsetY = (y2 - y1) * (y02 - y01) / 100;

// console.log(offestX, offsetY);

// drawOvermap();

async function drawOvermap(AstarDirCoords, oWidth, oHeight)
{
    await floorCoordsJson();
    //console.log(fileArr["second-floor-west"]["omap"].img);
    let img = await loadImage(fileArr["second-floor-west"]["omap"].img);
    console.log(img);

    let canvas = document.createElement('canvas');
    canvas.style.maxWidth = "100%";
    canvas.width = img.width;
    canvas.height = img.height;
    let c = canvas.getContext("2d");
    document.body.appendChild(canvas);

    c.drawImage(img, 0, 0);

    console.log(oWidth, oHeight);

    //console.log(offestX, offsetY);

    for(let i = 0; i < AstarDirCoords.length; i++)
    {
        console.log(AstarDirCoords[i]);//~~~~~~~~~~~~ Log
        let str = AstarDirCoords[i].split(', ');

        let lerpX = lerp(str[0], 0, oWidth, 0, 1920);
        let lerpY = lerp(str[1], 0, oHeight, 0, 1080);

        // c.fill = "white";
        // c.fillRect(lerpX,lerpY,20,20);

        paintNodeFromCoordsOvermap(lerpX, lerpY, c, 'white');
        // console.log(lerpX,lerpY);
    }

    // console.log(lerp(139, 0, oWidth, 0, 1920));
    // console.log(lerp(378, 0, oHeight, 0, 1080));
}

function lerp(p, a1, a2, b1, b2)
{
    let scale1 = a2 - a1;
    let delta = (p-a1) / scale1;
    let scale2 = b2 - b1;
    return (scale2 * delta) + b1;
}

function paintNodeFromCoordsOvermap(x, y, c, color) {
    c.fillStyle = color;
    c.fillRect(x, y, 5, 5);
}

function drawLine(startX, startY, endX, endY, color, c)
{
    c.fillStyle = color;
    c.fillRect(startX, startY, endX, endY);
}

async function floorCoordsJson() {

    const requestURL = 'floorcoords.json'; //'map-data copy for tests.json';
    const request = new Request(requestURL);

    const response = await fetch(request);
    const file = await response.json();
    fileArr = file;
}

async function loadImage(url) {
    //With a Promise
    return new Promise((resolve, reject) => {

        //Set up new image
        let img = new Image();


        //Set up callback to resolve the image
        img.onload = () => {
            resolve(img);
        }

        //Set it in motion
        img.src = url;

    });

}