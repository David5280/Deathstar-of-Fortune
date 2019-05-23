import domUpdates from './domUpdates.js';

class Round {
  constructor(wheel, currentPuzzle, players, turn)  {
    this.wheel = wheel;
    this.puzzle = currentPuzzle;
    this.players = players;
    this.turn = turn;
    this.turnCount = 0;

  }

  incremenTurnCount() {
    this.turnCount === 2 ? this.turnCount = 0 : this.turnCount++;
    domUpdates.removeSpinValue()
    let id = this.players[this.turnCount].id
    domUpdates.addPlayerBorder(id)
    domUpdates.changeScore(this.players[0].score, this.players[1].score, this.players[2].score)
  }

  returnCurrentPlayer() {
    return this.players[this.turnCount]
  }

  returnCurrentAnswer() {
    return this.puzzle.correctAnswer
  }

  guessAnswer(guess) {
    this.turn.guessAnswer(guess) ? this.roundOver() : this.incremenTurnCount()
  }

  spinWheel() {
    this.wheel.spinWheel()
  }

  guessLetter(playerGuess) {
    let spinValue = this.wheel.spinValue
    let correctLetterCount = this.turn.guessLetter(playerGuess);
    if (spinValue === 'BANKRUPT') {
      this.returnCurrentPlayer().score = 0;
      this.incremenTurnCount();
      console.log("bankrupt")
      return 'BANKRUPT';
    } else if (spinValue === 'LOSE A TURN') {
      this.incremenTurnCount();
      console.log("lose turn")
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