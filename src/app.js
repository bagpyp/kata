const timeAgo = require('node-time-ago');

class User {
    constructor(name) {
        this.name = name;
        this.timeline = [];
        this.following = [this];
    }
    publish(...args) {
        this.timeline.push(new Post(this.name, ...args));
    }
    view(...otherUsers) {
        const result = otherUsers
            .map(u => u.timeline)
            .reduce((a,b) => a.concat(b))
            .sort((m,n) => m.time > n.time ? 1 : -1)
            .map(p => p.display())
        return result;
    }
    follow(otherUser) {
        this.following.push(otherUser)
    }
}

class Post {
    constructor(author, content, time = new Date()) {
        this.author = author
        this.content = content;
        this.time = time;
    }
    display() {
        return `${this.author} - ${this.content} (${timeAgo(this.time)})`
    }
}

exports.User = User;
