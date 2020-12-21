var monkey, monkey_running;
var banana ,bananaImage, bananasGroup;
var obstacle, obstacleImage, obstaclesGroup;
var ground, ground_Image;
var invisibleground;
var FoodGroup, obstacleGroup
var score = 0;
var edges;
var PLAY = 1;
var END = 0;
var gameState = "PLAY";

function preload(){
  

  monkey_running=       loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  ground_Image = loadImage("wideground.png");
 
}



function setup() {
  
  createCanvas(600,420);
  edges = createEdgeSprites();
  
  
  ground = createSprite(600,400,600,50);
  ground.shapeColor = "green";
  ground.x = ground.width/2;
  ground.velocityX = -4;
  
  monkey = createSprite(200,320,10,50);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.2;
  
  
  invisibleground = createSprite(300,380,600,5);
  invisibleground.visible = false;
  
  obstaclesGroup = new Group();
  bananasGroup = new Group();
  
}


function draw() {
  
  background("brown");
  
  text("survival Time-" + score,500,40);
  
  score = Math.ceil(frameCount/frameRate());
  
  if(gameState === "PLAY"){
    if(ground.x <300){
      ground.x = ground.width/2 ; 
    }
  
    if(keyDown("space") && monkey.y >= 200){
      monkey.velocityY = -15;
    }

    monkey.velocityY = monkey.velocityY + 0.8;
  
    spawnObstacles();
    spawnBanana();
    
    if(monkey.isTouching(bananasGroup)){
      bananasGroup.destroyEach();
    }
  
    if(monkey.isTouching(obstaclesGroup)){
      monkey.destroy();
      bananasGroup.destroyEach();
      obstaclesGroup.destroyEach();
      gameState = END;  
    }
  }
  else if(gameState === END) {
     fill("purple");
     textSize(25);
     text("gameOver",200,200); 
  }
  
  
  monkey.collide(edges);
  drawSprites();
}

function spawnObstacles(){
  if(frameCount%300 === 0){
    obstacle = createSprite(400,360,30,30);
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.velocityX = -4;
    obstacle.scale = 0.3;
    obstaclesGroup.add(obstacle);
    obstacle.lifetime = 100;
  }
}

function spawnBanana(){
  if(frameCount%100 === 0){
    banana = createSprite(450,200,20,20);
    banana.y = Math.round(random(120,200));
    banana.addImage("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -6;
    banana.lifetime = 100;
    bananasGroup.add(banana);
  }
}




