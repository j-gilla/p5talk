var sketch = function(s) {


  s.setup = function () {
    s.createCanvas(600, 400)
  }

  s.draw = function () {
    s.ellipse(200, 200, 200, 200);
  }

}
var p5Sketch = new p5(sketch,'htmlSketch');