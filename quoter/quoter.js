class baseBrick {
	constructor() {
		this.color = "gray";
		this.nodeIn = 0;
		this.nodeOut = 1;
		this.spawnText = "Base Material";
		let baseMaterial = "copper", surfaceArea = "123";
		this.displayedInfo = [];
		this.displayedInfo[0] = ("Base Mat.: " + baseMaterial);
		this.displayedInfo[1] = ("S.A.: " + surfaceArea);
	}
}

class maskBrick {
	constructor() {
		this.color = "green";
		this.nodeIn = 1;
		this.nodeOut = 1;
		this.spawnText = "Mask/Unmask";
		let timeReq = "10";
		this.displayedInfo = [];
		this.displayedInfo[0] = ("Mask Time Req.: " + timeReq + "m");
	}
}

class rackBrick {
	constructor() {
		this.color = "green";
		this.nodeIn = 1;
		this.nodeOut = 1;
		this.spawnText = "Rack/Unrack";
		let timeReq = "10";
		this.displayedInfo = [];
		this.displayedInfo[0] = ("Rack Time Req.: " + timeReq + "m");
	}
}

class plateBrick {
	constructor() {
		this.color = "blue";
		this.nodeIn = 1;
		this.nodeOut = 1;
		this.spawnText = "Plating Layer";
		let plateMat = "copper", depth = "0.00005";
		this.displayedInfo = [];
		this.displayedInfo[0] = ("Plate Mat.: " + plateMat);
		this.displayedInfo[1] = ("Depth: " + depth);
	}
}

class qcBrick {
	constructor() {
		this.color = "green";
		this.nodeIn = 1;
		this.nodeOut = 1;
		this.spawnText = "Quality Control";
		let timeReq = "10";
		this.displayedInfo = [];
		this.displayedInfo[0] = ("QC Time Req.: " + timeReq + "m");
	}
}

class totalBrick {
	constructor() {
		this.color = "orange";
		this.nodeIn = 1;
		this.nodeOut = 0;
		this.spawnText = "Total";
		let total = "0";
		this.displayedInfo = [];
		this.displayedInfo[0] = ("Total: $" + total);
	}
}

class splitBrick {
	constructor() {
		this.color = "orange";
		this.nodeIn = 1;
		this.nodeOut = 2;
		this.spawnText = "Splitter";
		let value = "0";
		this.displayedInfo = [];
		this.displayedInfo[0] = ("Value to split: " + value);
	}
}

class addBrick {
	constructor() {
		this.color = "yellow";
		this.nodeIn = 2;
		this.nodeOut = 1;
		this.spawnText = "Adder";
		let val1 = "0",
		val2 = "1",
		out = val1+val2;
		this.displayedInfo = [];
		this.displayedInfo[0] = (val1 + " + " + val2 + " =");
		this.displayedInfo[1] = out;
	}
}

class subBrick {
	constructor() {
		this.color = "yellow";
		this.nodeIn = 1;
		this.nodeOut = 1;
		this.spawnText = "Subtracter";
		let val1 = "0",
		val2 = "1",
		out = val1-val2;
		this.displayedInfo = [];
		this.displayedInfo[0] = (val1 + " - " + val2 + " =");
		this.displayedInfo[1] = out;
	}
}

class multBrick {
	constructor() {
		this.color = "yellow";
		this.nodeIn = 1;
		this.nodeOut = 1;
		this.spawnText = "Multiplier";
		let val1 = "0",
		val2 = "1",
		out = val1*val2;
		this.displayedInfo = [];
		this.displayedInfo[0] = (val1 + " x " + val2 + " =");
		this.displayedInfo[1] = out;
	}
}

class divBrick {
	constructor() {
		this.color = "yellow";
		this.nodeIn = 1;
		this.nodeOut = 1;
		this.spawnText = "Divider";
		let val1 = "0",
		val2 = "1",
		out = val1/val2;
		this.displayedInfo = [];
		this.displayedInfo[0] = (val1 + " / " + val2 + " =");
		this.displayedInfo[1] = out;
	}
}

class brick {
	constructor(posX, posY, brickType, spawner) {
		this.posX = posX;
		this.posY = posY;
		this.brickType = brickType;
		this.spawner = spawner;
	}
}

window.onload = function() {
	//Define constants
	const BRICKWIDTH = 200,
		BRICKHEIGHT = 50,
		SELECTERGAP = 5,
		NODEHEIGHT = 15,
		NODEWIDTH = 15,
		XSIZE=15;
	//Define canvas elements
	let canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		mouseX,
		mouseY,
		rect = canvas.getBoundingClientRect(),
		width = canvas.width = 2261,
		height = canvas.height = window.innerHeight/2,
		brickArray = [],
		selectedBrick = null;
		brickArray[0] = new brick(SELECTERGAP, 5, new baseBrick(), true);
		brickArray[1] = new brick(SELECTERGAP*2 + BRICKWIDTH, 5, new maskBrick(), true);
		brickArray[2] = new brick(SELECTERGAP*3 + BRICKWIDTH*2, 5, new rackBrick(), true);
		brickArray[3] = new brick(SELECTERGAP*4 + BRICKWIDTH*3, 5, new plateBrick(), true);
		brickArray[4] = new brick(SELECTERGAP*5 + BRICKWIDTH*4, 5, new qcBrick(), true);
		brickArray[5] = new brick(SELECTERGAP*6 + BRICKWIDTH*5, 5, new totalBrick(), true);
		brickArray[6] = new brick(SELECTERGAP*7 + BRICKWIDTH*6, 5, new splitBrick(), true);
		brickArray[7] = new brick(SELECTERGAP*8 + BRICKWIDTH*7, 5, new addBrick(), true);
		brickArray[8] = new brick(SELECTERGAP*9 + BRICKWIDTH*8, 5, new subBrick(), true);
		brickArray[9] = new brick(SELECTERGAP*10 + BRICKWIDTH*9, 5, new multBrick(), true);
		brickArray[10] = new brick(SELECTERGAP*11 + BRICKWIDTH*10, 5, new divBrick(), true);
		let clearScreenButton = document.getElementById("sCButton");
		clearScreenButton.onclick = clearScreen;
	draw();

	function draw() {
		context.clearRect(0, 0, width, height);
		for(iterator = 0; iterator < brickArray.length; iterator++){
			iBrick = brickArray[iterator];
			if(iBrick != null){
				drawBrick(iBrick);
				drawXBox(iBrick);
				drawBrickInfo(iBrick);
			}
		}
	}

	function clearScreen(){
		for (iterator = 11; iterator < brickArray.length; iterator++){
			console.log("clearing id: " + iterator);
			brickArray[iterator] = null;
		}
		draw();
	}

	function drawBrick(brickIn){
		context.fillStyle = brickIn.brickType.color;
		context.fillRect(brickIn.posX, brickIn.posY, BRICKWIDTH,  BRICKHEIGHT);
		context.fillStyle = "black";
		context.strokeRect(brickIn.posX, brickIn.posY, BRICKWIDTH,  BRICKHEIGHT);
	}

	function drawBrickInfo(brickIn){
		if(iBrick.spawner === false){
			context.font = "15px Arial";
			lineSpacing = BRICKHEIGHT / brickIn.brickType.displayedInfo.length;
			for(i = 0; i < brickIn.brickType.displayedInfo.length; i++){
				let wordSize = context.measureText(brickIn.brickType.displayedInfo[i]);
				context.fillText(brickIn.brickType.displayedInfo[i], brickIn.posX + BRICKWIDTH/2 - wordSize.width/2, brickIn.posY + lineSpacing*(i)+15);
			}
		} else {
			context.fillStyle = "black";
			context.font = "15px Arial";
			let textSize = context.measureText(brickIn.brickType.spawnText);
			context.fillText(brickIn.brickType.spawnText, brickIn.posX + BRICKWIDTH/2 - textSize.width/2, brickIn.posY + BRICKHEIGHT/2);
		}
	}

	function drawXBox(brickIn){
		if(iBrick.spawner === false){
			context.fillStyle = "red";
			context.fillRect(brickIn.posX + BRICKWIDTH-XSIZE, brickIn.posY, XSIZE, XSIZE);
			context.fillStyle = "black";
			context.strokeRect(brickIn.posX + BRICKWIDTH-XSIZE - 1, brickIn.posY + 1, XSIZE, XSIZE);
			context.font = "20px Arial";
			context.fillText("x", brickIn.posX + BRICKWIDTH - XSIZE + 2, brickIn.posY - 1 + XSIZE);
		}
	}



	document.body.addEventListener("mousedown", function(event) {
		updateMouse();
		console.log("Mouse Clicked.");
		for(iterator = 0; iterator < brickArray.length; iterator++){
			if(brickArray[iterator] != null && brickArray[iterator].posX < mouseX
				 && brickArray[iterator].posX + BRICKWIDTH > mouseX
				 && brickArray[iterator].posY < mouseY
				 && brickArray[iterator].posY + BRICKHEIGHT > mouseY){
					 console.log("Brick Clicked: ")
					 if(brickArray[iterator].spawner === false){
						if(brickArray[iterator].posX + BRICKWIDTH - XSIZE < mouseX
							&& brickArray[iterator].posY + XSIZE > mouseY){
							brickArray[iterator] = null;
							selectedBrick = null;
							console.log("Deleted brick: " + iterator);
							break;
							}
						selectedBrick = brickArray[iterator];
						console.log("Selected brick: " + iterator);
						xOff = mouseX - selectedBrick.posX;
						yOff = mouseY - selectedBrick.posY;
					 }else{
						brickArray[brickArray.length] = new brick(mouseX-BRICKWIDTH/2, mouseY-BRICKHEIGHT/2, brickArray[iterator].brickType, false);
						console.log("Spawned new brick: " + iterator);
					}
			}
		}
		document.body.addEventListener("mousemove", onMouseMove);
		draw();
		document.body.addEventListener("mouseup", onMouseUp);
	});

	function onMouseMove(event) {
		updateMouse();
		console.log((mouseY + BRICKHEIGHT) + " <= " + rect.bottom + " = " + ((mouseY + BRICKHEIGHT) < rect.bottom));
		if(selectedBrick != null){
			if((mouseY + BRICKHEIGHT) < rect.bottom){
				selectedBrick.posX = mouseX - xOff;
				selectedBrick.posY = mouseY - yOff;
				draw();
			}
		}
	}

	function onMouseUp(event) {
		console.log("Deselected brick: " + selectedBrick);
		selectedBrick = null;
		document.body.removeEventListener("mousemove", onMouseMove);
		document.body.removeEventListener("mouseup", onMouseUp);
	}

	function updateMouse(){
		rect = canvas.getBoundingClientRect();
		mouseX = event.clientX - rect.left;
		mouseY = event.clientY - rect.top;
	}
};