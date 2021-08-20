const assert = require('assert');
const { expect } = require('chai');
const sinon = require("sinon");
const { User, Post } = require('../src/app');
const { timeAgo } = require('../src/timeAgo');

var clock = sinon.useFakeTimers(Date.now());

describe.only("Feature: timeAgo", () => {
    describe("Given the current Date, when rendered", () => {
        it("should render as just now", () => {
            let now = new Date();
            let nowAgo = timeAgo(now);
            assert.equal(nowAgo, 'just now');
        })
    });
    describe("Given a Date that is X seconds in the past, when rendered", () => {
        it("15 should render as `15 seconds ago`", () => {
            let fifteen = new Date();
            clock.tick(15 * 1000);
            let fifteenAgo = timeAgo(fifteen);
            assert.equal(fifteenAgo, '15 seconds ago');
        });
        it("1 should render as `1 second ago`", () => {
            let one = new Date();
            clock.tick(1 * 1000);
            let oneAgo = timeAgo(one);
            assert.equal(oneAgo, '1 second ago');
        })
    });
    describe("Given a Date that is X.2 seconds in the paste, when rendered", () => {
        it("15.2 should render as `15 seconds ago`", () => {
            let fifteen2 = new Date();
            clock.tick(15.2 * 1000);
            let fifteen2Ago = timeAgo(fifteen2);
            assert.equal(fifteen2Ago, "15 seconds ago");
        });
        it("1.2 should render as `1 second ago`", () => {
            let one2 = new Date();
            clock.tick(1.2 * 1000);
            let one2Ago = timeAgo(one2);
            assert.equal(one2Ago, '1 second ago');
        })
    });
    describe("Given a Date that is 1 minute in the past, when rendered", () => {
        it("1 should render as `a minute ago`", () => {
            let one = new Date();
            clock.tick(1 * 60 * 1000);
            let oneAgo = timeAgo(one);
            assert.equal(oneAgo, "a minute ago");
        });
    });
    describe("Given a Date that is 59.9 seconds in the past, when rendered", () => {
        it("1 should render as `a minute ago`", () => {
            let one = new Date();
            clock.tick(1 * 59.9 * 1000);
            let oneAgo = timeAgo(one);
            assert.equal(oneAgo, "a minute ago");
        });
    })
    describe("Given a Date that is 61s in past, when renered", () => {
        it("should render as 'a minute ago'", () => {
            let one = new Date()
            clock.tick(1* 61 * 1000)
            let oneAgo = timeAgo(one)
            assert.equal(oneAgo, "a minute ago")
        });
    });
    describe("Given that a Date is X minutes in the past, when rendered", () => {
        it("7 minutes should rendered to `7 minutes ago`", () => {
            let seven = new Date()
            clock.tick(7 * 60 * 1000)
            let sevenAgo = timeAgo(seven)
            assert.equal(sevenAgo, "7 minutes ago")
        })
    })
})


describe('Given a Post, when time is Provided', () =>{
    it("should tell us how long ago", () => {
        let content = "some content";
        let post = new Post(content);
        assert.equal(post.display(),"? - " + content);
    })
});


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
