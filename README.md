# Simple P2P Social Network
An experimental effort to build a simple serverless, fully decentralized peer-to-peer social network.

The service can run directly in a browser tab without any need for server hosting by simply downloading index.html and opening it in a browser.

At present, the service is completely experimental (expect some bugs)--researching, testing and playing around with various decentralized APIs like the follwing:

- Bugout API (pre-alpha): A decentralized messenging API that connects peers together and is built upon WebTorrent and WebRTC.
- AvionDB (alpha): an offline first, mongo-like, security conscious decentralized database built upon OrbitDB and IPFS
- js-ipfs: decentralized data storage

## Current Features
- Create a 'pop-up' P2P social network that can be accessed by anyone who has the generated URL
- Once peers are connected, you can share posts and comment on them between each other
- Posts and comment input allows HTML tags. Be careful with out of date browsers that may process scripts!

## Current Limitations
- Post & comment history is not sent to new joiners, yet
- Missing many familiar social network features
- Code security has not been evaluated

## Usage
### Online Demo
1. Demo available at https://social.peer.ooo
2. Share the generated URL with friends, or open in a different browser/browser tab to test it out yourself

### Run locally
1. Download and launch index.html
2. Copy the URL into another browser or browser tab
- Note: what makes the magic happen is the 'Peer ID' portion of the URL (the search string after "r="). 
- Anyone with that string may add the search parameter, "?r=" plus the generated string to reach your instance and communicate

## Short-term Goals
- Share chat history with new joins to the room
- Image storage and retrieval
- Avatars
- Export/delete historic data

## Long-term Goals
- Eternally open source
- Never require a centralized server for any functionality
- Ownership of user data always belongs to the user 100%
- Improve the UI
- Streaming video file playback
- Live p2p video (1:1 & 1:many)
- End-to-end encryption/security/privacy options
- Identity system
- Same data across all devices for the same user (https://simpleaswater.com/aviondb-p2p-sync/)
- User search
- Manage follower permissions / User blocking
- Notifications
- An API --If I learn enough

