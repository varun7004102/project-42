var backImage,backgr;
var player, player_running;
var ground,ground_img;
var obstacleGroup,obstacle, obstacleImage
var foodGroup
var score

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  obstaclesGroup = createGroup();
  foodGroup = createGroup();
  
  score = 0;
}
function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
 
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.6;
  
    player.collide(ground);

    spawnFood();
spawnObstacles();
 
  if(foodGroup.isTouching(player)){
    score=score+2;
    foodGroup.destroyEach();
    switch(score){
      case 10: player.scale = 0.12;   
             break;
      case 20: player.scale = 0.14;   
             break;
      case 30: player.scale = 0.16;   
             break;
      case 40: player.scale = 0.18;   
             break;
        default:break;
    }   
  } 
  if(obstaclesGroup.isTouching(player)){
     gameState = END;    
    }

  }
  else if (gameState === END) {

    ground.velocityX = 0;
    player.velocityY = 0; 
    backgr.velocityX = 0;

    player.visible = false;
    
    obstaclesGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0); 
    
    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);

    foodGroup.destroyEach();
    obstaclesGroup.destroyEach();

    fill(225)
    textSize(30) 
    text("Game Over",300,220)
    player.scale = 0.1;

  }
  drawSprites();

  stroke("white");  
 textSize(20);  
 fill("black")
 text("Score"+ score, 500,50) ;

}

function spawnFood() {
  if (frameCount % 80 === 0) {  
   var banana = createSprite(600,450,40,10);
      banana.y = Math.round(random(320,200));
      banana.addImage(bananaImage);
      banana.scale = 0.05;
      banana.velocityX = -3;
       
      banana.lifetime = 200;
         
      banana.depth = player.depth;
      player.depth = player.depth + 1;
         
      foodGroup.add(banana);   
  }
  }

  function spawnObstacles() {
    if (frameCount % 100 === 0) {  
     var obstacles = createSprite(450,400,40,10);
        obstacles.y = Math.round(random(300,300));
        obstacles.addImage(obstacleImage);
        obstacles.scale = 0.1;
        obstacles.velocityX = -3;
         
        obstacles.lifetime = 200;
       
        obstaclesGroup.add(obstacles);  
    }
    }