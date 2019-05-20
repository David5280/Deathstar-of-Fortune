class PuzzleBank {
  constructor(puzzles) {
    this.puzzles = puzzles
  }

  returnRandomPuzzle() {
    return this.puzzles[Math.floor(Math.random() * this.puzzles.length)]
  }
}

export default PuzzleBank