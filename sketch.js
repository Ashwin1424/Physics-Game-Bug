const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;


let engine;
let world;
var apple,ground;
var fruit_con;
var fruit_con_2, fruit_con_3;
var rope, rope_2, rope_3;

var bg_img;
var food;
var basketImg;

var button;
var button_2, button_3;
var basket;

var canW, canH;


function preload()
{
  bg_img = loadImage('background.png');
  fruit = loadImage('apple.png');
  basketImg = loadImage('basket.png');
}

function setup() {
  var isMobile = /iPhone | iPad | iPod | Android/i.test(navigator.userAgent);
  if (isMobile){
    canW = displayWidth;
    canH = displayHeight;
  }
  else{
    canW = windowWidth;
    canH = windowHeight;
  }
  createCanvas(canW, canH);

  frameRate(80);


  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(canW/4,30);
  button.size(50,50);
  button.mouseClicked(drop);

  button_2 = createImg('cut_btn.png');
  button_2.position(canW/2, 35);
  button_2.size(50, 50);
  button_2.mouseClicked(drop_2);

  button_3 = createImg('cut_btn.png');
  button_3.position(canW/2+50, 180);
  button_3.size(50, 50);
  button_3.mouseClicked(drop_3);

  rope = new Rope (10, {x:canW/4, y:30})
  rope_2 = new Rope(8, {x:canW/2+20, y:40});
  rope_3 = new Rope(6, {x:canW/2+100, y:200});
  ground = new Ground(canW/2,canH,canW,20);

  basket = createSprite(canW/2,canH-100,100,100);
  basket.scale = 0.2;

  
  apple = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body, apple);

  fruit_con = new Link(rope, apple);
  fruit_con_2 = new Link(rope_2, apple);
  fruit_con_3 = new Link(rope_3, apple);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,canW,canH);

  push();
  imageMode(CENTER);
  if(apple!=null){
    image(food,apple.position.x,apple.position.y,70,70);
  }
  pop();

  rope.show();
  rope_2.show();
  rope_3.show();
  Engine.update(engine);
  ground.show();

  drawSprites();

  if(apple!=null && apple.position.y>=650)
  {
    apple=null;
     
   }
   
}



function collide(body,sprite, x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}

function drop()
{
  rope.break();
  apple.detach();
  fruit_con = null; 

}
function drop_2()
{
  rope_2.break();
  fruit_con_2.detach();
  fruit_con_2 = null; 

}

function drop_3()
{
  rope_3.break();
  fruit_con_3.detach();
  fruit_con_3 = null; 

}




