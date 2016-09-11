var audioviz = function (av) {

//audio vars
  av.soundtrack;
  av.playbutton;
  av.stopbutton;
  av.analyzer;


  av.preload = function () {
    av.soundtrack = av.loadSound('air.mp3');
  }

  av.setup = function () {
    av.background(220,226,170,200);
    av.createCanvas(640, 480);
    av.frameRate(12);

    // stop sound to prevent it from playing automatically
    av.soundtrack.stop();

    // play button
    av.playbutton = av.createButton('Play');
    av.playbutton.position(25, 2500);
    av.playbutton.mousePressed(av.playsound);

    // stop button
    av.stopbutton = av.createButton('Stop');
    av.stopbutton.position(75, 2500);
    av.stopbutton.mousePressed(av.stopsound);

    // music visualizer
    av.analyzer = new p5.Amplitude();
    av.analyzer.setInput(av.soundtrack);
  }

  av.draw = function () {
    //colors
    av.r = av.random(255);
    av.g = av.random(255);
    av.b = av.random(0);
    av.background(255);

    // draw an ellipse based on current volume level
    av.vol = av.analyzer.getLevel();
    av.noStroke();
    av.fill(av.r, av.g, av.b);
    // av.ellipse(av.width / 2, av.height / 2, av.map(av.vol, 0, 1, 0, av.width), av.map(av.vol, 0, 1, 0, av.height));
    // av.ellipse(av.random(0,av.width / 2 ), av.random(0,av.height /2), av.map(av.vol, 0, 1, 0, av.width), av.map(av.vol, 0, 1, 0, av.height));
    // av.ellipse(av.random(0,av.width/ 2), av.random(0,av.height/2), av.map(av.vol, 0, 1, 0, av.width), av.map(av.vol, 0, 2, 0, av.height));
    // av.ellipse(av.random(0,av.width/2), av.random(0,av.height/2), av.map(av.vol, 0, 1, 0, av.width), av.map(av.vol, 0, 2, 0, av.height));
    av.ellipse(av.width / 2, av.height / 2, av.map(av.vol, 0, 1, 0, av.width), av.map(av.vol, 0, 1, 0, av.height));
    av.ellipse(200, 200, av.map(av.vol, 0, 1, 0, av.width), av.map(av.vol, 0, 1, 0, av.height));
    av.ellipse(500, 400, av.map(av.vol, 0, 1, 0, av.width), av.map(av.vol, 0, 1, 0, av.height));
    av.ellipse(300, 350, av.map(av.vol, 0, 1, 0, av.width), av.map(av.vol, 0, 1, 0, av.height));av.ellipse(350, 100, av.map(av.vol, 0, 1, 0, av.width), av.map(av.vol, 0, 1, 0, av.height));
    av.ellipse(450, 90, av.map(av.vol, 0, 1, 0, av.width), av.map(av.vol, 0, 1, 0, av.height));
    av.ellipse(100, 400, av.map(av.vol, 0, 1, 0, av.width), av.map(av.vol, 0, 1, 0, av.height));av.ellipse(350, 100, av.map(av.vol, 0, 1, 0, av.width), av.map(av.vol, 0, 1, 0, av.height));

    // bad av.ellipse(av.width / 3, av.height / 9, av.map(av.vol, 0, 1, 0, av.width), av.map(av.vol, 0, 5, 0, av.height));
    //  bad - av.ellipse(av.width / 6, av.height / 3, av.map(av.vol, 0, 10, 0, av.width), av.map(av.vol, 0, 1, 0, av.height));
    // av.ellipse(av.width / 4, av.height / 10, av.map(av.vol, 0, 1, 0, av.width), av.map(av.vol, 0, 1, 0, av.height));

  }

  av.playsound = function () {
    if (av.soundtrack.isPlaying() == false) {
      av.soundtrack.play();
    }
  }

  av.stopsound = function () {
    if (av.soundtrack.isPlaying() == true) {
      av.soundtrack.pause();
    }
  }
}

var p5Audioviz = new p5(audioviz, 'htmlAudioviz');
