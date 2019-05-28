import Puzzle from '../src/puzzle.js'
import PuzzleBank from '../src/PuzzleBank.js'
import Wheel from './wheel.js';
import Turn from './turn.js';
import Round from './round.js';
import domUpdates from './domUpdates.js';
import BonusRound from './BonusRound.js';

class Game {
  constructor(players) {
    this.selectedPuzzles = []
    this.roundCounter = 1
    this.players = players
    this.wheel = {}
    this.turn = {}
    this.round =  {}
    this.bonusRound = {}
  }
  createWheel(wheelValues) {
    this.wheel = new Wheel(wheelValues)
  }

  start() {
    this.wheel.selectCurrentValues()
    this.turn = new Turn(this.selectedPuzzles
      [this.roundCounter - 1])
    this.round = new Round(this.wheel, this.selectedPuzzles
      [this.roundCounter - 1], this.players, this.turn, this.round.turnCount, this)
    let gameBoardPuzzle = this.round.returnCurrentAnswer()
    domUpdates.displayPuzzle(gameBoardPuzzle)
    domUpdates.displayCategoryHint(this.round.puzzle.category, this.round.puzzle.description)
    domUpdates.appendLetters()
    return
  }
  roundOver() {
    domUpdates.removeDom()
    this.roundCounter++;
    this.start();
    if (this.roundCounter === 5) {
      this.bonusRound = new BonusRound(this.wheel, this.selectedPuzzles[4], this.players, this.turn, this.turnCount, this);
      this.bonusRound.findTopPlayer()
      let topPlayer = this.bonusRound.topPlayer
      console.log(topPlayer)
      domUpdates.removeLosersBonus(topPlayer);
      domUpdates.displayBonusLetters(['R', 'S', 'L', 'N', 'T', 'E'])
      domUpdates.createBonusControls()
    } 
  }
  makeSelectedPuzzle(data) {
    this.selectedPuzzles = []
    let keys = Object.keys(data.puzzles)
    keys.map((key) => {
      let newPuzzles = data.puzzles[key].puzzle_bank.map((puzz) =>{
        let puzzle = new Puzzle(puzz.category, puzz.number_of_words, puzz.total_number_of_letters, 
          puzz.first_word, puzz.description, puzz.correct_answer.toUpperCase().split(''))
        return puzzle
      })
      let puzzbank = new PuzzleBank(newPuzzles)
      let choosenPuzzle = puzzbank.returnRandomPuzzle()
      this.selectedPuzzles.push(choosenPuzzle)
    })
  }
  makeBonusPuzz(data) {
    let newPuzzles = data.puzzles.four_word_answers.puzzle_bank.map((puzz) =>{
      let puzzle = new Puzzle(puzz.category, puzz.number_of_words, puzz.total_number_of_letters, 
        puzz.first_word, puzz.description, puzz.correct_answer.toUpperCase().split(''))
      return puzzle
    })
    let puzzbank = new PuzzleBank(newPuzzles)
    let choosenPuzzle = puzzbank.returnRandomPuzzle()
    this.selectedPuzzles.push(choosenPuzzle)
  }
}
export default Game