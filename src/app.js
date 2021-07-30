class Post {
    constructor(content) {
        this.content = content;
        this.time = Date.now();
    }
}

class User {
    constructor(name) {
        this.name = name;
        this.timeline = [];
    }
    publish(content) {
        this.timeline.push(new Post(content));
    }
    // view own timeline
    reflect() {
        return this.timeline.map(p => p.content);
    }
}

exports.User = User;