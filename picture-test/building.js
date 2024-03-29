let offestX;
let offsetY;

const floorsUrl = 'floors.json';

// let x1 = 0, y1 = 0, x2 = 10, y2 = 10;
// let x01 = 0, y01 = 0, x02 = 20, y02 = 20; ///////////////////////////////////////////////////////////!//

// offestX = (x2 - x1) * (x02 - x01) / 100;
// offsetY = (y2 - y1) * (y02 - y01) / 100;

// console.log(offestX, offsetY);

// drawOvermap();

let coordsArr;
floorCoordsJson(); //setting coordsArr to the floors Json file

let currentStep = 1;
let coordLength = [];

let canvasContainer = document.querySelector('.canvas-ctn');
let canvasB = document.createElement('canvas');
canvasB.id = 'outerMap';

let w, h;

function nextFloor(direction) {
	if (direction > 0) {
		if (currentStep < coordLength.length) {
			currentStep++;
		}
	} else {
		if (currentStep > 1) {
			currentStep--;
		}
	}

	drawOvermap(coordLength, w, h);

	//console.log(direction, currentStep);
}

async function drawOvermap(AstarDirCoords, oWidth, oHeight) {
	//console.log(fileArr["second-floor-west"]["omap"].img);

	//img needs to equal whatever the current AstarDirCoords node floor is.
	// let img = await loadImage(coordsArr["second-floor-west"]["omap"].img);
	//console.log(img);

	// canvasB = document.createElement('canvas');
	canvasB.style.maxWidth = '100%';
	// canvasB.width = img.width;
	// canvasB.height = img.height;
	// let cb = canvasB.getContext("2d");
	// document.body.appendChild(canvasB);

	// cb.drawImage(img, 0, 0);

	//console.log(oWidth, oHeight);//~~~~~~~~~~~~ Log

	//console.log(offestX, offsetY);

	//console.log(AstarDirCoords[0][0][0], AstarDirCoords[0][0][1] + " coord log");

	let currentCheckfloor;
	let nextCheckFloor;
	let tArr = [];
	let arrA = [];

	// for (let a = 0; a < AstarDirCoords[i].length; a++) {
	// 	arrA.push(AstarDirCoords[i][a]);
	// }

	for (let i = 0; i < AstarDirCoords.length; i++) {

		currentCheckfloor = getFloorFromCoords(AstarDirCoords[i][0][0], AstarDirCoords[i][0][1]);
		if (i < AstarDirCoords.length - 1) {
			nextCheckFloor = getFloorFromCoords(AstarDirCoords[i + 1][0][0], AstarDirCoords[i + 1][0][1]);
		}
		else {
			nextCheckFloor = '';
		}

		if (nextCheckFloor != '') {
			if (currentCheckfloor['omap'].img == nextCheckFloor['omap'].img) {
				for (let a = 0; a < AstarDirCoords[i].length; a++) {
					arrA.push(AstarDirCoords[i][a]);
				}
			}
			else {
				for (let a = 0; a < AstarDirCoords[i].length; a++) {
					arrA.push(AstarDirCoords[i][a]);
				}

				tArr.push(arrA);

				arrA = [];
			}
		}
		else {
			tArr.push(AstarDirCoords[i]);
		}

		//console.log(AstarDirCoords[i]);
		//console.log(previousFloor['omap'].img), "previous floor~~~~~~ <";
	}

	// console.log("CHECK LOGS!~~~~~~~");
	// console.log(AstarDirCoords);
	// console.log(tArr);

	coordLength = tArr;
	w = oWidth;
	h = oHeight;
	//console.log(AstarDirCoords.length);

	for (let d = 0; d < currentStep /*AstarDirCoords.length*/; d++) {
		if (AstarDirCoords[d].length > 0) {
			//console.log("coords ", d, " ", AstarDirCoords[d]);//~~~~~~~~~~~~ Log

			let currentFloor = getFloorFromCoords(
				AstarDirCoords[d][0][0],
				AstarDirCoords[d][0][1]
			);
			//console.log(currentFloor, " current floor");

			let img = await loadImage(currentFloor['omap'].img);
			canvasB.width = img.width;
			canvasB.height = img.height;

			let cb = canvasB.getContext('2d');
			canvasContainer.appendChild(canvasB);

			cb.drawImage(img, 0, 0);

			for (let i = 0; i < AstarDirCoords[d].length; i++) {
				//console.log(AstarDirCoords[i]);//~~~~~~~~~~~~ Log
				let str = AstarDirCoords[d][i]; //.split(', ');

				//console.log(str + " AstarDirCoords");//~~~~~~~~~~~~ Log

				let x1 = currentFloor['umap'].x1;
				let y1 = currentFloor['umap'].y1;
				let x2 = currentFloor['umap'].x2;
				let y2 = currentFloor['umap'].y2;

				let lerpX = lerp(str[0], x1, x2, 0, 1920);
				let lerpY = lerp(str[1], y1, y2, 0, 1080);

				// c.fill = "white";
				// c.fillRect(lerpX,lerpY,20,20);

				//paintNodeFromCoordsOvermap(lerpX, lerpY, cb, 'magenta');
				// console.log(lerpX,lerpY);

				cb.strokeStyle = '#2DFFF2';
				if (i > 0) {
					//if (endStr.length > 2) Skip this draw, is a teleport

					let endStr = AstarDirCoords[d][i - 1]; //.split(', ');
					let lerpEndX = lerp(endStr[0], x1, x2, 0, 1920);
					let lerpEndY = lerp(endStr[1], y1, y2, 0, 1080);

					cb.strokeStyle = '#2DFFF2';
					cb.beginPath();
					cb.lineWidth = 10;
					cb.moveTo(lerpX, lerpY);
					cb.lineTo(lerpEndX, lerpEndY);
					cb.stroke();

					cb.strokeStyle = 'black';
					cb.beginPath();
					cb.lineWidth = 3;
					cb.moveTo(lerpX, lerpY);
					cb.lineTo(lerpEndX, lerpEndY);
					cb.stroke();
					//drawLine(lerpX, lerpY, lerpEndX, lerpEndY, 'white', c);
				}
			}

			//draw x at path end point
			let str = AstarDirCoords[d][AstarDirCoords[d].length - 1]; //.split(', ');

			let x1 = currentFloor['umap'].x1;
			let y1 = currentFloor['umap'].y1;
			let x2 = currentFloor['umap'].x2;
			let y2 = currentFloor['umap'].y2;

			let lerpX = lerp(str[0], x1, x2, 0, 1920);
			let lerpY = lerp(str[1], y1, y2, 0, 1080);

			cb.strokeStyle = '#ff2D99';
			cb.beginPath();
			cb.lineWidth = 10;
			cb.moveTo(lerpX + 15, lerpY + 15);
			cb.lineTo(lerpX - 15, lerpY - 15);
			cb.moveTo(lerpX - 15, lerpY + 15);
			cb.lineTo(lerpX + 15, lerpY - 15);
			cb.stroke();

			cb.strokeStyle = 'black';
			cb.lineWidth = 3;
			cb.moveTo(lerpX + 14, lerpY + 14);
			cb.lineTo(lerpX - 14, lerpY - 14);
			cb.moveTo(lerpX - 14, lerpY + 14);
			cb.lineTo(lerpX + 14, lerpY - 14);
			cb.stroke();
		}

		// console.log(getFloorFromCoords(5, 50));//~~~~~~~~~~~~ Log
		// console.log(lerp(139, 0, oWidth, 0, 1920));
		// console.log(lerp(378, 0, oHeight, 0, 1080));
	}

	//hide the loading image

	document.querySelector('#loadImg') !== null
		? (document.querySelector('#loadImg').id = 'hideLoad')
		: '';

	document.querySelector('#outerMap-hidden') !== null ? (document.querySelector('#outerMap-hidden').id = 'outerMap') : '';
}

function lerp(p, a1, a2, b1, b2) {
	let scale1 = a2 - a1;
	let delta = (p - a1) / scale1;
	let scale2 = b2 - b1;
	return scale2 * delta + b1;
}

function getFloorFromCoords(x, y) {
	for (let element in coordsArr) {
		//console.log(element);
		let e = coordsArr[element];
		//console.log(e);

		let inX = false;
		let inY = false;

		if (x >= e['umap'].x1 && x <= e['umap'].x2) {
			//console.log('in x');
			inX = true;
		}

		if (y >= e['umap'].y1 && y <= e['umap'].y2) {
			// console.log("in y");
			inY = true;
		}

		if (inX && inY) {
			return e;
		}
	}

	return false;
}

function paintNodeFromCoordsOvermap(x, y, c, color) {
	c.fillStyle = color;
	c.fillRect(x, y, 5, 5);
}

async function floorCoordsJson() {
	const requestURL = floorsUrl;
	const request = new Request(requestURL);

	const response = await fetch(request);
	const file = await response.json();
	coordsArr = file;
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
