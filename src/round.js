class Round {
  constructor(wheel, currentPuzzle, players, turn)  {
    this.wheel = wheel;
    this.puzzle = currentPuzzle;
    this.players = players;
    this.turn = turn;
    this.turnCount = 0;

  }

  incremenTurnCount( ) {
    this.turnCount === 2 ? this.turnCount = 0 : this.turnCount++;
  }

  returnCurrentPlayer() {
    return this.players[this.turnCount]
  }

  guessAnswer(guess) {
    this.turn.guessAnswer(guess) ? this.roundOver() : this.incremenTurnCount()
  }

  guessLetter(playerGuess) {
    let spinValue = this.wheel.spin()
    let correctLetterCount = this.turn.guessLetter(playerGuess);
    if (spinValue === 'BANKRUPT') {
      this.returnCurrentPlayer().score = 0;
      this.incremenTurnCount();
      return 'BANKRUPT';
    } else if (spinValue === 'LOSE A TURN') {
      this.incremenTurnCount();
      return 'LOSE A TURN'
    } else if (correctLetterCount === 0) {
      this.incremenTurnCount();
      return 0;
    } else {
      this.returnCurrentPlayer().score += spinValue * correctLetterCount;
      return this.returnCurrentPlayer().score;
    }
  }

  roundOver() {
    let currentPlayer = this.returnCurrentPlayer();
    currentPlayer.bank += currentPlayer.score;
    this.players.forEach(player => {
      player.score = 0;
    })
  }



  buyVowel(vowel) {
    this.returnCurrentPlayer().score -= 100;
    if (this.turn.guessLetter(vowel) === 0) {
      this.incremenTurnCount()
      return 0
    } else {
      return this.turn.guessLetter(vowel)
    }
  }

}

export default Round;