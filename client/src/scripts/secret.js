//start game
function startGame() {
  gameCanvas.start();

  apple = new createApple();
  player = new createPlayer(x, y);
}

//update canvas
var interval = setInterval(updateCanvas, 20);

//player vars
var width = 20;
var height = 20;
var speed = 20;
var playerLength = 1;
var framesPerMove = 5;

var frameCounter = 0;

var direction;

var isDead = true;

//player array
//var snakeArray = [player];

//event listeners
document.addEventListener("keydown", function (event) {
  if (
    ((playerLength == 1 || direction != "down") && event.key == "ArrowUp") ||
    event.key == "w"
  ) {
    direction = "up";
  }
  if (
    ((playerLength == 1 || direction != "up") && event.key == "ArrowDown") ||
    event.key == "s"
  ) {
    direction = "down";
  }
  if (
    ((playerLength == 1 || direction != "right") && event.key == "ArrowLeft") ||
    event.key == "a"
  ) {
    direction = "left";
  }
  if (
    ((playerLength == 1 || direction != "left") && event.key == "ArrowRight") ||
    event.key == "d"
  ) {
    direction = "right";
  }
});

var gameCanvas = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 600;
    this.canvas.height = 400;
    this.context = this.canvas.getContext("2d");
    x = this.canvas.width / 2;
    y = this.canvas.height / 2;
    document.body.appendChild(this.canvas);
  },
};

function updateCanvas() {
  frameCounter++;

  if (frameCounter >= framesPerMove) {
    player.updateArray();
    player.draw();

    apple.draw();
    player.move(direction);
    moveApple();

    frameCounter = 0;
  } else {
    player.draw();
    apple.draw();
  }

  deathCheck();
}

function createPlayer(x, y) {
  this.x = x;
  this.y = y;
  var previousX = 0;
  var previousY = 0;
  var snakeArray = [[this.x, this.y]];

  this.draw = function () {
    var ctx = gameCanvas.context;
    ctx.clearRect(0, 0, gameCanvas.canvas.width, gameCanvas.canvas.height);

    for (var i = 0; i < snakeArray.length; i++) {
      ctx.fillStyle = "green";
      ctx.fillRect(snakeArray[i][0], snakeArray[i][1], width, height);
      ctx.fillStyle = "blue";
      switch (direction) {
        case "up":
          ctx.fillRect(this.x + 12, this.y + 3, 5, 5);
          ctx.fillRect(this.x + 3, this.y + 3, 5, 5);
          break;

        case "down":
          ctx.fillRect(this.x + 12, this.y + 13, 5, 5);
          ctx.fillRect(this.x + 3, this.y + 13, 5, 5);
          break;

        case "left":
          ctx.fillRect(this.x + 3, this.y + 12, 5, 5);
          ctx.fillRect(this.x + 3, this.y + 3, 5, 5);
          break;

        case "right":
          ctx.fillRect(this.x + 13, this.y + 12, 5, 5);
          ctx.fillRect(this.x + 13, this.y + 3, 5, 5);
          break;
        default:
          ctx.fillRect(this.x + 13, this.y + 12, 5, 5);
          ctx.fillRect(this.x + 13, this.y + 3, 5, 5);
      }
    }
  };

  this.grow = function () {
    playerLength += 1;
    snakeArray.push([previousX, previousY]);
    updateScore();
  };

  this.move = function (keyPressed) {
    previousX = snakeArray[snakeArray.length - 1][0];
    previousY = snakeArray[snakeArray.length - 1][1];

    switch (keyPressed) {
      case "up":
        if (player.y > 0) {
          this.y -= speed;
          for (var i = snakeArray.length - 1; i >= 1; i--) {
            snakeArray[i][0] = snakeArray[i - 1][0];
            snakeArray[i][1] = snakeArray[i - 1][1];
          }
          snakeArray[0] = [this.x, this.y];
        }
        break;

      case "down":
        if (player.y < gameCanvas.canvas.height - height) {
          this.y += speed;
          for (var i = snakeArray.length - 1; i >= 1; i--) {
            snakeArray[i][0] = snakeArray[i - 1][0];
            snakeArray[i][1] = snakeArray[i - 1][1];
          }
          snakeArray[0] = [this.x, this.y];
        }
        break;

      case "left":
        if (player.x > 0) {
          this.x -= speed;
          for (var i = snakeArray.length - 1; i >= 1; i--) {
            snakeArray[i][0] = snakeArray[i - 1][0];
            snakeArray[i][1] = snakeArray[i - 1][1];
          }
          snakeArray[0] = [this.x, this.y];
        }
        break;

      case "right":
        if (player.x < gameCanvas.canvas.width - width) {
          this.x += speed;
          for (var i = snakeArray.length - 1; i >= 1; i--) {
            snakeArray[i][0] = snakeArray[i - 1][0];
            snakeArray[i][1] = snakeArray[i - 1][1];
          }
          snakeArray[0] = [this.x, this.y];
        }
        break;
    }
  };

  this.updateArray = function () {};
}
// function addSnakeBlock(x,y){
//         this.x = x;
//         this.y = y;
//         var previousX;
//         var previousY;

// }

function createApple() {
  this.width = width;
  this.height = height;
  this.x = Math.floor(Math.random() * 30) * 20;
  this.y = Math.floor(Math.random() * 20) * 20;

  this.draw = function () {
    var ctx = gameCanvas.context;
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
}

function moveApple() {
  //move apple if apple and player are in same spot
  if (player.x == apple.x && player.y == apple.y) {
    apple.x = Math.floor(Math.random() * 30) * 20;
    apple.y = Math.floor(Math.random() * 20) * 20;

    player.grow();
  }
}

function deathCheck() {
  if (
    player.x >= gameCanvas.canvas.width - width ||
    player.x <= 0 ||
    player.y + height >= gameCanvas.canvas.height ||
    player.y <= 0
  ) {
    // clearInterval(interval);
  }
}

// Update score function
function updateScore() {
  document.getElementById("scoreValue").textContent = playerLength;
}

window.onload = startGame;
