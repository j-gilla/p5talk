var bkground = function (Y) {


  var balls = [];

  Y.setup = function () {
    Y.createCanvas(720, 400);

    // Add an initial set if balls into the system
    for (var i = 0; i < 100; i++) {
      balls[i] = new Y.Ball(Y.random(Y.width), Y.random(Y.height));
    }
  }

  Y.draw = function () {
    Y.background(51);
    // Run all the balls
    for (var i = 0; i < balls.length; i++) {
      balls[i].run(balls);
    }
  }


// Ball class
// Methods for Separation, Cohesion, Alignment added
  Y.Ball = function (x, y) {
    this.acceleration = Y.createVector(0, 0);
    this.velocity = p5.Vector.random2D();
    this.position = Y.createVector(x, y);
    this.r = 3.0;
    this.maxspeed = 3;    // Maximum speed
    this.maxforce = 0.05; // Maximum steering force
  }

  Y.Ball.prototype.run = function (balls) {
    this.flock(balls);
    this.update();
    this.borders();
    this.render();
  }

// Forces go into acceleration
  Y.Ball.prototype.applyForce = function (force) {
    this.acceleration.add(force);
  }

// We accumulate a new acceleration each time based on three rules
  Y.Ball.prototype.flock = function (balls) {
    var sep = this.separate(balls); // Separation
    var ali = this.align(balls);    // Alignment
    var coh = this.cohesion(balls); // Cohesion
    // Arbitrarily weight these forces
    sep.mult(2.5);
    ali.mult(1.0);
    coh.mult(1.0);
    // Add the force vectors to acceleration
    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
  }

// Method to update location
  Y.Ball.prototype.update = function () {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelertion to 0 each cycle
    this.acceleration.mult(0);
  }

// A method that calculates and applies a steering force towards a target
// STEER = DESIRED MINUS VELOCITY
  Y.Ball.prototype.seek = function (target) {
    var desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(this.maxspeed);
    // Steering = Desired minus Velocity
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force
    return steer;
  }

// Draw boid as a circle
  Y.Ball.prototype.render = function () {
    Y.fill(127, 127);
    Y.stroke(200);
    Y.ellipse(this.position.x, this.position.y, 16, 16);
  }

// Wraparound
  Y.Ball.prototype.borders = function () {
    if (this.position.x < -this.r) this.position.x = Y.width + this.r;
    if (this.position.y < -this.r) this.position.y = Y.height + this.r;
    if (this.position.x > Y.width + this.r) this.position.x = -this.r;
    if (this.position.y > Y.height + this.r) this.position.y = -this.r;
  }

// Separation
// Method checks for nearby balls and steers away
  Y.Ball.prototype.separate = function (balls) {
    var desiredseparation = 25.0;
    var steer = Y.createVector(0, 0);
    var count = 0;
    // For every boid in the system, check if it's too close
    for (var i = 0; i < balls.length; i++) {
      var d = p5.Vector.dist(this.position, balls[i].position);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if ((d > 0) && (d < desiredseparation)) {
        // Calculate vector pointing away from neighbor
        var diff = p5.Vector.sub(this.position, balls[i].position);
        diff.normalize();
        diff.div(d); // Weight by distance
        steer.add(diff);
        count++; // Keep track of how many
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      steer.div(count);
    }

    // As long as the vector is greater than 0
    if (steer.mag() > 0) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.normalize();
      steer.mult(this.maxspeed);
      steer.sub(this.velocity);
      steer.limit(this.maxforce);
    }
    return steer;
  }

// Alignment
// For every nearby boid in the system, calculate the average velocity
  Y.Ball.prototype.align = function () {
    var neighbordist = 50;
    var sum = Y.createVector(0, 0);
    var count = 0;
    for (var i = 0; i < balls.length; i++) {
      var d = p5.Vector.dist(this.position, balls[i].position);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(balls[i].velocity);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxspeed);
      var steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return Y.createVector(0, 0);
    }
  }

// Cohesion
// For the average location (i.e. center) of all nearby balls, calculate steering vector towards that location
  Y.Ball.prototype.cohesion = function (balls) {
    var neighbordist = 50;
    var sum = Y.createVector(0, 0); // Start with empty vector to accumulate all locations
    var count = 0;
    for (var i = 0; i < balls.length; i++) {
      var d = p5.Vector.dist(this.position, balls[i].position);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(balls[i].position); // Add location
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      return this.seek(sum); // Steer towards the location
    } else {
      return Y.createVector(0, 0);
    }
  }
};

var bkground =  new p5(bkground, 'htmlbkground');