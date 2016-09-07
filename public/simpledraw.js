var simpledraw = function(sd) {


  sd.setup = function () {
    sd.createCanvas(640, 480);
  };

  sd.draw = function () {
    if (sd.mouseIsPressed) {
      sd.fill(0);
    } else {
      sd.fill(255);
    }
    sd.ellipse(sd.mouseX, sd.mouseY, 80, 80);
  }
};

var p5SimpleDraw = new p5(simpledraw, 'htmlSimpleDraw');