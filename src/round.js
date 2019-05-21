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

  guessAnswer() {

  }

  takeTurn(currentPuzzle) {
    // let turn = new Turn (currentPuzzle)
    // let currentPlayer = this.returnCurrentPlayer()

    //if guessAnswer
    //if true currentPlayer wins / next round / else nothing
   
    // if turn.guessLetter()

    // currentPlayer.score += turn.guessLetter()

    // else turn.buyVowell
    // currentPlayer -= turn.buyVowel()
 
  }
  roundOver() {
    // winning player add total to bank
    // reset all scores
    let currentPlayer = this.returnCurrentPlayer();
    currentPlayer.bank += currentPlayer.score;
    this.players.forEach(player => {
      player.score = 0;
    })
    // console.log(this.players)
  }
}

export default Round;