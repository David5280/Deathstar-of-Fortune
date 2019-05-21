import chai from 'chai';
const expect = chai.expect;
import Puzzle from '../src/puzzle.js'
import Turn from '../src/turn.js'
import testData from '../data/test_data_set.js'

describe('Turn', function() {
  let puzzle1;
  let testData1;
  let turn;
  beforeEach(function() {
    testData1 = testData.puzzles.one_word_answers.puzzle_bank[0]
    puzzle1 = new Puzzle(testData1.category, testData1.number_of_words, testData1.total_number_of_letters,
      testData1.first_word, testData1.description, testData1.correct_answer.toUpperCase().split(''))
    turn = new Turn(puzzle1)
  })
  it('should be an instance of turn', function () {
    expect(turn).to.be.a.instanceOf(Turn);
  });
  it('should hold the rounds current puzzle', function () {
    expect(turn.currentPuzzle.correctAnswer).to.eql(['A', 'R', 'M', 'C', 'H', 'A', 'I', 'R']);
  });
  it('should evaluate the players word guess', function () {
    expect(turn.guessAnswer('Chair')).to.equal(false);
    expect(turn.guessAnswer('Armchair')).to.equal(true);
  });
  it('should evaluate the players letter guess', function () {
    expect(turn.guessLetter('R')).to.equal(2);
    expect(turn.guessLetter('Z')).to.equal(0);
    expect(turn.guessLetter('M')).to.equal(1);
  });
});
