function setup () {
  createCanvas(720,400)
  var balls = [];
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
  this.maxforce = 0.05; //max steering force
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

Ball.prototype.update = function () {
  //update velocity
  this.velocity.add(this.acceleration);
  //limit speed
  this.velocity.limit(this.maxspeed);
  this.position.add(this.velocity);
  // reset acceleration to 0 each cycle
  this.acceleration.mult(0);
}

//a method that calculates and applies a steering forwards a target
//STEER = DESIRED MINUS VElOCITY
Ball.prototype.seek = function (target) {
  var desired = p5.Vector.sub(target, this.position);
  //Normalise desired and scale to mac speed
  desired.normalize();
  desired.mult(this.maxspeed);
  //steering = desired minus velocity
  var steer = p5.Vector.sub(desired, this.velocity);
  steer.limit(this.maxforce);// limit to maximum
  return steer;
}

//draw a ball as a circle
Ball.prototype.render = function (){
  fill(127,127);
  stroke(200);
  ellipse(this.position.x, this.position.y, 16,16);
}

//wraparound
Ball.prototype.borders = function (){
  if (this.position.x < -this.r) this.position.x = width + this.r;
  if (this.position.y < =this.r) this.position.y = height + this.r;
  if (this.position. x > width + this.r) this.position.x = -this.r;
}

//separation
//method checks for nearby boids and steers away
Ball.prototype.sepearte = function (balls) {
  var desiredSeperation = 25.0;
  var steer = createVector(0,0);
  var count = 0;
  //for every ball in the system, check if it's too close
  for (var i = 0; i < balls.length; i ++ ){
    var d = p5.Vector.dist(this.position, balls[i].position);
    //if the distance is great than 0 and less than an arbitrary amount
    if((d > 0 ) && (d < desiredSeperation)){
      var diff = p5.Vector.sub(this.position, ball[i].position);
      diff.normalize();
      diff.div(d);
      count++;
    }
  }
  // Average --- divde by how many
  if(count > 0){
    steet.div(count);
  }

  //As long as the vector is greater than 0
  if (steer.mag() > 0){
    //Implement Reynolds; Steeering = Desired - Velocity
      steer.normalize();
      steer.mult(this.maxspeed);
      steer.sub(this.velocity);
      steer.limit(this.maxforce);
  }
  return steer;
}


//Aligment
//For every nearby ball in the system, calculate the avg velocity
Ball.prototype.align = function (balls) {
  var neighbordist = 50;
  var sum = createVector(0,0);
  var count = 0;
  for (var i = 0; i < balls.length; i++){
    var d = p5.Vector.dist(sum, this.velocity);
    steer.limit(this.maxForce);
    return steer;
  } else {
    return createVector(0,0);
  }
}

//cohesion
//for the average location (i.e. center) pf all nearby balls, calculate steering vector towards that location
Ball.prototype.cohesion = function(balls){
  var neighbordist = 50;
  var sum = createVector(0,0); // Start with empty vector to accumulate all locations
  var count = 0;
  for (var i = 0; i < balls.length; i ++){
    var d = p5.Vector.dist(this.position, boids[i].position);
      if((d > 0) && (d < neighbordist)) {
        sum.add(balls[i].position); //Add location
        count++;
      }
  }
  if(count > 0){
    sum.div(count);
    return this.seek(sum); //steer towards the location
  } else {
    return createVector(0,0);
  }
}