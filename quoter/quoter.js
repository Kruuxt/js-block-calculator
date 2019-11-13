//Define constants
const BRICKWIDTH = 200,
	BRICKHEIGHT = 50,
	SELECTERGAP = 5,
	SELECTHEIGHT = (BRICKHEIGHT * 2) + (SELECTERGAP * 3),
	NODEHEIGHT = 30,
	NODEWIDTH = 15,
	XSIZE=15;
let randomNumber = 100;

class baseBrick {
	constructor() {
		this.color = "gray";
		this.nodeIn = 0;
		this.nodeOut = 1;
		this.spawnText = "Base Material";
		let baseMaterial = "copper",
		surfaceArea = 123;
		this.displayedInfo = [];
		this.displayedInfo[0] = ("Base Mat.: " + baseMaterial);
		this.displayedInfo[1] = ("S.A.: " + surfaceArea);
	}

	generateString(vIn, out){
		let nullIn = false;
		let displayInfo = []
		displayInfo[0] = ("Temporarily outputting: ");
		if(nullIn){
			displayInfo[1] = "Input Empty";
		}else{
			displayInfo[1] = out;
		}
		return displayInfo;
	}

	calculate(vIn){
		return randomNumber;
	}
}

class maskBrick {
	constructor() {
		this.color = "green";
		this.nodeIn = 1;
		this.nodeOut = 1;
		this.spawnText = "Mask/Unmask";
		let timeReq = 10;
	}
	
	generateString(){
		let displayedInfo = [("Mask Time Req.: " + this.timeReq + "m")];
		return displayedInfo;
	}

	generateString(vIn, out){
		let nullIn = false;
		let topRow = [""]
		let displayInfo = []
		for(let i in vIn)
			if(vIn[i] != null)
				topRow[i].concat(vIn[i]);
				else{
					topRow[i].concat("No Input");
					nullIn = true;
				}
		displayInfo[0] = (topRow[0] + " - " + topRow[1] + " =");
		if(nullIn)
			displayInfo[1] = "Input Empty";
			else
			displayInfo[1] = out[0];
			
		return displayInfo;
	}

	calculate(vIn){
		if(vIn[0] != null && vIn[1] != null){
			let result = [vIn[0]*vIn[1]];
			this.generateString(vIn, result);
			return result;
		}else{
			return null;
		}
	}
}

class rackBrick {
	constructor() {
		this.color = "green";
		this.nodeIn = 1;
		this.nodeOut = 1;
		this.spawnText = "Rack/Unrack";
		let timeReq = 10;
	}

	generateString(vIn, out){
		let nullIn = false;
		let topRow = [""]
		let displayInfo = []
		for(let i in vIn)
			if(vIn[i] != null)
				topRow[i].concat(vIn[i]);
				else{
					topRow[i].concat("No Input");
					nullIn = true;
				}
		displayInfo[0] = (topRow[0] + " - " + topRow[1] + " =");
		if(nullIn)
			displayInfo[1] = "Input Empty";
			else
			displayInfo[1] = out[0];
			
		return displayInfo;
	}

	calculate(vIn){
		if(vIn[0] != null && vIn[1] != null){
			let result = [vIn[0]*vIn[1]];
			this.generateString(vIn, result);
			return result;
		}else{
			return null;
		}
	}
}

class plateBrick {
	constructor() {
		this.color = "blue";
		this.nodeIn = 1;
		this.nodeOut = 1;
		this.spawnText = "Plating Layer";
		this.plateMat = "copper";
		this.depth = 0.00005;
	}

	generateString(vIn, out){
		let nullIn = false;
		let topRow = [""]
		let displayInfo = []
		for(let i in vIn)
			if(vIn[i] != null)
				topRow[i].concat(vIn[i]);
				else{
					topRow[i].concat("No Input");
					nullIn = true;
				}
		displayInfo[0] = (topRow[0] + " - " + topRow[1] + " =");
		if(nullIn)
			displayInfo[1] = "Input Empty";
			else
			displayInfo[1] = out[0];
			
		return displayInfo;
	}

	calculate(vIn){
		if(vIn[0] != null && vIn[1] != null){
			let result = [vIn[0]*vIn[1]];
			this.generateString(vIn, result);
			return result;
		}else{
			return null;
		}
	}
}

class qcBrick {
	constructor() {
		this.color = "green";
		this.nodeIn = 1;
		this.nodeOut = 1;
		this.spawnText = "Quality Control";
		let timeReq = 10;
	}

	generateString(vIn, out){
		let nullIn = false;
		let topRow = [""]
		let displayInfo = []
		for(let i in vIn)
			if(vIn[i] != null)
				topRow[i].concat(vIn[i]);
				else{
					topRow[i].concat("No Input");
					nullIn = true;
				}
		displayInfo[0] = (topRow[0] + " - " + topRow[1] + " =");
		if(nullIn)
			displayInfo[1] = "Input Empty";
			else
			displayInfo[1] = out[0];
			
		return displayInfo;
	}

	calculate(vIn){
		if(vIn[0] != null && vIn[1] != null){
			let result = [vIn[0]*vIn[1]];
			return result;
		}else{
			return null;
		}
	}
}

class totalBrick {
	constructor() {
		this.color = "orange";
		this.nodeIn = 1;
		this.nodeOut = 0;
		this.spawnText = "Total";
	}

	generateString(vIn, out){
		let displayInfo = ["Total:"];

		if(vIn[0] != null)
			displayInfo[1] = vIn[0];
		else
			displayInfo[1] = "No Input";
			
		return displayInfo;
	}

	calculate(vIn){
		return null;
	}
}

class splitBrick {
	constructor() {
		this.color = "orange";
		this.nodeIn = 1;
		this.nodeOut = 2;
		this.spawnText = "Splitter";
	}

	generateString(vIn, out){
		let displayInfo = [];
		if(vIn[0] === null){
			displayInfo[0] = "Input Empty";
		} else {
			displayInfo[0] = vIn[0];
			displayInfo[1] = [out + " | " + out];
		}
		return displayInfo;
	}

	calculate(vIn){
		if(vIn[0] != null){
			return vIn[0];
		}else{
			return null;
		}
	}
}

class addBrick {
	constructor() {
		this.color = "yellow";
		this.nodeIn = 2;
		this.nodeOut = 1;
		this.spawnText = "Adder";
	}

	generateString(vIn, out){
		let nullIn = false;
		let topRow = ["", ""]
		let displayInfo = []
		for(let i in vIn){
			if(vIn[i] != null){
				topRow[i] = topRow[i].concat(vIn[i]);
			}else{
				topRow[i] = topRow[i].concat("No Input");
				nullIn = true;
			}
		}
		displayInfo[0] = (topRow[0] + " + " + topRow[1] + " =");
		if(nullIn)
			displayInfo[1] = "Input Empty";
		else
			displayInfo[1] = out;
			
		return displayInfo;
	}

	calculate(vIn){
		if(vIn[0] != null && vIn[1] != null){
			return vIn[0]+vIn[1];
		}else{
			return null;
		}
	}
}

class subBrick {
	constructor() {
		this.color = "yellow";
		this.nodeIn = 2;
		this.nodeOut = 1;
		this.spawnText = "Subtracter";
	}

	generateString(vIn, out){
		let nullIn = false;
		let topRow = ["", ""]
		let displayInfo = []
		for(let i in vIn){
			if(vIn[i] != null){
				topRow[i] = topRow[i].concat(vIn[i]);
			}else{
				topRow[i] = topRow[i].concat("No Input");
				nullIn = true;
			}
		}
		displayInfo[0] = (topRow[0] + " - " + topRow[1] + " =");
		if(nullIn)
			displayInfo[1] = "Input Empty";
		else
			displayInfo[1] = out;
			
		return displayInfo;
	}

	calculate(vIn){
		if(vIn[0] != null && vIn[1] != null){
			return vIn[0]-vIn[1];
		}else{
			return null;
		}
	}
}

class multBrick {
	constructor() {
		this.color = "yellow";
		this.nodeIn = 2;
		this.nodeOut = 1;
		this.spawnText = "Multiplier";
	}

	generateString(vIn, out){
		let nullIn = false;
		let topRow = ["", ""]
		let displayInfo = []
		for(let i in vIn){
			if(vIn[i] != null){
				topRow[i] = topRow[i].concat(vIn[i]);
			}else{
				topRow[i] = topRow[i].concat("No Input");
				nullIn = true;
			}
		}
		displayInfo[0] = (topRow[0] + " * " + topRow[1] + " =");
		if(nullIn)
			displayInfo[1] = "Input Empty";
		else
			displayInfo[1] = out;
			
		return displayInfo;
	}

	calculate(vIn){
		if(vIn[0] != null && vIn[1] != null){
			return vIn[0]*vIn[1];
		}else{
			return null;
		}
	}
}

class divBrick {
	constructor() {
		this.color = "yellow";
		this.nodeIn = 2;
		this.nodeOut = 1;
		this.spawnText = "Divider";
	}

	generateString(vIn, out){
		let nullIn = false;
		let topRow = ["", ""]
		let displayInfo = []
		for(let i in vIn){
			if(vIn[i] != null){
				topRow[i] = topRow[i].concat(vIn[i]);
			}else{
				topRow[i] = topRow[i].concat("No Input");
				nullIn = true;
			}
		}
		displayInfo[0] = (topRow[0] + " / " + topRow[1] + " =");
		if(nullIn)
			displayInfo[1] = "Input Empty";
		else
			displayInfo[1] = out;
			
		return displayInfo;
	}

	calculate(vIn){
		if(vIn[0] != null && vIn[1] != null){
			return vIn[0]/vIn[1];
		}else{
			return null;
		}
	}
}

class brick {
	constructor(posX, posY, brickType, spawner) {
		this.posX = posX,
		this.posY = posY,
		this.brickType = brickType,
		this.spawner = spawner,
		this.nodeArray = [],
		this.xBox = new xBox(this, this.posX + BRICKWIDTH - XSIZE, this.posY, this.posX, this.posY);
		this.vIn = [];
		this.out = [];
		this.initializeNodes();
	}


	initializeNodes(){
		//Input nodes
		if(this.brickType.nodeIn > 0){
			let iNSpacing = BRICKWIDTH / (this.brickType.nodeIn + 1);
			for(let counter = 0; counter < this.brickType.nodeIn; counter++){
				this.nodeArray[this.nodeArray.length] = new Node(true, this,
					this.posX + (iNSpacing*(counter+1)) - (NODEWIDTH/2),
					 this.posY - (NODEHEIGHT/2), this.posX, this.posY, counter);
			}
		}
		//Output nodes
		if(this.brickType.nodeOut > 0){
			let oNSpacing = BRICKWIDTH / (this.brickType.nodeOut + 1);
			for(let counter = 0; counter < this.brickType.nodeOut; counter++){
				this.nodeArray[this.nodeArray.length] = new Node(false, this,
					this.posX + (oNSpacing*(counter+1)) - (NODEWIDTH/2),
					 this.posY + BRICKHEIGHT - (NODEHEIGHT/2), this.posX, this.posY, counter);
			}
		}
	}

	drawNodes(context){
		for(let i = 0; i < this.nodeArray.length; i++)
			this.nodeArray[i].draw(context);
	}

	updateBrick(){
		for(i in this.nodeArray)
			this.nodeArray[i].update();
		this.xBox.update();
	}

	checkClick(x, y){
		if(this.posX < x && this.posX + BRICKWIDTH > x && this.posY < y && this.posY + BRICKHEIGHT > y){
			return true;
		}else{
			return false;
		}
	}

	moveBrick(x, y, rect){
		if(x < rect.left){
			this.posX = rect.left;
		}else if(x + BRICKWIDTH > rect.right){
			this.posX = rect.right - BRICKWIDTH;
		}else{
			this.posX = x;
		}
		
		if(y < rect.top + SELECTHEIGHT + (NODEHEIGHT/2)){
			this.posY = rect.top + SELECTHEIGHT + (NODEHEIGHT/2);
		}else if(y + (2 * BRICKHEIGHT) - 13 > rect.bottom){
			this.posY = rect.bottom - (2 * BRICKHEIGHT) + 13;
		}else{
			this.posY = y;
		}
	}

	draw(context){
		context.lineWidth = 2;
		context.fillStyle = this.brickType.color;
		context.fillRect(this.posX, this.posY, BRICKWIDTH,  BRICKHEIGHT);
		context.fillStyle = "black";
		context.strokeRect(this.posX, this.posY, BRICKWIDTH,  BRICKHEIGHT);
		context.fillStyle = "black";
		context.font = "15px Arial";
		this.updateNodeValues();
		if(!this.spawner){
			let lineSpacing = BRICKHEIGHT / this.brickType.generateString(this.vIn, this.out).length;
			for(i = 0; i < this.brickType.generateString(this.vIn, this.out).length; i++){
				let wordSize = context.measureText(this.brickType.generateString(this.vIn, this.out)[i]);
				context.fillText(this.brickType.generateString(this.vIn, this.out)[i], this.posX + BRICKWIDTH/2 - wordSize.width/2, this.posY + lineSpacing*(i)+15);
			}
		} else {
			let textSize = context.measureText(this.brickType.spawnText);
			context.fillText(this.brickType.spawnText, this.posX + BRICKWIDTH/2 - textSize.width/2, this.posY + BRICKHEIGHT/2);
		}
	}

	updateNodeValues(){
		for(let j in this.nodeArray){
			this.nodeArray[j].updateValue();
		}

		for (let butt = 0; butt < this.brickType.nodeIn; butt++){
			this.vIn[butt] = this.nodeArray[butt].value;
		}

		this.out = this.brickType.calculate(this.vIn);
	}

	suicide(){
		for(let i in this.nodeArray){
			this.nodeArray[i].disconnect();
		}
	}

	drawNodeLines(context){
		context.lineWidth = 2;
		for(let i in this.nodeArray){
			let iNode = this.nodeArray[i];
			if(iNode.connectedNode != null && iNode.connectedNode != undefined && iNode.inNode){
				context.beginPath();
				context.moveTo(iNode.findCenter().x, iNode.findCenter().y);
				context.lineTo(iNode.connectedNode.findCenter().x, iNode.connectedNode.findCenter().y);
				context.stroke();
			}
		}
	}
}

class xBox {
	constructor(iBrick, posX, posY, startX, startY){
		this.iBrick = iBrick,
		this.posX = posX,
		this.posY = posY,
		this.startX = startX,
		this.startY = startY;
	}

	draw(context){
		if(!iBrick.spawner){
			context.lineWidth = 2;
			context.fillStyle = "red";
			context.fillRect(this.posX, this.posY, XSIZE, XSIZE);
			context.fillStyle = "black";
			context.strokeRect(this.posX, this.posY, XSIZE, XSIZE);
			context.font = "20px Arial";
			context.fillText("x", this.posX + 3, this.posY - 2 + XSIZE);
		}
	}

	update(){
		this.posX += this.iBrick.posX-this.startX;
		this.startX = this.iBrick.posX;
		this.posY += this.iBrick.posY-this.startY;
		this.startY = this.iBrick.posY;
}

	checkClick(x, y){
		if(this.posX < x && this.posX + XSIZE > x && this.posY < y && this.posY + XSIZE > y && !this.iBrick.spawner){
			return true;
		}else{
			return false;
		}
	}
}

class Node {
	constructor(inNode, iBrick, posX, posY, startX, startY, id) {
		this.inNode = inNode;
		this.iBrick = iBrick;
		this.posX = posX;
		this.posY = posY;
		this.startX = startX;
		this.startY = startY;
		this.connectedNode = null;
		this.id = id;
		this.value = null;
		this.isConnected = false;
	}

	hitBox(){
		if(this.inNode){
			return{
				x1: this.posX,
				x2: this.posX+NODEWIDTH,
				y1: this.posY,
				y2: this.posY+NODEHEIGHT/2
			};
		}else{
			return{
				x1: this.posX,
				x2: this.posX+NODEWIDTH,
				y1: this.posY+NODEHEIGHT/2,
				y2: this.posY+NODEHEIGHT
			}
		}
	}

	findCenter(){
		if(this.inNode){
			return{
				x: this.posX + NODEWIDTH/2,
				y: this.posY + NODEHEIGHT/4
			};
		}else{
			return{
				x: this.posX + NODEWIDTH/2,
				y: this.posY + 3*NODEHEIGHT/4
			}
		}
	}

	disconnect(){
		if(this.inNode)
			this.value = null;
		if(this.connectedNode != null){
			if(!this.inNode)
				this.connectedNode.value = null;
			this.connectedNode.isConnected = false;
			this.connectedNode.connectedNode = null;
			this.connectedNode = null;
		}
	}

	updateValue(){
		if(this.inNode && this.isConnected)
			this.value = this.connectedNode.iBrick.out;
	}


	connect(otherNode){
		if(this.inNode){
			this.disconnect();
			if(otherNode.isConnected){
				for(let i in brickArray){
					for(let j in brickArray[i].nodeArray){
						if (brickArray[i].nodeArray[j] === otherNode && brickArray[i].nodeArray[j] != this){
							brickArray[i].nodeArray[j].disconnect(true);
						}
					}
				}
			}
			this.isConnected = true;
			this.connectedNode = otherNode;
			this.connectedNode.isConnected = true;
			this.connectedNode.connectedNode = this;
			this.value = this.connectedNode.iBrick.out;
		}else{
			otherNode.connect(this);
		}
	}

	update(){
			this.posX += this.iBrick.posX-this.startX;
			this.startX = this.iBrick.posX;
			this.posY += this.iBrick.posY-this.startY;
			this.startY = this.iBrick.posY;
	}

	checkClick(x, y){
		if(this.hitBox().x1 < x && this.hitBox().x2 > x
		&& this.hitBox().y1 < y && this.hitBox().y2 > y
		&& !this.iBrick.spawner){
			return true;
		}else{
			return false;
		}
	}

	draw(context){
		context.lineWidth = 2;
		context.fillStyle = this.iBrick.brickType.color;
		context.fillRect(this.posX, this.posY, NODEWIDTH, NODEHEIGHT);
		context.fillStyle = "black";
		context.strokeRect(this.posX, this.posY, NODEWIDTH, NODEHEIGHT);
	}
}
	
let brickArray = [new brick(SELECTERGAP, 5, new baseBrick(), true),
	new brick(SELECTERGAP*2 + BRICKWIDTH, 5, new maskBrick(), true),
	new brick(SELECTERGAP*3 + BRICKWIDTH*2, 5, new rackBrick(), true),
	new brick(SELECTERGAP*4 + BRICKWIDTH*3, 5, new plateBrick(), true),
	new brick(SELECTERGAP*5 + BRICKWIDTH*4, 5, new qcBrick(), true),
	new brick(SELECTERGAP*6 + BRICKWIDTH*5, 5, new totalBrick(), true),
	new brick(SELECTERGAP*1, BRICKHEIGHT + 10, new splitBrick(), true),
	new brick(SELECTERGAP*2 + BRICKWIDTH, BRICKHEIGHT + 10, new addBrick(), true),
	new brick(SELECTERGAP*3 + BRICKWIDTH*2, BRICKHEIGHT + 10, new subBrick(), true),
	new brick(SELECTERGAP*4 + BRICKWIDTH*3, BRICKHEIGHT + 10, new multBrick(), true),
	new brick(SELECTERGAP*5 + BRICKWIDTH*4, BRICKHEIGHT + 10, new divBrick(), true)];


window.onload = function() {
	//Define canvas elements
	let canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		mouseX,
		mouseY,
		rect = canvas.getBoundingClientRect(),
		width = canvas.width = 1235,
		height = canvas.height = window.innerHeight*(4/5),
		selectedBrick = null,
		selectedNode = null,
		clearScreenButton = document.getElementById("sCButton");
		clearScreenButton.onclick = clearScreen;
		rngButton = document.getElementById("RNG");
		rngButton.onclick = rng;
	draw();

	function draw() {
		context.clearRect(0, 0, width, height);
	
		for(i in brickArray){
			if(brickArray[i] != null) brickArray[i].drawNodeLines(context);
		}
		for(i in brickArray){
			iBrick = brickArray[i];
			if(iBrick != null){
				iBrick.updateBrick();
				iBrick.drawNodes(context);
				iBrick.draw(context);
				iBrick.xBox.draw(context);
			}
		}
		context.lineWidth = 2;
		context.beginPath();
		context.moveTo(rect.left, rect.top + SELECTHEIGHT);
		context.lineTo(width, rect.top + SELECTHEIGHT);
		context.stroke();
	}

	function line(x1, y1, x2, y2){
		context.beginPath();
		context.moveTo(x1, y1);
		context.lineTo(x2, y2);
		context.stroke();
	}

	function clickChecker(){
		for(i in brickArray){
			if(brickArray[i] != null && brickArray[i] != undefined) 
			iBrick = brickArray[i];
			if(iBrick.checkClick(mouseX, mouseY)){
				selectedBrick = iBrick;
				xOff = mouseX - selectedBrick.posX;
				yOff = mouseY - selectedBrick.posY;
				if(iBrick.spawner){
					selectedBrick = brickArray[brickArray.length] = new brick(mouseX-xOff,
						rect.top + SELECTHEIGHT + (NODEHEIGHT/2), iBrick.brickType, false);
				}
				if(iBrick.xBox.checkClick(mouseX, mouseY)){
					iBrick.suicide();
					brickArray[i] = null;
					selectedBrick = null;
					break;
				}
			}
			
			for(i in iBrick.nodeArray){
				iNode = iBrick.nodeArray[i];
				if(iNode.checkClick(mouseX, mouseY)){
						selectedNode = iNode;
						selectedNode.disconnect();
				}
			}
		}
	}

	function updateMouse(){
		rect = canvas.getBoundingClientRect();
		mouseX = event.clientX - rect.left;
		mouseY = event.clientY - rect.top;
	}

	document.body.addEventListener("mousedown", function(event) {
		updateMouse();
		clickChecker();
		document.body.addEventListener("mousemove", onMouseMove);
		document.body.addEventListener("mouseup", onMouseUp);
		draw();
	});

	function onMouseMove(event) {
		updateMouse();
		if(selectedBrick != null){
			selectedBrick.moveBrick(mouseX - xOff, mouseY - yOff, rect);
			selectedBrick.updateBrick();
			draw();
		}
		if(selectedNode != null){
			draw();
			context.lineWidth = 5;
			line(selectedNode.findCenter().x, selectedNode.findCenter().y, mouseX, mouseY);
		}
	}

	function onMouseUp(event) {
		updateMouse();
		selectedBrick = null;
		if(selectedNode != null){
			for(i in brickArray){
				if(brickArray[i] != null && brickArray[i] != undefined){
					iBrick = brickArray[i];
				}
				for(i in iBrick.nodeArray){
					iNode = iBrick.nodeArray[i];
					if(iNode != null && iNode != undefined && iNode.checkClick(mouseX, mouseY)
					&& iNode.iBrick != selectedNode.iBrick && iNode.inNode != selectedNode.inNode){
							selectedNode.connect(iNode);
							selectedNode = null;
							break;
					}
				}

			}
		}
		if(selectedNode != null) selectedNode.disconnect();
		selectedNode = null;
		document.body.removeEventListener("mousemove", onMouseMove);
		document.body.removeEventListener("mouseup", onMouseUp);
		draw();
	}

	function clearScreen(){
		for (iterator = 11; iterator < brickArray.length; iterator++){
			brickArray[iterator] = null;
		}
		draw();
	}

	function rng(){
		randomNumber = Math.round(Math.random()*100);
		draw();
		draw();
	}
};