var PLAY = 1;
var END = 0;
var gameState = PLAY;

var back,backImage;
var player,playerImage, obstacleImage,obstacle;
var cloudsImage,clouds, ground,stone,stoneImage;
var cloudsGroup,obstaclesGroup;

var score = 0;

function preload(){
 
  //to load the images
  backImage = loadImage("ground.png");
  playerImage = loadImage("player.png");
  obstacleImage = loadImage("obstacle.jpg");
  cloudsImage = loadImage("clouds.jpg");
  stoneImage = loadImage("stone.png");
  
}

function setup(){
  
  //to create a canvas
  createCanvas(400,400);
  
  //to create the background
  back = createSprite(200,440,30,30);
  back.addImage("mobile",backImage);
  back.velocityX = -4;
  
  //to create the player
  player = createSprite(50,325,30,30);
  player.addImage("pen",playerImage);
  player.scale = 0.4;
   
  //to create the invisible ground
  ground = createSprite(200,375,400,10);
  ground.visible = false;
  
  //to decrase the collider
  player.setCollider("rectangle",50,0,100,player.height);
  player.debug = true;
  
  //to create new groups for the clouds and the obstacles
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
    
}

function draw(){
  
  //to give the background color
  background("lightblue");

if(gameState === PLAY){
   
 //to make the player to jump when space key is pressed
 if(keyDown("space") && player.y >= 100 ){  
  player.velocityY = -15;
 }
  
  //to add graviy for the player
  player.velocityY = player.velocityY + 0.8;
  
  //to add velocity to the ground
  back.velocityX = -(4 + 3* score / 100);
  
  //to display the score
  fill("black");
  textSize(20);
  text("score:" + score,300,100,30,30);
  
  //to increase the score
  score = score + Math.round(getFrameRate()/60);
  
  //to make appear the background image again and again
  if( back.x < 0 ){
  back.x = back.width / 2;
 }  

} 
  
 if(player.isTouching(obstaclesGroup)){
   
   //o change the gamestate to END
   gameState = END;
   
   //make the obstacles and clouds to stop
   obstaclesGroup.setVelocityXEach(0);
   cloudsGroup.setVelocityXEach(0);
   
   //to set velocity of the background as 0
   back.velocityX = 0;
   
   //to add lifetime
   obstaclesGroup.setLifetimeEach(-1);
   cloudsGroup.setLifetimeEach(-1);
   
   //to display the required message
   fill("black");
   text("Press R to Restart",180,200,100,100);
 }
  
if(keyDown("r")){
  reset();
}
  
  //to make the player collide to the ground 
  player.collide(ground);
 
  //to create new functions for the clouds and obstacles  
  spawnClouds();
  spawnObstacles();
  
  drawSprites();
}

function reset(){
  
  //to change the gamestate to PLAY state again
  gameState = PLAY;
  
  //to destroy the obstacles and the clouds
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  //to change the score to 0
  score = 0;
  
}

function spawnObstacles(){
  
  if(frameCount % 100 === 0){
    
    //to create the obstacle
    obstacle = createSprite(200,320,20,20);
    
    //make the obstacles appear randomly
    obstacle.x = Math.round(random(400,450));
    
    //to add image
    obstacle.addImage("laptop",obstacleImage);
    
    //to adjust the size of the animation
    obstacle.scale = 0.15;
    
    //to solve the problem of memory leak
    obstacle.lifetime = 150;
    
    //to add velocity
    obstacle.velocityX = -(4 + 3* score / 100);
    
    //to add the obstacles in the obstacles group
    obstaclesGroup.add(obstacle);
    
  }   
}

function spawnClouds(){
  
  if(frameCount % 70 === 0){
    
   //to create the clouds
   clouds = createSprite(400,100,20,20);
    
   //make the clouds appear randomly
   clouds.y = Math.round(random(10,60));
        
   //to add image
   clouds.addImage("mobile",cloudsImage);
    
   //to adjust the size of the animation
   clouds.scale = 0.08;
    
   //to solve the problem of memory leak
   clouds.lifetime = 150
    
   //to add velocity
   clouds.velocityX = -(4 + 3* score / 100);
    
   //to add the clouds in the clouds group
   cloudsGroup.add(clouds);
 } 
  
}
