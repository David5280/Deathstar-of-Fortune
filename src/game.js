import Puzzle from '../src/puzzle.js'
import PuzzleBank from '../src/PuzzleBank.js'
import Wheel from './wheel.js';
import Turn from './turn.js';
import Round from './round.js';

class Game {
  constructor(players) {
    this.selectedPuzzles = []
    this.roundCounter = 1
    this.players = players
  }
  start(wheelValues) {
    wheel = new Wheel(wheelValues)
    turn = new Turn(this.selectedPuzzles
      [this.roundCounter - 1])
    round = new Round(wheel.selectCurrentValues(), this.selectedPuzzles
    [this.roundCounter - 1], this.players)
  }
  roundOver() {
    // let players = round.players
    // let wheel = new Wheel()
    // let round = new Round (wheel.selectCurrentValues(), this.selectedPuzzles[this.roundCounter], players)
  }
  makeSelectedPuzzle(data) {
    this.selectedPuzzles = []
    let keys = Object.keys(data.puzzles)
    keys.map((key) => {
      let newPuzzles = data.puzzles[key].puzzle_bank.map((puzz) =>{
        let puzzle = new Puzzle(puzz.category, puzz.number_of_words, puzz.total_number_of_letters, puzz.first_word, puzz.description, puzz.correct_answer)
        return puzzle
      })
      let puzzbank = new PuzzleBank(newPuzzles)
      let choosenPuzzle = puzzbank.returnRandomPuzzle()
      this.selectedPuzzles.push(choosenPuzzle)
    })
  }
}
export default Game