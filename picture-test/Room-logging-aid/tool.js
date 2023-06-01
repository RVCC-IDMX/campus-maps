const log = console.log;
log("online");

let colorOptions = ['red', 'green', 'blue', 'black', 'white', 'empty'];

let allJson;
let overImg;

let coordCanvas = document.createElement('canvas');
let coordC = coordCanvas.getContext("2d");

let previous = { x: 0, y: 0, color: 'col' }
let offset = -8; //IDK why, works for now

let Nodes = [];
let imgData = [];

let currentRoom = [];
let roomIndex = 0;

let allLoggedRooms = '{';

initLoad();

async function initLoad() {
    allJson = await readJson();
    overImg = await loadImage("../img/Map-atlas.png");

    Nodes.length = overImg.width;
    for (let i = 0; i < overImg.width; i++) {
        Nodes[i] = new Array(overImg.height);
    }

    await readImg();
    allJson = getValidFromJson(allJson);

    coordCanvas.style = 'background-color: #000;'

    coordCanvas.width = overImg.width;
    coordCanvas.height = overImg.height;

    coordC.drawImage(overImg, 0, 0);

    document.body.appendChild(coordCanvas);

    roomIndex = -1;
    nextRoom();
}

async function readImg() {
    for (let x = 0; x < overImg.width; x++) {
        for (let y = 0; y < overImg.height; y++) {
            rgbData = await snagColor(overImg, x, y);
            color = checkColor(rgbData[0], rgbData[1], rgbData[2], rgbData[3]);

            Nodes[x][y] = new Node(x, y, color);
        }
    }
}

function getValidFromJson(rooms) {

    let results = [];

    log(rooms);

    for (var name in rooms) {
        let rx = rooms[name][0];
        let ry = rooms[name][1];

        if (findNodeFromCoords(rx, ry).color == 'black' || (rx == 0 && ry == 0)) {
            results.push(name);
        }
        else {
            let toAdd = `"${name}": [${rx}, ${ry}], `
            allLoggedRooms += (toAdd);
        }
    }

    return results;
}

function nextRoom() {
    if (roomIndex < allJson.length - 1) {
        roomIndex++;
        currentRoom = allJson[roomIndex];

        document.querySelector("#roomname").innerHTML = currentRoom + ": " + (allJson.length - roomIndex);
    }
    else {
        document.querySelector("#roomname").innerHTML = "Done: 0";
    }
}

document.addEventListener('keypress', (e) => {
    let key = e.key;

    if (key == 's' || key == 'S') {

        let x = e.pageX + offset;
        let y = e.pageY + offset;

        let toAdd = `"${currentRoom}": [${x}, ${y}], `
        allLoggedRooms += (toAdd);
        nextRoom();
    }
});

coordCanvas.addEventListener('mousemove', (e) => {

    coordC.fillStyle = previous.color;
    coordC.fillRect(previous.x, previous.y, 1, 1);

    let x = e.pageX + offset;
    let y = e.pageY + offset;

    const pixel = coordC.getImageData(x, y, 1, 1);
    const data = pixel.data;

    const rgb = `rgb(${data[0]}, ${data[1]}, ${data[2]})`;

    let color = `rgb(${data[0]}, ${data[1]}, ${data[2]})`;

    previous.x = x;
    previous.y = y;
    previous.color = color;

    coordC.fillStyle = 'magenta';//rgb(255, 170, 0)';
    coordC.fillRect(x, y, 1, 1);

    // console.log(rgb, x, y);
    // console.log(x, y);

    if (isMouseDown) {
        window.scrollTo(window.scrollX + e.movementX, window.scrollY + e.movementY);
    }
});

let isMouseDown = false;

coordCanvas.addEventListener('mousedown', (e) => {
    if (e.buttons == '4') {
        log('middle click');
        isMouseDown = true;
    }
    else if (e.buttons = '0') {
        log('left click');

        let x = e.pageX + offset;
        let y = e.pageY + offset;

        let toAdd = `"${currentRoom}": [${x}, ${y}], `
        allLoggedRooms += (toAdd);

        console.log(toAdd);

        nextRoom();
    }
});

coordCanvas.addEventListener('mouseup', (e) => {
    isMouseDown = false;
});

coordCanvas.addEventListener('mouseleave', (e) => {
    isMouseDown = false;
});

async function readJson() {

    const requestURL = '../map-data-FLAT.json'; //'map-data copy for tests.json';
    const request = new Request(requestURL);

    const response = await fetch(request);
    const file = await response.json();

    return file;
}

async function loadImage(url) {
    //With a Promise
    return new Promise((resolve, reject) => {
        //Set up new image
        let img = new Image();

        //Set up callback to resolve the image
        img.onload = () => {
            resolve(img);
        };

        //Set it in motion
        img.src = url;
    });
}

function findNodeFromCoords(x, y) {
    return Nodes[x][y];
}
async function snagColor(image, x, y) {
    let index = ((y * coordCanvas.width) + x) * 4;
    let data = [imgData[index], imgData[index + 1], imgData[index + 2], imgData[index + 3]];

    return data;
}

function checkColor(r, g, b, a) {

    if (a < 128) //empty
    {
        return colorOptions[3]; //Replaced empty with solid black for consistency
    }
    else if (r > g + b) //red
    {
        return colorOptions[0];
    }
    else if (g > r + b) //green
    {
        return colorOptions[1];
    }
    else if (b > r + g) //blue
    {
        return colorOptions[2];
    }
    else if (r + g + b < 384) //black
    {
        return colorOptions[3];
    }
    else //white
    {
        return colorOptions[4];
    }
}

function getRooms() {

    return allLoggedRooms + '}';
}

class Node {
    constructor(x, y, color) {
        this.x = x,
            this.y = y,
            this.color = color
    }
}