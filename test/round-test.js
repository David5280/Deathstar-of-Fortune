import chai from 'chai';
const expect = chai.expect;
import spies from 'chai-spies';
chai.use(spies);
import Puzzle from '../src/puzzle.js'
import Turn from '../src/turn.js'
import testData from '../data/test_data_set.js'
import Round from '../src/round.js';
import Player from '../src/player.js';
import Wheel from '../src/wheel.js'
import domUpdates from '../src/domUpdates.js';


describe('Round', function() {
  let puzzle1;
  let testData1;
  let Player1;
  let Player2;
  let Player3;
  let wheel;
  let turn;
  let round;
  beforeEach(function() {

    testData1 = testData.puzzles.one_word_answers.puzzle_bank[0]

    wheel = new Wheel(testData.wheel);
    // wheel.selectCurrentValues();
    Player1 = new Player('Jeffory', 1);
    Player2 = new Player('Timjax', 2);
    Player3 = new Player('Karl', 3);
    puzzle1 = new Puzzle(testData1.category, testData1.number_of_words, 
      testData1.total_number_of_letters,
      testData1.first_word, testData1.description, testData1.correct_answer.toUpperCase().split(''))
    turn = new Turn(puzzle1)
    round = new Round(wheel, puzzle1, [Player1, Player2, Player3], turn)
    chai.spy.on(domUpdates, 'removeSpinValue', () => true);
    chai.spy.on(domUpdates, 'addPlayerBorder', () => true);
    chai.spy.on(domUpdates, 'changeScore', () => true);
    chai.spy.on(domUpdates, 'enableBuyVowel', () => true);
    chai.spy.on(domUpdates, 'changeBank', () => true);
    chai.spy.on(domUpdates, 'roundOver', () => true);
  })
  afterEach(function() {
    chai.spy.restore(domUpdates);
  })
  it('be an instance of round', function() {
    expect(round).to.be.an.instanceOf(Round)
  });
  it('should hold a wheel with six values', function () {
    wheel.selectCurrentValues();
    expect(round.wheel.currentValues.length).to.equal(6);
  });
  it('should have three players', function() {
    expect(round.players.length).to.equal(3);
  });
  it('should hold a single puzzle for the round', function() {
    expect(round.puzzle).to.eql(puzzle1)
  });
  it('should keep track of the turn', function() {
    expect(round.turnCount).to.equal(0);
    round.incremenTurnCount()
    expect(round.turnCount).to.equal(1);
    round.incremenTurnCount()
    expect(round.turnCount).to.equal(2);
    round.incremenTurnCount()
    expect(round.turnCount).to.equal(0);
  });
  it('should return the name of the current player', function () {
    expect(round.turnCount).to.equal(0);
    expect(round.returnCurrentPlayer()).to.equal(Player1);
    round.incremenTurnCount()
    expect(round.turnCount).to.equal(1);
    expect(round.returnCurrentPlayer()).to.equal(Player2);
    round.incremenTurnCount()
    expect(round.turnCount).to.equal(2);
    expect(round.returnCurrentPlayer()).to.equal(Player3);
    round.incremenTurnCount()
    expect(round.turnCount).to.equal(0);
    expect(round.returnCurrentPlayer()).to.equal(Player1);
  })
  it('should transfer winnings from score to bank for current player', function() {
    round.returnCurrentPlayer()
    round.incremenTurnCount();
    expect(round.returnCurrentPlayer().score).to.equal(0);
    expect(round.returnCurrentPlayer().bank).to.equal(0);
    round.returnCurrentPlayer().score = 200;
    expect(round.returnCurrentPlayer().score).to.equal(200);
    round.roundOver();
    expect(round.returnCurrentPlayer().score).to.equal(0);
    expect(round.returnCurrentPlayer().bank).to.equal(200);
  });
  it('should evaluate the total word guess', function () {
    Player1.score = 200;
    Player2.score = 300;
    Player3.score = 600;
    round.guessAnswer('guess');
    expect(Player1.score).to.equal(200);
    expect(Player2.score).to.equal(300);
    expect(Player3.score).to.equal(600);
    expect(Player1.bank).to.equal(0);
    expect(Player2.bank).to.equal(0);
    expect(Player3.bank).to.equal(0);
    round.guessAnswer('Armchair');
    expect(Player1.score).to.equal(0);
    expect(Player2.score).to.equal(0);
    expect(Player3.score).to.equal(0);
    expect(Player1.bank).to.equal(0);
    expect(Player2.bank).to.equal(300);
    expect(Player3.bank).to.equal(0);
  })
  it('should evaluate the players letter guess', function () {
    Player1.score = 400;
    Player2.score = 250;
    Player3.score = 50;
    round.wheel.selectCurrentValues();
    let result = round.guessLetter('A');
    // console.log('b', result);
    if (result === 'BANKRUPT') {
      expect(Player1.score).to.equal(0);
    } else if (result === 'LOSE A TURN') {
      expect(Player1.score).to.equal(400);
      expect(round.returnCurrentPlayer()).to.eql(Player2);
    } else if (result === 0) {
      expect(Player1.score).to.equal(400);
      expect(round.returnCurrentPlayer()).to.eql(Player2);
    } else {
      console.log(result);
      expect(Player1.score).to.equal(result);      
    }
  })
  it('should reject the players incorrect letter guess', function () {
    Player1.score = 400;
    Player2.score = 250;
    Player3.score = 50;
    round.wheel.selectCurrentValues();
    let result = round.guessLetter('Z');
    // console.log('b', result);
    if (result === 'BANKRUPT') {
      expect(Player1.score).to.equal(0);
    } else if (result === 'LOSE A TURN') {
      expect(Player1.score).to.equal(400);
      expect(round.returnCurrentPlayer()).to.eql(Player2);
    } else if (result === 0) {
      expect(Player1.score).to.equal(400);
      expect(round.returnCurrentPlayer()).to.eql(Player2);
    } else {
      expect(Player1.score).to.equal(result);      
    }
  })
  it('should buy a vowel', function () {
    Player1.score = 400;
    Player2.score = 250;
    Player3.score = 50;
    round.wheel.selectCurrentValues();
    expect(round.buyVowel('E')).to.equal(0)
    expect(Player1.score).to.equal(300)
    expect(round.returnCurrentPlayer()).to.eql(Player2)
    expect(round.buyVowel('A')).to.equal(2)
    expect(Player2.score).to.equal(150)

  })

});