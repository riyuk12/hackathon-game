

canvas=document.querySelector("canvas");
const scoreboard=document.getElementById("score")
c=canvas.getContext("2d");

canvas.height=524;
canvas.width=1024;

c.fillRect(0,0,canvas.width,canvas.height)

//obstacle class

class Pillar{
  constructor({width,distance,player,image}){
    this.width=width;
    this.distance=distance;
    this.pos={x:canvas.width,y:0};
    this.velocity=5;
    this.pillarHeight=canvas.height;
    this.variation=Math.floor(Math.random()*10)*30;
    this.gap=300;
    this.player=player;
    this.image1=new Image();
    this.image2=new Image();
    this.image1.src="./pillarUp.png";
    this.image2.src="./pillarDown.png";
  }

  draw(){
    c.fillStyle="green";
    //upper half(has variable size in y axis)
    //c.fillRect(this.pos.x,this.pos.y, 50,this.variation+20);
    c.drawImage(this.image1,this.pos.x-10,this.variation-330);
    //lower half(starts from variation +100)
    //c.fillRect(this.pos.x,this.pos.y+this.variation+this.gap-20 , 50,1000);
    c.drawImage(this.image2,this.pos.x,this.variation+this.gap-30 );
  }



  
  update(){

    
    this.draw();
    
    this.pos.x-=this.velocity;
    this.p1top=this.pos.y
    this.p1bottom=this.pos.y+this.variation;
    this.left=this.pos.x;
    this.right=this.pos.x+50;
    this.p2top=this.pos.y+this.variation+this.gap;
    this.p2bottom=canvas.height;
    this.collision=false;
    
    //player1 collision criteria
    this.leftCheck=(this.player.p1.right>=this.left);
    this.rightCheck=(this.player.p1.left<=this.right);
    this.p1Check=(this.p1bottom>=this.player.p1.top);
    this.p2Check=(this.p2top<=this.player.p1.bottom);
    //player2 collison criteria
    this.eleftCheck=(this.player.p2.right>=this.left);
    this.erightCheck=(this.player.p2.left<=this.right);
    this.ep1Check=(this.p1bottom>=this.player.p2.top);
    this.ep2Check=(this.p2top<=this.player.p2.bottom);
  
    this.sideCheck=(this.leftCheck && this.rightCheck);
    this.esideCheck=(this.eleftCheck && this.erightCheck);
    //player1 collision
    this.player1Collision=((this.sideCheck && this.p1Check) || (this.sideCheck && this.p2Check));
    //player2 collision
    this.player2Collision=((this.esideCheck && this.ep1Check) || (this.esideCheck && this.ep2Check));
    
  }
}


//player class
class Sprite{
  constructor({pos,velocity,color,image}){
    this.pos=pos;
    this.velocity=velocity;
    this.width=50;
    this.height=50;
    this.gravity=0.98;
    this.color=color;
    this.image= new Image();
    this.image.src=image;
    
  }
  draw(){
    c.fillStyle=this.color;
    c.drawImage(this.image,this.pos.x,this.pos.y);
    //c.fillRect(this.pos.x,this.pos.y,this.width,this.height);
  }
  update(){
    this.draw()
    this.pos.x+=this.velocity.x;
    this.pos.y+=this.velocity.y;
    this.top=this.pos.y;
    this.bottom=this.pos.y+this.height;
    this.left=this.pos.x;
    this.right=this.pos.x+this.width;

    
    //gravity (gravity +ve cus y axis +ve is down)
    this.velocity.y+=this.gravity;


    
    // boundary check
    if (this.pos.x+this.width>=canvas.width){
      //left anchor
      this.pos.x=canvas.width-this.width;
    }
    if (this.pos.y+this.height>=canvas.height){
      this.pos.y=canvas.height-this.height;
    }
    if (this.pos.y<0){
      this.pos.y=0;
    }
    if (this.pos.x<0){
      this.pos.x=0;
    }

    
  }
}

class PillarGen{
  constructor(pillars){
    this.pillars=pillars;
    this.length=this.pillars.length
  }
  make(){
    if (this.pillars[this.length-1].pos.x>canvas.width-300){
      pillars.push(new Pillar({width:50,distance:10,player:{p1:s,p2:e}}));
      
    }
  }
  kill(){
    if (this.pillars[0].pos.x<=0){
      this.pillars=pillars.splice(0,1);
    }
  }
  update(){
    this.make();
    this.pillars.forEach((pillar)=>pillar.update())
    this.kill();
  }
  
}

// main code
const s= new Sprite({pos:{x:0,y:0},velocity:{x:0,y:0},color:"red",image:"./player1.png"});
const e= new Sprite({pos:{x:100,y:0},velocity:{x:0,y:0},color:"blue",image:"./player2.png" } );
//const p= new Pillar({width:50,distance:10,player:{p1:s,p2:e}})
let movespeed=10;
let pillars=[new Pillar({width:50,distance:10,player:{p1:s,p2:e}})];

const gameover=(p)=>{
movespeed=0;
p.velocity=movespeed;
s.velocity.x=movespeed;
s.velocity.y=movespeed;
e.velocity.x=movespeed;
e.velocity.y=movespeed;
}

const playerwins=(winner)=>{
  if(winner=="p1"){
    scoreboard.innerText="player 1 red wins"
  }
  if(winner=="p2"){
    scoreboard.innerText="player 2 blue wins"
  }
}

const dead=(p)=>{
  if(p.player1Collision){
  movespeed=0;
    p.velocity=movespeed;
    s.velocity.x=movespeed;
    s.velocity.y=movespeed;
    e.velocity.x=movespeed;
    e.velocity.y=movespeed;
    playerwins("p2");
}
  if(p.player2Collision){
    movespeed=0;
    p.velocity=movespeed;
    s.velocity.x=movespeed;
    s.velocity.y=movespeed;
    e.velocity.x=movespeed;
    e.velocity.y=movespeed;
    playerwins("p1");
  
}
}

const animate=()=>{
  window.requestAnimationFrame(animate);
  const bg=new Image();
  bg.src="./background.png";

  c.clearRect(0,0,canvas.width,canvas.height);

  c.drawImage(bg,0,0);
  
  //c.clearRect(0,0,canvas.width,canvas.height);

  let length=pillars.length;
  
  if (pillars[length-1].pos.x<canvas.width-300){
      pillars.push(new Pillar({width:50,distance:10,player:{p1:s,p2:e}}));
      
    }
  if (pillars[0].pos.x<0){
      pillars.splice(0,1);
      
    }
pillars.forEach((pillar)=>pillar.update())
s.update();
e.update();
pillars.forEach((p)=>dead(p));
if (movespeed==0){
  pillars.forEach((pillar)=>gameover(pillar))
}

}

animate();

//controller
window.addEventListener("keydown",(event)=>{
  switch(event.key){
    case 'd':
      s.velocity.x=movespeed;
      break;
    case 'a':
      s.velocity.x=-movespeed;
      break;
    case 'w':
      s.velocity.y=-movespeed;
      break;
    case 'ArrowRight':
      e.velocity.x=movespeed;
      break;
    case 'ArrowLeft':
      e.velocity.x=-movespeed;
      break;
    case 'ArrowUp':
      e.velocity.y=-movespeed;
      break;
  }
  
});
window.addEventListener("keyup",(event)=>{
  switch(event.key){
    case 'd':
      s.velocity.x=0;
      break;
    case 'a':
      s.velocity.x=0;
      break;
    case 'ArrowRight':
      e.velocity.x=0;
      break;
    case 'ArrowLeft':
      e.velocity.x=0;
      break;
  }

});







