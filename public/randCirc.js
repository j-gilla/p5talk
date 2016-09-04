var r, g, b;
var slider;

function setup() {
  createCanvas(720,400);
  //Pick random colours
  r = random(255);
  g = random(255);
  b = random(255);

  colorMode(HSB, 255);
  slider = createSlider(0, 255, 127);
}

function draw() {
  background(127);

  //Draw a click circle
  strokeWeight(2);
  stroke(r, g, b);
  fill(r,g,b, 127);
  ellipse(560, 200, 200, 200);

  //draw a slider circle
  stroke(slider.value(), 255, 255);
  fill(slider.value(), 255, 255, 127);
  ellipse(260, 200, 200, 200);
}

//when user clicks the mouse
function mousePressed() {
  //check if mouse is inside the circle
  var d = dist(mouseX, mouseY, 560, 200);
  if (d < 100) {
    r = random(255);
    g = random(255);
    b = random(255);
    //prevent default browser behaviour

  }
}
