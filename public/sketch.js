var x = 0;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  ellipse(x, height/2,20,20);
  x = x + 1;
}
