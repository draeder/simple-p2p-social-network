# Simple P2P Social Network
An experimental effort to build a simple serverless, secure and fully decentralized peer-to-peer social network.

The service can run directly in a browser tab without any need for server hosting by simply downloading index.html and opening it in a browser.

At present, the service is completely experimental (expect things to be broken!)--researching, testing and playing around with various decentralized APIs like the follwing:

- Bugout API (pre-alpha): A decentralized messenging API that connects peers together and is built upon WebTorrent and WebRTC.
- AvionDB (alpha): an offline first, mongo-like, security conscious decentralized database built upon OrbitDB and IPFS
- js-ipfs: decentralized data storage

# Current Features
- Chat in individual rooms.
- Chat history is stored in plain text in LocalStorage and IndexedDB in the browser then sent to ipfs. All stored data will be encrypted soon.

# Current Limitations
## Lots
- I'm using GitHub Pages as my test environment LOL
- Connections to peers don't happen right away, and sometimes not at all--especially using the Chrome Browser on Android (thus the warning), but other browsers on Android seem to work okay
- Established sessions may "time out"--probably due to how the device manages memory/cpu/network connectivity
- Chat history is not sent to new joiners, yet
- Chat history is stored in ipfs as plain text
- The UI is confusing
- Spaghetti code

# Usage
1. Launch index.html (no other files are needed; ignore them unless you want broken code)
2. Create a room and username (don't forget to hit enter in each field)
3. Share the generated URL from the address bar with friends if you are hosting index.html somewhere, otherwise send them the file and have them enter your room ID from the URL (the string after 'r=').

# Short-term Goals
- Implement and test AvionDB for chat history
- Share chat history with new joins to the room
- Move away from a chat room toward an actual User Profile
- Link replies to main posts
- Image storage and retrieval
- Avatars
- Export/delete historic data

# Long-term Goals
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

