//CANVAS
let canvas = document.getElementById('canvas1')
let ctx = canvas.getContext('2d')

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let eyes = []
let theta;

 // MOUSE TRAKING
 const mouse = {
     x:undefined,
     y:undefined,
 }

 window.addEventListener('mousemove',function(e){
     mouse.x = event.x;
     mouse.y = event.y;
 })


 // GRADIENT FONDO
 var grd = ctx.createLinearGradient(0, 0, 1600, 1000);
 grd.addColorStop(0, "purple");
 //grd.addColorStop(1, "BLUE");
 grd.addColorStop(1, "yellow");

//GRADIENT MOUSE 1 
var grd2 = ctx.createLinearGradient(0, 0, 1600, 1000);
grd2.addColorStop(0, "yellow");
//grd.addColorStop(1, "BLUE");
grd2.addColorStop(1, "red");
// GRADIENT MOUSE 2
var grd3 = ctx.createLinearGradient(0, 0, 1600, 1400);
grd3.addColorStop(0, "gold");
//grd.addColorStop(1, "BLUE");
grd3.addColorStop(1, "blue");

// CONSTRUCTOR DEL OBJETO 'EYE'

class Eye {

    constructor(x,y,radius){
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    draw(){
             
    //DRAW EYE
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true)
    //ctx.fillStyle = 'red'
    ctx.fillStyle = grd;
    ctx.fill();
    ctx.closePath();

    //DRAW IRIS
    let iris_dx = mouse.x - this.x;
    let iris_dy = mouse.y - this.y; 
    theta = Math.atan2(iris_dy,iris_dx);
    let iris_x = this.x + Math.cos(theta) * this.radius/10;
    let iris_y = this.y + Math.sin(theta) * this.radius/10;
    let irisRadius = this.radius / 1.2;
    ctx.beginPath();
    ctx.arc(iris_x,iris_y,irisRadius,0,Math.PI * 2,true);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();

   //DRAW PUPIL 

   let pupil_dx = mouse.x - this.x;
   let pupil_dy = mouse.y - this.y; 
   theta = Math.atan2(pupil_dy,pupil_dx);
   let pupil_x = this.x + Math.cos(theta) * this.radius/1.8;
   let pupil_y = this.y + Math.sin(theta) * this.radius/1.8;
   let pupilRadius = this.radius / 2.5;

   ctx.beginPath();
   ctx.arc(pupil_x,pupil_y,pupilRadius,0,Math.PI * 2,true);
   ctx.fillStyle = grd;
   ctx.fill();
   ctx.closePath();
       
   //DRAW PUPIL REFLECTION

   ctx.beginPath();
   ctx.arc(pupil_x-pupilRadius/3,pupil_y - pupilRadius/3,pupilRadius/2,0,Math.PI * 2,true);
   ctx.fillStyle = grd3;
   ctx.fill();
   ctx.closePath();
   //DRAW MOUSe
  ctx.beginPath();
  ctx.arc(mouse.x,mouse.y,25,0,Math.PI*2,true)             
  ctx.fillStyle = 'red'
  ctx.fillStyle = grd;
  ctx.fill();
  ctx.closePath();
  //DRAW MOUSe2
  ctx.beginPath();
  ctx.arc(mouse.x,mouse.y,15,0,Math.PI*2,true)             
  ctx.fillStyle = grd2
  //ctx.fillStyle = grd;
  ctx.fill();
  ctx.closePath();
  //DRAW MOUSe3
  ctx.beginPath();
  ctx.arc(mouse.x,mouse.y,5,0,Math.PI*2,true)             
  //ctx.fillStyle = grd2
  ctx.fillStyle = grd3;
  ctx.fill();
  ctx.closePath();    
    }
}    

// VALORES RANDOM

function init (){

    eyes =[];
    let overlapping = true;
    let numberOfEyes = 80;
    let protection = 10000;
    let counter = 0;

    while(eyes.length < numberOfEyes && counter < protection){
        
        let eye = {   
            x:Math.random()* canvas.width,
            y:Math.random()* canvas.height,
            radius:Math.floor(Math.random()* 100) +5 
       };
        overlapping = false;

        for(let i = 0;i < eyes.length; i++){
            let previousEye = eyes[i];
            let dx = eye.x - previousEye.x;
            let dy = eye.y - previousEye.y;
            let distance = Math.sqrt(dx*dx + dy*dy);

       if (distance < (eye.radius + previousEye.radius)){
            overlaping = true;
            break;
       }
    }
       if(!overlapping){
       eyes.push(new Eye(eye.x,eye.y,eye.radius))
    }
    
    }
}   

 function animate (){
     requestAnimationFrame(animate);
     ctx.fillStyle = 'rgba(0,0,0,.25)';
     ctx.fillRect(0,0,canvas.width,canvas.height)
     for(let i =0; i < eyes.length;i++){

      eyes[i].draw();
     }
 }
 
init()
animate()

window.addEventListener('resize',function(){
    canvas.width = this.innerWidth
    canvas.height = this.innerHeight
    init()
})
