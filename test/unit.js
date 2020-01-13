/*
 * Unit Tests
 *
 */

// Dependencies
const assert = require('assert');
const assertStrict = require('assert').strict;

// Holder for Tests
const unit = {};

// Sample for testing that simply returns a number
helpers.getANumber = () => {
    return 1;
};

// Assert that the getANumber function is returning a number
unit['helpers.getANumber should return a number'] = done => {
    const val = helpers.getANumber();
    assert.equal(typeof val, 'number');
    done();
};

// Assert that the getANumber function is returning 1
unit['helpers.getANumber should return 1'] = done => {
    const val = helpers.getANumber();
    assert.equal(val, 1);
    done();
};

// Assert that the getANumber function is returning 2
unit['helpers.getNumberOne should return 1, not 2'] = done => {
    const val = helpers.getANumber();
    assertStrict.notStrictEqual(val, 2);
    done();
};

// Export the tests to the runner
module.exports = unit;
