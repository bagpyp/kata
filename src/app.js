var timeAgo = require('node-time-ago');

class Post {
    constructor(content, time = new Date()) {
        this.content = content;
        this.time = time;
    }
    display() {
        return `${this.content} (${timeAgo(this.time)})`
    }
}

class User {
    constructor(name) {
        this.name = name;
        this.timeline = [];
    }
    publish(...args) {
        this.timeline.push(new Post(...args));
    }
    // view own timeline
    reflect() {
        return this.timeline.map(p => p.content);
    }
    display() {
        return this.timeline.map(p => p.display())
    }
    view(otherUser) {
        return otherUser.display();
    }
}

exports.User = User;