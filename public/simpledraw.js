var simpleDraw = function(k){

   k.setup =function() {
    k.createCanvas(640, 480);
  }

   k.draw = function() {
    if (k.mouseIsPressed) {
      k.fill(0);
    } else {
      k.fill(255);
    }
    k.ellipse(k.mouseX, k.mouseY, 80, 80);
  }
}


var p5SimpleDraw = new p5(simpleDraw, 'htmlSimpleDraw');