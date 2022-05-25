var canvas = document.getElementById("canvas");
canvas.height = innerHeight-4;
canvas.width  = innerWidth-4;
window.addEventListener("resize",function() {
    canvas.height = innerHeight-4;
    canvas.width  = innerWidth-4;
    mobile();
})
var ctx = canvas.getContext("2d");
//ctx.translate(canvas.height/2,canvas.width/2);
var paused = true;
ctx.save();
var player = ["jangle/image.png","jangle/image1.png","jangle/image2.png","jangle/image3.png"];
var food = ["jangle/food1.png","jangle/food2.png","jangle/food.png"];
var killerperson = ["jangle/killer.png","jangle/killer1.png","jangle/killer2.png","jangle/killer3.png"];
backgroudimg= ["jangle/stage1.jpg","jangle/stage2.jpg","jangle/stage3.jpg","jangle/stage4.jpg","jangle/stage5.jpg","jangle/stage6.jpg","jangle/stage7.jpg","jangle/stage8.jpg","jangle/stage9.jpg","jangle/stage10.jpg","jangle/stage11.jpg","jangle/stage12.jpg"];
var obstacles = ["jangle/obstacle1.png","jangle/obstacle2.png","jangle/obstacle3.png","jangle/obstacle4.png","jangle/obstacle5.png","jangle/obstacle6.png","jangle/obstacle7.png","jangle/obstacle8.png"];
var  backimg;
var foods =[];
var killer = [];
var obstacle = [];
var savechar = [];
var color = ["yellow","blue","red"];
var savemeon;
function pauseing() {
    var puseolder  =   document.getElementById("pause");
    var audio  =   document.getElementById("audio");
       if (paused) {
           paused = false;
           puseolder.innerText = "||";
           audio.pause();
       }else{
           
            audio.play();
           paused = true;
           puseolder.innerText = "▶️";
       }
       
   }
   function concil() {
       alert("Please close the tap to end this game.");
   }
function random() {
    var key = Math.random();
    while( key == 1 || key == 0){
    
        if (key == 1 || key == 0) {
            continue;
        }
            return key;
        
      }return key;
}

var saveMe = {
    x:Math.random()*innerWidth,
    y:Math.random()*innerHeight
}


function getPoint(x) {
    return ((x+50)/2);    
}
function getDistance(x1,x2,y1,y2) {
    return (Math.sqrt(Math.pow((x1-x2),2)+Math.pow((y1-y2),2)));
}
mouse  = {
    x:innerWidth/2,
    y:innerHeight/2
    }
var score = 0;
var live = 5;
var level = 5;
var levelKiller = 0.003;
var levelfood = 0.01;
var stage = 1;


function Element(x,y,f) {
    this.x = x;
    this.y = y;
    this.w =  50;
this.food = f;
     this.element = function() {
ctx.fillStyle = "blue";
this.image =  new Image(50,50);
this.image.src = this.food;
ctx.drawImage(this.image,this.x,this.y,this.w,this.w);
     }
 
 this.update = function() {


     if (this.x < 0) {
        this.x = 20;
     }
     if (this.x+50 > canvas.width) {
        this.x = canvas.width-52;
     }
 
     if (this.y < 0) {
        this.y = 20;
     }
     if (this.y+50 > canvas.height) {
        this.y = canvas.height-52;
     }
 this.element();
 }
     
 }

 
 function Componet(image) {
   this.x = mouse.x;
   this.y = mouse.y;
    this.w = 50;
    this.element = function() {
        this.array = image;
        this.image =  new Image(50,50);
        this.image.src = this.array;
        ctx.drawImage(this.image,mouse.x,mouse.y,this.w,this.w);
      
    }

this.update = function() {
    if (mouse.x < 0) {
        mouse.x = 0;
    }
    if (mouse.x+50 > canvas.width) {
        mouse.x = canvas.width-52;
    }

    if (mouse.y < 0) {
        mouse.y = 0;
    }
    if (mouse.y+50 > canvas.height) {
        mouse.y = canvas.height-52;
    }

  

//saveme
var  xpiont = getPoint(mouse.x);
var ypiont = getPoint(mouse.y);
var  xsave = getPoint(saveMe.x);
    var ysave = getPoint(saveMe.y);

    if (getDistance(xpiont,xsave,ypiont,ysave)-30  < 0){
        if (savemeon) {
            if (level > 10) {
                levelKiller -= 0.002;
                level += 0.06;
            }else{
                levelKiller += 0.001;
                level += 0.05;
            }
             levelfood -= 0.01;
             stage += 1;
            score =0;
            live =5;
                regenerate();
            savemeon = false;
        }
  
      
   }




//food
    
    
    for (let k = 0; k < foods.length; k++) {
        var x = getPoint(foods[k].x);
    var y = getPoint(foods[k].y);
      if (getDistance(xpiont,x,ypiont,y)-25  < 0){
            var x = Math.random()*innerWidth;
            var y = Math.random()*innerHeight;
            foods[k].x = x;
            foods[k].y = y;
            foods[k].food = food[Math.floor(Math.random()*food.length)];
               score +=5;
               var kicked  =   document.getElementById("kicked");
               kicked.play();
       }
     }

this.element();
}}


//next level


function Circle(x,y) {
    this.v = 0.08;
    this.distance = (Math.random()*30)+50;
    this.rd = Math.random()*Math.PI*2;
    this.x = x; 
    this.y = y; 
this.color = color[Math.floor(Math.random()*color.length)];
    this.create  = function(last) {
        ctx.beginPath();
        ctx.moveTo(last.x,last.y);
        ctx.lineTo(this.x,this.y)
        ctx.lineWidth = Math.random()*3;
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.closePath();
    }

    this.update = function() {
      this.rd += this.v; 
        //soh cah toa
        var previous  = {
            x:this.x,
            y:this.y
        }
        
      this.x = saveMe.x + Math.cos(this.rd)*this.distance; 
       this.y = saveMe.y + Math.sin(this.rd)*this.distance; 
        this.create(previous);
        
    }

}


///obstacle

function Obstacle(x,y,f,dx) {
    this.x = x;
    this.y = y;
    this.w =  dx;
this.food = f;
     this.element = function() {
ctx.fillStyle = "blue";
this.image =  new Image(50,50);
this.image.src = this.food;
ctx.drawImage(this.image,this.x,this.y,this.w,this.w);
     }
 
 this.update = function() {


    //kill
   var  xpiont = getPoint(this.x);
   var ypiont = getPoint(this.y);

       var x = getPoint(mouse.x);
       var y = getPoint(mouse.y);
        var curentx = mouse.x;
        var curenty = mouse.y;



     if (getDistance(xpiont,x,ypiont,y)-this.w /2  < 0){
    //collide
if (this.x < mouse.x) {
    mouse.x = curentx+this.w ;
}
if (this.x > mouse.x) {
    mouse.x = curentx-this.w ;
}

if (this.y < mouse.y) {
    mouse.y = curenty+this.w ;
}
if (this.y > mouse.y) {
    mouse.y = curenty-this.w ;
}
      }


 this.element();
 }
     
 }







function Killer(x,y,f,dx,dy) {
    this.x = x;
    this.y = y;
    this.w =  50;
this.food = f;
this.speedx = dx;
this.speedy = dy;
     this.element = function() {
ctx.fillStyle = "blue";
this.image =  new Image(50,50);
this.image.src = this.food;
ctx.drawImage(this.image,this.x,this.y,this.w,this.w);
     }
 
 this.update = function(component,killer) {
//wall
     if (this.x < 0) {
        this.speedx = dx;
     }
     if (this.x+50 > canvas.width) {
        this.speedx = -this.speedx;
     }
 
     if (this.y < 0) {
        this.speedy = dy;
     }
     if (this.y+50 > canvas.height) {
        this.speedy = -this.speedy;
     }
     this.x += this.speedx;
    this.y += this.speedy;



    //kill
   var  xpiont = getPoint(this.x);
   var ypiont = getPoint(this.y);

       var x = getPoint(mouse.x);
       var y = getPoint(mouse.y);

       if (live < 1) {
        component.w = 0;
        mouse.x = -300;
       mouse.y = -300;
        live = 0;
        ctx.font = "25px monospace";
        ctx.textAlign = "center";
        ctx.strokeText("😱️ GAME OVER 😱️",innerWidth/2,innerHeight/2);
        var replay = document.getElementById("replay");
        replay.style.display = "block";
        var kicked  =   document.getElementById("audio");
               kicked.pause();
    }

  

     if (getDistance(xpiont,x,ypiont,y)-25  < 0){
       var x = Math.random()*innerWidth-50;
       var y = Math.random()*innerHeight-50;
       mouse.x = x;
       mouse.y = y;
      live -=1;
      
           
       
      }

      //self

       this.wx = getPoint(this.x);
       this.wy = getPoint(this.y);
       

       for (let i = 0; i < killer.length; i++) {
        if (this == killer[i]) continue;
        var ox = getPoint(killer[i].x);
        var oy = getPoint(killer[i].y);
        if (getDistance(this.wx,ox,this.wy,oy)-25  < 0){
           
            if(this.x > killer[i].x ){
                this.speedx = this.speedx;
                killer[i].speedx = -killer[i].speedx;
               }
               if(this.x < killer[i].x ){
                this.speedx = -this.speedx;
                killer[i].speedx = killer[i].speedx;
               }

               if(this.y > killer[i].y){
                this.speedy = this.speedy;
                killer[i].speedy = -killer[i].speedy;
               }
               if(this.y < killer[i].y){
                this.speedy = - this.speedy;
                killer[i].speedy = killer[i].speedy;
               }
             this.x += this.speedx;
            this.y += this.speedy;

        }
         
     }
        
    

 this.element();
 }
     
 }







 function moveleft() {
    mouse.x -= 20;
 }

 function moveup() {
    mouse.y -= 20;
 }

 function movedown() {
    mouse.y += 20;
 }

 function moveright() {
    mouse.x += 20;
 }



window.addEventListener("keydown",function(event) {
switch (event.code) {
    //arrow
    case "ArrowRight":
        mouse.x += 20;
       
            break;
            case "ArrowLeft":
                mouse.x -= 20;
                break;
                case "ArrowDown":
                    mouse.y += 20;
                    break;
            case "ArrowUp":
                mouse.y -= 20;
            break;


        //alph
        case "KeyD":
            mouse.x += 20;
           
                break;
                case "KeyA":
                    mouse.x -= 20;
                    break;
                    case "KeyS":
                        mouse.y += 20;
                        break;
                case "KeyW":
                    mouse.y -= 20;
                break;
        
}
})


function mobile() {
    var up = document.getElementById("up");     
    var down = document.getElementById("down");     
    var right = document.getElementById("right");     
    var left = document.getElementById("left");    

   
    

up.style.display = "none";
down.style.display = "none";
right.style.display = "none";
left.style.display = "none";

//else

if (innerWidth < 900) {
    if (innerHeight < 900) {


up.style.display = "block";
down.style.display = "block";
right.style.display = "block";
left.style.display = "block";

if (innerWidth < 300) {
    if (innerHeight < 300) {


up.style.display = "none";
down.style.display = "none";
right.style.display = "none";
left.style.display = "none";





    }
}



    }
}

   
}

foods = [];
for (let i = 0; i < innerWidth*levelfood; i++) {
    var x = Math.random()*innerWidth;
    var y = Math.random()*innerHeight;
    var f =food[Math.floor(Math.random()*food.length)];
    foods.push( new Element(x,y,f));
}

function regenerate() {
 backimg = backgroudimg[Math.floor(Math.random()*backgroudimg.length)];
    savechar = [];
    saveMe.x = Math.random()*innerWidth;
    saveMe.y = Math.random()*innerHeight;
    for (let i = 0; i < 50; i++) {
        var x = Math.random()*innerWidth-70;
    var y = Math.random()*innerHeight-70;
    savechar.push(new Circle(x,y));
    
    }


 killer = [];
for (let i = 0; i < innerWidth*levelKiller; i++) {
    var x = Math.random()*innerWidth-70;
    var y = Math.random()*innerHeight-70;
    var dx = Math.random()*level;
    var dy = Math.random()*level;
    var f =killerperson[Math.floor(Math.random()*killerperson.length)];
    killer.push( new Killer(x,y,f,dx,dy));
}


 obstacle = [];
for (let i = 0; i < innerWidth*0.001; i++) {
    var x = Math.random()*innerWidth;
    var y = Math.random()*innerHeight;
    var dx =  (Math.random()*100);
    var f =obstacles[Math.floor(Math.random()*killerperson.length)];
    obstacle.push( new Obstacle(x,y,f,dx));
}

}


var compont = new Componet(player[Math.floor(Math.random()*player.length)]);

function action() {
    requestAnimationFrame(action);
    if (paused) {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        //background
    var backgroud =  new Image();
    backgroud.src = backimg;
    ctx.drawImage(backgroud,0,0,canvas.width,canvas.height);
    
      
      
    for (let j = 0; j < foods.length; j++) {
        foods[j].update();
    }
    compont.update();
    for (let j = 0; j < obstacle.length; j++) {
        obstacle[j].update(compont,obstacle);
      }
    for (let j = 0; j < killer.length; j++) {
        killer[j].update(compont,killer);
      }
     if (score > 99) {
    savemeon  = true;
        for (let j = 0; j < savechar.length; j++) {
            savechar[j].update();  
         }
        }
    
    ctx.strokeStyle = "red";
    ctx.strokeText("Stage: "+stage,canvas.width-100,20);
    ctx.strokeText("SCORE: "+score+"/100",canvas.width-100,40);
    ctx.strokeText("❤️: "+live,canvas.width-100,60);
       
        
    }
      
        
}
regenerate();
action();
mobile();

