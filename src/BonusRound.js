import Round from './Round'
import domUpdates from './domUpdates.js';


class BonusRound extends Round {
  constructor(wheel, currentPuzzle, players, turn, turnCount, game) {
    super(wheel, currentPuzzle, players, turn, turnCount, game);
    this.topPlayer = '';
    this.constCount = '';
    this.vowelConst = '';
    this.bonusValue = 0
    this.turnCountConst = 0
    this.turnCountVow = 0
  }
  findTopPlayer() {
    let sorted = this.players.sort((a, b) => {
      return b.bank - a.bank
    })
    this.topPlayer = sorted[0];
  }
  createBonusWheel() {
    let filteredValues = this.wheel.currentValues.filter(value => typeof value === 'number')
    const index = Math.floor(Math.random() * filteredValues.length)
    this.bonusValue = filteredValues[index]
  }
  turnCountConstInc() {
    this.turnCountConst += 1
    if (this.turnCountConst === 3) {
      domUpdates.disableConst()
    }
  }
  turnCountConstVow() {
    domUpdates.disableVow()
  }

  
}

export default BonusRound;