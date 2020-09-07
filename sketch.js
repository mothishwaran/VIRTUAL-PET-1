//Create variables here
var dog;
var happydog;
var database;
var foodS;
var foodStock;
var Dog;
var Happydog
function preload()
{
  //load images here
  Dog=loadImage("Dog.png");
  Happydog=loadImage("happydog.png");
}

function setup() {
  database=firebase.database();
	createCanvas(500, 500);

  dog=createSprite(250,250,10,10);
  dog.scale=0.5;
  dog.addImage(Dog);

  foodStock=database.ref('food');
  foodStock.on("value",readStock);
}


function draw() { 
  background(46,139,87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(Happydog);
  } 
  else if (keyWentUp(UP_ARROW)) {
    dog.addImage(Dog);
    
  } 
 
  drawSprites();
  //add styles here
  textSize(15);
  strokeWeight(4);
  stroke(125,150,225);
  text ("NOTE : PRESS UP_ARROW TO FEED THE DOG",100,50);
  
  textSize(20);
  fill ("black");
  text("Remaining food :"+foodS,300,100)
  
 if(foodS<=0){
   dog=dog.addImage(Dog);
 }

}

function readStock(data){
  foodS=data.val();

}

function writeStock(x){
  if(x<=0){
    x=0;
    
  }else{
    x=x-1
  }
  database.ref('/').update({
  food:x
  })
  
}
