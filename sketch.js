var path, mainCyclist;
var pathImg, mainRacerImg1, mainRacerImg2;

var cycleBell;

var pinkCG, pinkImage;

var gameOver;
var gameOverImage;

var END = 0;
var PLAY = 1;
var gameState = PLAY;

var distance = 0;



function preload() {
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png", "images/mainPlayer2.png");
  mainRacerImg2 = loadAnimation("images/mainPlayer3.png");
  pinkImage = loadImage("images/mainPlayer1.png");
  gameOverImage = loadImage("images/gameOver.png");

}

function setup() {

  createCanvas(500, 300);

  // Moving background
  path = createSprite(100, 150);
  path.addImage(pathImg);
  path.velocityX = -5;

  //creating boy running
  mainCyclist = createSprite(70, 150, 20, 20);
  mainCyclist.addAnimation("SahilRunning", mainRacerImg1);
  mainCyclist.scale = 0.07;

  gameOver = createSprite(250,150,100,40);
  gameOver.addImage(gameOverImage);
}

function draw() {
  background(0);

  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: " + distance, 350, 30);

  console.log(mouseX, mouseY);

  mainCyclist.setCollider("rectangle", 0, 0, mainCyclist.width, mainCyclist.height)

  mainCyclist.debug = true

  if (gameState === PLAY) {

    mainCyclist.y = World.mouseY;

    edges = createEdgeSprites();
    mainCyclist.collide(edges);

    //code to reset the background
    if (path.x < 0) {
      path.x = width / 2;

      distance = distance + 1


    }
    gameOver.visible = false

  } else if (gameState === END) {
    text("Press Up arrow to Restart the game", 100, 250);
    gameOver.visible = true
    mainCyclist.addAnimation("SahilRunning", mainRacerImg2)
  }


}



function restart() {
  if (keyDown("up")) {
    gameState = PLAY;
    mainCyclist.addAnimation("SahilRunning", mainRacerImg1);
    pinkCG.destroyEach();
    distance = 0;
  }
}

function pink() {
  if (World.frameCount % 50 == 0) {
    pinkCG = createSprite(70, 30, 10, 10);
    pinkCG.addImage(pinkImage);
  }
}