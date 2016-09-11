var randCirc = function (r) {

  r.r;
  r.g;
  r.b;
  r.slider;
  r.setup = function () {


    r.createCanvas(640, 480);


    //Pick random colours

    r.r = r.random(255);
    r.g = r.random(255);
    r.b = r.random(255);

    r.colorMode(HSB, 255);
    r.slider = r.createSlider(0, 255, 127);
  }

  r.draw = function () {
    r.background(127);

    // Draw a circle
    r.strokeWeight(2);
    r.stroke(r.r, r.g, r.b);
    r.fill(r.r, r.g, r.b, 127);
    r.ellipse(360, 200, 200, 200);

    //draw a slider circle
    r.stroke(r.slider.value(), 255, 255);
    r.fill(r.slider.value(), 255, 255, 127);
    r.ellipse(260, 200, 200, 200);
  }

  r.mousePressed = function () {
    // Check if mouse is inside the circle
    r.d = r.dist(r.mouseX, r.mouseY, 360, 200);
    if (r.d < 100) {
      // Pick new random color values
      r.r = random(255);
      r.g = random(255);
      r.b = random(255);
    }

  }
};

var p5randCric = new p5(randCirc,'htmlSlider');

