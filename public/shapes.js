var shapes = function(a) {

   a.setup = function() {
    // Create the canvas
    a.createCanvas(720, 400);
    a.background(200);

    // Set colors
    a.fill(204, 101, 192, 127);
    a.stroke(127, 63, 120);

    // A rectangle
    a.rect(40, 120, 120, 40);
    // An ellipse
    a.ellipse(240, 240, 80, 80);
    // A triangle
    a.triangle(300, 100, 320, 100, 310, 80);

    // A design for a simple flower
    a.translate(580, 200);
    a.noStroke();
    for (var i = 0; i < 10; i++) {
      a.ellipse(0, 30, 20, 50);
      a.rotate(a.PI / 5);
    }
  }
};

var shapesP5 =  new p5(shapes, 'htmlShapes');