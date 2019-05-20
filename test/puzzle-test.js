import chai from 'chai';
const expect = chai.expect;
import Puzzle from '../src/puzzle.js'
import testData from '../data/test_data_set.js'


describe('Puzzle', function() {
  let puzzle1;
  let testData1
  beforeEach(function() {
    testData1 = testData.puzzles.one_word_answers.puzzle_bank[0]
    puzzle1 = new Puzzle(testData1.category, testData1.number_of_words, testData1.total_number_of_letters,
      testData1.first_word, testData1.description, testData1.correct_answer)
  })
  it('be an instance of puzzle', function() {
    expect(puzzle1).to.be.an.instanceOf(Puzzle)
  });
  it('should have a category', function() {
    expect(puzzle1.category).to.equal('Around The House')
  });
  it('should have a number of words property', function() {
    expect(puzzle1.numberOfWords).to.eql(1)
  });
  it('should hold the same values as testData1', function() {
    expect(Object.values(puzzle1)).to.eql(Object.values(testData1))
  });
});