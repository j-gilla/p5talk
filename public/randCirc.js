var randCirc = function (r) {

  r.r;
  r.g;
  r.b;
  r.slider;
 r.setup = function() {


   r.createCanvas(720, 400);


    //Pick random colours

    r.r = r.random(255);
    r.g = r.random(255);
    r.b = r.random(255);

    r.colorMode(HSB, 255);
    r.slider = r.createSlider(0, 255, 127);
  }

  r.draw = function() {
    r.background(127);

    //Draw a click circle
    r.strokeWeight(2);
    r.stroke(r, g, b);
    r.fill(r, g, b, 127);
    r.ellipse(560, 200, 200, 200);

    //draw a slider circle
    r.stroke(slider.value(), 255, 255);
    r.fill(slider.value(), 255, 255, 127);
    r.ellipse(260, 200, 200, 200);
  }

//when user clicks the mouse
   r.mousePressed = function() {
    //check if mouse is inside the circle
    r.d = dist(r.mouseX, r.mouseY, 560, 200);
    if (d < 100) {
      r.r = random(255);
      r.g = random(255);
      r.b = random(255);
      //prevent default browser behaviour

    }
  }
};

var p5randCric = new p5(randCirc, 'htmlRandCirc');
