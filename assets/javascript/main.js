// All game Logic nested in this variable //
var entireGame = {
  // this wordstopick variable creates my array of game values with individual nested keyvalues to be used /
  gameList: {
    metroid: {
      pic:
        'https://specials-images.forbesimg.com/imageserve/5ca4c29931358e79cac0998e/960x0.jpg?fit=scale',
      gameSound:
        'http://soundfxcenter.com/video-games/metroid/8d82b5_Metroid_Fanfare_Sound_Effect.mp3'
    },
    zelda: {
      pic: 'https://images-na.ssl-images-amazon.com/images/I/71x7I%2BdBN5L.jpg',
      gameSound:
        'http://soundfxcenter.com/video-games/the-legend-of-zelda/8d82b5_The_Legend_of_Zelda_Secret_Sound_Effect.mp3'
    },
    fortenite: {
      pic:
        'https://cdn.images.dailystar.co.uk/dynamic/228/photos/98000/936x622/1631098.jpg',
      gameSound: ''
    },
    tetris: {
      pic: 'https://i.ytimg.com/vi/QQ5U-rN7Veg/maxresdefault.jpg',
      gameSound: ''
    },
    destiny: {
      pic:
        'https://images.tweaktown.com/news/6/7/67135_436_destiny-2s-crunch-help-streamline-3.jpg',
      gameSound: ''
    },
    supermariobros: {
      pic:
        'https://www.lifewire.com/thmb/Q8vq8aMeo0QNZPE56Ys_lfyY6mw=/768x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Mario_Luigi_Wallpaper_screenshot-59b77f1b396e5a00103bdd39.jpg',
      gameSound: ''
    },
    supermariokart: {
      pic: 'https://media0.giphy.com/media/i3ZOHtBdUsNmE/giphy.gif',
      gameSound: ''
    },
    grandtheftauto: {
      pic:
        'https://gamespot1.cbsistatic.com/uploads/screen_kubrick/1587/15875866/3524423-gta%20online%20-%204%2018%202019%20-%20route-68.jpg',
      gameSound: ''
    },
    uncharted: {
      pic:
        'https://cdn.vox-cdn.com/thumbor/xo2f_z0q-Rc5-xXk8ClpPH63XXs=/148x0:1768x1080/1200x800/filters:focal(148x0:1768x1080)/cdn.vox-cdn.com/uploads/chorus_image/image/49551565/mad-preview-still-01.0.0.jpg',
      gameSound: ''
    },
    minecraft: {
      pic:
        'https://media.mojang.com/blog-ihttps://static.businessinsider.sg/sites/2/2018/10/5bb21569de9560e24a8b456b.jpg',
      gameSound: ''
    }
  },

  // this list will let me program specifially how to write the functionality of the game by stating variables //

  wordToGuess: null,
  wordLetters: [],
  lettersMatched: [],
  lettersGuessed: [],
  remainingGuesses: 0,
  totalGuesses: 0,
  inputLetter: null,
  wins: 0,
  losses: 0,

  // this function will load to start the game //
  gameSetup: function() {
    var gamelist = Object.keys(this.gameList);
    console.log('OUTPUT: var gameList', gamelist);

    // random word is being selected //
    this.wordToGuess = gamelist[Math.floor(Math.random() * gamelist.length)];
    console.log('OUTPUT: this.wordToGuess', this.wordToGuess);

    // splitting the random word //
    this.wordLetters = this.wordToGuess.split('');
    console.log('OUTPUT: this.wordLetters', this.wordLetters);

    // setting guesses that user will have and renders it to html
    this.buildSection();
    // console.log('OUTPUT: this.buildSection()', this.buildSection());

    this.updateTotalGuesses();

    // document.querySelector('#currentWord').innerHTML = this.wordToGuess;
    // console.log('OUTPUT: this.wordToGuess;', this.wordToGuess);
  },

  // this will controll the remaining guesses area, restsrting the game when the user hits 0 //
  updatePage: function(letter) {
    if (this.remainingGuesses === 0) {
      this.restartGame();
    }
    // or ...
    else {
      this.decrementGuesses(letter);
      this.updateMatchedLetters(letter);
      this.buildSection();

      if (this.updateWins() === true) {
        this.restartGame();
      }
    }
  },

  buildSection: function() {
    var wordArea = []; //changed to array VAU

    for (var i = 0; i < this.wordLetters.length; i++) {
      if (this.wordLetters[i] === this.lettersMatched[i]) {
        wordArea[i] = this.wordLetters[i]; // added [i] to wordArea
      } else {
        wordArea += '&nbsp;_&nbsp;';
      }
    }

    document.querySelector('#currentWord').innerHTML = wordArea;
  },

  decrementGuesses: function(letter) {
    if (
      this.guessedLetters.indexOf(letter) === -1 &&
      this.wordLetters.indexOf(letter) === -1
    ) {
      this.guessedLetters.push(letter);
      this.remainingGuesses--;

      document.querySelector(
        '#remaining-guesses'
      ).innerHTML = this.remainingGuesses;

      document.querySelector(
        '#lettersGuessed'
      ).innerHTML = this.guessedLetters.join(', ');
    }
  },

  updateTotalGuesses: function() {
    // refactored VAU
    this.totalGuesses = this.wordLetters.length + 5;
    this.remainingGuesses = this.totalGuesses;

    document.querySelector(
      '#remaining-guesses'
    ).innerHTML = this.remainingGuesses;
  },

  restartGame: function() {
    // document.querySelector('#lettersGuessed').innerHTML = '';
    this.wordToGuess = null;
    this.wordLetters = [];
    this.lettersMatched = [];
    this.lettersGuessed = [];
    this.remainingGuesses = 0;
    this.totalGuesses = 0;
    this.inputLetter = null;
    this.gameSetup();
    this.buildSection();
    this.updateWins();
  },

  updateWins: function() {
    var win;

    if (lettersMatched.length === 0) {
      win = false;
    } else {
      win = true;
    }

    for (var i = 0; i < this.wordLetters.length; i++) {
      if (this.lettersMatched.indexOf(this.wordLetters[i]) === -1) {
        win = false;
      }
    }

    if (win) {
      this.wins = this.wins + 1;

      document.querySelector('#wins').innerHTML = this.wins;

      // document.querySelector('#gameSound').innerHTML =
      //   this.gameList[this.wordToGuess].gameSound + "'>";
      // var audio = new Audio(
      //   this.gameList[this.wordToGuess].gameSound + this.wordToGuess
      // );
      // audio.play();

      return true;
    }
    return false;
  }
};

entireGame.gameSetup();

document.onkeyup = function(event) {
  if (event.keyCode >= 49 && event.keyCode <= 90) {
    entireGame.inputLetter = event.key.toLowerCase();
  }
};

// var bo = (function() {
//   if (entireGame.lettersMatched.length === 0) {
//     win = false;
//     entireGame.update();
//   } else {
//     win = true;
//   }
// })(entireGame.inputLetter);
