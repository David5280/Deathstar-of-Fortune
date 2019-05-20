import chai from 'chai';
const expect = chai.expect;
import Puzzle from '../src/puzzle.js'
import testData from '../data/test_data_set.js'
import PuzzleBank from '../src/PuzzleBank.js'


describe('Puzzle', function() {
  let puzzles
  let puzzleBank
  beforeEach(function() {
    puzzles = testData.puzzles.one_word_answers.puzzle_bank.map((puzz) =>{
      let puzzle = (new Puzzle(puzz.category, puzz.number_of_words, puzz.total_number_of_letters,
        puzz.first_word, puzz.description, puzz.correct_answer))
      return puzzle
    })
    puzzleBank = new PuzzleBank(puzzles)
  });

  it('be an instance of puzzle', function() {
    expect(puzzleBank).to.be.an.instanceOf(PuzzleBank)
  });
  it('should hold many puzzles', function() {
    expect(puzzleBank.puzzles.length).to.equal(4)
  });
  it('should return a puzzle object', function() {
  expect(puzzleBank.returnRandomPuzzle()).to.have.keys(['category', 'numberOfWords',
  'totalNumberOfLetters', 'firstWord', 'description', 'correctAnswer'])
  });
});