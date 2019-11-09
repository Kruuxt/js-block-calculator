//Define constants
const BRICKWIDTH = 200,
	BRICKHEIGHT = 50,
	SELECTERGAP = 5,
	NODEHEIGHT = 30,
	NODEWIDTH = 15,
	XSIZE=15;

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
		let vIn = "0";
		this.displayedInfo = [];
		this.displayedInfo[0] = ("Total: $" + vIn);
	}
}

class splitBrick {
	constructor() {
		this.color = "orange";
		this.nodeIn = 1;
		this.nodeOut = 2;
		this.spawnText = "Splitter";
		let vIn = "0",
			out = vIn;
		this.displayedInfo = [];
		this.displayedInfo[0] = ("Value to split: " + vIn);
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
		this.nodeIn = 2;
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
		this.nodeIn = 2;
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
		this.nodeIn = 2;
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
		this.posX = posX,
		this.posY = posY,
		this.brickType = brickType,
		this.spawner = spawner,
		this.nodeArray = [],
		this.xBox = new xBox(this, this.posX + BRICKWIDTH - XSIZE, this.posY, this.posX, this.posY);
		//Input nodes
		if(brickType.nodeIn > 0){
			let iNSpacing = BRICKWIDTH / (brickType.nodeIn + 1);
			for(let counter = 0; counter < brickType.nodeIn; counter++){
				this.nodeArray[this.nodeArray.length] = new Node(true, this,
					this.posX + (iNSpacing*(counter+1)) - (NODEWIDTH/2), this.posY - (NODEHEIGHT/2), this.posX, this.posY);
			}
		}
		//Output nodes
		if(brickType.nodeOut > 0){
			let oNSpacing = BRICKWIDTH / (brickType.nodeOut + 1);
			for(let counter = 0; counter < brickType.nodeOut; counter++){
				this.nodeArray[this.nodeArray.length] = new Node(false, this,
					this.posX + (oNSpacing*(counter+1)) - (NODEWIDTH/2), this.posY + BRICKHEIGHT - (NODEHEIGHT/2), this.posX, this.posY);
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

	draw(context){
		context.lineWidth = 2;
		context.fillStyle = this.brickType.color;
		context.fillRect(this.posX, this.posY, BRICKWIDTH,  BRICKHEIGHT);
		context.fillStyle = "black";
		context.strokeRect(this.posX, this.posY, BRICKWIDTH,  BRICKHEIGHT);
		context.fillStyle = "black";
		context.font = "15px Arial";
		if(!this.spawner){
			let lineSpacing = BRICKHEIGHT / this.brickType.displayedInfo.length;
			for(i = 0; i < this.brickType.displayedInfo.length; i++){
				let wordSize = context.measureText(this.brickType.displayedInfo[i]);
				context.fillText(this.brickType.displayedInfo[i], this.posX + BRICKWIDTH/2 - wordSize.width/2, this.posY + lineSpacing*(i)+15);
			}
		} else {
			let textSize = context.measureText(this.brickType.spawnText);
			context.fillText(this.brickType.spawnText, this.posX + BRICKWIDTH/2 - textSize.width/2, this.posY + BRICKHEIGHT/2);
		}
	}

	suicide(){
		for(let iter in this.nodeArray){
			this.nodeArray[iter].disconnect();
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
		if(this.posX < x && this.posX + XSIZE > x && this.posY < y && this.posY + XSIZE > y){
			return true;
		}else{
			return false;
		}
	}
}

class Node {
	constructor(inNode, iBrick, posX, posY, startX, startY) {
		this.inNode = inNode;
		this.iBrick = iBrick;
		this.posX = posX;
		this.posY = posY;
		this.startX = startX;
		this.startY = startY;
		this.connectedNode = null;
		this.value;
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
		if(this.connectedNode != null){
			if(this.connectedNode.connectedNode != null)
				this.connectedNode.connectedNode = null;
			this.connectedNode = null;
		}
	}

	connect(otherNode){
		otherNode.disconnect();
		console.log("connecting nodes.");
		this.connectedNode = otherNode;
		otherNode.connectedNode = this;
	}

	update(){
			this.posX += this.iBrick.posX-this.startX;
			this.startX = this.iBrick.posX;
			this.posY += this.iBrick.posY-this.startY;
			this.startY = this.iBrick.posY;
	}

	checkClick(x, y){
		if(this.hitBox().x1 < x && this.hitBox().x2 > x && this.hitBox().y1 < y && this.hitBox().y2 > y){
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
		if(this.connectedNode != null && this.connectedNode != undefined){
			context.beginPath();
			context.moveTo(this.findCenter().x, this.findCenter().y);
			context.lineTo(this.connectedNode.findCenter().x, this.connectedNode.findCenter().y);
			context.stroke();
	
		}
	}
}

window.onload = function() {
	//Define canvas elements
	let canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		mouseX,
		mouseY,
		rect = canvas.getBoundingClientRect(),
		width = canvas.width = 1235,
		height = canvas.height = window.innerHeight*(4/5),
		brickArray = [new brick(SELECTERGAP, 5, new baseBrick(), true),
			new brick(SELECTERGAP*2 + BRICKWIDTH, 5, new maskBrick(), true),
			new brick(SELECTERGAP*3 + BRICKWIDTH*2, 5, new rackBrick(), true),
			new brick(SELECTERGAP*4 + BRICKWIDTH*3, 5, new plateBrick(), true),
			new brick(SELECTERGAP*5 + BRICKWIDTH*4, 5, new qcBrick(), true),
			new brick(SELECTERGAP*6 + BRICKWIDTH*5, 5, new totalBrick(), true),
			new brick(SELECTERGAP*1, BRICKHEIGHT + 10, new splitBrick(), true),
			new brick(SELECTERGAP*2 + BRICKWIDTH, BRICKHEIGHT + 10, new addBrick(), true),
			new brick(SELECTERGAP*3 + BRICKWIDTH*2, BRICKHEIGHT + 10, new subBrick(), true),
			new brick(SELECTERGAP*4 + BRICKWIDTH*3, BRICKHEIGHT + 10, new multBrick(), true),
			new brick(SELECTERGAP*5 + BRICKWIDTH*4, BRICKHEIGHT + 10, new divBrick(), true)],
		selectedBrick = null,
		selectedNode = null,
		clearScreenButton = document.getElementById("sCButton");
		clearScreenButton.onclick = clearScreen;
	draw();

	function draw() {
		context.clearRect(0, 0, width, height);
		for(i in brickArray){
			iBrick = brickArray[i];
			if(iBrick != null){
				iBrick.updateBrick();
				iBrick.drawNodes(context);
				iBrick.draw(context);
				iBrick.xBox.draw(context);
			}
		}
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
						 mouseY-yOff, iBrick.brickType, false);
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
						console.log("Selected node: " + selectedNode);
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
			if((mouseY + BRICKHEIGHT) < rect.bottom){
				selectedBrick.posX = mouseX - xOff;
				selectedBrick.posY = mouseY - yOff;
				selectedBrick.updateBrick();
				draw();
			}
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
};