import domUpdates from './domUpdates.js';

class Round {
  constructor(wheel, currentPuzzle, players, turn, turnCount, game)  {
    this.wheel = wheel;
    this.puzzle = currentPuzzle;
    this.players = players;
    this.turn = turn;
    this.turnCount = turnCount || 0;
    this.correctGuessCount = 0
    this.game = game;

  }

  incremenTurnCount() {
    this.turnCount === 2 ? this.turnCount = 0 : this.turnCount++;
    domUpdates.removeSpinValue()
    let id = this.players[this.turnCount].id
    domUpdates.addPlayerBorder(id)
    domUpdates.changeScore(this.players[0].score, this.players[1].score, this.players[2].score)
    domUpdates.enableBuyVowel(this.returnCurrentPlayer().score)
  }

  returnCurrentPlayer() {
    return this.players[this.turnCount]
  }

  returnCurrentAnswer() {
    return this.puzzle.correctAnswer
  }

  guessAnswer(guess) {
    this.turn.guessAnswer(guess) ? this.correctGuessCount = this.puzzle.correctAnswer.length : this.incremenTurnCount()
    this.roundOver()
  }

  spinWheel() {
    this.wheel.spin()
    let spinValue = this.wheel.spinValue
    if (spinValue === 'BANKRUPT') {
      this.returnCurrentPlayer().score = 0;
      this.incremenTurnCount();
      return 'BANKRUPT';
    } else if (spinValue === 'LOSE A TURN') {
      this.incremenTurnCount();
      return 'LOSE A TURN'
    }
  }

  guessLetter(playerGuess) {
    let spinValue = this.wheel.spinValue
    let correctLetterCount = this.turn.guessLetter(playerGuess);
    if (correctLetterCount === 0) {
      this.incremenTurnCount();
      return 0;
    } else {
      console.log(correctLetterCount)
      this.correctGuessCount += correctLetterCount
      this.returnCurrentPlayer().score += spinValue * correctLetterCount;
      domUpdates.changeScore(this.players[0].score, this.players[1].score, this.players[2].score)
      this.roundOver()
      domUpdates.enableBuyVowel(this.returnCurrentPlayer().score)
      return this.returnCurrentPlayer().score;
    } 
  }

  roundOver() {
    if (this.correctGuessCount === this.puzzle.correctAnswer.length) {
      let currentPlayer = this.returnCurrentPlayer();
      currentPlayer.bank += currentPlayer.score;
      this.players.forEach(player => {
        player.score = 0;
      })
      domUpdates.changeBank(this.players[0].bank, this.players[1].bank, this.players[2].bank)
      domUpdates.changeScore(this.players[0].score, this.players[1].score, this.players[2].score)
      domUpdates.roundOver()
      this.game.roundOver()
    }
  }



  buyVowel(vowel) {
    this.returnCurrentPlayer().score -= 100;
    domUpdates.changeScore(this.players[0].score, this.players[1].score, this.players[2].score)
    if (this.turn.guessLetter(vowel) === 0) {
      this.incremenTurnCount()
      return 0
    } else {
      let correctLetters = this.turn.guessLetter(vowel)
      this.correctGuessCount += correctLetters
      this.roundOver()
      return this.turn.guessLetter(vowel)
    }
  }

}

export default Round;