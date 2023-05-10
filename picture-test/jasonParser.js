//getJsonFile();

let fileArr;
let read = false;

async function getJsonFile() {

    const requestURL = 'map-data-FLAT.json'; //'map-data copy for tests.json';
    const request = new Request(requestURL);

    const response = await fetch(request);
    const file = await response.json();
    fileArr = file;

    console.log(fileArr);

    let str; // = 'Current working Rooms: ';
    for (var key in fileArr) {
        str += `<option value ="${key}"> ${key} </option>`;
    }

    ready = true;

    //jsToHtml(str, "start");
    //jsToHtml(str, "destination");
}

//Function for site search button to call, Assumes good data, no checks (to fix)
function buttonStartSearch() {

    if (!ready) //return if the jason has not yet been parsed
    {
        return;
    }

    let startR = document.getElementById("start");
    let endR = document.getElementById("destination");
    let accesibilityToggle = document.getElementById("accesibilityToggle");

    if ((startR.value == '' || endR.value == '')) {
        let errorMsg = document.querySelector(".searchError-hidden");

        if (errorMsg !== null) {
            errorMsg.className = 'searchError'
            errorMsg.innerHTML = 'Please enter both a Start and Destination.';

            setTimeout(() => {
                document.querySelector(".searchError").className = 'searchError-hidden';
            }, 2000);
        }
    }
    else if (startR.value == endR.value) {
        let errorMsg = document.querySelector(".searchError-hidden");

        if (errorMsg !== null) {
            errorMsg.className = 'searchError'
            errorMsg.innerHTML = 'Start and End Destination cannot be the same room';

            setTimeout(() => {
                document.querySelector(".searchError").className = 'searchError-hidden';
            }, 2000);
        }
    }
    else {
        let endNode = roomOnlySearch(endR.value);
        let startNode = roomOnlySearch(startR.value);

        console.log(startNode, endNode, accesibilityToggle.checked);
        beginPathFinding(startNode, endNode, accesibilityToggle.checked);
    }
}


//Search function using a modified Json file which only has room numbers listed
//This one is more viable for large scale, with little or no changes needed to add a new room/building
//!final chosen design for Room Searching
function roomOnlySearch(roomName) {

    let str = '' + roomName;
    str = str.toUpperCase();
    let coords = fileArr[str];

    //console.log(fileArr);//~~~~~~~~~~~~ Log

    // let str = '';
    //console.log(fileArr["W100"]);

    // for (let i = 0; i < fileArr.length; i++) {
    //     str = '' + fileArr[i];
    //     str = str.split(': ');

    //     if (str[0] === roomName) {
    //         console.log("found room: " + roomName);

    //         coords = str[1].split(', ');
    //         console.log(coords); //coords
    //     }
    // }

    console.log(fileArr[str]);
    return findNodeFromCoords(coords[0], coords[1]);

}

//get a string from a mix of strings and numbers
function pullStr(str) {
    return str.match(/[a-zA-Z]+/g);
}

//get an int from a mix of strings and numbers
function pullInt(int) {
    return int.match(/\d+/g);
}

//Let JavaScript write HTML
function jsToHtml(str, id) {
    document.querySelector(`#${id}`).innerHTML = str;
}

//old
// function parseJsonIntoObjNotation() {
//     console.log('{');

//     for (let i = 0; i < fileArr.length; i++) {
//         str = '' + fileArr[i];
//         str = str.split(': ');

//         coords = str[1].split(', ');

//         //console.log(`"` + str[0] +`"`+ ": " + "["+ coords + "], ");
//         console.log(`"${str[0]}": [${coords}], `);

//         // coords = str[1].split(', ');
//         //console.log(coords); //coords
//     }

//     console.log("}");
// }

//UnUsed

//!original design for Room Searching
//Search function using the default Json file, building -> level -> room
//!Requieres an up-to-date buildingDir
//!Not Used
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