var sketch = function(s) {

  s.setup = function() {
    //s.background(255, 0, 255);
    s.createCanvas(640, 480)
  };

  s.draw = function() {
    s.ellipse(200, 200, 200, 200);
  };

}

var p5Sketch = new p5(sketch,'htmlSketch');