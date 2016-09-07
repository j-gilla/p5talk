var s = function(p) {

  var ballDef = {
    boxX: 200,
    boxY: 200,
    boxZ: -100,
    zLimit: -200,
    boxRotation: 0,
    drawing : function(size) {
      p.box(size);
    }
  }

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.ortho(-p.width, p.width, p.height, -p.height, 0.1, 100);
  };

  p.draw = function() {

    p.translate(ballDef.boxX,ballDef.boxY,ballDef.boxZ);
    p.rotate(ballDef.boxRotation, [1,1,0]);
    ballDef.drawing(60);

    ballDef.boxRotation = ballDef.boxRotation + .1;
    ballDef.boxX = ballDef.boxX - 1;
    ballDef.boxY = ballDef.boxY - 2;
    ballDef.boxZ = ballDef.boxZ - 1;
    console.log(ballDef.boxZ);

    // Position Resets
    if (ballDef.boxY < -p.height) {
      ballDef.boxY = p.height;
    };
    if (ballDef.boxX < -p.width) {
      ballDef.boxX = p.width;
    };
    if (ballDef.boxZ < ballDef.zLimit) {
      ballDef.boxZ = -100;
    };

  };
};

var myp5 = new p5(s,'sketch0');