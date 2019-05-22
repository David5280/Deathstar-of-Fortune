class Turn {
  constructor(currentPuzzle) {
    this.currentPuzzle = currentPuzzle
  
  }
  guessAnswer(playerGuess) {
    // evaluate all of the letterboxes == this.currentPuzzle.correctAnswer
    // returns true or false
    return JSON.stringify(playerGuess.toUpperCase().split('')) === JSON.stringify(this.currentPuzzle.correctAnswer);
  }
  guessLetter(playerGuess) {
    // let prizeValue = wheel.spin()
    // if answer is incorrect
    //    lose turn / return nothing
    // if answer is correct 
    //    returns prizeValue
    let correctLetters = this.currentPuzzle.correctAnswer.filter(letter => {
      return letter.includes(playerGuess);
    });
    return correctLetters.length;
  }
  buyVowel() {
    this.getCurrent
  }
}

export default Turn;

