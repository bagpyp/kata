const assert = require('assert');
const { User } = require('../src/app.js');

describe('Feature: Publish', () => {
    it("should return a user's timeline as a list of strings", () => {
        const alice = new User('alice');
        alice.publish("I love the weather today!");
        const result = alice.reflect();
        assert.equal(result[0], "I love the weather today!");
    });
});
