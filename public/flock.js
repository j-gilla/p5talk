/**
 * Created by jackgilbert on 04/09/2016.
 */
var balls = [];

function setup () {
  createCanvas(720,400)
  //add an inital set of balls into the system
  for (var i = 0; i < 100; i ++){
    balls[i] = new Ball(random(width), random(height));
  }
}


function draw () {
  background (51);
  for (var i = 0; i < balls.length; i ++){
     balls[i].run(balls)
  }
}

//Ball class
//methods for seperation, cohesion, alignment

function Ball(x,y) {
  this.acceleration = createVector(0,0);
  this.velocity = p5.Vector.random2D();
  this.position = createVector(x,y);
  this.r = 3.0;
  this.maxspeed =3; //max speed
  this.maxforce = 0.05 //max steering force
}

Ball.prototype.run = function (balls) {
  this.flock(balls);
  this.update();
  this.borders;
  this.render();
}

//Forces go into acceleration
Ball.prototype.applyForce= function (force) {
  this.acceleration.add(force);
}

//accumlate a new acceleration each time based on three rules
Ball.prototype.flock = function (balls) {
  var sep = this.seperate(balls); // seperation
  var ali = this.align(balls); //alignment
  var coh = this.cohesion(balls) //cohesion
  //arbitrariy weight these forces
  sep.mult(2.5);
  ali.mult(1.0);
  coh.mult(1.0);
  //Add the force vetors to accelerations
  this.applyForce(sep);
  this.applyForce(ali);
  this.applyForce(coh);
}

//Todo - method to update location
