getJsonFile();

let fileArr;
async function getJsonFile() {

    const requestURL = 'map-data copy for tests v2.json'; //'map-data copy for tests.json';
    const request = new Request(requestURL);

    const response = await fetch(request);
    const file = await response.json();
    fileArr = Array.from(file);
}

//Function for site search button to call, Assumes good data, no checks (to fix)
function buttonStartSearch() {
    let startR = document.getElementById("start");
    let endR = document.getElementById("destination");

    //roomOnlySearch(endR.value);

    let endNode = roomOnlySearch(endR.value);
    endNode = new Room(parseInt(endNode[0], 10), parseInt(endNode[1], 10), 'room', 'end');

    let startNode = roomOnlySearch(startR.value);
    startNode = new Room(parseInt(startNode[0], 10), parseInt(startNode[1], 10), 'room', 'start');

    console.log(startNode.nodeActual, endNode.nodeActual);

    beginPathFinding(startNode.nodeActual, endNode.nodeActual, false);
}

//get a string from a mix of strings and numbers
function pullStr(str) {
    return str.match(/[a-zA-Z]+/g);
}

//get an int from a mix of strings and numbers
function pullInt(int) {
    return int.match(/\d+/g);
}


//Search function using a modified Json file which only has room numbers listed
//This one is more viable for large scale, with little or no changes needed to add a new room/building
//!Second design for Room Searching
function roomOnlySearch(roomName) {

    let str = '';
    let coords = [0, 0];

    for (let i = 0; i < fileArr.length; i++) {
        str = '' + fileArr[i];
        str = str.split(': ');

        if (str[0] === roomName) {
            console.log("found room: " + roomName);

            coords = str[1].split(', ');
            console.log(coords); //coords
        }
    }

    return coords;
}

//!First design for Room Searching
//Search function using the default Json file, building -> level -> room
//!Requieres an up-to-date buildingDir
function searchRoom(roomName) {

    //console.log(fileArr);
    let building = pullStr(roomName); //Get front letters
    let roomNum = pullInt(roomName); //Get all numbers
    let floorNum = ('' + roomNum)[0]; //Get first number (floor number)

    roomNum = ('' + roomNum).slice(1); //Get room number (trim off floor);

    let bInt = 0;

    console.log(building + " " + floorNum + " " + roomNum);

    for (let i = 0; i < fileArr.length; i++) {
        let bName = fileArr[i]['Building']['Name'];
        //console.log(bName);

        if (buildingDir.get(bName) == building) {
            console.log('found room letter');
            bInt = i;
        }

        //console.log(str);
        //console.log(fileArr[i]['Building']['Name'][0]);
    }

    //console.log(fileArr[bInt]['Building']['Floors'][floorNum]);

    for (let i = 0; i < fileArr[bInt]['Building']['Floors'][floorNum].length; i++) {
        if (fileArr[bInt]['Building']['Floors'][floorNum][i] == roomName) {
            console.log(fileArr[bInt]['Building']['Floors'][floorNum][i] + " Found");
        }
    }
}
//!Required for searchRoom(roomName)
// building name to its room letter code
let buildingDir = new Map();
buildingDir.set('Arts Center', 'A');
buildingDir.set("Bateman Student Center", 'BC');
buildingDir.set("The Children's Campus", '');   //no data
buildingDir.set('The College Center', 'C');
buildingDir.set('East Building', 'E');
buildingDir.set('Event Center', 'ATCC');
buildingDir.set('Hunterdon Hall', 'H');
buildingDir.set('Library/Theatre', 'L');
buildingDir.set('Physical Education', '');    //No Room Numbers 'PE'?
buildingDir.set('Planetarium', '');             //No Rooms 'P'?
buildingDir.set('Science Center', 'SC');
buildingDir.set('Somerset Hall', 'S');
buildingDir.set('West Building', 'W');
buildingDir.set('Workforce Training Center', 'WT');