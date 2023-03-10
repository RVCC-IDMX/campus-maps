let url = 'img/test-images/maze.png';

let colorOptions = ['red', 'green', 'blue', 'black', 'white', 'empty'];
//initial options, black = wall, red = non-accessible (stairs), white = accessible/path, green = elevators
let rgbData = [];
let color = '';

let path = []; let pathIndex = 0;
let nonAccessiblePath = []; let nonAccesiblePathIndex = 0;
let walls = []; let wallIndex = 0;
let Nodes = []; let nodesIndex = 0;

//Set up internal canvas
let canvas = document.createElement('canvas');
let c = canvas.getContext("2d", {
    willReadFrequently: true
});

window.onload = async () => {

    let picture = await loadImage(url);

    //Adjust canvas size
    canvas.width = picture.width;
    canvas.height = picture.height;

    //Draw image to canvas
    c.drawImage(picture, 0, 0);

    Nodes.length = picture.width;
    for (let i = 0; i < picture.width; i++) {
        Nodes[i] = new Array(picture.height);
    }

    for (let x = 0; x < picture.width; x++) {
        for (let y = 0; y < picture.height; y++) {
            //console.log(await snagColor(picture, x, y));
            rgbData = await snagColor(picture, x, y);
            color = checkColor(rgbData[0], rgbData[1], rgbData[2], rgbData[3]);
            //console.log(color);

            //log colors into grid useable
            if (color === 'black' || color === 'empty') {
                walls[wallIndex] = new Node(x, y, color);
                wallIndex++;
            }
            else if (color === 'red') {
                nonAccessiblePath[nonAccesiblePathIndex] = new Node(x, y, color);
                nonAccesiblePathIndex++;
            }
            else if (color === 'white') {
                path[pathIndex] = new Node(x, y, color);
                pathIndex++;
            }

            Nodes[x][y] = new Node(x, y, color);
            //console.log(Nodes[x, y]);
            //nodesIndex++;
        }
    }

    makeGrid(path, nonAccessiblePath, walls, picture.width, picture.height, Nodes);
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

//Async snag color
async function snagColor(image, x, y) {

    //Grab image (await for it to load)
    //let image = await loadImage(url);

    //Snag the databuffer representing the image data
    let data = c.getImageData(x, y, 1, 1).data;

    //Skip over the data buffer to the spot
    //let s = (y*image.width + x) * 4;

    //Return rgba
    //console.log([data[s+0],data[s+1],data[s+2],data[s+3]]);
    //return [data[s+0],data[s+1],data[s+2],data[s+3]];
    return data;
}