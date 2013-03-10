var canvasBg = document.getElementById("canvasBg");


var ctxBg = canvasBg.getContext('2d');

var img=new Image();
img.src="start.png";
ctxBg.drawImage(img,0,0,800,500,0,0,800,500);