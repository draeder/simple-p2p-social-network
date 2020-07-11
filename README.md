# Simple P2P Social Network
An experimental effort to build a simple serverless, fully decentralized peer-to-peer social network.

The service can run directly in a browser tab without any need for server hosting by simply downloading index.html and opening it in a browser.

At present, the service is completely experimental (expect some bugs)--researching, testing and playing around with various decentralized APIs like the follwing:

- Bugout API (pre-alpha): A decentralized messenging API that connects peers together and is built upon WebTorrent and WebRTC.
- AvionDB (alpha): an offline first, mongo-like, security conscious decentralized database built upon OrbitDB and IPFS
- js-ipfs: decentralized data storage

## Current Features
- Create a 'pop-up' P2P social network that can be accessed by anyone who has the generated URL
- Once connected to the instance, peers can share new posts and comments between each other
- Posts and comments allows HTML tags. Be careful when using out of date browsers--they may process scripts!

![Screenshot](https://raw.githubusercontent.com/draeder/simple-p2p-social-network/master/sreenshot.png)

## Current Limitations
- Post & comment history is not sent to new joiners, yet
- Many familiar social network features are not yet available
- Code security has not been evaluated

## Usage
### Online Demo
1. Demo available at https://social.peer.ooo
2. Share the generated URL with friends, or open in a different browser/browser tab to test it out yourself

### Run locally
1. Download and launch index.html
2. Copy the URL into another browser or browser tab
- Note: what makes the magic happen is the 'Peer ID' portion of the URL (the search string after "?r="). 
- Anyone with that string may add the search parameter "?r=" plus the generated string to reach your instance and communicate

> `file:///index.html?r=47321648ef3de6d1bffee634ab3aeba24d775f23`

