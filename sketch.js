var tower, towerImage;
var ghost, ghostImage;
var door, doorImage, doorGroup;
var climber, climberImage, climberGroup;
var invisibleBlock, invisibleBlockGroup;
var spookySound;
var gameState= "play";


function preload(){
  towerImage=loadImage("tower.png");
  ghostImage=loadAnimation("ghost-standing.png", "ghost-jumping.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
  spookySound=loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
 tower=createSprite(300,300);
  tower.addImage(towerImage);
   tower.velocityY=1;
   ghost=createSprite(300,300);
  ghost.addAnimation("jumping",ghostImage);
  ghost.scale=0.5;
  
  doorGroup=new Group();
  climberGroup=new Group();
 invisibleBlockGroup=new Group();
}

function draw(){
 background(0); 
  if (gameState==="play"){
  if (tower.y>400){
    tower.y=300;
  }
    if(keyDown("space")){
      ghost.velocityY=-10;
    }
    ghost.velocityY+=0.8;
    if(keyDown("right_arrow")){
      ghost.x+=3;
    }
    if(keyDown("left_arrow")){
      ghost.x-=3;
    } 
    if (ghost.isTouching(invisibleBlockGroup) || ghost.y>600){
      gameState="end";
      ghost.destroy();
    }
  spawnDoor();
  drawSprites();
  }
  if(gameState==="end"){
    fill("yellow");
    textSize(20);
    text("Game Over", 300,300);
    
  }
}

function spawnDoor(){
  if (frameCount % 240=== 0){
    door=createSprite(200,-50);
    door.addImage(doorImage);
    door.x=Math.round(random(120,400));
    door.velocityY=1;
    door.lifetime=600;
    doorGroup.add(door);
    climber=createSprite(200,10);
    climber.addImage(climberImage);
    climber.velocityY=1;
    climber.lifetime=600;
    climber.x=door.x;
    climberGroup.add(climber);
    invisibleBlock=createSprite(200,12);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    invisibleBlock.velocityY=1;
    invisibleBlock.lifetime=600;
    invisibleBlock.x=door.x;
    invisibleBlockGroup.add(invisibleBlock);
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
  }
}