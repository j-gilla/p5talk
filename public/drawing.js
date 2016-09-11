var drawing = function (d) {
//all the paths
  d.paths = [];
// are we painting?
  d.painting = false;
//how long till the next circle?
  d.next = 0;

//where are we now and where were we?
  d.current;
  d.previous;

  d.setup = function() {
    d.createCanvas(720, 400);
    d.current = d.createVector(0, 0);
    d.previous = d.createVector(0, 0);
  }

  d.draw = function() {
    d.background(200);

    if (d.millis() > d.next && d.painting) {

      //Grab mouse position
      d.current.x = d.mouseX;
      d.current.y = d.mouseY;

      //new particles force is based on the mouse movement
      var force = p5.Vector.sub(d.current, d.previous);
      force.mult(0.05);

      //add new particle
      d.paths[d.paths.length - 1].add(d.current, force);

      //schedule next circle
      d.next = d.millis() + d.random(100);

      //store mouse values
      d.previous.x = d.current.x;
      d.previous.y = d.current.y;
    }

//draw dem paths!
    for (var i = 0; i < d.paths.length; i++) {
      d.paths[i].update();
      d.paths[i].display();
    }
  }

  d.mousePressed = function() {
    d.next = 0;
    d.painting = true;
    d.previous.x = d.mouseX;
    d.previous.y = d.mouseY;
    d.paths.push(new d.Path());
  }

//Stop painting dammit!
  d.mouseRelease = function() {
    d.painting = false;
  }

//a path is a list of particles
   d.Path = function() {
    this.particles = [];
    this.hue = d.random(100)

  }

  d.Path.prototype.add = function (position, force) {
    //add a new particle with position force and hue
    this.particles.push(new d.Particle(position, force, this.hue));
  }

//Display path
  d.Path.prototype.update = function () {
    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
    }
  }

//Display path
  d.Path.prototype.display = function () {
    //loop through backwards
    for (var i = this.particles.length - 1; i >= 0; i--) {
      //if we should remove it
      if (this.particles[i].lifespan <= 0) {
        this.particles.splice(i, 1);
        //otherwise display it
      } else {
        this.particles[i].display(this.particles[i + 1]);
      }
    }
  }

//Particles along the path
  d.Particle = function(position, force, hue) {
    this.position = d.createVector(position.x, position.y);
    this.velocity = d.createVector(force.x, force.y);
    this.drag = 0.95;
    this.lifespan = 255;
  }

  d.Particle.prototype.update = function () {
    //move it
    this.position.add(this.velocity);
    //slow it down
    this.velocity.mult(this.drag);
    //fade it out
    this.lifespan--;
  }

  d.Particle.prototype.display = function (other) {
    d.stroke(0, this.lifespan);
    d.fill(0, this.lifespan / 2);
    d.ellipse(this.position.x, this.position.y, 8, 8);
    //if we need to draw a line
    if (other) {
      d.line(this.position.x, this.position.y, other.position.x, other.position.y)
    }
  }
}

var drawingP5 =  new p5(drawing, 'htmlDrawing');