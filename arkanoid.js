var myGamePiece;
var myGameBall;
var myGameBall2;
var screenWidth = 480;
var screenHeight = 270;
var blocks = [];
var points;
var leftplatformenabled = true;


function startGame() {
    var speedX1 = ((Math.random() * 6) - 3);
    var speedX2 = ((Math.random() * 6) - 3);
    var speedY1 = ((Math.random() * 6) - 3);
    var speedY2 = ((Math.random() * 6) - 3);
    myGamePiece = new component(150, 20, "red", ((screenWidth - 150) / 2), screenHeight - 20);
    myGamePiece2 = new component(20, 150, "yellow", 0, ((screenHeight - 150) / 2));
    myGameBall = new ball(Math.floor((Math.random() * (screenWidth - 20)) + 20), Math.floor((Math.random() * (screenHeight - 20)) + 10), speedX1, speedY1, "blue", 5);
    myGameBall2 = new ball(Math.floor((Math.random() * (screenWidth - 20)) + 20), Math.floor((Math.random() * (screenHeight - 20)) + 10), speedX2, speedY2, "purple", 5);
    // console.log(myGameBall.speedX + " " + myGameBall.speedY + " " + myGameBall2.speedX + " " + myGameBall2.speedY);
    points = 0;
    blocks.length = 0;


    for (idx = 0; idx < 10; idx++) {
        for (idy = 1; idy <= 3; idy++) {
            blocks.push(new component(40, 20, "gray", 24 + (idx * 45), (25 + (idy * 25)))); // console.log(blocks.length); } } myGameArea.start(); } function platformsCrashWithBounds(myGamePiece, myGamePiece2) { // var myCenterX=this.x; // var myCenterY=this.y; // var myleft=myCenterX - (this.size / 2); // var myright=myCenterX + (this.size / 2); // var mytop=myCenterY - (this.size / 2); // var mybottom=myCenterY + (this.size / 2); var botplatformleft=myGamePiece.x; var botplatformright=myGamePiece.x + (myGamePiece.width); var botplatformtop=myGamePiece.y; var botplatformbottom=myGamePiece.y + (myGamePiece.height); var leftplatformleft=myGamePiece2.x; var leftplatformright=myGamePiece2.x + (myGamePiece2.width); var leftplatformtop=myGamePiece2.y; var leftplatformbottom=myGamePiece2.y + (myGamePiece2.height); var availableMoves="HJKL" ; //case 1 - leftplatform is blocking botplatform going left if ((leftplatformbottom> botplatformtop) && (botplatformleft <= leftplatformright + 1)) { availableMoves=availableMoves.replace(/H/g, '' ); } //case 2 - botplatform is blocking leftplatform going down if ((botplatformleft < leftplatformright) && (leftplatformbottom>= botplatformtop)) {
            availableMoves = availableMoves.replace(/J/g, '');
        }
        //case 3 - botplatform is blocked by left wall
        if (botplatformleft < 1) {
            availableMoves = availableMoves.replace(/H/g, '');
        } //case 4 - botplatform is blocked by right wall if (botplatformright> screenWidth - 1) {
        availableMoves = availableMoves.replace(/L/g, '');
    }
    //case 5 - leftplatform is blocked by bottom wall
    if (leftplatformbottom > screenHeight - 1) {
        availableMoves = availableMoves.replace(/J/g, '');
    }

    //case 6 - leftplatform is blocked by top wall
    if (leftplatformtop < 1) {
        availableMoves = availableMoves.replace(/K/g, '');
    }
    return availableMoves;
}


var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function() {
        leftplatformenabled = leftplatformenabled;
        this.canvas.width = screenWidth;
        this.canvas.width = 480;
        this.canvas.height = screenHeight;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function(e) {
            e.preventDefault();
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function(e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function() {
        clearInterval(this.interval);
    },
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.save();
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.destroy = function() {
        ctx = myGameArea.context;
        ctx.clearRect(this.x, this.y, this.width, this.height); // this.x=-100; // this.y=-100; } this.toggleLeftPlatform=function() { if (leftplatformenabled) { this.x=-30; leftplatformenabled=false; } else { this.x=0; leftplatformenabled=true; } } } function ball(x, y, speedX, speedY, color, size) { this.x=x; this.y=y; this.speedX=speedX; this.speedY=speedY; this.size=size; this.update=function() { ctx.save(); ctx=myGameArea.context; ctx.fillStyle=color; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); ctx.restore(); } this.newPos=function() { this.x +=this.speedX; this.y +=this.speedY; } this.crashWithFloor=function(myGameArea) { var myCenterX=this.x; var myCenterY=this.y; var myleft=myCenterX - (this.size); var myright=myCenterX + (this.size); var mytop=myCenterY - (this.size); var mybottom=myCenterY + (this.size); var crash=true; if ((mybottom < myGameArea.canvas.height - 5) && (myleft> 5)) {
        crash = false;
    }
    //  return crash;
}


this.crashWithBounds = function(myGamePiece, myGamePiece2) {
    var myCenterX = this.x;
    var myCenterY = this.y;
    var myleft = myCenterX - (this.size);
    var myright = myCenterX + (this.size);
    var mytop = myCenterY - (this.size);
    var mybottom = myCenterY + (this.size);

    var botplatformleft = myGamePiece.x;
    var botplatformright = myGamePiece.x + (myGamePiece.width);
    var botplatformtop = myGamePiece.y;
    var botplatformbottom = myGamePiece.y + (myGamePiece.height);
    var botplatform10p = myGamePiece.width * 0.1;
    var botplatform30p = myGamePiece.width * 0.3;
    var botplatform40p = myGamePiece.width * 0.4;
    var botplatform60p = myGamePiece.width * 0.6;



    var leftplatformleft = myGamePiece2.x;
    var leftplatformright = myGamePiece2.x + (myGamePiece2.width);
    var leftplatformtop = myGamePiece2.y;
    var leftplatformbottom = myGamePiece2.y + (myGamePiece2.height);
    var leftplatform10p = myGamePiece2.height * 0.1;
    var leftplatform30p = myGamePiece2.height * 0.3;
    var leftplatform40p = myGamePiece2.height * 0.4;
    var leftplatform60p = myGamePiece2.height * 0.6;


    var verticalWall10p = screenHeight * 0.1;
    var verticalWall30p = screenHeight * 0.3;
    var verticalWall40p = screenHeight * 0.4;
    var verticalWall60p = screenHeight * 0.6;

    var horizontalWall10p = screenWidth * 0.1;
    var horizontalWall30p = screenWidth * 0.3;
    var horizontalWall40p = screenWidth * 0.4;
    var horizontalWall60p = screenWidth * 0.6;


    var angleChange = 0;

    // For case if there is just bottom platform

    // if ((myleft <= 0) || (myright>= screenWidth)) {
    // angleChange = 2;
    // }

    // For case if there are 2 platforms

    if (mybottom > botplatformtop && myleft >= botplatformleft && myright <= botplatformright) {
        angleChange = 1;
        this.y -= 2;
    }
    if (mytop <= 0) {
        angleChange = 1;
    }
    if (myright >= screenWidth) {
        angleChange = 2;
    }
    if (myleft < leftplatformright && mybottom <= leftplatformbottom && mytop >= leftplatformtop) {
        this.x += 2;
        // angleChange = 2;
        this.speedX = Math.abs(this.speedX);
    }



    if (myCenterX < botplatformleft + botplatform10p && myCenterX > botplatformleft && mybottom > botplatformtop || myCenterX > botplatformright - botplatform10p && myCenterX < botplatformright && mybottom > botplatformtop) {
        if (this.speedX < 0) {
            this.speedX = -3;
        } else {
            this.speedX = 3;
        }
        angleChange = 1;
    }
    if (myCenterX > botplatformleft + botplatform10p && myCenterX < botplatformleft + botplatform30p && mybottom > botplatformtop || myCenterX < botplatformright - botplatform10p && myCenterX > botplatformright - botplatform30p && mybottom > botplatformtop) {
        if (this.speedX < 0) {
            this.speedX = -2;
        } else {
            this.speedX = 2;
        }
        angleChange = 1;
    }
    if (myCenterX > botplatformleft + botplatform30p && myCenterX < botplatformleft + botplatform40p && mybottom > botplatformtop || myCenterX < botplatformright - botplatform30p && myCenterX > botplatformright - botplatform40p && mybottom > botplatformtop) {
        if (this.speedX < 0) {
            this.speedX = -1.5;
        } else {
            this.speedX = 1.5;
        }
        angleChange = 1;
    }
    if (myCenterX > botplatformleft + botplatform40p && myCenterX < botplatformleft + botplatform60p && mybottom > botplatformtop || myCenterX < botplatformright - botplatform40p && myCenterX > botplatformright - botplatform60p && mybottom > botplatformtop) {
        if (this.speedX < 0) {
            this.speedX = -1;
        } else {
            this.speedX = 1;
        }
        angleChange = 1;
    }
    if (myCenterY > leftplatformbottom - leftplatform10p && myCenterY < leftplatformbottom && myleft < leftplatformright || myCenterY < leftplatformtop + leftplatform10p && myCenterY > leftplatformtop && myleft < leftplatformright) {
        if (this.speedY < 0) {
            this.speedY = -3;
        } else {
            this.speedY = 3;
        }
        angleChange = 2;
    }
    if (myCenterY < leftplatformbottom - leftplatform30p && myCenterY > leftplatformbottom - leftplatform10p && myleft < leftplatformright || myCenterY < leftplatformtop + leftplatform30p && myCenterY > leftplatformtop + leftplatform10p && myleft < leftplatformright) {
        if (this.speedY < 0) {
            this.speedY = -2;
        } else {
            this.speedY = 2;
        }
        angleChange = 2;
    }
    if (myCenterY < leftplatformbottom - leftplatform40p && myCenterY > leftplatformbottom - leftplatform30p && myleft < leftplatformright || myCenterY < leftplatformtop + leftplatform40p && myCenterY > leftplatformtop + leftplatform30p && myleft < leftplatformright) {
        if (this.speedY < 0) {
            this.speedY = -1.5;
        } else {
            this.speedY = 1.5;
        }
        angleChange = 2;
    }
    if (myCenterY < leftplatformbottom - leftplatform60p && myCenterY > leftplatformbottom - leftplatform40p && myleft < leftplatformright || myCenterY < leftplatformtop + leftplatform60p && myCenterY > leftplatformtop - leftplatform40p && myleft < leftplatformright) {
        if (this.speedY < 0) {
            this.speedY = -1;
        } else {
            this.speedY = 1;
        }
        angleChange = 2;
    }
    //walls if (myCenterX < 0 + horizontalWall10p && myCenterX> 0 && mytop < 2 || myCenterX> screenWidth - horizontalWall10p && myCenterX < screenWidth && mytop < 2) { if (this.speedX < 0) { this.speedX=-3; } else { this.speedX=3; } angleChange=1; } if (myCenterX> 0 + horizontalWall10p && myCenterX > horizontalWall10p + horizontalWall30p && mytop < 2 || myCenterX < screenWidth - horizontalWall10p && myCenterX> screenWidth - horizontalWall30p && mytop < 2) { if (this.speedX < 0) { this.speedX=-2; } else { this.speedX=2; } angleChange=1; } if (myCenterX> 0 + horizontalWall30p && myCenterX > 0 + horizontalWall40p && mytop < 2 || myCenterX < screenWidth - horizontalWall30p && myCenterX> screenWidth - horizontalWall40p && mytop < 2) { if (this.speedX < 0) { this.speedX=-1.5; } else { this.speedX=1.5; } angleChange=1; } if (myCenterX> 0 + horizontalWall40p && myCenterX < 0 + horizontalWall60p && mytop < 2 || myCenterX < screenWidth - horizontalWall40p && myCenterX> screenWidth - horizontalWall60p && mytop < 2) { if (this.speedX < 0) { this.speedX=-1; } else { this.speedX=1; } angleChange=1; } if (myCenterY> screenHeight - verticalWall10p && myCenterY < screenHeight && myleft < 2 || myCenterY < 0 + verticalWall10p && myCenterY> 0 && myleft < 2 || myCenterY> screenHeight - verticalWall10p && myCenterY < screenHeight && myright> screenWidth - 2 || myCenterY < 0 + verticalWall10p && myCenterY> 0 && myright > screenWidth - 2) {
    if (this.speedY < 0) {
        this.speedY = -3;
    } else {
        this.speedY = 3;
    }
    angleChange = 2;
}

if (myCenterY < screenHeight - verticalWall30p && myCenterY > screenHeight - verticalWall10p && myleft < 2 || myCenterY < 0 + verticalWall30p && myCenterY > 0 + verticalWall10p && myleft < 2 || myCenterY < screenHeight - verticalWall30p && myCenterY > screenHeight - verticalWall10p && myright > screenWidth - 2 || myCenterY < 0 + verticalWall30p && myCenterY > 0 + verticalWall10p && myright > screenWidth - 2) {
    if (this.speedY < 0) {
        this.speedY = -2;
    } else {
        this.speedY = 2;
    }
    angleChange = 2;
}

if (myCenterY < screenHeight - verticalWall40p && myCenterY > screenHeight - verticalWall30p && myleft < 2 || myCenterY < 0 + verticalWall40p && myCenterY > 0 + verticalWall30p && myleft < 2 || myCenterY < screenHeight - verticalWall40p && myCenterY > screenHeight - verticalWall30p && myright > screenWidth - 2 || myCenterY < 0 + verticalWall40p && myCenterY > 0 + verticalWall30p && myright > screenWidth - 2) {
    if (this.speedY < 0) {
        this.speedY = -1.5;
    } else {
        this.speedY = 1.5;
    }
    angleChange = 2;
}

if (myCenterY < screenHeight - verticalWall60p && myCenterY > screenHeight - verticalWall40p && myleft < 2 || myCenterY < 0 + verticalWall60p && myCenterY > 0 - verticalWall40p && myleft < 2 || myCenterY < screenHeight - verticalWall60p && myCenterY > screenHeight - verticalWall40p && myright > screenHeight - 2 || myCenterY < 0 + verticalWall60p && myCenterY > 0 - verticalWall40p && myright > screenWidth - 2) {
    if (this.speedY < 0) {
        this.speedY = -1;
    } else {
        this.speedY = 1;
    }
    angleChange = 2;
}
return angleChange;


this.collisionWithBlocks = function(block) {
    var myCenterX = this.x;
    var myCenterY = this.y;
    var myleft = myCenterX - (this.size);
    var myright = myCenterX + (this.size);
    var mytop = myCenterY - (this.size);
    var mybottom = myCenterY + (this.size);
    var blockleft = block.x;
    var blockright = block.x + (block.width);
    var blocktop = block.y;
    var blockbottom = block.y + (block.height);
    var collistion = false;
    var block10pX = block.width * 0.1;
    var block30pX = block.width * 0.3;
    var block40pX = block.width * 0.4;
    var block60pX = block.width * 0.6;
    var block10pY = block.height * 0.1;
    var block30pY = block.height * 0.3;
    var block40pY = block.height * 0.4;
    var block60pY = block.height * 0.6;
    if (myCenterX < blockleft + block10pX && myCenterX > blockleft && mybottom > blocktop && mytop < blockbottom || myCenterX > blockright - block10pX && myCenterX < blockright && mybottom > blocktop && mytop < blockbottom) {
        if (this.speedY < 0) {
            this.speedY = 3;
        } else {
            this.speedY = -3;
        }
    }
    if (myCenterX > blockleft + block10pX && myCenterX < blockleft + block30pX && mybottom > blocktop && mytop < blockbottom || myCenterX < blockright - block10pX && myCenterX > blockright - block30pX && mybottom > blocktop && mytop < blockbottom) {
        if (this.speedY < 0) {
            this.speedY = 2;
        } else {
            this.speedY = -2;
        }
    }
    if (myCenterX > blockleft + block30pX && myCenterX < blockleft + block40pX && mybottom > blocktop && mytop < blockbottom || myCenterX < blockright - block30pX && myCenterX > blockright - block40pX && mybottom > blocktop && mytop < blockbottom) {
        if (this.speedY < 0) {
            this.speedY = 1.5;
        } else {
            this.speedY = -1.5;
        }
    }
    if (myCenterX > blockleft + block40pX && myCenterX < blockleft + block60pX && mybottom > blocktop && mytop < blockbottom || myCenterX < blockright - block40pX && myCenterX > blockright - block60pX && mybottom > blocktop && mytop < blockbottom) {
        if (this.speedY < 0) {
            this.speedY = 1;
        } else {
            this.speedY = -1;
        }
    }
    if (myCenterY > blockbottom - block10pY && myCenterY < blockbottom && myleft > blockright && myright < blockleft || myCenterY < blocktop + block10pY && myCenterY > blocktop && myleft > blockright && myright < blockleft) {
        if (this.speedX < 0) {
            this.speedX = 3;
        } else {
            this.speedX = -3;
        }
    }
    if (myCenterY < blockbottom - block30pY && myCenterY > blockbottom - block10pY && myleft > blockright && myright < blockleft || myCenterY < blocktop + block30pY && myCenterY > blocktop + block10pY && myleft > blockright && myright < blockleft) {
        if (this.speedX < 0) {
            this.speedX = 2;
        } else {
            this.speedX = -2;
        }
    }
    if (myCenterY < blockbottom - block40pY && myCenterY > blockbottom - block30pY && myleft > blockright && myright < blockleft || myCenterY < blocktop + block40pY && myCenterY > blocktop + block30pY && myleft > blockright && myright < blockleft) {
        if (this.speedX < 0) {
            this.speedX = 1.5;
        } else {
            this.speedX = -1.5;
        }
    }
    if (myCenterY < blockbottom - block60pY && myCenterY > blockbottom - block40pY && myleft > blockright && myright < blockleft || myCenterY < blocktop + block60pY && myCenterY > blocktop - block40pY && myleft > blockright && myright < blockleft) {
        if (this.speedX < 0) {
            this.speedX = 1.5;
        } else {
            this.speedX = -1.5;
        }
    }
    if (blockleft < myright && blockright > myleft && blockbottom > mytop && blocktop < mybottom) {
        collistion = true;
    } // if ((mybottom>= blocktop || myleft > blockleft || myright < blockright)) { // collistion=true; // } return collistion; } } function updateGameArea() { var x, height, gap, minHeight, maxHeight, minGap, maxGap; if (myGameBall.crashWithFloor(myGameArea)) { myGameArea.stop(); } if (myGameBall.crashWithBounds(myGamePiece, myGamePiece2)==1) { myGameBall.speedY *=-1; } if (myGameBall.crashWithBounds(myGamePiece, myGamePiece2)==2) { myGameBall.speedX *=-1; } if (myGameBall2.crashWithFloor(myGameArea)) { myGameArea.stop(); } if (myGameBall2.crashWithBounds(myGamePiece, myGamePiece2)==1) { myGameBall2.speedY *=-1; } if (myGameBall2.crashWithBounds(myGamePiece, myGamePiece2)==2) { myGameBall2.speedX *=-1; } myGameArea.clear(); myGameArea.frameNo +=1; if (myGameArea.keys && myGameArea.keys[37]) { moveleft(); } if (myGameArea.keys && myGameArea.keys[38]) { moveup(); } if (myGameArea.keys && myGameArea.keys[39]) { moveright(); } if (myGameArea.keys && myGameArea.keys[40]) { movedown(); } myGamePiece.newPos(); myGamePiece.update(); myGamePiece2.newPos(); myGamePiece2.update(); myGameBall.newPos(); myGameBall.update(); myGameBall2.newPos(); myGameBall2.update(); var newblocks=[]; for (idx=0; idx < blocks.length; idx++) { blocks[idx].update(); if ((myGameBall.collisionWithBlocks(blocks[idx])==true) || (myGameBall2.collisionWithBlocks(blocks[idx]))) { // if ((myGameBall.collisionWithBlocks(blocks[idx])==false) || (myGameBall2.collisionWithBlocks(blocks[idx])==false)) { // continue; points +=1; } else { newblocks.push(blocks[idx]); // console.log(points); // blocks[idx].destroy(); } } blocks=newblocks; delete newblocks; context=myGameArea.context; context.font="30px Noto Sans" ; context.color="black" ; context.fillText("Score: " + points, screenWidth - 150, 30)


}


function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {
        return true;
    }
    return false;
}

function moveup() {
    if (platformsCrashWithBounds(myGamePiece, myGamePiece2).includes(" K")) {
        myGamePiece2.speedY = -5;
        myGamePiece2.newPos();
        clearmove();
    }
}

function movedown() {
    if (platformsCrashWithBounds(myGamePiece, myGamePiece2).includes("J")) {
        myGamePiece2.speedY = 5;
        myGamePiece2.newPos();
        clearmove();
    }
}

function moveleft() {
    if (platformsCrashWithBounds(myGamePiece, myGamePiece2).includes("H")) {
        myGamePiece.speedX = -5;
        myGamePiece.newPos();
        clearmove();
    }
}

function moveright() {
    if (platformsCrashWithBounds(myGamePiece, myGamePiece2).includes("L")) {
        myGamePiece.speedX = 5;
        myGamePiece.newPos();
        clearmove();
    }
}

function clearmove() {
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    myGamePiece2.speedX = 0;
    myGamePiece2.speedY = 0;
}