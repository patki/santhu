var canvasBg = document.getElementById("canvasBg");
var ctxBg = canvasBg.getContext('2d');
var canvasjet=document.getElementById("canvasjet");
var ctxjet=canvasjet.getContext("2d");
var canvasenemy=document.getElementById("canvasenemy");
var ctxenemy=canvasenemy.getContext("2d");
var canvashud=document.getElementById("canvashud");
var ctxhud=canvashud.getContext("2d");
ctxhud.fillStyle="black";
ctxhud.font="bold 20px Arial";
var sprite=new Image();
sprite.src="spriteImage.png";
var img=new Image();
img.src="start.png";
img.addEventListener("load",draw,false);
var mousex=0;
var mousey=0;
var isplaying=false;
var isgameover=false;
var enemies=[];
jet1=new jet();
var bgdrawx1=0;
var bgdrawx2=1600;


var requestAnimFrame =  window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.oRequestAnimationFrame ||
                        window.msRequestAnimationFrame ||
                        function(callback) {
                            window.setTimeout(callback, 1000 / 60);
                        };
document.addEventListener("click",mouseclicked,false);

function draw()
{
//alert("abc");
ctxBg.drawImage(img,0,0,800,500,0,0,800,500);
}
function mouseclicked(e)
{
if(!isplaying)
{
mousex=e.pageX-canvasBg.offsetLeft;
mousey=e.pageY-canvasBg.offsetTop;
//alert(mousex);
if(mousex>310&&mousex<510&&mousey>130&&mousey<360)
{
play();
}
}
}
function drawbg()
{
ctxBg.clearRect(0,0,800,500);
ctxBg.drawImage(sprite,0,0,1600,500,bgdrawx1,0,1600,500);
ctxBg.drawImage(sprite,0,0,1600,500,bgdrawx2,0,1600,500);
}
function play()
{
setenemiesposition(20);
startloop();
document.addEventListener("keydown",checkwhchkey,false);
document.addEventListener("keyup",checkkeyup,false);
}
function startloop()
{
isplaying=true;
loop();
updatehud();
}
function loop()
{
if(isplaying)
{
document.getElementById("music").play();
movebg();
jet1.drawjet();
drawallenemies();
requestAnimFrame(loop);
}


}
function jet()
{
this.srcx=0;
this.srcy=500;
this.width=100;
this.height=40;
this.drawx=200;
this.drawy=200;
this.keyup=false;
this.keydown=false;
this.keyleft=false;
this.keyright=false;
this.isspacebar=false;
this.isshooting=false;
this.nosex=this.drawx+100;
this.nosey=this.drawy+32;
this.top=this.drawy;
this.bottom=this.drawy+this.height;
this.left=this.drawx;
this.right=this.drawx+this.width;
this.currentbullet=0;
this.bullets=[];
for(var i=0;i<25;i++)
{
this.bullets[i]=new Bullets();
}
this.score=0;
}
jet.prototype.drawjet=function()
{
//alert("abc");
clrctxjet();
this.updatecords();
this.checkdirection();
this.checkshooting();
this.drawallbullets();
ctxjet.drawImage(sprite,this.srcx,this.srcy,this.width,this.height,this.drawx,this.drawy,this.width,this.height);
this.gameover();
//ctxjet.drawImage(sprite,100,500,5,5,200,200,5,5);
};
function clrctxjet()
{
ctxjet.clearRect(0,0,800,500);


}
function clrctxenemy()
{
ctxenemy.clearRect(0,0,800,500);


}
function checkwhchkey(e)
{
var keyid=e.keyCode||e.which;
if(keyid==38||keyid==87)
{
e.preventDefault();
jet1.keyup=true;

}
if(keyid==40||keyid==83)
{
e.preventDefault();
jet1.keydown=true;

}
if(keyid==37||keyid==65)
{
e.preventDefault();
jet1.keyleft=true;

}
if(keyid==39||keyid==68)
{
e.preventDefault();
jet1.keyright=true;

}
if(keyid==32)
{
e.preventDefault();
jet1.isspacebar=true;
}


}
function checkkeyup(e)
{
var keyid=e.keyCode||e.which;
if(keyid==38||keyid==87)
{
e.preventDefault();
jet1.keyup=false;

}
if(keyid==40||keyid==83)
{
e.preventDefault();
jet1.keydown=false;

}
if(keyid==37||keyid==65)
{
e.preventDefault();
jet1.keyleft=false;

}
if(keyid==39||keyid==68)
{
e.preventDefault();
jet1.keyright=false;

}
if(keyid==32)
{
e.preventDefault();
jet1.isspacebar=false;
}


}
jet.prototype.checkdirection=function()
{
if(this.keyup===true&&this.top>0)
{
this.drawy-=2;
}
if(this.keydown===true&&this.bottom<500)
{
this.drawy+=2;
}if(this.keyleft===true&&this.left>0)
{
this.drawx-=2;
}
if(this.keyright===true&&this.right<800)
{
this.drawx+=2;
}
};
jet.prototype.updatecords=function()
{

this.nosex=this.drawx+100;
this.nosey=this.drawy+32;
this.top=this.drawy;
this.bottom=this.drawy+this.height;
this.left=this.drawx;
this.right=this.drawx+this.width;


}
//bullets section

function Bullets()
{
this.srcx=200;
this.srcy=500;
this.width=5;
this.height=5;
this.drawx=-20;
this.drawy=0;
this.explosion=new Explosion();
}
jet.prototype.checkshooting=function()
{
if(this.isspacebar===true&&this.isshooting===false)
{
this.isshooting=true;


this.bullets[this.currentbullet].fire(this.nosex,this.nosey);
this.currentbullet++;

if(this.currentbullet>=this.bullets.length)
this.currentbullet=0;

}
else if(this.isspacebar===false)
{
this.isshooting=false;
}

};
Bullets.prototype.fire=function(x,y)
{
this.drawx=x;
this.drawy=y;
};
Bullets.prototype.draw=function()
{
document.getElementById("gun").play();
 this.drawx+=3;
 ctxjet.drawImage(sprite,this.srcx,this.srcy,this.width,this.height,this.drawx,this.drawy,this.width,this.height);
 if(this.drawx>800){
this.recyclebullet();}
this.checkhashit();


};
Bullets.prototype.recyclebullet=function()
{

this.drawx=-20;

};
jet.prototype.drawallbullets=function()
{
for(var i=0;i<this.bullets.length;i++)
{
if(this.bullets[i].drawx>=0)
this.bullets[i].draw()
if(this.bullets[i].explosion.hashit===true)
{
//alert("abc");
this.bullets[i].explosion.draw();
}

}


};
function Enemies()
{
this.srcx=100;
this.srcy=500;
this.width=100;
this.height=40;
this.speed=2;
this.drawx=(Math.floor(Math.random()*1000))+800;
this.drawy=Math.floor(Math.random()*400);
this.points=5;


}
//enemies functions
function setenemiesposition(number)
{
for(var i=0;i<number;i++)
{
enemies[i]=new Enemies();
}

}
drawallenemies=function()
{
clrctxenemy();
for(var i=0;i<enemies.length;i++)
enemies[i].draw();
};
Enemies.prototype.draw=function()
{

this.drawx-=this.speed;
ctxenemy.drawImage(sprite,this.srcx,this.srcy,this.width,this.height,this.drawx,this.drawy,this.width,this.height);

this.checkenemyescaped();

};
Enemies.prototype.checkenemyescaped=function()
{

if(this.drawx+this.width<=0)
this.recycleenemy();
};
Enemies.prototype.recycleenemy=function()
{
this.drawx=(Math.floor(Math.random()*1000))+800;
this.drawy=Math.floor(Math.random()*400);
};
//explosion functions
function Explosion()
{
this.srcx=0;
this.srcy=540;
this.width=40;
this.height=40;
this.drawx=0;
this.drawy=0;
this.hashit=false;
this.currentframe=0;
this.totalframes=10;
}
Bullets.prototype.checkhashit=function()
{
for(var i=0;i<enemies.length;i++)
{

if(this.drawx>=enemies[i].drawx&&
   this.drawx<=enemies[i].drawx+enemies[i].width&&
   this.drawy>=enemies[i].drawy&&
   this.drawy<=enemies[i].drawy+enemies[i].height)
{
     //alert(i); 
   this.explosion.drawx=(enemies[i].drawx-20);
   this.explosion.drawy=enemies[i].drawy;
    this.explosion.hashit=true;
   this.recyclebullet();
   enemies[i].recycleenemy();
   jet1.updatescore(enemies[i].points);
}


}
};
Explosion.prototype.draw=function()
{
if(this.hashit)
{
document.getElementById("ping").play();

if(this.currentframe<=this.totalframes)
{

ctxjet.drawImage(sprite,this.srcx,this.srcy,this.width,this.height,this.drawx,this.drawy,this.width,this.height);
this.currentframe++;
}
else
{
this.hashit=false;
this.drawx=0;
this.drawy=0;
this.currentframe=0;
}

}
};
function updatehud()
{
ctxhud.clearRect(0,0,800,500);
ctxhud.fillText("Score:"+jet1.score,680,30);
}
jet.prototype.updatescore=function(points)
{
this.score+=points;
updatehud();


};
function movebg()
{
bgdrawx1-=5;
bgdrawx2-=5;
if(bgdrawx1<=-1600)
bgdrawx1=1600;
else
if(bgdrawx2<=-1600)
bgdrawx2=1600;
drawbg();

}
//game over
jet.prototype.gameover=function()
{
for(var i=0;i<enemies.length;i++)
{
if(this.drawx+this.width>=enemies[i].drawx+10&&
   this.drawx+this.width<=enemies[i].drawx+enemies[i].width&&
   this.drawy+10>=enemies[i].drawy&&
   this.drawy+10<=(enemies[i].drawy+enemies[i].height))
   {
   ctxBg.clearRect(0,0,800,500);
   isplaying=false;
   ctxBg.drawImage(sprite,800,500,800,500,0,0,800,500);
   this.score=0;
   document.getElementById("music").pause();
   document.getElementById("explosion").play();
    ctxBg.drawImage(sprite,40,540,100,100,enemies[i].drawx-30,enemies[i].drawy-15,100,100);
   }
   

}


};