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
	MATHCOLOR = "#57A773", OPERATIONCOLOR = "#6A8EAE", BGCOLOR = "#D1FAFF",
	SPLITCOLOR = "#1a7391", PLATECOLOR = "#157145", BASECOLOR = "#9BD1E5",
	COPPER = "Copper", STEEL = "Steel",	SS = "Stainless", ALUMINUM = "Aluminum",
	NICKEL= "Nickel", GOLD = "Gold", SILVER = "Silver",	NIBRON = "Nibron",
	TINLEAD = "Tin Lead", CADMIUM = "Cadmium", EN = "EN", KOVAR = "Kovar"
	BASEMATERIALS = [COPPER, NICKEL, STEEL, SS, ALUMINUM, NICKEL, KOVAR],
	PLATEMATERIALS = [CADMIUM, EN, GOLD, SILVER, NIBRON, TINLEAD];


/**
 * The parent class for all other bricks, the rectangles used in the
 * calculator to build quotes. Contains empty instances of all
 * generic brick methods, some useful generic tools, and generic variable
 * declarations.
 */
class basicBrick{
	constructor(){
		/**@type {String} The color of the brick.*/
		this.color = "white";
		/**@type {number} The number of input nodes.*/
		this.nodeIn = 0;
		/**@type {number} The number of output nodes.*/
		this.nodeOut = 0;
		/**@type {String} Default string displayed if brick is a spawner.*/
		this.spawnText = "Undefined Brick";
		/**@type {String} The current exposed metal.*/
		this.lastMetal = null;
		/**@type {number} Surface area of the part to be plated.*/
		this.surfaceArea = null;
		/**@type {brick} The brick that was assigned this brickType.*/
		this.iBrick = null;
		/**@type {number} The number of parts in the order.*/
		this.quantity = null;
	}

	/**
	 * Method to create and show the text boxes for users to input variables.
	 * @param {Element} div The div in which to display brick specific text boxes.
	 */
	displayFields(div){}

	/**
	 * Method to set variables equal to their relative text box.
	 */
	setFields(){}

	/**
	 * Method to calculate the output of the brick given its inputs.
	 * @param {number[]} vIn The array of inputs received by the in nodes.
	 */
	calculate(vIn){ return 0 }
	
	/**
	 * Gives a copy of the parent brick to its assigned bricktype for node manipulation,
	 * specifically on math bricks.
	 * 
	 * @param {brick} iBrick The parent brick that is assigned this brickType
	 */
	initialize(iBrick){
		this.iBrick = iBrick;
	}

	/**
	 * A simple tool to return an element's value, or null if the text box was left empty.
	 * 
	 * @param {Element} element The element to return the value of.
	 */
	getValue(element){
		if(element.value != "")
			return element.value;
		else
			return null;
	}
	
	/**
	 * A tool to quickly append a string.
	 * 
	 * @param {String} stringIn String to be appended.
	 * @param {String} value String to be added.
	 * @param {Boolean} undef if value is null, True: return "undefined" False: return "No Value"
	 */
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

/**
 * Parent for math bricks. Defaults displayFields to two inputs.
 * Contains logic for hiding and showing nodes based on inputs.
 */
class mathBrick extends basicBrick{
	constructor(){
		super();
		/**@type {number} Left/First input */
		this.input1 = null;
		/**@type {number} Right/Second input */
		this.input2 = null;
		super.color = MATHCOLOR;
	}

	displayFields(div){
		//Create input text boxes.
		let in1Field = document.createElement("input");
		let in2Field = document.createElement("input");

		//Set HTML5 id attributes for textboxes.
		in1Field.id = "in1Field";
		in2Field.id = "in2Field";

		//Set default value in the textbox to any previous user input.
		in1Field.value = this.input1;
		in2Field.value = this.input2;

		//Sets grayed out text when no value in textboxes.
		in1Field.placeholder = "Value 1";
		in2Field.placeholder = "Value 2";

		//Add textboxes to inputs div.
		div.appendChild(in1Field);
		div.appendChild(in2Field);
	}

	setFields(){
		//Hides input nodes if user inputs a value into a textbox.
		if(document.getElementById("in1Field").value != "")
			this.iBrick.nodeArray[0].hide();
		else 
			this.iBrick.nodeArray[0].show();

		if(document.getElementById("in2Field").value != "")
			this.iBrick.nodeArray[1].hide();
		else 
			this.iBrick.nodeArray[1].show();

		//sets input variables equal to user input.
		this.input1 = this.getValue(document.getElementById("in1Field"));
		this.input2 = this.getValue(document.getElementById("in2Field"));
	}
}

/**
 * Brick to represent original part.  Requires user to set a material,
 * surface area and quantity to be useful.
 */
class baseBrick extends basicBrick{
	constructor() {
		super();
		super.color = BASECOLOR,
		super.spawnText = "Base Material",
		super.nodeIn = 0,
		super.nodeOut = 1;
	}

	displayFields(div){
		// Create input elements for base material, surface area and quantity.
		let bmSelector = document.createElement("select"),
			surfaceArea = document.createElement("input"),
			quantity = document.createElement("input");

		//Add an option for each base material to the base material selector.
		for(let i in this.getOptions())
			bmSelector.add(this.getOptions()[i]);

		//Set value to any previous user inputs.
		bmSelector.value = this.lastMetal;
		surfaceArea.value = this.surfaceArea;
		quantity.value = this.quantity;

		//Add grayed text to textboxes when empty.
		surfaceArea.placeholder = "Surface Area";
		quantity.placeholder = "Quantity";

		//Set HTML5 ID attribute for each user input field. 
		bmSelector.id = "bmSelector";
		surfaceArea.id = "surfaceArea";
		quantity.id = "Quantity";

		//Add input fields to input div.
		div.appendChild(bmSelector);
		div.appendChild(surfaceArea);
		div.appendChild(quantity);
	}

	/**@returns {Element[]} an array of option elements, one for each base material */
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
		this.lastMetal = BASEMATERIALS[document.getElementById("bmSelector").selectedIndex];
		this.surfaceArea = super.getValue(document.getElementById("surfaceArea"));
		this.quantity = super.getValue(document.getElementById("Quantity"));
	}

	generateString(vIn, out){
		let displayInfo = ["Base Material: ", "Surface Area: ", "Quantity: "];

		displayInfo[0] = super.appendVal(displayInfo[0], this.lastMetal, true);
		displayInfo[1] = super.appendVal(displayInfo[1], this.surfaceArea, true);
		displayInfo[2] = super.appendVal(displayInfo[2], this.quantity, true);
		return displayInfo;
	}
}

/** Brick to calculate cost of masking*/
class maskBrick extends basicBrick{
	constructor() {
		super();
		super.color = OPERATIONCOLOR,
		super.nodeIn = 1,
		super.nodeOut = 1,
		super.spawnText = "Mask/Unmask";
		/**@type {number} Time required to complete a single piece. */
		this.timeReq = null;
		/**@type {number} Screws required to mask threads on part. */
		this.screws = null;
	}

	displayFields(div){
		let timeReqIn = document.createElement("input"),
			screwsIn = document.createElement("input");

		timeReqIn.value = this.timeReq;
		screwsIn.value = this.screws;

		timeReqIn.placeholder = "Masking Time Required";
		screwsIn.placeholder = "Amount of screws needed";

		timeReqIn.id = "timeReq";
		screwsIn.id = "screws"

		div.appendChild(timeReqIn);
		div.appendChild(screwsIn);
	}

	setFields(){
		this.timeReq = super.getValue(document.getElementById("timeReq"));
		this.screws = super.getValue(document.getElementById("screws"));
	}

	generateString(vIn, out){
		let displayInfo = ["Mask Time: ", "Screw Count: ", "Total Cost: "];
		displayInfo[0] = super.appendVal(displayInfo[0], this.timeReq, true);
		displayInfo[1] = super.appendVal(displayInfo[1], this.screws, true);
		displayInfo[2] = super.appendVal(displayInfo[2],
			parseInt(this.timeReq) * MASKMINUTE + parseInt(this.screws) * .5, true);
		return displayInfo;
	}

	calculate(vIn){
		//Time required to mask a single piece * cost of masking per minute + $.5 per screw.
		return (vIn[0] + (this.timeReq * MASKMINUTE + this.screws * .5));
	}
}

/**Brick to calculate cost of racking */
class rackBrick extends basicBrick{
	constructor() {
		super();
		super.color = OPERATIONCOLOR;
		super.nodeIn = 1;
		super.nodeOut = 1;
		super.spawnText = "Rack/Unrack",
		this.pricePerPiece = null;
	}

	displayFields(div){
		let priceIn = document.createElement("input");
		priceIn.value = this.pricePerPiece;
		priceIn.placeholder = "Price per piece";
		priceIn.id = "price";
		div.appendChild(priceIn);
	}

	setFields(){
		this.pricePerPiece = super.getValue(document.getElementById("price"));
	}

	generateString(vIn, out){
		let displayInfo = ["Price per piece: ", "Price for all: "];
		displayInfo[0] = super.appendVal(displayInfo[0], this.pricePerPiece, true);
		displayInfo[1] = super.appendVal(displayInfo[1], parseInt(this.pricePerPiece) * this.quantity, true);
		return displayInfo;
	}

	calculate(vIn){
		return vIn[0] + this.pricePerPiece;
	}
}

/**Brick to calculate cost of plating */
class plateBrick extends basicBrick{
	constructor() {
		super();
		super.color = PLATECOLOR,
		super.nodeIn = 1,
		super.nodeOut = 1,
		super.spawnText = "Plating Layer";

		/**Material to be plated onto part. */
		this.plateMat = null;
		/**Depth of plating. */
		this.depth = null;
		/**Number to multiply cost by for profit. */
		this.multiplier = 1;
		/**Default multiplier based on plateMat and lastMetal */
		this.defaultMult = 1;
		/**Stores lastMetal */
		this.under = null;
	}

	displayFields(div){
		let defaultMultTag = document.createElement("label"),
			multiplier = document.createElement("input"),
			plateDepth = document.createElement("input"),
			plateSelector = document.createElement("select");

		//Get array of option elements, one for each plate metal.
		for(let i in this.getOptions())
			plateSelector.add(this.getOptions()[i]);

		defaultMultTag.innerHTML = "Suggested Multiplier: "
		+ this.getDefaultMult(this.under, this.plateMat);
		multiplier.value = this.multiplier;
		plateDepth.value = this.depth;
		plateSelector.value = this.lastMetal;

		multiplier.placeholder = "Profit Multiplier";
		plateDepth.placeholder = "Plating Thickness";

		defaultMultTag.id = "defaultMult";
		multiplier.id = "multiplier";
		plateDepth.id = "plateDepth";
		plateSelector.id = "plateSelector";

		div.appendChild(plateSelector);
		div.appendChild(plateDepth);
		div.appendChild(multiplier);
		div.appendChild(defaultMultTag);
	}

	/**@returns {Element[]} an array of option elements, one for each plate material */
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
		this.under = this.lastMetal;
		this.lastMetal = this.plateMat;
		this.depth = super.getValue(document.getElementById("plateDepth"));
		this.multiplier = super.getValue(document.getElementById("multiplier"));
	}

	/**Updates the default multiplier suggestion text to match current selected metals. */
	updateMultField(){
		/**@type {Element} The div for information and suggestions. */
		let divOut = document.getElementById("infoOut");
		/**@type {Element} Label that shows the current price per inch of the materials selected. */
		let pricePerIn = document.createElement("label");
		
		//Updates the info in the info out div, displaying cost per in².
		pricePerIn.id = "cost";
		pricePerIn.innerHTML = "Pricing at " + this.getMatCost(this.plateMat)
		+ " per in².";
		divOut.appendChild(pricePerIn);

		//Updates suggestion based on metals used.
		if(this.under === "Aluminum" && this.plateMat === "Gold")
			document.getElementById("defaultMult").innerHTML = 
				"Suggested Multiplier: 2.5. Don't charge for basic racking. Calculate plating +.00002";

		else if(this.plateMat === "Gold")
			document.getElementById("defaultMult").innerHTML = 
				"Suggested Multiplier: " + this.getDefaultMult(this.under, this.plateMat)
				+ ". Calculate plating +.00002";

		else
			document.getElementById("defaultMult").innerHTML = "Suggested Multiplier: "
				+ this.getDefaultMult(this.under, this.plateMat);
	}

	generateString(vIn, out){
		let displayInfo = ["Plate Mat.: ", "Depth: ", "Mat. Cost: $"];

		displayInfo[0] = super.appendVal(displayInfo[0], this.plateMat, true);
		displayInfo[1] = super.appendVal(displayInfo[1], this.depth, true);
		displayInfo[2] = super.appendVal(displayInfo[2], this.depth * 10000
			* this.getMatCost(this.lastMetal) * this.surfaceArea, false);
		return displayInfo;
	}

	/**
	 * Suggests a profit multiplier based on metal interactions.
	 * 
	 * @param {String} under Material under current plating
	 * @param {String} over Material to be plated
	 */
	getDefaultMult(under, over){
		if(under === "Aluminum" && over === "Gold")
			return 2.5;
		if(under === "Kovar" && over === "Gold")
			return 2.5;
		if(over === "Gold")
			return 1.8;
		return 1;
	}

	/**
	 * Get the price per in² based on metal interactions.
	 * 
	 * @param {String} material Material to be plated
	 */
	getMatCost(material){
		switch(material){
			case "Cadmium":
				return 0.08;
			case "EN":
				return 0.01597;
			case "Gold":
				return 1.76;
			case "Silver":
				return 0.012;
			case "Nibron":
				return 0;
			case "Tin Lead":{
				if(this.under === "Aluminum")
					return .21;
				return .19;
			}
			default:
				return 0;
		}
	}

	calculate(vIn){
		if(this.plateMat != "Tin Lead")
			return vIn[0] + (this.depth * 10000 * this.getMatCost(this.lastMetal)
				* this.surfaceArea * this.multiplier);
		else
			return vIn[0] + (this.getMatCost(this.lastMetal) * this.surfaceArea * this.multiplier);
		}

}

/**Brick to determine cost of QC time allotted to the part. */
class qcBrick extends basicBrick{
	constructor() {
		super();
		super.color = OPERATIONCOLOR,
		super.nodeIn = 1,
		super.nodeOut = 1,
		super.spawnText = "Quality Control";
		/**@type {number} QC time required */
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
			this.timeReq = super.getValue(document.getElementById("timeReq"));
	}

	generateString(vIn, out){
		let displayInfo = ["QC Time: ", "Cost: "];

		displayInfo[0] = super.appendVal(displayInfo[0], this.timeReq, true);
		displayInfo[1] = super.appendVal(displayInfo[1], parseInt(this.timeReq) * QCMINUTE, true);

		return displayInfo;
	}

	calculate(vIn){
		return vIn[0] + (this.timeReq * QCMINUTE);
	}
}

/** Final brick in the chain, displays cost information. */
class totalBrick extends basicBrick{
	constructor() {
		super();
		super.color = BASECOLOR,
		super.nodeIn = 1,
		super.nodeOut = 0,
		super.spawnText = "Total";
	}

	generateString(vIn, out){
		let displayInfo = ["Total: $ ", "Piece: $ ", "Finish Coat: "];

		displayInfo[0] = super.appendVal(displayInfo[0], Math.round(parseFloat(vIn[0])
			*parseFloat(this.quantity)*1000)/1000, false);
		displayInfo[1] = super.appendVal(displayInfo[1], Math.round(vIn[0]*1000)/1000, false);
		displayInfo[2] = super.appendVal(displayInfo[2], this.lastMetal, false);

		return displayInfo;
	}
}

/**Brick to split all aspects of input node into two output nodes. */
class splitBrick extends basicBrick{
	constructor() {
		super();
		super.color = SPLITCOLOR,
		super.nodeIn = 1,
		super.nodeOut = 2,
		super.spawnText = "Splitter";
	}
	generateString(vIn, out){
		let displayInfo = ["" ,""];

		displayInfo[0] = super.appendVal(displayInfo[0], vIn[0], false);
		displayInfo[1] = super.appendVal(displayInfo[1], out, false);
		displayInfo[1] = super.appendVal(displayInfo[1], " | ", false);
		displayInfo[1] = super.appendVal(displayInfo[1], out, false);
		
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

/**Brick that adds two values */
class addBrick extends mathBrick{
	constructor() {
		super();
		super.nodeIn = 2,
		super.nodeOut = 1,
		super.spawnText = "Adder";
	}

	generateString(vIn, out){
		let nullIn = false;
		let displayInfo = ["",""];

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

/**Brick that subtracts two values */
class subBrick extends mathBrick{
	constructor() {
		super();
		super.nodeIn = 2,
		super.nodeOut = 1,
		super.spawnText = "Subtracter";
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

/**Brick that multiplies two values */
class multBrick extends mathBrick{
	constructor() {
		super();
		super.nodeIn = 2,
		super.nodeOut = 1,
		super.spawnText = "Multiplier";
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

/**Brick that divides two values */
class divBrick extends mathBrick{
	constructor() {
		super();
		super.nodeIn = 2,
		super.nodeOut = 1,
		super.spawnText = "Divider";
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

/**Brick object, handles positioning and contains all parts of the brick. */
class brick {
	/**
	 * @param {number} posX 
	 * @param {number} posY 
	 * @param {basicBrick} brickType 
	 * @param {boolean} spawner True: Brick serves no purpose but to spawn a brick when clicked.
	 * @param {number} id 
	 */
	constructor(posX, posY, brickType, spawner, id) {
		/**@type {number} X Coordinate on screen */
		this.posX = posX ;
		/**@type {number} Y Coordinate on screen */
		this.posY = posY;
		/**@type {basicBrick} Defines job of brick */
		this.brickType = brickType;
		/**@type {boolean} True: Brick serves no purpose but to spawn a brick when clicked. */
		this.spawner = spawner;
		/**@type {Node[]} Array of all nodes for brick */
		this.nodeArray = [];
		/**@type {xBox} The box that, when clicked, deletes the brick */
		this.xBox = new xBox(this, this.posX + BRICKWIDTH - XSIZE, this.posY, this.posX, this.posY);
		/**@type {number[]} Values of input nodes */
		this.vIn = [];
		/**@type {number[]} Values of output nodes */
		this.out = [];
		/**@type {number} id of brick */
		this.id = id;

		//Create and display all input nodes
		if(this.brickType.nodeIn > 0){
			let iNSpacing = BRICKWIDTH / (this.brickType.nodeIn + 1);
			for(let counter = 0; counter < this.brickType.nodeIn; counter++){
				this.nodeArray[this.nodeArray.length] = new Node(true, this,
					this.posX + (iNSpacing*(counter+1)) - (NODEWIDTH/2),
					 this.posY - (NODEHEIGHT/2), this.posX, this.posY, counter);
			}
		}
		//Create and display all output nodes
		if(this.brickType.nodeOut > 0){
			let oNSpacing = BRICKWIDTH / (this.brickType.nodeOut + 1);
			for(let counter = 0; counter < this.brickType.nodeOut; counter++){
				this.nodeArray[this.nodeArray.length] = new Node(false, this,
					this.posX + (oNSpacing*(counter+1)) - (NODEWIDTH/2),
					 this.posY + BRICKHEIGHT - (NODEHEIGHT/2), this.posX, this.posY, counter);
			}
		}
	}

	/**Draws all nodes in brick's node array */
	drawNodes(context){
		for(let i = 0; i < this.nodeArray.length; i++)
			this.nodeArray[i].draw(context);
	}

	/**Updates all nodes in node array */
	updateBrick(){
		for(i in this.nodeArray)
			this.nodeArray[i].update();
		this.xBox.update();
	}

	/**Checks if (x,y) coordinate falls within brick. */
	checkClick(x, y){
		if(this.posX < x && this.posX + BRICKWIDTH > x && this.posY < y && this.posY + BRICKHEIGHT > y){
			return true;
		}else{
			return false;
		}
	}

	/**Moves brick to specified location, prevents brick from leaving canvas. */
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

	/**Draw brick and fill in brick text. */
	draw(context){
		context.fillStyle = this.brickType.color; //Sets color of brick.
		context.fillRect(this.posX, this.posY, BRICKWIDTH,  BRICKHEIGHT); //Draws brick.

		context.lineWidth = 2; //Width of border.
		context.fillStyle = "black"; //Sets color of border.
		context.strokeRect(this.posX, this.posY, BRICKWIDTH,  BRICKHEIGHT); //Draws border.

		context.fillStyle = "black"; //Color of text.
		context.font = "15px Arial"; //Size of text.
		this.updateNodeValues(); //Checks that node values are up to date.
		this.updateNodeValues(); //Double checks.
		
		//Writes to brick, depends on if spawner or not.
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

	/**Updates node values. */
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

	/**Disconnects all nodes on brick. */
	suicide(){
		for(let i in this.nodeArray){
			this.nodeArray[i].disconnect();
		}
	}

	/**Draws lines between connected nodes. */
	drawNodeLines(context){
		context.lineWidth = 2; //Width of line.
		for(let i in this.nodeArray){
			let iNode = this.nodeArray[i];
			if(iNode.connectedNode != null && iNode.connectedNode != undefined && iNode.inNode){
				context.beginPath(); //Start to draw a line.
				context.moveTo(iNode.findCenter().x, iNode.findCenter().y); //Beginning.
				context.lineTo(iNode.connectedNode.findCenter().x,
					iNode.connectedNode.findCenter().y); //End.
				context.stroke(); //Draw.
			}
		}
	}
}

/**The red x in the corner of a brick. */
class xBox {
	/**
	 * @param {brick} iBrick 
	 * @param {number} posX 
	 * @param {number} posY 
	 * @param {number} startX 
	 * @param {number} startY 
	 */
	constructor(iBrick, posX, posY, startX, startY){
		this.iBrick = iBrick,
		this.posX = posX,
		this.posY = posY,
		this.startX = startX,
		this.startY = startY;
	}

	/**Draw the xBox. */
	draw(context){
		if(!iBrick.spawner){
			context.fillStyle = "red"; //Color of xBox.
			context.fillRect(this.posX, this.posY, XSIZE, XSIZE); //Draw xBox.

			context.lineWidth = 2; //Width of xBox border.
			context.fillStyle = "black"; //Color of xBox border.
			context.strokeRect(this.posX, this.posY, XSIZE, XSIZE); //Draw xBox border.

			context.font = "20px Arial"; //Font & size.
			context.fillText("x", this.posX + 3, this.posY - 2 + XSIZE); //Draw x in xBox.
		}
	}

	/**Updates position of xBox. */
	update(){
		this.posX += this.iBrick.posX-this.startX;
		this.startX = this.iBrick.posX;
		this.posY += this.iBrick.posY-this.startY;
		this.startY = this.iBrick.posY;
}

/**Checks if xBox was clicked. */
	checkClick(x, y){
		if(this.posX < x && this.posX + XSIZE > x && this.posY < y && this.posY + XSIZE > y && !this.iBrick.spawner){
			return true;
		}else{
			return false;
		}
	}
}

/**The little boxes at the tops and bottoms of bricks that are
 * used to connect one brick to another. */
class Node {
	/**
	 * @param {boolean} inNode True: node goes on top and is an input.
	 * @param {brick} iBrick Brick the node is attatched to.
	 * @param {number} posX 
	 * @param {number} posY 
	 * @param {number} startX 
	 * @param {number} startY 
	 * @param {number} id 
	 */
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
					else
					this.iBrick.brickType.under = this.connectedNode.iBrick.brickType.lastMetal;
				this.iBrick.brickType.surfaceArea = this.connectedNode.iBrick.brickType.surfaceArea;
				this.iBrick.brickType.quantity = this.connectedNode.iBrick.brickType.quantity;
			}else{
				if(!(this.iBrick.brickType instanceof plateBrick))
					this.iBrick.brickType.lastMetal = null;
					else
					this.iBrick.brickType.under = null;
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
				else
				this.iBrick.brickType.under = this.connectedNode.iBrick.brickType.lastMetal;
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

//Create header of spawner bricks.
let brickArray = [new brick(SELECTORGAP, 5, new baseBrick(), true, 0),
	new brick(SELECTORGAP*2 + BRICKWIDTH, 5, new plateBrick(), true, 1),
	new brick(SELECTORGAP*3 + BRICKWIDTH*2, 5, new rackBrick(), true, 2),
	new brick(SELECTORGAP*4 + BRICKWIDTH*3, 5, new addBrick(), true, 3),
	new brick(SELECTORGAP*5 + BRICKWIDTH*4, 5, new subBrick(), true, 4), 
	new brick(SELECTORGAP*6 + BRICKWIDTH*5, 5, new splitBrick(), true, 5),
	new brick(SELECTORGAP*1, BRICKHEIGHT + 10, new totalBrick(), true, 6),
	new brick(SELECTORGAP*2 + BRICKWIDTH, BRICKHEIGHT + 10, new maskBrick(), true, 7),
	new brick(SELECTORGAP*3 + BRICKWIDTH*2, BRICKHEIGHT + 10, new qcBrick(), true, 8),
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
		let infoOut = document.getElementById("infoOut");
		context.clearRect(0, 0, width, height);

		context.fillStyle = BGCOLOR;
		context.fillRect(0, 0, width, height);
	
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
		if(infoOut.firstChild)
			infoOut.removeChild(infoOut.firstChild);
		if(displayedBrick != undefined && displayedBrick.brickType.defaultMult != undefined){
			displayedBrick.brickType.updateMultField();
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
						newId = brickArray.length;
						for(let i in brickArray){
							if(brickArray[i] === null){
								newId = i;
								break;
							}
						}
						selectedBrick = brickArray[newId] = new brick(mouseX-xOff,
							rect.top + SELECTHEIGHT + (NODEHEIGHT/2), new iBrick.brickType.constructor(), false, newId);
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
		if(event.which === 13)
			submit();
		updateMouse();
		clickChecker();
		document.body.addEventListener("mousemove", onMouseMove);
		document.body.addEventListener("mouseup", onMouseUp);
		draw();
	});

	document.body.addEventListener("keypress", function(event) {
		if(event.which === 13)
			submit();
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
		draw();
	}
};