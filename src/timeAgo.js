
function timeAgo(date) {
    let timeSpan = new Date() - date;
    if (timeSpan < 1000) {
        return "just now";
    }
    else if (timeSpan < 1500) {
        return "1 second ago";
    }
    // timeSpan is a minute
    else if (timeSpan >= 30000 && timeSpan < 90*1000) {
        return "a minute ago";
    }
    else if (timeSpan < 30000) {
        return `${Math.round(timeSpan/1000)} seconds ago`;
    }
    else {
        return `${Math.round(timeSpan/(60*1000))} minutes ago`;
    }
}

exports.timeAgo = timeAgo;