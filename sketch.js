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
var ground;
var higherground;
var con;
var con2;
var con3;
var con4;
var con5;
var rope;
var food,tiger_img,star_img,bg_img,tiger;

function preload()
{
  bg_img = loadImage('Zoo.png');
  food = loadImage('meat.png');
  tiger_img = loadImage('tiger.png');

 
  star_img = loadImage('star.png');

}

function setup() {
  createCanvas(500,800);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;

   var meat_options = {
    restitution:0
  }
  
  ground =new Ground(250,height-10,width,20);
  meat = Bodies.circle(100,400,15,meat_options);
  World.add(world,meat);
  
  
  
  //tiger sprite
  
  tiger = createSprite(Math.round(random(50,450)),750,100,100);
  tiger.addImage(tiger_img);
  tiger.scale = 0.1;
  higherground =new Ground(300,170,100,10);


  rope = new Rope(4,{x:230,y:330});
  rope2 = new Rope(6,{x:50,y:450});
  rope3 = new Rope(8,{x:400,y:400});
  rope4 = new Rope(10, {x:50,y:250})
  rope5 = new Rope(8, {x:125,y:600});
  con = new Link(rope,meat);
  con2 = new Link(rope2,meat);
  con3 = new Link(rope3,meat);
  con4 = new Link(rope4,meat);
  con5 = new Link(rope5, meat)

  //btn 1
  button = createImg('cut_btn.png');
  button.position(200,320);
  button.size(50,50);

  button2 = createImg('cut_btn.png');
  button2.position(30,420);
  button2.size(50,50);
  
  button3 = createImg('cut_btn.png');
  button3.position(370,390);
  button3.size(50,50);

  button4 = createImg('cut_btn.png');
  button4.position(20,240);
  button4.size(50,50);

  button5 = createImg('cut_btn.png');
  button5.position(95,590);
  button5.size(50,50);

  
  button.mouseClicked(rope_drop);
  button2.mouseClicked(rope2_drop);
  button3.mouseClicked(rope3_drop);
  button4.mouseClicked(rope4_drop);
  button5.mouseClicked(rope5_drop);


  ellipseMode(RADIUS);
}

function draw() 
{
  background(0);
  image(bg_img,0,0,width,height);
  Engine.update(engine);
  
  push();
  imageMode(CENTER);
  if(meat!=null){
    image(food,meat.position.x,meat.position.y,70,70);
  }
  pop();

  ground.show();
  higherground.show();
  rope.show();
  rope2.show();
  rope3.show();
  rope4.show();
  rope5.show();

  drawSprites();

}

function rope_drop()
{
  rope.break();
  con.dettach();
  con = null; 
}

function rope2_drop()
{
  rope2.break();
  con2.dettach();
  con2 = null; 
}

function rope3_drop()
{
  rope3.break();
  con3.dettach();
  con3 = null; 
}

function rope4_drop()
{
  rope4.break();
  con4.dettach();
  con4 = null; 
}

function rope5_drop()
{
  rope5.break();
  con5.dettach();
  con5 = null; 
}

if(collide(meat,tiger,40) == true)
    {
      engine.world.gravity.y = -1;
      tiger.position.x = meat.position.x;
      tiger.position.y = meat.position.y;
      console.log("MeatEaten!");
    }

function collide(body,sprite,x)
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

