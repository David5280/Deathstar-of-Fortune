import chai from 'chai';
const expect = chai.expect;
import Player from '../src/player.js'

describe('Player', function() {
  let player;
  beforeEach(function() {
    player = new Player('evan', 1)
  })
  it('be an instance of player', function() {
    expect(player).to.be.an.instanceOf(Player)
  });
  it('should have a name', function() {
    expect(player.name).to.equal('evan')
  });
  it('should have an id', function() {
    expect(player.id).to.equal(1)
  });
  it('should have a default score of 0', function() {
    expect(player.score).to.equal(0)
  });
  it('should have a default bank of 0', function() {
    expect(player.bank).to.equal(0)
  });
  it('should return the players name', function() {
    expect(player.getPlayerName()).to.equal('evan')
  });
  it('should return the players score', function() {
    expect(player.getPlayerScore()).to.equal(0)
  });
});