var canvas = document.querySelector(".flappy-celine");

var ctx = canvas.getContext("2d");

//---------------------------------------------------------------------------------------------

class Pipe {
    constructor (pipeX,pipeY,pipeWidth,pipeHeight){
    this.x = pipeX
    this.y = pipeY
    this.width = pipeWidth
    this.height = pipeHeight
    this.isCrashed = false;
    }

    drawMe(){
        if(!celine.isCrashed){
        this.x -=2;
        if (this.x< -this.width){
            this.x = 1200;
        }
    }
        if(this.isCrashed){
            ctx.fillStyle = "tomato"
        }
        else {
            ctx.fillStyle = "#057e04";
        }
        ctx.fillRect(this.x,this.y,this.width, this.height);
        
    }
    
}

var allPipes = [
    new Pipe(650,0,30,250),
    new Pipe(800,350,30,200),
    new Pipe(970,0,30,250),
    new Pipe(1020,450,30,300),
    new Pipe(1170,0,45,200),
    new Pipe(1320,400,30,250),
    new Pipe(1520,100,30,250),
]

var gameOver = {
    opacity : 0,
    drawMe : function(){
        this.opacity += 0.01;

        ctx.globalAlpha = this.opacity;
        ctx.font = "bold 70px monospace";
        ctx.fillStyle = "tomato";
        ctx.fillText("Game Over", 311, 325);

        ctx.lineWidth = 3;
        ctx.strokeStyle = "rebeccapurple";
        ctx.strokeText("Game Over", 311, 325);

    // reset globalAlpha so other drawings are not transparent
    ctx.globalAlpha = 1;
    }
}

// create image object Zombie
var celineImg = new Image();
celineImg.src = "./images/celine.jpeg";

var celine = {
    x: 0,
    y: 225,
    width: 75,
    height : 75,
    isCrashed:false,
    drawMe: function(){
        ctx.drawImage(celineImg,this.x,this.y,this.width,this.height);
    },
};


document.onkeydown = function(event){
    if (celine.isCrashed){
        return;
    }

    switch(event.keyCode){
        case 37 : //left arrow
        celine.x -= 20;
        break;
        
        case 38 : //up 
        celine.y -= 20;
        break;

        case 39 : //right 
        celine.x += 20
        break;
        
        case 40 : //down 
        celine.y += 20;
        break;
    }
    
}


drawingLoop();


function drawingLoop(){
    // delete everything
    ctx.clearRect(0,0,1200,550);

    // draw everything again
    drawEverything();


    requestAnimationFrame(function(){  
        drawingLoop();
    });
};

function drawEverything(){
    // draw border on the canvas
    ctx.strokeStyle = "black";
    ctx.lineWidth = 8;
    ctx.strokeRect(0,0,1200,550);

    // draw Hero Celine
    celine.drawMe();

    allPipes.forEach(function(onePipe){
        onePipe.drawMe();
        if (rectangleCollision(celine,onePipe)){
            celine.isCrashed = true;
            onePipe.isCrashed = true;
        }
    })
    if(celine.isCrashed){
        gameOver.drawMe();
    }
    
}

function rectangleCollision (rectA,rectB){
    return rectA.y + rectA.height >= rectB.y 
        && rectA.y <= rectB.y + rectB.height
        && rectA.x + rectA.width >= rectB.x
        && rectA.x <= rectB.x + rectB.width 
}


