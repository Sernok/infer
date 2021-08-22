(function () {
    'use strict';
    var isMouseDown = false,
		canvas = document.createElement('canvas'),
		body = document.getElementsByTagName("body")[0],
		ctx = canvas.getContext('2d'),
		linesArray = [],
		currentSize = 5,
		currentColor = "rgb(200,20,100)",
		currentBg = "white",
		// INITIAL LAUNCH
        i = 1,
        lines,
        console,
        load = function () {
            if (localStorage.getItem("savedCanvas") !== null) {
                linesArray = JSON.parse(localStorage.savedCanvas);
				lines = JSON.parse(localStorage.getItem("savedCanvas"));
				for (i; i < lines.length; i += 1) {
					ctx.beginPath();
					ctx.moveTo(linesArray[i - 1].x, linesArray[i - 1].y);
					ctx.lineWidth  = linesArray[i].size;
					ctx.lineCap = "round";
					ctx.strokeStyle = linesArray[i].color;
					ctx.lineTo(linesArray[i].x, linesArray[i].y);
					ctx.stroke();
                }
                console.log("Canvas loaded.");
            } else {
                console.log("No canvas in memory!");
            }
		},
        
        redraw = function () {
            for (i; i < linesArray.length; i += 1) {
                ctx.beginPath();
                ctx.moveTo(linesArray[i - 1].x, linesArray[i - 1].y);
                ctx.lineWidth  = linesArray[i].size;
                ctx.lineCap = "round";
                ctx.strokeStyle = linesArray[i].color;
                ctx.lineTo(linesArray[i].x, linesArray[i].y);
                ctx.stroke();
            }
        },
        
        createCanvas = function () {
            canvas.id = "canvas";
			canvas.width = parseInt(document.getElementById("sizeX").value);
			canvas.height = parseInt(document.getElementById("sizeY").value);
			canvas.style.zIndex = 8;
			canvas.style.position = "absolute";
			canvas.style.border = "1px solid";
			ctx.fillStyle = currentBg;
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			body.appendChild(canvas);
        }, //createCanvas()
        
        
        
        
        save = function () {
			localStorage.removeItem("savedCanvas");
			localStorage.setItem("savedCanvas", JSON.stringify(linesArray));
			console.log("Saved canvas!");
		},
        
        downloadCanvas = function (link, canvas, filename) {
			link.href = document.getElementById(canvas).toDataURL();
			link.download = filename;
		},
        
        eraser = function () {
            currentSize = 50;
			currentColor = ctx.fillStyle;
		},
        
        store = function (x, y, s, c) {
            var line = {
                "x": x,
                "y": y,
                "size": s,
                "color": c
            };
            linesArray.push(line);
        };
    
    var mouseup = function () {
        isMouseDown = false;
        store();
    };
    var getMousePos = function (canvas, evt) {
            var rect = canvas.getBoundingClientRect();
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
        }
    
    
		// ON MOUSE MOVE
    var mousemove = function (canvas, evt) {
        if (isMouseDown) {
            var currentPosition = getMousePos(canvas, evt);
            ctx.lineTo(currentPosition.x, currentPosition.y);
            ctx.stroke();
            store(currentPosition.x, currentPosition.y, currentSize, currentColor);
        }
    };
    
    

    
    
    
		// BUTTON EVENT HANDLERS
    document.getElementById('canvasUpdate').addEventListener('click', function () {
        createCanvas();
        redraw();
    });
    document.getElementById('colorpicker').addEventListener('change', function () {
        currentColor = this.value;
    });
    document.getElementById('bgcolorpicker').addEventListener('change', function () {
        ctx.fillStyle = this.value;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        redraw();
        currentBg = ctx.fillStyle;
    });
    document.getElementById('controlSize').addEventListener('change', function () {
        currentSize = this.value;
        document.getElementById("showSize").innerHTML = this.value;
    });
    document.getElementById('saveToImage').addEventListener('click', function () {
        downloadCanvas(this, 'canvas', 'masterpiece.png');
    }, false);
    document.getElementById('eraser').addEventListener('click', eraser);
    document.getElementById('clear').addEventListener('click', createCanvas);
    document.getElementById('save').addEventListener('click', save);
    document.getElementById('load').addEventListener('click', load);
    document.getElementById('clearCache').addEventListener('click', function () {
        localStorage.removeItem("savedCanvas");
        linesArray = [];
        console.log("Cache cleared!");
    });
		// REDRAW 


		// DRAWING EVENT HANDLERS

    
/////////////TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
		// CREATE CANVAS

		//function createCanvas() {

		//}

		// DOWNLOAD CANVAS


		// SAVE FUNCTION



		// LOAD FUNCTION



		// ERASER HANDLING



		// GET MOUSE POSITION



		// ON MOUSE DOWN

    function mousedown(canvas, evt) {
        var mousePos = getMousePos(canvas, evt),
            isMouseDown = true,
            currentPosition = getMousePos(canvas, evt);
        ctx.moveTo(currentPosition.x, currentPosition.y);
        ctx.beginPath();
        ctx.lineWidth  = currentSize;
        ctx.lineCap = "round";
        ctx.strokeStyle = currentColor;

    }



  

		// STORE DATA

    canvas.addEventListener('mousedown', function () {mousedown(canvas, event); });
    canvas.addEventListener('mousemove', function () {mousemove(canvas, event); });
    canvas.addEventListener('mouseup', mouseup);

		// ON MOUSE UP

 
};
);()