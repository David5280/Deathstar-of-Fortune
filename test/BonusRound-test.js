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
import Game from '../src/game.js'
import BonusRound from '../src/BonusRound.js'

describe('Bonus Round', function () {
  let player1;
  let player2;
  let player3;
  let game;
  let bonusRound;
  beforeEach(function() {
    player1 = new Player('Player1', 1)
    player2 = new Player('Player2', 2)
    player3 = new Player('Player3', 3)
    game = new Game(player1, player2, player3)
    game.makeSelectedPuzzle(testData)
    game.createWheel(testData.wheel)
    game.start(testData.wheel)
    bonusRound = new BonusRound(game.wheel, game.currentPuzzle, game.players, game.turn, game.turnCount, game.game)
    chai.spy.on(domUpdates, 'removeSpinValue', () => true);
    chai.spy.on(domUpdates, 'addPlayerBorder', () => true);
    chai.spy.on(domUpdates, 'changeScore', () => true);
    chai.spy.on(domUpdates, 'enableBuyVowel', () => true);
    chai.spy.on(domUpdates, 'changeBank', () => true);
    chai.spy.on(domUpdates, 'roundOver', () => true);
    chai.spy.on(domUpdates, 'displayPuzzle', () => true);

  });
  afterEach(function () {
    chai.spy.restore(domUpdates);
  })
  it('should be an instance of bonus Round', function () {
    expect(bonusRound).to.be.an.instanceOf(BonusRound);
  })
})