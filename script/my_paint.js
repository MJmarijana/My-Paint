var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var painting = document.getElementById('paint');
var paint_style = getComputedStyle(painting);
var x = 0;
var y = 0;
var outil;
var buttons = document.querySelectorAll('.btn');
var info = document.getElementById('info');
var mode = document.getElementById('mode');
var clicks = 0;
var lastClick = [0, 0];
var imageLoad = document.getElementById('imageLoad');

canvas.width = parseInt(paint_style.getPropertyValue('width'));
canvas.height = parseInt(paint_style.getPropertyValue('height'));

canvas.addEventListener('mousemove', getPosition);
canvas.addEventListener('click', getPosition);
function getPosition(e) {
  x = e.pageX - this.offsetLeft;
  y = e.pageY - this.offsetTop;
}
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

for(var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function() {
    outil = this.innerText;
  }, false);
}

var tabEvent = ['mousedown', 'mouseup', 'mousemove'];
function eventRemover(outil){
  for(var i = 0; i < tabEvent.length; i++){
      canvas.removeEventListener(tabEvent[i], outil, false);
  }
}

canvas.addEventListener('mousedown', function() {
	
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.strokeStyle = document.getElementById("color").value;
  ctx.lineWidth = document.getElementById("line-width").value;
  if (outil == 'Crayon') {
    canvas.addEventListener('mousemove', crayon, false);
    eventRemover(cercle);
    eventRemover(cercleRempli);
    eventRemover(rectangle);
    eventRemover(rectangleRempli);
  }
  else if (outil == 'Gomme') {
      canvas.addEventListener('mousemove', gomme, false);
      eventRemover(cercle);
      eventRemover(cercleRempli);
      eventRemover(rectangle);
      eventRemover(rectangleRempli);
  }
  else if (outil == 'Cercle') {
      canvas.addEventListener('mousedown', cercle, false);
      eventRemover(cercleRempli);
      eventRemover(rectangle);
      eventRemover(rectangleRempli);

  }
  else if (outil == 'Cercle Rempli') {
      canvas.addEventListener('mousedown', cercleRempli, false);
      eventRemover(cercle);
      eventRemover(rectangle);
      eventRemover(rectangleRempli);
  }

  else if (outil == 'Rectangle') {
      canvas.addEventListener('mousedown', rectangle, false);
      eventRemover(cercle);
      eventRemover(cercleRempli);
      eventRemover(rectangleRempli);

  }
  else if (outil == 'Rectangle Rempli') {
      canvas.addEventListener('mousedown', rectangleRempli, false);
      eventRemover(cercle);
      eventRemover(cercleRempli);
      eventRemover(rectangle);
  }

  }, false);

canvas.addEventListener('mouseup', function() {

  if (outil == 'Crayon') {
    canvas.removeEventListener('mousemove', crayon, false);
  }
  else if (outil == 'Gomme') {
    canvas.removeEventListener('mousemove', gomme, false);
  }
  else if (outil == 'Cercle') {
    canvas.removeEventListener('mouseup', cercle, false);
  }
  else if (outil == 'Cercle Rempli') {
      canvas.removeEventListener('mouseup', cercleRempli, false);
  }

  else if (outil == 'Rectangle') {
      canvas.removeEventListener('mouseup', rectangle, false);
  }
  else if (outil == 'Rectangle Rempli') {
      canvas.removeEventListener('mouseup', rectangleRempli, false);
  }

}, false);

canvas.addEventListener('click', function() {
	
  ctx.strokeStyle = document.getElementById("color").value;
  ctx.lineWidth = document.getElementById("line-width").value;
  if (outil == 'Traits') {
    canvas.addEventListener('click', trait, false);
    eventRemover(cercle);
    eventRemover(cercleRempli);
    eventRemover(rectangle);
    eventRemover(rectangleRempli);
  }
  if (outil != 'Traits') {
    canvas.removeEventListener('click', trait, false);
  }
		
},false);

mode.addEventListener('change', updateW);
function updateW() {

  var lineWidth = document.getElementById("line-width").value;
  info.innerText = lineWidth;
		
}

var crayon = function() {

  ctx.globalCompositeOperation = 'source-over';
  ctx.lineTo(x, y);
  ctx.stroke();
};

var gomme = function() {

  ctx.globalCompositeOperation = 'destination-out';
  ctx.strokeStyle = 'rgba(0, 0, 0 ,1)';
  ctx.lineTo(x, y);
  ctx.stroke();

};

var trait = function() {

  if (clicks != 1) {
    clicks++;
  } else {
    ctx.globalCompositeOperation='source-over';
    ctx.beginPath();
    ctx.moveTo(lastClick[0], lastClick[1]);
    ctx.lineTo(x, y);
    ctx.stroke();
    clicks = 0;
  }
    lastClick = [x, y];
};

var cercle = function(){

    lineWidth = document.getElementById("line-width").value;
    ctx.beginPath();
    ctx.arc(x, y, lineWidth, 0, Math.PI*2);
    ctx.lineWidth = 3;
    ctx.stroke();

};

var cercleRempli = function(){

    lineWidth = document.getElementById("line-width").value;
    ctx.fillStyle = document.getElementById("color").value;
    ctx.beginPath();
    ctx.arc(x, y, lineWidth, 0, Math.PI*2);
    ctx.fill();

};

var rectangle = function(){

    lineWidth = document.getElementById("line-width").value;
    ctx.beginPath();
    ctx.rect(x, y, lineWidth, lineWidth);
    ctx.lineWidth = 3;
    ctx.stroke();

};

var rectangleRempli = function(){

    lineWidth = document.getElementById("line-width").value;
    ctx.fillStyle = document.getElementById("color").value;
    ctx.beginPath();
    ctx.rect(x, y, lineWidth, lineWidth);
    ctx.fill();

};


function download() {

  var dt = canvas.toDataURL('image/png');
  this.href = dt;
	
}
downloadLnk.addEventListener('click', download, false);

function image(e){
	
  var reader = new FileReader();
  reader.onload = function(event){
		var img = new Image();
    img.onload = function(){
      img.width = canvas.width;
      img.height = canvas.height;
      ctx.drawImage(img, 0, 0, 1000, 625);
    };
    img.src = event.target.result;
  };
    reader.readAsDataURL(e.target.files[0]);     
}

imageLoad.addEventListener('change', image, false);






















