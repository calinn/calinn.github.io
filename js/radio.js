/*!
 *  Howler.js Radio Demo
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */

// Cache references to DOM elements.
var elms = ['station0', 'title0', 'live0', 'playing0', 'station1', 'title1', 'live1', 'playing1', 'station2', 'title2', 'live2', 'playing2', 'station3', 'title3', 'live3', 'playing3', 'station4', 'title4', 'live4', 'playing4'];
elms.forEach(function(elm) {
  window[elm] = document.getElementById(elm);
});

/**
 * Radio class containing the state of our stations.
 * Includes all methods for playing, stopping, etc.
 * @param {Array} stations Array of objects with station details ({title, src, howl, ...}).
 */
var Radio = function(stations) {
  var self = this;

  self.stations = stations;
  self.index = 0;
  
  // Setup the display for each station.
  for (var i=0; i<self.stations.length; i++) {
    //window['title' + i].innerHTML = '<b>' + self.stations[i].freq + '</b> ' + self.stations[i].title;
    window['title' + i].innerHTML = self.stations[i].title;
    window['station' + i].addEventListener('click', function(index) {
      var isNotPlaying = (self.stations[index].howl && !self.stations[index].howl.playing());
      
      // Stop other sounds or the current one.
      radio.stop();

      // If the station isn't already playing or it doesn't exist, play it.
      if (isNotPlaying || !self.stations[index].howl) {
        radio.play(index);
      }
    }.bind(self, i));
  }
};
Radio.prototype = {
  /**
   * Play a station with a specific index.
   * @param  {Number} index Index in the array of stations.
   */
  play: function(index) {
    var self = this;
    var sound;

    index = typeof index === 'number' ? index : self.index;
    var data = self.stations[index];

    // If we already loaded this track, use the current one.
    // Otherwise, setup and load a new Howl.
    if (data.howl) {
      sound = data.howl;
    } else {
      sound = data.howl = new Howl({
        src: data.src,
        html5: true, // A live stream can only be played through HTML5 Audio.
        format: ['mp3', 'aac', 'aacp']
      });
    }

    // Begin playing the sound.
    sound.play();

    // Toggle the display.
    self.toggleStationDisplay(index, true);

    // Keep track of the index we are currently playing.
    self.index = index;
  },

  /**
   * Stop a station's live stream.
   */
  stop: function() {
    var self = this;

    // Get the Howl we want to manipulate.
    var sound = self.stations[self.index].howl;

    // Toggle the display.
    self.toggleStationDisplay(self.index, false);

    // Stop the sound.
    if (sound) {
      sound.unload();
    }
  },

  /**
   * Toggle the display of a station to off/on.
   * @param  {Number} index Index of the station to toggle.
   * @param  {Boolean} state true is on and false is off.
   */
  toggleStationDisplay: function(index, state) {
    var self = this;

    // Highlight/un-highlight the row.
    window['station' + index].style.backgroundColor = state ? 'rgba(255, 255, 255, 0.33)' : '';

    // Show/hide the "live" marker.
    window['live' + index].style.opacity = state ? 1 : 0;

    // Show/hide the "playing" animation.
    window['playing' + index].style.display = state ? 'block' : 'none';
  }
};

// Setup our new radio and pass in the stations.
var radio = new Radio([
  {
    freq: '1',
    title: "Discoteca 90",    
    src: 'https://sonica.cloudstreaming.eu:10968/stream/1/',
    howl: null
  },
  {
    freq: '2',
    title: "Radio La 90 Tera",
    src: 'http://184.154.28.210:8410/;stream/1;*.nsv',
    howl: null
  },
  {
    freq: '3',
    title: "Radio 1160",
    src: 'https://streaming.gometri.com/stream/8021/stream/1/',
    howl: null
  },
  {
    freq: '4',
    title: "Estación 90 radio",
    src: 'http://radio.ancashserver.com:9552/stream/1/',
    howl: null
  },
  {
    freq: '5',
    title: "Radio Fiesta", // 105.5 FM
    src: 'https://serverssl.innovatestream.pe:8080/167.114.118.119:7658/stream',
    howl: null
  },  
  {
    freq: '15',
    title: "Radio La Tonera",
    src: 'https://stream.zenolive.com/2215qw4nn2zuv.aac',
    howl: null
  },
  {
    freq: '6',
    title: "Radio Huancayo",
    src: 'https://cloudstream2030.conectarhosting.com/9386/;',
    howl: null
  },
  {
    freq: '7',
    title: "Top Latino",
    src: 'http://173.236.60.186:8020/stream',
    howl: null
  },
  {
    freq: '8',
    title: "Radio Sabrosa",
    src: ' https://stream.zeno.fm/macsyav0nqzuv',
    howl: null
  },
  {
    freq: '9',
    title: "Radio Cumbia Mix",
    src: 'http://192.99.148.184:5670/stream',
    howl: null
  },
  {
    freq: '10',
    title: "Radio Corazón",
    src: 'https://17833.live.streamtheworld.com/RADIO_CORAZON.mp3?DIST=RPPplayer&TGT=RPPplayer&maxServers=2&ua=RadioTime&ttag=RadioTime',
    howl: null
  }, 
  {
    freq: '11',
    title: "Radio Ritmo Romántica",
    src: 'https://14023.live.streamtheworld.com/CRP_RIT_SC?csegid=30006&dist=30006',
    howl: null
  }, 
  {
    freq: '12',
    title: "Radio Oasis",
    src: 'https://17333.live.streamtheworld.com/CRP_OASAAC.aac',
    howl: null
  },
  {
    freq: '13',
    title: "Salsa Radio",
    src: 'http://radio.domiplay.net:2002/;',
    howl: null
  },
  {
    freq: '14',
    title: "Radio Frecuencia 100",
    src: 'http://oyotunstream.com:7066/stream',
    howl: null
  },
  {
    freq: '16',
    title: "Radio TOP40",
    src: 'https://streamssl.eu:1290/usastreams',
    howl: null
  },
  {
    freq: '107.7',
    title: "Today's Hits",
    src: 'http://rfcmedia.streamguys1.com/MusicPulse.mp3',
    howl: null
  },
]);
