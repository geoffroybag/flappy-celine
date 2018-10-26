var canvas = document.querySelector(".my-canvas");

var ctx = canvas.getContext("2d");

//---------------------------------------------------------------------------------------------

// create image object Zombie
var zombieImg = new Image();
zombieImg.src = "./images/zombie.jpeg";

// create image object
var michaelImg = new Image();
michaelImg.src = "./images/michael.png";

var zombieX = 850;
var zombieY = 200;
var michaelX = 0;
var michaelY = 200;
var varResult = "result"

function drawingLoop(){

    if(varResult !=="LOSE"){

    //keydown event handler (when user presses down any key)
    document.onkeydown = function(){
        switch(event.keyCode){
            case 37 : //left arrow
            michaelX -= 20;
            break;
            
            case 38 : //up 
            michaelY -= 20;
            break;

            case 39 : //right 
            michaelX += 20
            break;
            
            case 40 : //down 
            michaelY += 20;
            break;
        }
        
    }

    if (michaelX > 1000){
        varResult = "WIN";
        michaelX = 0


        
   }

    if ((michaelX < zombieX+50) && (michaelX > zombieX-50) && (michaelY < zombieY+50) && (michaelY > zombieY-50)){
        varResult = "LOSE"; 
    }
    


    // erase the entire canvas before drawing the scene again (x,y,width, height)
    ctx.clearRect(0,0,1000,550);

    // re set up the background
    drawBackground();

    // draw the zombie
    ctx.drawImage(zombieImg,zombieX,zombieY,150,150);
    zombieX-=5
    if (zombieX<-150){
        zombieX = 1000;
        // give the zombie a random new Y coordinate every time it resets
        zombieY = Math.floor(Math.random()*500);

    }

    // draw michael
    ctx.drawImage(michaelImg,michaelX,michaelY,100,100);
    
    
    
// ask the browser for the next chance to re-draw the scene
    requestAnimationFrame(function(){  
        // set up a recursive loop (the 'drawingLoop' function calls itself)
        drawingLoop();
    });
}
};

// call 'drawingLoop' the first time to begin the loop
drawingLoop();

//---------------------------------------------------------------------------------------------

function drawBackground(){

    // draw a solid rectangle (x,y,width,height)
    ctx.fillStyle = "deeppink"
    ctx.fillRect(0,0,1000,650);

    // draw a rectangle (no filling)
    ctx.strokeStyle = "gold"
    ctx.lineWidth = 10;
    ctx.strokeRect(500,200,100,100)

    ctx.fillStyle = "black"
    ctx.fillRect(500,200,80,80);

    // write text
    ctx.font = "40px Helvetica";
    ctx.fillText(varResult,500,40);
 

    // DRAW CIRCLE
    // start a path (custom drawing needed for circles)
    ctx.beginPath();
    // draw a circle (x,y,radius,startAngle, endAngle)
    ctx.arc(400,100,75,0,2*Math.PI);
    // stroke the circle
    ctx.fillStyle = "gold";
    ctx.fill();
    //end the path
    ctx.closePath();


    // circle of head
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.arc(400,100,75,0,2*Math.PI);
    ctx.strokeStyle = "rebeccapurple";
    ctx.stroke();
    //end the path
    ctx.closePath();


    // draw mouth
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.arc(400,110,40,0,Math.PI);
    ctx.fillStyle = "rebeccapurple";
    ctx.fill();
    ctx.closePath();

    // draw left eye
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.arc(370,80,10,0,2*Math.PI);
    ctx.fillStyle = "rebeccapurple";
    ctx.fill();
    ctx.closePath();

    // draw right eye
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.arc(430,80,10,0,2*Math.PI);
    ctx.fillStyle = "rebeccapurple";
    ctx.fill();
    ctx.closePath();

}
