import chai from 'chai';
const expect = chai.expect;
import testData from '../data/test_data_set.js'
import Wheel from '../src/wheel.js'

describe('Wheel', function() {
  let wheel;
  beforeEach(function() {
    wheel = new Wheel(testData.wheel)
  });

  it('be an instance of wheel', function() {
    expect(wheel).to.be.an.instanceOf(Wheel)
  });
  it('wheel current values length to equal 6', function() {
    wheel.selectCurrentValues()
    expect(wheel.currentValues.length).to.equal(6)
  });
  it('should return the current values', function() {
    expect(wheel.selectCurrentValues()).to.eql(wheel.currentValues)
  });
  it('should return an item of current values when spun', function() {
    wheel.selectCurrentValues()
    expect(wheel.currentValues).to.include(wheel.spin())
  });


});
