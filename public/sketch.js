var sketch = function(s) {


  function setup(){
    s.createCanvas(600, 400);
  }

  function draw(){
    s.ellipse(x, height / 2, 20, 20);
    s.x = x + 1;
  }
};

var sketchP5 = new p5(sketch,'htmlSketch');