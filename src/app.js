const timeAgo = require('node-time-ago');

class User {
    constructor(name) {
        this.name = name;
        this.timeline = [];
        this.following = [this];
    }
    publish(content) {
        var post = new Post(content);
        post.author = this.name;
        this.timeline.push(post);
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
    constructor(content) {
        this.content = content;
        this.time = new Date();
    }
    display() {
        return `${this.author || '?'} - `
            + `${this.content} `
            + `(${timeAgo(this.time)})`;
    }
}

exports.User = User;
