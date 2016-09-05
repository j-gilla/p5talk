/**
 * Created by jackgilbert on 05/09/2016.
 */
//all the paths
var paths = [];
// are we painting?
var painting = false;
//how long till the next circle?
var next =0;

//where are we now and where were we?
var current;
var previous;

function setup() {
  createCanvas(720,400);
  current = createVector(0,0);
  previous = createVector(0,0);
}

function draw() {
  background(200);

  if(millis() > next && painting) {

    //Grab mouse position
    current.x = mouseX;
    current.y = mouseY;

    //new particles force is based on the mouse movement
    var force = p5.Vector.sub(current, previous);
    force.mult(0.05);

    //add new particle
    paths[paths.length-1].add(current,force);

    //schedule next circle
    next = millis() + random(100);

    //store mouse values
    previous.x = current.x;
    previous.y = current.y;
  }

//draw dem paths!
  for (var i =0; i < paths.length; i++){
    paths[i].update();
    paths[i].display();
  }
}

function mousePressed() {
  next = 0;
  painting = true;
  previous.x = mouseX;
  previous.y = mouseY;
  paths.push(new Path());
}

//Stop painting dammit!
function mouseReleased (){
  painting=false;
}

//a path is a list of particles
function Path() {
  this.particles = [];
  this.hue = random(100)

}

Path.prototype.add = function (position, force){
  //add a new particle with position force and hue
  this.particles.push(new Particle(position, force, this.hue));
}

//Display path
Path.prototype.update = function () {
  for(var i = 0; i <this.particles.length; i++){
    this.particles[i].update();
  }
}

//Display path
Path.prototype.display =function () {
  //loop through backwards
  for (var i =  this.particles.length - 1; i >= 0; i--){
    //if we should remove it
    if(this.particles[i].lifespan <= 0){
      this.particles.splice(i,1);
      //otherwise display it
    } else {
      this .particles[i].display(this.particles[i+1]);
    }
  }
}

//Particles along the path
function Particle(position, force, hue) {
  this.position =createVector(position.x,position.y);
  this.velocity = createVector(force.x, force.y);
  this.drag = 0.95;
  this.lifespan = 255;
}

Particle.prototype.update = function () {
  //move it
  this.position.add(this.velocity);
  //slow it down
  this.velocity.mult(this.drag);
  //fade it out
  this.lifespan --;
}

Particle.prototype.display = function (other) {
  stroke(0, this.lifespan);
  fill(0, this.lifespan/2);
  ellipse(this.position.x, this.position.y, 8,8);
  //if we need to draw a line
  if (other){
    line(this.position.x, this.position.y, other.position.x, other.position.y)
  }
}