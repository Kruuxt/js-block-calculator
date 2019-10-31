window.onload = function() {
	const BRICKWIDTH = 200,
		BRICKHEIGHT = 50,
		NODEHEIGHT = 15,
		NODEWIDTH = 15;
	let canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
        offset = {},
		brickArray = [],
		selectedBrick = null;
		brickArray[0] = new brick(50, 50, "base", true);
		brickArray[1] = new brick(100 + BRICKWIDTH, 50, "plate", true);
		brickArray[2] = new brick(150 + BRICKWIDTH*2, 50, "mask", true);
		brickArray[3] = new brick(200 + BRICKWIDTH*3, 50, "qc", true);
	draw();

	function draw() {
		context.clearRect(0, 0, width, height);
		for(iterator = 0; iterator < brickArray.length; iterator++){
			context.fillStyle = brickInfo(brickArray[iterator].type).color;
			context.beginPath();
			context.rect(brickArray[iterator].posX, brickArray[iterator].posY, BRICKWIDTH,  BRICKHEIGHT);
			context.fill();
		}
	}

	function brickInfo(brickIn){
		switch(brickIn){
			case "base":
				return {
					color : "yellow",
					nodeIn : 0,
					nodeOut : 1
				};
			case "plate":
				return {
					color : "green",
					nodeIn : 1,
					nodeOut : 1
				};
			case "mask":
				return {
					color : "blue",
					nodeIn : 1,
					nodeOut : 1
				};
			case "qc":
				return {
					color : "red",
					nodeIn : 1,
					nodeOut : 1
				};
			default:
				return {
					color : "black",
					nodeIn : 0,
					nodeOut : 0
				}

		}
	}

	function brick(posX, posY, type, spawner) {
		this.posX=posX;
		this.posY=posY;
		this.type = type;
		this.spawner = spawner;
	}


	document.body.addEventListener("mousedown", function(event) {
		for(iterator = 0; iterator < brickArray.length; iterator++){
			if(brickArray[iterator].posX < event.clientX
				 && brickArray[iterator].posX + BRICKWIDTH > event.clientX
				 && brickArray[iterator].posY < event.clientY
				 && brickArray[iterator].posY + BRICKHEIGHT > event.clientY){
					 if(brickArray[iterator].spawner === false){
						selectedBrick = brickArray[iterator];
						xOff = event.clientX - selectedBrick.posX;
						yOff = event.clientY - selectedBrick.posY;
					 }else{
						brickArray[brickArray.length] = new brick(event.clientX-BRICKWIDTH/2, event.clientY-BRICKHEIGHT/2, brickArray[iterator].type, false);
					}
			}
		}
		document.body.addEventListener("mousemove", onMouseMove);
		draw();
		document.body.addEventListener("mouseup", onMouseUp);
	});

	function onMouseMove(event) {
		if(selectedBrick != null){
			selectedBrick.posX = event.clientX - xOff;
			selectedBrick.posY = event.clientY - yOff;
			draw();
		}
	}

	function onMouseUp(event) {
		selectedBrick = null;
		document.body.removeEventListener("mousemove", onMouseMove);
		document.body.removeEventListener("mouseup", onMouseUp);
	}


};