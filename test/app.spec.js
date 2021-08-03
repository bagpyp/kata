const assert = require('assert');
const { User } = require('../src/app.js');

describe('Feature: Publish', () => {
    it("should return a user's own timeline as a list of strings", () => {
        const alice = new User('Alice');
        alice.publish("I love the weather today!");
        const result = alice.view(alice);
        console.log(result);
        assert.equal(result[0], "Alice - I love the weather today! (just now)");
    });
});

describe('Feature: Timeline', () => {
    it("should let one user view another's timeline", () => {
        const alice = new User('Alice');
        const bob = new User('Bob');
        bob.publish('Darn! We Lost!', time = new Date(Date.now() - 2 * 60 * 1000));
        bob.publish('Good game though.', time = new Date(Date.now() - 60 * 1000));
        const result = alice.view(bob);
        console.log(result);
        assert.equal(result[0], 'Bob - Darn! We Lost! (2 minutes ago)');
        assert.equal(result[1], 'Bob - Good game though. (a minute ago)');
    })
})

describe('Feature: Following', () => {
    it("should show all 4 of charlie's followers", () => {
        const alice = new User('Alice');
        const bob = new User('Bob');
        const charlie = new User('Charlie');
        alice.publish("I love the weather today!", new Date(Date.now() - 5 * 60 * 1000));
        bob.publish('Darn! We Lost!', time = new Date(Date.now() - 60 * 1000));
        bob.publish('Good game though', time = new Date(Date.now() - 2 * 60 * 1000))
        charlie.publish("I'm in New York today! Anyone wants to have a coffee?", 
            time = new Date(Date.now() - 15 * 1000));
        charlie.follow(alice);
        charlie.follow(bob);
        const result = charlie.view(...charlie.following);
        console.log(result);
        assert.equal(result.length, 4);
    })
})