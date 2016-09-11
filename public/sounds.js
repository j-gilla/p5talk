var sounds = function (m) {

// the midi notes of a scale
  m.notes = [60, 62, 64, 65, 67, 69, 71, 74];

  m.index = 0;
  m.song = [
    {note: 4, duration: 400, display: "D"},
    {note: 0, duration: 200, display: "G"},
    {note: 1, duration: 200, display: "A"},
    {note: 2, duration: 200, display: "B"},
    {note: 3, duration: 200, display: "C"},
    {note: 4, duration: 400, display: "D"},
    {note: 0, duration: 400, display: "G"},
    {note: 0, duration: 400, display: "G"}
  ];

  m.trigger = 0;
  m.autoplay = false;
  m.osc;

  m.setup = function() {
    m.createCanvas(720, 400);
    m.button = m.createButton("Play");
    m.button.position(25, 410);

    //trigger automatically playing
    m.button.mousePressed(function () {
      if (!m.autoplay) {
        m.index = 0;
        m.autoplay = true;
      }
    });
    // a triangel oscillator
    m.osc = new p5.TriOsc();
    m.osc.start();
    m.osc.amp(0);
  }

// A function to play a note
   m.playNote = function(note, duration) {
    m.osc.freq(m.midiToFreq(m.note));
    // Fade it in
    m.osc.fade(0.5, 0.2);

    // If we sest a duration, fade it out
    if (duration) {
      setTimeout(function () {
        m.osc.fade(0, 0.2);
      }, duration - 50);
    }
  }

   m.draw = function() {
    //if we are autoplaying and it's time of the next note

    if (m.autoplay && m.millis() > m.trigger) {
      m.playNote(m.notes[m.song[m.index].note], m.song[m.index].duration);
      trigger = m.millis() + m.song[m.index].duration;
      //move to the next note
      m.index++;
    } else if (m.index >= m.song.length) {
      autoplay = false;
    }

    //draw a keyboard

    //the width for each key
    var w = m.width / m.notes.length;
    for (var i = 0; i < m.notes.length; i++) {
      var x = i * w;
      // If the mouse is over the key
      if (m.mouseX > x && m.mouseX < x + w && m.mouseY < m.height) {
        // If we're clicking
        if (m.mouseIsPressed) {
          m.fill(100, 255, 200);
          // Or just rolling over
        } else {
          m.fill(127);
        }
      } else {
        m.fill(200);
      }

      // Oh if we're playing teh song, let's highlight it too
      if (m.autoplay && i === m.song[m.index - 1].note) {
        m.fill(100, 255, 200);
      }
      // Draw the key
      m.rect(x, 0, w - 1, m.height - 1);
    }

  }

// When we click
   m.mousePressed = function() {
    // Map mouse to the key index
    m.key = m.floor(m.map(m.mouseX, 0, m.width, 0, m.notes.length));
    m.playNote(notes[key]);
  }

// Fade it out when we release
  m.mouseReleased=function() {
    m.osc.fade(0, 0.5);
  }


}

var soundsP5 =  new p5(sounds, 'htmlSounds');