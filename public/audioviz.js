var audioviz = function (av) {


  av.soundtrack;
  av.playbutton;
  av.stopbutton;
  av.analyzer;

  av.preload = function() {
    av.soundtrack = av.loadSound('air.mp3');
  }

  av.setup = function() {
    av.createCanvas(400, 400);


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

 av.draw = function() {
    av.background(255);

    // draw an ellipse based on current volume level
    av.vol = av.analyzer.getLevel();
    av.noStroke();
    av.fill(255, 0, 0);
    av.ellipse(av.width / 2, av.height / 2, av.map(av.vol, 0, 1, 0, av.width), av.map(av.vol, 0, 1, 0, av.height));

  }

  av.playsound = function() {
    if (av.soundtrack.isPlaying() == false) {
      av.soundtrack.play();
    }
  }

   av.stopsound = function() {
    if (av.soundtrack.isPlaying() == true) {
      av.soundtrack.pause();
    }
  }
}

var p5Audioviz = new p5(audioviz,'htmlAudioviz');
