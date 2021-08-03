const assert = require('assert');
const { expect } = require('chai');
const sinon = require("sinon");
const { User } = require('../src/app.js');

var clock = sinon.useFakeTimers(Date.now());

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
        bob.publish('Darn! We Lost!');
        clock.tick(60 * 1000);
        bob.publish('Good game though.');
        clock.tick(60 * 1000);
        const result = alice.view(bob);
        console.log(result);
        assert.equal(result[0], 'Bob - Darn! We Lost! (2 minutes ago)');
        assert.equal(result[1], 'Bob - Good game though. (a minute ago)');
    })
})

describe('Feature: Following', () => {
    it("should sort appropriately and show all users' posts", () => {
        const alice = new User('Alice');
        const bob = new User('Bob');
        const charlie = new User('Charlie');
        alice.publish("I love the weather today!");
        clock.tick(3 * 60 * 1000);
        bob.publish('Darn! We Lost!');
        clock.tick(60 * 1000);
        bob.publish('Good game though');
        clock.tick(60 * 1000);
        charlie.publish("I'm in New York today! Anyone wants to have a coffee?");
        clock.tick(15 * 1000);
        charlie.follow(alice);
        charlie.follow(bob);
        const result = charlie.view(...charlie.following);
        console.log(result);
        // test sorting and visibility
        expect(result).to.be.eql([
            'Alice - I love the weather today! (5 minutes ago)',
            'Bob - Darn! We Lost! (2 minutes ago)',
            'Bob - Good game though (a minute ago)',
            "Charlie - I'm in New York today! Anyone wants to have a coffee? (just now)"
        ]);
    })
})
