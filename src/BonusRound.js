import Round from './Round'


class BonusRound extends Round {
  constructor(wheel, currentPuzzle, players, turn, turnCount, game) {
    super(wheel, currentPuzzle, players, turn, turnCount, game);
    this.topPlayer = '';
  }
  findTopPlayer() {
    let sorted = this.players.sort((a, b) => {
      return b.bank - a.bank
    })
    this.topPlayer = sorted[0];
  }
  
}

export default BonusRound;