import chai from 'chai';
const expect = chai.expect;
import Puzzle from '../src/puzzle.js'
import Turn from '../src/turn.js'
import testData from '../data/test_data_set.js'
import Round from '../src/round.js';
import Player from '../src/player.js';
import Wheel from '../src/wheel.js'
import Game from '../src/game.js'


describe('Game', function() {
  let player1;
  let player2;
  let player3;
  let game;
  beforeEach(function() {
    player1 = new Player('Him', 1)
    player2 = new Player('Her', 2)
    player3 = new Player('Mantis', 3)
    game = new Game(player1, player2, player3)
  });

  it('be an instance of round', function() {
    expect(game).to.be.an.instanceOf(Game)
  });

  it('it select puzzles', function() {
    expect(game.selectedPuzzles.length).to.equal(0)
    game.makeSelectedPuzzle(testData)
    expect(game.selectedPuzzles.length).to.equal(4)
  });

  it('it select puzzles', function() {
    game.makeSelectedPuzzle(testData)
    expect(game.selectedPuzzles[0].numberOfWords).to.equal(1)
    expect(game.selectedPuzzles[1].numberOfWords).to.equal(2)
    expect(game.selectedPuzzles[2].numberOfWords).to.equal(3)
    expect(game.selectedPuzzles[3].numberOfWords).to.equal(4)
  });

  it('it should start a game', function() {
    game.createWheel(testData.wheel)
    game.start()
  });
  




});