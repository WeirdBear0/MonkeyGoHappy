
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var gamestate, PLAY, END
var gameOverImg,restartImg

function preload(){
  
  
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");


  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
 
}



function setup() {
  createCanvas(600, 200);

  gamestate=PLAY;

  var message = "This is a message";
 console.log(message)
  
  monkey = createSprite(50,150,20,50);
  monkey.addAnimation("running", monkey_running);
 
  

  monkey.scale = 0.5;
  
  ground = createSprite(200,180,1200,20);
  
  ground.x = ground.width /2;
  

 

  invisibleGround = createSprite(200,150,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and banana Groups
  obstacleGroup = createGroup();
  FoodGroup = createGroup();

  
  monkey.setCollider("circle",0,0,40)
  monkey.debug = true
  monkey.scale=0.1
  
  score = 0;
  bananaScore = 0;

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);

  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  
}

function draw() {
  
  background("white");
  //displaying score
  stroke("black")
  text("Time Alive: "+ score, 500,50);
  text("Score: "+ bananaScore, 50,50);
  
  
  
  if(gamestate === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
    if (monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
      bananaScore=bananaScore+1;
    }
    

    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 140) {
        monkey.velocityY = -12;
        
    }
  
    if (monkey.isTouching(obstacleGroup)){
      monkey.destroy();
      ground.destroy();
      console.log("efagadfg")
      score=score;
      obstaclesGroup.destroyEach();
      FoodGroup.destroyEach();
      gamestate=END;

    }


    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    //spawn the bananas
    spawnBananas();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
  
  }

 

  
 
  //stop monkey from falling down
  monkey.collide(invisibleGround);

  // if (monkey.isTouching(obstacleGroup)){
  //   monkey.velocityX=0;
  //   ground.velocityX=0;
  // }

  



  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,155,10,40);
   obstacle.velocityX = -(6 + score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacleImage);
              break;
      case 2: obstacle.addImage(obstacleImage);
              break;
      case 3: obstacle.addImage(obstacleImage)
              break;
      case 4: obstacle.addImage(obstacleImage);
              break;
      case 5: obstacle.addImage(obstacleImage);
              break;
      case 6: obstacle.addImage(obstacleImage);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
}

function spawnBananas() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
     banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}







