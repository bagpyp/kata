# Social Networking Kata

A kata prompted by the good folks at integral.io

## Run

Clone this repo down and cd into it, then run
```bash
npm i 
npm run test
```

### Publishing

The below requirements prompted me to write test case before I even opened app.js
  
```
Scenario: Alice publishes messages to her personal timeline.   
    Given Alice has published "I love the weather today."
    When Alice views her timeline
    Then Alice sees:
        "I love the weather today."
```

Then the test passed!

![some TDD code](img/publish.png)