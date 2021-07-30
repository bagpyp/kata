const assert = require('assert');
const { User } = require('../src/app.js');

describe('Feature: Publish', () => {
    it("should return a user's own timeline as a list of strings", () => {
        const alice = new User('alice');
        alice.publish("I love the weather today!");
        const result = alice.display();
        console.log(result);
        assert.equal(result[0], "I love the weather today! (just now)");
    });
});

describe('Feature: Timeline', () => {
    it("should let one user view another's timeline", () => {
        const alice = new User('alice');
        const bob = new User('bob');
        bob.publish('Darn! We Lost!', time = new Date(Date.now() - 60 * 1000));
        bob.publish('Good game though', time = new Date(Date.now() - 2 * 60 * 1000));
        const result = alice.view(bob);
        console.log(result);
        assert.equal(result[1], 'Good game though (2 minutes ago)');
        assert.equal(result[0], 'Darn! We Lost! (a minute ago)');
    })
})
