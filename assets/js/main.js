// array of the words used in the game
var wordsList = [
  'Nodejs',
  'angular',
  'react',
  'polymer',
  'vuejs',
  'ember',
  'meteor',
  'mithril',
  'backbone'
];
// word that is chosen to be played will dynamically be populated here
var chosenWord = '';

// creating the array of the word letters
var lettersInChosenWord = [];

// creating the number of blanks needed based on the word chosen
var numBlanks = 0;

// will poplulate the blanks and correct letters guessed
var correctBlanks = [];

// holds the letter not matched with word at play
var incorrectLetter = [];

// Where game will tally the win/loss record and guesses remaining
var wins = 0;
var losses = 0;
var guessTotal = 10;

// this will be called to start game when player looses
function beginGame() {
  // Reset the guesses back to 0.
  guessTotal = 10;

  // function here will always pick a random word from the wordList array
  chosenWord = wordsList[Math.floor(Math.random() * wordsList.length)];

  // these variables here will split the word letters into the blanks based on the number of letterd in the word
  lettersInChosenWord = chosenWord.split('');
  numBlanks = lettersInChosenWord.length;

  // this will poulate the correct blanks if correct letter is guessed//
  correctGuess = [];

  // this will poulate letters in guessed letters area
  incorrectLetter = [];

  // for loop checking and filling in the correct letter in the word at play
  for (var i = 0; i < numBlanks; i++) {
    correctGuess.push('_');
  }

  // method used to populate the ID of guesses remaining
  document.getElementById('guesses-left').innerHTML = guessTotal;

  // this method will populate number of blanks needed based on the word chosen to play
  document.getElementById('word-blanks').innerHTML = correctGuess.join(' ');

  // populates letters into this area on HTML page
  document.getElementById('wrong-guesses').innerHTML = incorrectLetter.join(
    ' '
  );
}

// important spot //
// this function is how the letter picked are checked if correct/incorrect //
function checkLetters(letter) {
  var letterInWord = false;

  for (var i = 0; i < numBlanks; i++) {
    // if letter correct
    if (chosenWord[i] === letter) {
      letterInWord = true;
    }
  }

  if (letterInWord) {
    for (var j = 0; j < numBlanks; j++) {
      // fills the correct letter how many times its in the word
      if (chosenWord[j] === letter) {
        // will place letter in word in its correct location
        correctGuess[j] = letter;
      }
    }
  } else {
    // if letter is not in word at all this will push that letter into the guessed letter area and take 1 guess away from guesses remaining.
    incorrectLetter.push(letter);
    guessTotal--;
  }
}

function roundComplete() {
  // Prev code will tell when and what to populate game play stats

  // Subtracts gueeses from guesses left area on HTML page//
  document.getElementById('guesses-left').innerHTML = guessTotal;

  // Populates letters in word blanks on HTML page//
  document.getElementById('word-blanks').innerHTML = correctGuess.join(' ');

  // Prints wrong letters in wrong letters area
  document.getElementById('wrong-guesses').innerHTML = incorrectLetter.join(
    ' '
  );

  // if all letters have been chosen correctly this will populate wins and tell a little something about the word
  if (lettersInChosenWord.toString() === correctGuess.toString()) {
    // adds to number of wins
    wins++;

    // updates total wins and resets the game for another go !
    document.getElementById('win-counter').innerHTML = wins;
    beginGame();
  }

  // If you run out of guesses this here will direct the game to populate the losses and reset the game to try again and you will be told to try again.
  else if (guessTotal === 0) {
    losses++;

    // Updates the number of losses //
    document.getElementById('loss-counter').innerHTML = losses;
    // Resets game //
    beginGame();
  }
}

// This is what controlls all code written from the start of the game //
beginGame();

// this detects anykey to start game
document.onkeyup = function(event) {
  // basically code here gives all keys valid to start game //
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    // Converts all key clicks to lowercase letters.
    var letterGuessed = event.key.toLowerCase();
    checkLetters(letterGuessed);
    // After round is complete here code will run all over again //
    roundComplete();
  }
};
