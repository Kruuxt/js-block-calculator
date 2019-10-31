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
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;
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
				console.log(selectedBrick != null);
				context.fillStyle = brickArray[iterator].brickType.color;
				context.beginPath();
				context.rect(brickArray[iterator].posX, brickArray[iterator].posY, BRICKWIDTH,  BRICKHEIGHT);
				context.fill();
				if(brickArray[iterator].spawner === false){
					context.fillStyle = "red";
					context.beginPath();
					context.rect(brickArray[iterator].posX+BRICKWIDTH-XSIZE, brickArray[iterator].posY, XSIZE, XSIZE);
					context.fill()
				}
			}
		}
	}

	function baseBrick(){
		this.color = "gray";
		this.nodeIn = 0;
		this.nodeOut = 1;
	}
	function plateBrick(){
		this.color = "blue";
		this.nodeIn = 1;
		this.nodeOut = 1;
	}
	function maskBrick(){
		this.color = "green";
		this.nodeIn = 1;
		this.nodeOut = 1;
	}
	function qcBrick(){
		this.color = "orange";
		this.nodeIn = 1;
		this.nodeOut = 1;
	}

	function brick(posX, posY, brickType, spawner) {
		this.posX = posX;
		this.posY = posY;
		this.brickType = brickType;
		this.spawner = spawner;
	}


	document.body.addEventListener("mousedown", function(event) {
		for(iterator = 0; iterator < brickArray.length; iterator++){
			if(brickArray[iterator] != null && brickArray[iterator].posX < event.clientX
				 && brickArray[iterator].posX + BRICKWIDTH > event.clientX
				 && brickArray[iterator].posY < event.clientY
				 && brickArray[iterator].posY + BRICKHEIGHT > event.clientY){
					 if(brickArray[iterator].spawner === false){
						if(brickArray[iterator].posX + BRICKWIDTH - XSIZE < event.clientX
							&& brickArray[iterator].posY + XSIZE > event.clientY){
							brickArray[iterator] = null;
							selectedBrick = null;
							break;
							}
						selectedBrick = brickArray[iterator];
						xOff = event.clientX - selectedBrick.posX;
						yOff = event.clientY - selectedBrick.posY;
					 }else{
						brickArray[brickArray.length] = new brick(event.clientX-BRICKWIDTH/2, event.clientY-BRICKHEIGHT/2, brickArray[iterator].brickType, false);
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