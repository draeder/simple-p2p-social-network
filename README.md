# Simple P2P Social Network
An experimental effort to build a simple serverless, fully decentralized peer-to-peer social network.

The service can run directly in a browser tab without any need for server hosting by simply downloading index.html and opening it in a browser. It can also be hosted, but everything happens in the browser. There is no server-side code to speak of.

At present, the service is completely experimental (expect some bugs)--researching, testing and playing around with various decentralized APIs like Bugout, AvionDB, js-ipfs among others.

## Current Features
- Create a 'pop-up' P2P social network that can be accessed by anyone who has the generated URL
- Once connected to the instance, peers can share new posts and comments between each other
- Posts and comments allow HTML tags. Be careful when using out of date/insecure browsers--they may process scripts!

![Screenshot](https://raw.githubusercontent.com/draeder/simple-p2p-social-network/master/sreenshot.png)

## Current Limitations
- Post & comment history is not sent to new joiners, yet
- Many familiar social network features are not yet available (hashtags, likes, post sharing, searchs, followers, etc)
- Code security has not been evaluated
- Connections using Chrome for Android do not work, but other browsers on Android seem to work okay

## Usage
### Online Demo
1. Demo available at https://social.peer.ooo
2. Share the generated URL with friends, or open in a different browser/browser tab to test it out yourself

### Run locally
1. Download and launch index.html
2. Copy the URL into another browser or browser tab
- Note: what makes the magic happen is the 'Peer ID' portion of the URL (the search string after "?r="). 
- Anyone with that string may add the search parameter "?r=" to the URL followed by the generated string to connect to your instance and communicate

> `file:///index.html?r=47321648ef3de6d1bffee634ab3aeba24d775f23`

