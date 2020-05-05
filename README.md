[Test Link](#-test)

# [Yada Yada](https://yada-yada.herokuapp.com/)

Ever wonder what Slack would be like if it had limited features, extremely gaudy colors, and the infamous IM sounds of
the 90s? Well, [here's your chance to find out](https://yada-yada.herokuapp.com/)!

Local setup and account credentials below, but be sure to also read the notes at the end! :)

## Installation

##### Clone it:
```
# SSH
$ git clone git@github.com:kevinparkerson/yadayada.git

# ...or HTTPS
$ git clone https://github.com/kevinparkerson/yadayada.git
```
##### Enter the newly cloned project via terminal, then...

##### Install the node_modules:
```
$ npm install
```

##### If you don't already have [Homebrew](https://brew.sh/) installed, run this:
```
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

##### If you don't already have [mongodb](https://github.com/mongodb/homebrew-brew) installed, run this:
```
$ brew tap mongodb/brew
$ brew install mongodb-community
```

## Running the app

##### Within the project directory, open two terminal tabs, then...

##### In tab two, run this:
```
$ brew services start mongodb-community
```

##### In tab one, if you haven't done so before run this:
```
$ npm run add_users
```

##### Then in tab one, run this:
```
$ npm start
```

#### Now visit `localhost:5555/` in a browser and you're good to go!

### Account Credentials
- Username: Carrie76 | Password: telekinesis
- Username: Jack80 | Password: heresjohnny
- Username: Pennywise90 | Password: youllfloattoo
- Username: Percy99 | Password: drysponge
- Username: Wendigo89 | Password: sometimesdeadisbetter

### Notes

- Why did you decide on this technology stack?
    - While I initially considered using Next.js and Styled Components, I chose React, Redux, SCSS, Webpack, Babel, 
    Node, MongoDB, and SocketIO to touch on most of the required skills. Though I could've used create-react-app to
    speed up the initial project setup, I wanted to demonstrate competency manually configuring the underlying systems 
    and display an architectural pattern that is common but different from that particular structure.
- What about tests? TypeScript?
    - I thoroughly approve of both, but due to time constraints I decided to leave them out.
- Why this particular project structure?
    - It's easy to understand in regards to organization and would scale fairly well. I cut some corners with storing 
    messages and socket design but those could be improved fairly easily and the project itself is simple to expand.
- Why are the package.json modules all using exact versions?
    - In my experience, it causes fewer issues when others need to pull down and run the codebase and reduces the 
    likelihood of issues in production. I prefer manually updating, testing, and checking in node_module updates vs 
    relying on external parties to follow semver.
- What are all the features in this app?
    - User login and session persistence. No capacity to add users at the moment but as users are stored in the DB
    creating that feature would not take long.
    - The ability to see who you're logged in as and log out.
    - The capacity to switch between a public chat channel and private direct messaging channels.
    - Browser routing between selected channels (back / forward buttons work correctly)
    - IM within the various channels.
    - Slack-like formatting of messages.
    - Persistence for up to 500 messages in private channels and 1000 in the public channel.
    - Visibility of whether another user is currently connected.
    - Highlighting of channels when there are unread messages; not persisted, unfortunately, due to time constraints.
    - Outrageous colors. :D
    - Sounds!!!
- Did you enjoy working on this?
    - Very much so! I might even expand on these features in the future. :)
    
    
    
### Test
