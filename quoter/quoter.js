window.onload = function() {
	//Define constants
	const BRICKWIDTH = 200,
		BRICKHEIGHT = 50,
		NODEHEIGHT = 15,
		NODEWIDTH = 15,
		XSIZE=15;
	//Define canvas elements
	let canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		mouseX,
		mouseY,
		rect = canvas.getBoundingClientRect(),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight/2,
		brickArray = [],
		selectedBrick = null;
		brickArray[0] = new brick(50, 50, new baseBrick(), true);
		brickArray[1] = new brick(100 + BRICKWIDTH, 50, new plateBrick(), true);
		brickArray[2] = new brick(150 + BRICKWIDTH*2, 50, new maskBrick(), true);
		brickArray[3] = new brick(200 + BRICKWIDTH*3, 50, new qcBrick(), true);
	draw();

	function draw() {
		context.clearRect(0, 0, width, height);
		for(iterator = 0; iterator < brickArray.length; iterator++){
			if(brickArray[iterator] != null){
				context.fillStyle = brickArray[iterator].brickType.color;
				context.beginPath();
				context.rect(brickArray[iterator].posX, brickArray[iterator].posY, BRICKWIDTH,  BRICKHEIGHT);
				context.fill();
				if(brickArray[iterator].spawner === false){
					context.fillStyle = "red";
					context.beginPath();
					context.rect(brickArray[iterator].posX+BRICKWIDTH-XSIZE, brickArray[iterator].posY, XSIZE, XSIZE);
					context.fill()
				}else{
					context.fillStyle = "black";
					context.font = "15px Arial";
					let textSize = context.measureText(brickArray[iterator].brickType.spawnText);
					context.fillText(brickArray[iterator].brickType.spawnText, brickArray[iterator].posX + BRICKWIDTH/2 - textSize.width/2, brickArray[iterator].posY + BRICKHEIGHT/2)
				}
			}
		}
	}

	function baseBrick(){
		this.color = "gray";
		this.nodeIn = 0;
		this.nodeOut = 1;
		this.spawnText = "Base Material";
	}
	function plateBrick(){
		this.color = "blue";
		this.nodeIn = 1;
		this.nodeOut = 1;
		this.spawnText = "Plating Layer";
	}
	function maskBrick(){
		this.color = "green";
		this.nodeIn = 1;
		this.nodeOut = 1;
		this.spawnText = "Mask/Unmask";
	}
	function qcBrick(){
		this.color = "orange";
		this.nodeIn = 1;
		this.nodeOut = 1;
		this.spawnText = "Quality Control";
	}

	function brick(posX, posY, brickType, spawner) {
		this.posX = posX;
		this.posY = posY;
		this.brickType = brickType;
		this.spawner = spawner;
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