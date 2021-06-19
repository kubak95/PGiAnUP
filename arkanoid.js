   var myGamePiece;
   var myGameBall;
   var myGameBall2;
   var screenWidth = 640;
   var screenHeight = 480;
   var blocks = [];
   var points;
   var leftplatformenabled = true;
   var myGameArea;
   var background_img = new Image();
   background_img.src = "background.jpg";


   function startGame() {
       var speedX1 = ((Math.random() * 6) - 3);
       var speedX2 = ((Math.random() * 6) - 3);
       var speedY1 = ((Math.random() * 6) - 3);
       var speedY2 = ((Math.random() * 6) - 3);
       myGamePiece = new component(150, 20, "platform.png", ((screenWidth - 150) / 2), screenHeight - 20);
       myGamePiece2 = new component(20, 150, "platform.png", 0, ((screenHeight - 150) / 2));
       myGameBall = new ball(Math.floor((Math.random() * (screenWidth - 20)) + 20), Math.floor((Math.random() * (screenHeight - 20)) + 10), speedX1, speedY1, "ball.png", 16);
       myGameBall2 = new ball(Math.floor((Math.random() * (screenWidth - 20)) + 20), Math.floor((Math.random() * (screenHeight - 20)) + 10), speedX2, speedY2, "ball.png", 16);
       //    myGameBall = new ball(Math.floor((Math.random() * (screenWidth - 20)) + 20), Math.floor((Math.random() * (screenHeight - 20)) + 10), speedX1, speedY1, "blue", 5);
       //    myGameBall2 = new ball(Math.floor((Math.random() * (screenWidth - 20)) + 20), Math.floor((Math.random() * (screenHeight - 20)) + 10), speedX2, speedY2, "purple", 5);
       // console.log(myGameBall.speedX + "    " + myGameBall.speedY + "      " + myGameBall2.speedX + " " + myGameBall2.speedY);
       points = 0;
       blocks.length = 0;


       for (idx = 0; idx < 10; idx++) {
           for (idy = 1; idy <= 3; idy++) {
               blocks.push(new component(50, 20, "block1.png", 24 + (idx * 55), (25 + (idy * 25))));
               // console.log(blocks.length);
           }

       }
       myGameArea.start();
   }

   function platformsCrashWithBounds(myGamePiece, myGamePiece2) {
       // var myCenterX = this.x;
       // var myCenterY = this.y;
       // var myleft = myCenterX - (this.size / 2);
       // var myright = myCenterX + (this.size / 2);
       // var mytop = myCenterY - (this.size / 2);
       // var mybottom = myCenterY + (this.size / 2);

       var botplatformleft = myGamePiece.x;
       var botplatformright = myGamePiece.x + (myGamePiece.width);
       var botplatformtop = myGamePiece.y;
       var botplatformbottom = myGamePiece.y + (myGamePiece.height);

       var leftplatformleft = myGamePiece2.x;
       var leftplatformright = myGamePiece2.x + (myGamePiece2.width);
       var leftplatformtop = myGamePiece2.y;
       var leftplatformbottom = myGamePiece2.y + (myGamePiece2.height);

       var availableMoves = "HJKL";

       //case 1 - leftplatform is blocking botplatform going left
       if ((leftplatformbottom > botplatformtop) && (botplatformleft <= leftplatformright + 1)) {
           availableMoves = availableMoves.replace(/H/g, '');
       }
       //case 2 - botplatform is blocking leftplatform going down
       if ((botplatformleft < leftplatformright) && (leftplatformbottom >= botplatformtop)) {
           availableMoves = availableMoves.replace(/J/g, '');
       }
       //case 3 - botplatform is blocked by left wall
       if (botplatformleft < 1) {
           availableMoves = availableMoves.replace(/H/g, '');
       }
       //case 4 - botplatform is blocked by right wall
       if (botplatformright > screenWidth - 1) {
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

   myGameArea = {
       canvas: document.createElement("canvas"),
       start: function() {
           // leftplatformenabled = leftplatformenabled;
           this.canvas.width = screenWidth;
           // this.canvas.width = 480;
           this.canvas.height = screenHeight;
           // this.canvas.height = 270;
           this.context = this.canvas.getContext("2d");
           myGameArea.context.drawImage(background_img, 0, 0, screenWidth, screenHeight);

           document.body.insertBefore(this.canvas, document.body.childNodes[0]);
           this.frameNo = 0;
           this.interval = setInterval(updateGameArea, 20);
           this.timerInterval = setInterval(timer, 1000)

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
           this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
           myGameArea.context.drawImage(background_img, 0, 0, screenWidth, screenHeight);
       },
       stop: function() {
           clearInterval(this.interval);
       },


   }


   function timer() {
       if (paused == false) {
           time++;
           document.getElementById("time").innerHTML = time;
           if (mode) {
               if (time % 20 == 0) {
                   updateModeTwo();
               }
           } else {
               updateModeOne();
           }
       }
   }

   function component(width, height, texture, x, y) {
       this.width = width;
       this.height = height;
       this.speedX = 0;
       this.speedY = 0;
       this.x = x;
       this.y = y;
       this.image = new Image();
       this.image.src = texture;
       this.update = function() {
           ctx = myGameArea.context;
           ctx.save();
           //    ctx.fillStyle = color;
           ctx.fillRect(this.x, this.y, this.width, this.height);
           ctx.restore();
           ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
       }
       this.newPos = function() {
           this.x += this.speedX;
           this.y += this.speedY;
       }

       this.destroy = function() {
           ctx = myGameArea.context;
           ctx.clearRect(this.x, this.y, this.width, this.height);
           // this.x = -100;
           // this.y = -100;
       }


       this.toggleLeftPlatform = function() {
           if (leftplatformenabled) {
               this.x = -30;
               leftplatformenabled = false;

           } else {
               this.x = 0;
               leftplatformenabled = true;
           }
       }



   }



   function updateGameArea() {
       var x, height, gap, minHeight, maxHeight, minGap, maxGap;


       if (myGameBall.crashWithFloor(myGameArea)) {
           myGameArea.stop();
       }
       if (myGameBall.crashWithBounds(myGamePiece, myGamePiece2) == 1) {
           myGameBall.speedY *= -1;
       }
       if (myGameBall.crashWithBounds(myGamePiece, myGamePiece2) == 2) {
           myGameBall.speedX *= -1;
       }
       if (myGameBall2.crashWithFloor(myGameArea)) {
           myGameArea.stop();
       }
       if (myGameBall2.crashWithBounds(myGamePiece, myGamePiece2) == 1) {
           myGameBall2.speedY *= -1;
       }
       if (myGameBall2.crashWithBounds(myGamePiece, myGamePiece2) == 2) {
           myGameBall2.speedX *= -1;
       }

       myGameArea.clear();
       myGameArea.frameNo += 1;

       if (myGameArea.keys && myGameArea.keys[37]) {
           moveleft();
       }
       if (myGameArea.keys && myGameArea.keys[38]) {
           moveup();
       }
       if (myGameArea.keys && myGameArea.keys[39]) {
           moveright();
       }

       if (myGameArea.keys && myGameArea.keys[40]) {
           movedown();
       }


       myGamePiece.newPos();
       myGamePiece.update();
       myGamePiece2.newPos();
       myGamePiece2.update();
       myGameBall.newPos();
       myGameBall.update();
       myGameBall2.newPos();
       myGameBall2.update();
       var newblocks = [];
       for (idx = 0; idx < blocks.length; idx++) {
           blocks[idx].update();
           if ((myGameBall.collisionWithBlocks(blocks[idx]) == true) || (myGameBall2.collisionWithBlocks(blocks[idx]))) {
               // if ((myGameBall.collisionWithBlocks(blocks[idx]) == false) || (myGameBall2.collisionWithBlocks(blocks[idx]) == false)) {
               // continue;
               points += 1;
           } else {
               newblocks.push(blocks[idx]);
               // console.log(points);
               // blocks[idx].destroy();
           }
       }
       blocks = newblocks;
       delete newblocks;
       context = myGameArea.context;
       context.font = "30px Noto Sans";
       context.color = "black";
       context.fillText("Score: " + points, screenWidth - 150, 30)


   }


   function everyinterval(n) {
       if ((myGameArea.frameNo / n) % 1 == 0) {
           return true;
       }
       return false;
   }

   function moveup() {
       if (platformsCrashWithBounds(myGamePiece, myGamePiece2).includes("K")) {
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