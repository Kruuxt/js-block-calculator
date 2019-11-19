//Define constants
const BRICKWIDTH = 200,
	BRICKHEIGHT = 50,
	SELECTORGAP = 5,
	SELECTHEIGHT = (BRICKHEIGHT * 2) + (SELECTORGAP * 2),
	NODEHEIGHT = 30,
	NODEWIDTH = 15,
	XSIZE=15,
	QCMINUTE=120/60,
	MASKMINUTE=100/60,
	COPPER = "Copper", STEEL = "Steel",	SS = "Stainless", ALUMINUM = "Aluminum",
	NICKEL= "Nickel", GOLD = "Gold", SILVER = "Silver",	NIBRON = "Nibron",
	TINLEAD = "Tin Lead", CADMIUM = "Cadmium", EN = "EN",
	BASEMATERIALS = [COPPER, NICKEL, STEEL, SS, ALUMINUM, NICKEL],
	PLATEMATERIALS = [CADMIUM, EN, GOLD, SILVER, NIBRON, TINLEAD];

class basicBrick{
	constructor(){
		this.color = "white",
		this.nodeIn = 0,
		this.nodeOut = 0,
		this.spawnText = "Undefined Brick",
		this.lastMetal = null,
		this.surfaceArea = null,
		this.iBrick = null,
		this.quantity = null;
	}
	displayFields(div){}
	setFields(){}
	generateString(vIn, out){ return null }
	calculate(vIn){ return null }
	initialize(iBrick){
		console.log("Initializing iBrick from " + this.iBrick);
		this.iBrick = iBrick;
		console.log("to" + this.iBrick);
	}

	getValue(element){
		if(element.value != "")
			return element.value;
		else
			return null;
	}
	
	appendVal(stringIn, value, undef){
		if(value != null){
			return stringIn.concat(value);
		}else if(undef){
			return stringIn.concat("Undefined");
		}else{
			return stringIn.concat("No Value");
		}
	}
}

class mathBrick extends basicBrick{
	constructor(){
		super();
		this.input1 = null,
		this.input2 = null;
	}

	displayFields(div){
		let in1Field = document.createElement("input");
		let in2Field = document.createElement("input");

		in1Field.id = "in1Field";
		in2Field.id = "in2Field";

		in1Field.value = this.input1;
		in2Field.value = this.input2;

		in1Field.placeholder = "Value 1";
		in2Field.placeholder = "Value 2";

		div.appendChild(in1Field);
		div.appendChild(in2Field);
	}

	setFields(){
		if(document.getElementById("in1Field").value != "")
			this.iBrick.nodeArray[0].hide();
		else 
			this.iBrick.nodeArray[0].show();

		if(document.getElementById("in2Field").value != "")
			this.iBrick.nodeArray[1].hide();
		else 
			this.iBrick.nodeArray[1].show();

		this.input1 = this.getValue(document.getElementById("in1Field"));
		this.input2 = this.getValue(document.getElementById("in2Field"));
	}
}

class baseBrick extends basicBrick{
	constructor() {
		super();
		this.color = "gray",
		this.spawnText = "Base Material",
		this.baseMaterial = null,
		this.nodeIn = 0,
		this.nodeOut = 1;
	}

	displayFields(div){
		let bmSelector = document.createElement("select"),
			optionList = this.getOptions(),
			surfaceArea = document.createElement("input"),
			quantity = document.createElement("input");

		for(let i in optionList)
			bmSelector.add(optionList[i]);

		bmSelector.value = this.lastMetal;
		surfaceArea.value = this.surfaceArea;
		quantity.value = this.quantity;

		surfaceArea.placeholder = "Surface Area";
		quantity.placeholder = "Quantity";

		bmSelector.id = "bmSelector";
		surfaceArea.id = "surfaceArea";
		quantity.id = "Quantity";

		div.appendChild(bmSelector);
		div.appendChild(surfaceArea);
		div.appendChild(quantity);
	}

	getOptions(){
		let optionList = [];
		for(let i in BASEMATERIALS){
			optionList[i] = document.createElement("option");
			optionList[i].value = BASEMATERIALS[i];
			optionList[i].text = BASEMATERIALS[i];
		}
		return optionList;
	}

	setFields(){
		this.baseMaterial = BASEMATERIALS[document.getElementById("bmSelector").selectedIndex];
		this.lastMetal = this.baseMaterial;
		this.surfaceArea = this.getValue(document.getElementById("surfaceArea"));
		this.quantity = this.getValue(document.getElementById("Quantity"));
	}

	generateString(vIn, out){
		let displayInfo = ["Base Material: ", "Surface Area: ", "Quantity: "];

		displayInfo[0] = this.appendVal(displayInfo[0], this.baseMaterial, true);
		displayInfo[1] = this.appendVal(displayInfo[1], this.surfaceArea, true);
		displayInfo[2] = this.appendVal(displayInfo[2], this.quantity, true);
		return displayInfo;
	}

	calculate(vIn){
		return 0;
	}
}

class maskBrick extends basicBrick{
	constructor() {
		super();
		this.color = "green",
		this.nodeIn = 1,
		this.nodeOut = 1,
		this.spawnText = "Mask/Unmask",
		this.timeReq = null;
	}

	displayFields(div){
		let timeReqIn = document.createElement("input");
		timeReqIn.value = this.timeReq;
		timeReqIn.placeholder = "Masking Time Required";
		timeReqIn.id = "timeReq";
		div.appendChild(timeReqIn);
	}

	setFields(){
		this.timeReq = this.getValue(document.getElementById("timeReq"));
	}

	generateString(vIn, out){
		let displayInfo = ["Mask Time: ", "Total Cost: "];
		displayInfo[0] = this.appendVal(displayInfo[0], this.timeReq, true);
		displayInfo[1] = this.appendVal(displayInfo[1], parseInt(this.timeReq) * MASKMINUTE, true);
		return displayInfo;
	}

	calculate(vIn){
		return (vIn[0] + (this.timeReq * MASKMINUTE));
	}
}

class rackBrick extends basicBrick{
	constructor() {
		super();
		this.color = "green";
		this.nodeIn = 1;
		this.nodeOut = 1;
		this.spawnText = "Rack/Unrack",
		this.features = null;
	}

	displayFields(div){
		let featuresIn = document.createElement("input");
		featuresIn.value = this.features;
		featuresIn.placeholder = "Racking Time Required";
		featuresIn.id = "features";
		div.appendChild(featuresIn);
	}

	setFields(){
		this.features = this.getValue(document.getElementById("features"));
	}

	generateString(vIn, out){
		let displayInfo = ["Rack Features: ", "Total Cost: "];
		displayInfo[0] = this.appendVal(displayInfo[0], this.features, true);
		displayInfo[1] = this.appendVal(displayInfo[1], parseInt(this.features) * .5 + .5, true);
		return displayInfo;
	}

	calculate(vIn){
		return vIn[0] + this.features*.5 + .5;
	}
}

class plateBrick extends basicBrick{
	constructor() {
		super();
		this.color = "blue",
		this.nodeIn = 1,
		this.nodeOut = 1,
		this.spawnText = "Plating Layer",
		this.plateMat = null,
		this.depth = null,
		this.multiplier = 1.8;
	}

		displayFields(div){
		let plateSelector = document.createElement("select"),
			optionList = this.getOptions(),
			plateDepth = document.createElement("input"),
			multiplier = document.createElement("input");

		for(let i in optionList)
			plateSelector.add(optionList[i]);

		plateSelector.value = this.lastMetal;
		plateDepth.value = this.depth;
		multiplier.value = this.multiplier;

		plateDepth.placeholder = "Plating Thickness";
		multiplier.placeholder = "Profit Multiplier";

		multiplier.id = "multiplier";
		plateSelector.id = "plateSelector";
		plateDepth.id = "plateDepth";

		div.appendChild(plateSelector);
		div.appendChild(plateDepth);
		div.appendChild(multiplier);
	}

	getOptions(){
		let optionList = [];
		for(let i in PLATEMATERIALS){
			optionList[i] = document.createElement("option");
			optionList[i].value = PLATEMATERIALS[i];
			optionList[i].text = PLATEMATERIALS[i];
		}
		return optionList;
	}

	setFields(){
		this.plateMat = PLATEMATERIALS[document.getElementById("plateSelector").selectedIndex];
		this.lastMetal = this.plateMat;
		this.depth = this.getValue(document.getElementById("plateDepth"));
		this.multiplier = this.getValue(document.getElementById("multiplier"));
	}

	generateString(vIn, out){
		let displayInfo = ["Plate Mat.: ", "Depth: "];
		displayInfo[0] = this.appendVal(displayInfo[0], this.plateMat, true);
		displayInfo[1] = this.appendVal(displayInfo[1], this.depth, true);
		return displayInfo;
	}

	getMatCost(material){
		switch(material){
			case "Cadmium":
				return 0.08;
				break;
			case "EN":
				return 0.01597;
				break;
			case "Gold":
				return 1.76;
				break;
			case "Silver":
				return 0.125;
				break;
			case "Nibron":
				return 0;
				break;
			case "Tin Lead":
				return .19;
				break;
			default:
				return 0;
				break;
		}
	}

	calculate(vIn){
		console.log("Depth: " + this.depth + ". Mult: " + 10000 + ". Mat Cost: " + this.getMatCost(this.lastMetal) + ". Surface Area: " + this.surfaceArea);
		return vIn[0] + (this.depth * 10000 * this.getMatCost(this.lastMetal) * this.surfaceArea);
	}

}

class qcBrick extends basicBrick{
	constructor() {
		super();
		this.color = "green",
		this.nodeIn = 1,
		this.nodeOut = 1,
		this.spawnText = "Quality Control",
		this.timeReq = null;
	}

	displayFields(div){
		let timeReqIn = document.createElement("input");
		timeReqIn.value = this.timeReq;
		timeReqIn.placeholder = "QC Time Required";
		timeReqIn.id = "timeReq";
		div.appendChild(timeReqIn);
	}

	setFields(){
			this.timeReq = this.getValue(document.getElementById("timeReq"));
	}

	generateString(vIn, out){
		let displayInfo = ["QC Time: ", "Cost: "];

		displayInfo[0] = this.appendVal(displayInfo[0], this.timeReq, true);
		displayInfo[1] = this.appendVal(displayInfo[1], parseInt(this.timeReq) * QCMINUTE, true);

		return displayInfo;
	}

	calculate(vIn){
		return vIn[0] + (this.timeReq * QCMINUTE);
	}
}

class totalBrick extends basicBrick{
	constructor() {
		super();
		this.color = "orange",
		this.nodeIn = 1,
		this.nodeOut = 0,
		this.spawnText = "Total";
	}

	generateString(vIn, out){
		let displayInfo = ["Total: $", "Piece: $", "Finish Coat: "];

		displayInfo[0] = this.appendVal(displayInfo[0], vIn[0], false);
		if(vIn[0] != null && this.quantity != null && this.quantity != 0){
			displayInfo[1] = this.appendVal(displayInfo[0], vIn[0]/this.quantity, false);
		}else{
			displayInfo[1] = displayInfo[1].concat("No Input");
		}
		if(this.lastMetal != null){
			displayInfo[2] = displayInfo[2].concat(this.lastMetal);
		}else{
			displayInfo[2] = displayInfo[2].concat("No Metal");
		}
		
		return displayInfo;
	}
}

class splitBrick extends basicBrick{
	constructor() {
		super();
		this.color = "orange",
		this.nodeIn = 1,
		this.nodeOut = 2,
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

class addBrick extends mathBrick{
	constructor() {
		super();
		this.color = "yellow",
		this.nodeIn = 2,
		this.nodeOut = 1,
		this.spawnText = "Adder";
	}

	generateString(vIn, out){
		let nullIn = false;
		let displayInfo = ["",""]
		if(this.input1 != null){
			displayInfo[0] = displayInfo[0].concat(this.input1 + " + ");
		}else if(vIn[0] != null){
			displayInfo[0] = displayInfo[0].concat(vIn[0] + " + ");
		}else{
			displayInfo[0] = displayInfo[0].concat("No Input" + " + ");
			nullIn = true;
		}
		if(this.input2 != null){
			displayInfo[0] = displayInfo[0].concat(this.input2 + " =");
		}else if(vIn[1] != null){
			displayInfo[0] = displayInfo[0].concat(vIn[1] + " =");
		}else{
			displayInfo[0] = displayInfo[0].concat("No Input =");
			nullIn = true;
		}
		if(nullIn)
			displayInfo[1] = "Input Empty";
		else
			displayInfo[1] = out;
			
		return displayInfo;
	}

	calculate(vIn){
		let num1 = vIn[0],
			num2 = vIn[1];
		if(this.input1 != null) num1 = this.input1;
		if(this.input2 != null) num2 = this.input2;

		if(num1 != null && num2 != null){
			return (parseInt(num1)+parseInt(num2));
		}else{
			return null;
		}
	}
}

class subBrick extends mathBrick{
	constructor() {
		super();
		this.color = "yellow",
		this.nodeIn = 2,
		this.nodeOut = 1,
		this.spawnText = "Subtracter";
	}

	generateString(vIn, out){
		let nullIn = false;
		let displayInfo = ["",""]
		if(this.input1 != null){
			displayInfo[0] = displayInfo[0].concat(this.input1 + " - ");
		}else if(vIn[0] != null){
			displayInfo[0] = displayInfo[0].concat(vIn[0] + " - ");
		}else{
			displayInfo[0] = displayInfo[0].concat("No Input" + " - ");
			nullIn = true;
		}
		if(this.input2 != null){
			displayInfo[0] = displayInfo[0].concat(this.input2 + " =");
		}else if(vIn[1] != null){
			displayInfo[0] = displayInfo[0].concat(vIn[1] + " =");
		}else{
			displayInfo[0] = displayInfo[0].concat("No Input =");
			nullIn = true;
		}
		if(nullIn)
			displayInfo[1] = "Input Empty";
		else
			displayInfo[1] = out;
			
		return displayInfo;
	}

	calculate(vIn){
		let num1 = vIn[0],
			num2 = vIn[1];
		if(this.input1 != null) num1 = this.input1;
		if(this.input2 != null) num2 = this.input2;

		if(num1 != null && num2 != null){
			return (parseInt(num1)-parseInt(num2));
		}else{
			return null;
		}
	}
}

class multBrick extends mathBrick{
	constructor() {
		super();
		this.color = "yellow",
		this.nodeIn = 2,
		this.nodeOut = 1,
		this.spawnText = "Multiplier";
	}

	generateString(vIn, out){
		let nullIn = false;
		let displayInfo = ["",""]
		if(this.input1 != null){
			displayInfo[0] = displayInfo[0].concat(this.input1 + " x ");
		}else if(vIn[0] != null){
			displayInfo[0] = displayInfo[0].concat(vIn[0] + " x ");
		}else{
			displayInfo[0] = displayInfo[0].concat("No Input" + " x ");
			nullIn = true;
		}
		if(this.input2 != null){
			displayInfo[0] = displayInfo[0].concat(this.input2 + " =");
		}else if(vIn[1] != null){
			displayInfo[0] = displayInfo[0].concat(vIn[1] + " =");
		}else{
			displayInfo[0] = displayInfo[0].concat("No Input =");
			nullIn = true;
		}
		if(nullIn)
			displayInfo[1] = "Input Empty";
		else
			displayInfo[1] = out;
			
		return displayInfo;
	}

	calculate(vIn){
		let num1 = vIn[0],
			num2 = vIn[1];
		if(this.input1 != null) num1 = this.input1;
		if(this.input2 != null) num2 = this.input2;

		if(num1 != null && num2 != null){
			return (parseInt(num1)*parseInt(num2));
		}else{
			return null;
		}
	}
}

class divBrick extends mathBrick{
	constructor() {
		super();
		this.color = "yellow",
		this.nodeIn = 2,
		this.nodeOut = 1,
		this.spawnText = "Divider";
	}

	generateString(vIn, out){
		let nullIn = false;
		let displayInfo = ["",""]
		if(this.input1 != null){
			displayInfo[0] = displayInfo[0].concat(this.input1 + " / ");
		}else if(vIn[0] != null){
			displayInfo[0] = displayInfo[0].concat(vIn[0] + " / ");
		}else{
			displayInfo[0] = displayInfo[0].concat("No Input" + " / ");
			nullIn = true;
		}
		if(this.input2 != null){
			displayInfo[0] = displayInfo[0].concat(this.input2 + " =");
		}else if(vIn[1] != null){
			displayInfo[0] = displayInfo[0].concat(vIn[1] + " =");
		}else{
			displayInfo[0] = displayInfo[0].concat("No Input =");
			nullIn = true;
		}
		if(nullIn)
			displayInfo[1] = "Input Empty";
		else
			displayInfo[1] = out;
			
		return displayInfo;
	}

	calculate(vIn){
		let num1 = vIn[0],
			num2 = vIn[1];
		if(this.input1 != null) num1 = this.input1;
		if(this.input2 != null) num2 = this.input2;

		if(num1 != null && num2 != null){
			return (parseInt(num1)/parseInt(num2));
		}else{
			return null;
		}
	}
}

class brick {
	constructor(posX, posY, brickType, spawner, id) {
		this.posX = posX,
		this.posY = posY,
		this.brickType = brickType,
		this.spawner = spawner,
		this.nodeArray = [],
		this.xBox = new xBox(this, this.posX + BRICKWIDTH - XSIZE, this.posY, this.posX, this.posY),
		this.vIn = [],
		this.out = [],
		this.id = id;
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
		for (let i = 0; i < this.brickType.nodeIn; i++){
			this.vIn[i] = this.nodeArray[i].value;
		}
		if(!this.spawner)
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
		this.inNode = inNode,
		this.iBrick = iBrick,
		this.posX = posX,
		this.posY = posY,
		this.startX = startX,
		this.startY = startY,
		this.connectedNode = null,
		this.id = id,
		this.value = null,
		this.isConnected = false,
		this.hidden = false;
	}

	hide(){
		this.disconnect();
		this.hidden = true;
	}

	show(){
		this.hidden = false;
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
		if(this.inNode){
			this.value = null;
		}
		if(this.connectedNode != null){
			if(!this.inNode){
				this.connectedNode.value = null;
			}
			this.isConnected = false;
			this.connectedNode.isConnected = false;
			this.connectedNode.connectedNode = null;
			this.connectedNode = null;
		}
	}

	updateValue(){
		if(this.inNode){
			if(this.isConnected){
				this.value = this.connectedNode.iBrick.out;
				if(!(this.iBrick.brickType instanceof plateBrick))
					this.iBrick.brickType.lastMetal = this.connectedNode.iBrick.brickType.lastMetal;
				this.iBrick.brickType.surfaceArea = this.connectedNode.iBrick.brickType.surfaceArea;
				this.iBrick.brickType.quantity = this.connectedNode.iBrick.brickType.quantity;
			}else{
				if(!(this.iBrick.brickType instanceof plateBrick))
					this.iBrick.brickType.lastMetal = null;
				this.iBrick.brickType.surfaceArea = null;
				this.iBrick.brickType.quantity = null;
			}
		}
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
			if(!(this.iBrick.brickType instanceof plateBrick))
				this.iBrick.brickType.lastMetal = this.connectedNode.iBrick.brickType.lastMetal;
			this.iBrick.brickType.surfaceArea = this.connectedNode.iBrick.brickType.surfaceArea;
			this.iBrick.brickType.quantity = this.connectedNode.iBrick.brickType.quantity;
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
		if(this.hidden) return false;
		if(this.hitBox().x1 < x && this.hitBox().x2 > x
		&& this.hitBox().y1 < y && this.hitBox().y2 > y
		&& !this.iBrick.spawner){
			return true;
		}else{
			return false;
		}
	}

	draw(context){
		if(!this.hidden){
			context.lineWidth = 2;
			context.fillStyle = this.iBrick.brickType.color;
			context.fillRect(this.posX, this.posY, NODEWIDTH, NODEHEIGHT);
			context.fillStyle = "black";
			context.strokeRect(this.posX, this.posY, NODEWIDTH, NODEHEIGHT);
		}
	}
}



let brickArray = [new brick(SELECTORGAP, 5, new baseBrick(), true, 0),
	new brick(SELECTORGAP*2 + BRICKWIDTH, 5, new maskBrick(), true, 1),
	new brick(SELECTORGAP*3 + BRICKWIDTH*2, 5, new rackBrick(), true, 2),
	new brick(SELECTORGAP*4 + BRICKWIDTH*3, 5, new plateBrick(), true, 3),
	new brick(SELECTORGAP*5 + BRICKWIDTH*4, 5, new qcBrick(), true, 4), 
	new brick(SELECTORGAP*6 + BRICKWIDTH*5, 5, new totalBrick(), true, 5),
	new brick(SELECTORGAP*1, BRICKHEIGHT + 10, new splitBrick(), true, 6),
	new brick(SELECTORGAP*2 + BRICKWIDTH, BRICKHEIGHT + 10, new addBrick(), true, 7),
	new brick(SELECTORGAP*3 + BRICKWIDTH*2, BRICKHEIGHT + 10, new subBrick(), true, 8),
	new brick(SELECTORGAP*4 + BRICKWIDTH*3, BRICKHEIGHT + 10, new multBrick(), true, 9),
	new brick(SELECTORGAP*5 + BRICKWIDTH*4, BRICKHEIGHT + 10, new divBrick(), true, 10)];


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
		displayedBrick = null;
		for(let i in brickArray)
			brickArray[i].brickType.initialize(brickArray[i]);
		clearScreenButton = document.getElementById("sCButton");
		clearScreenButton.onclick = clearScreen;
		submitButton = document.getElementById("submit");
		submitButton.onclick = submit;
		infoDiv = document.getElementById("infoIn");
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
				if(iBrick.xBox.checkClick(mouseX, mouseY)){
					iBrick.suicide();
					brickArray[i] = null;
					selectedBrick = null;
					displayedBrick = selectedBrick;
					break;
				}else{
					selectedBrick = iBrick;
					xOff = mouseX - selectedBrick.posX;
					yOff = mouseY - selectedBrick.posY;
					if(iBrick.spawner){
						selectedBrick = brickArray[brickArray.length] = new brick(mouseX-xOff,
							rect.top + SELECTHEIGHT + (NODEHEIGHT/2), new iBrick.brickType.constructor(), false, brickArray.length);
						selectedBrick.brickType.initialize(selectedBrick);
					}
					while(infoDiv.lastChild && infoDiv.lastChild != submitButton)
						infoDiv.removeChild(infoDiv.lastChild);
					displayedBrick = selectedBrick;
					displayedBrick.brickType.displayFields(infoDiv);
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
					console.log(selectedNode);
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
		draw();
	}

	function clearScreen(){
		for (iterator = 11; iterator < brickArray.length; iterator++){
			brickArray[iterator] = null;
		}
		draw();
	}

	function submit(){
		if(displayedBrick != null)
			displayedBrick.brickType.setFields();
		draw();
	}
};