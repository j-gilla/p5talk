var sketch = function(s) {

  s.setup = function() {
    //s.background(255, 0, 255);
    s.createCanvas(100, 100)
  };

  s.draw = function() {
    s.ellipse(20, 20, 20, 20);
  };

}

var p5Sketch = new p5(sketch,'htmlSketch');