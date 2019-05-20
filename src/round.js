class Round {
  constructor(wheel, currentPuzzle, players)  {
    this.wheel = wheel;
    this.puzzles = currentPuzzle;
    this.players = players
    this.turnCount = 0

  }
  returnCurrentPlayer() {
    // return this.players[this.turnCount]
  }
  incremenTurnCount( ) {
    //togglesBetweenPlayers
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
    // 
    // 
  }

}