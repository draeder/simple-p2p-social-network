////////////////////////////////////////////////
////            SPSN Browser API            ////
////////////////////////////////////////////////

//
let config = {}
function SPSN(config, customId){
    this.config = config
    this.customId = customId
    let identifier

    let e = new EventEmitter()

    e.on('message', function (text) {
        console.log(`API recieved: ${text}`)
    })
    e.on('something', function (text) {
        console.log(`API recieved: ${text}`)
    })
    
    e.on('connected.text', function(txt){
        connectedTxt = txt
    })
    e.on('waiting.text', function(txt){
        waitingTxt = txt
    })    
    //let identifier;
    //script.src = "https://cdnjs.cloudflare.com/ajax/libs/eventemitter3/4.0.4/index.min.js"
    
    //// Process DOM inputs in real time //newly added inputs need ot be reprocessed whenever a new input is added to the DOM
        // Textarea
        // Input
        // Radial
        // Checkbox

    //// Connection handler
        // Get and process URL from address bar
        const url = window.location.href; 
        let urlObj = new URL(url);
        let peerId = urlObj.searchParams.get('p')

        if(customId) {
            identifier = customId
            console.log(`Creating a generic swarm with name: ${identifier}`)
        }
        else if(peerId) {
            console.log(`Share this URL with peers: ${url}`)
            identifier = peerId
            console.log(`Joining existing server: ${peerId}`)
        }

        // Instantiate Bugout
        let b = new Bugout(identifier)
        
        b.heartbeat(30000)

        localStorage["peer-address"] = b.address()

        if(!identifier){
            e.emit("identifier", b.address())
            window.history.pushState("","","?p="+b.address())
        } else {
            //e.emit("identifier", identifier)
            window.history.pushState("","","?p="+identifier)
        }
    
        // Detect connected peers
        b.on("seen", function(address){
            let d = Date(Date.parse())
            console.log("Joined: " + address + " - " + d)
        })
    
        b.on("left", function(address){
            let d = Date(Date.parse())
            console.log("Left: " + address + " - " + d)
        })
    
        b.on("timeout", function(address){
            let d = Date(Date.parse())
            console.log("Timed out: " + address + " - " + d)
        })
    
        b.on("message", function(address, msg){
            console.log("Got message from: " + address)
            console.log("Message: " + JSON.stringify(msg))
        })
    
        b.on("connections", function(c){
            let spsnStatus = document.getElementsByTagName("spsn-status")
            for(let element of spsnStatus){
                element.setAttribute("count", c)
            }
            let spsnCount = document.getElementsByTagName("spsn-peercount")
            for(let element of spsnCount){
                element.setAttribute("count", c)
            }
        })
    
        window.addEventListener('beforeunload', function (e) {
            b.destroy();
            delete e['returnValue'];
        });
        function waitingText(txt){
            SPSN.prototype.waitingTxt = txt
        }
    //// Custom elements
        // Connection status element
        class Status extends HTMLElement {
            static get observedAttributes() {
                return ["count"];
              }
            attributeChangedCallback(name, oldValue, newValue) {
            // do something when an attribute has changed
                if(oldValue != newValue){
                    if(name == "count"){
                        let count = newValue
                        if(count > 0){
                            this.innerHTML = config.connectedTxt || "Peers connected!"
                        } else {
                            this.innerHTML = config.awaitingTxt || "Awaiting peers . . . "
                        }
                    }
                }
            }
        }   
        customElements.define('spsn-status', Status)
        // Connection count element
        class PeerCount extends HTMLElement {
            static get observedAttributes() {
                return ["count"];
            }
            attributeChangedCallback(name, oldValue, newValue) {
            // do something when an attribute has changed
                let count = newValue
                if(oldValue != newValue){
                    this.innerHTML = `${count}`
                }
            }
        }   
        customElements.define('spsn-peercount', PeerCount)
    
        // QR code element
        class QRcode extends HTMLElement {
            connectedCallback() {
                const url = window.location.href
                let size = "150x150"

                if(this.getAttribute("size")){
                    size = this.getAttribute("size")
                }

                let urlQR = `https://api.qrserver.com/v1/create-qr-code/?size=${size}&data=${url}`
    
                this.innerHTML = 
                `
                    <img src=${urlQR}></img>
                `
            }
        }
        customElements.define('spsn-qr', QRcode)
        SPSN.prototype.post = function(post){
            console.log(post)
        }
        SPSN.post = SPSN.prototype.post
        
        SPSN.prototype.profile = function(profile){
            console.log(profile)
        }
        SPSN.profile = SPSN.prototype.profile
        return {
            this: this,
            e : e,
            instance : b
        }//test && e && b
}

    //// Message objects
        // Create a user profile object
        function Profile(type, identifier, first, last, email, about, avatar) {
            this.type = type
            this.identifier = identifier
            this.firstName = first
            this.lastName = last
            this.email = email
            this.about = about
            this.avatar = avatar
            this.name = function() {return this.firstName + " " + this.lastName}
        }
    
        // Create a post object
        function Post(type, identifier, name, postId, date, message) {
            this.type = type
            this.identifier = identifier
            this.name = name
            this.postId = postId
            this.date = date
            this.message = message
        }
    
        // Create a reply object
        function Reply(type, identifier, name, postId, replyId, date, message) {
            this.type = type,
            this.identifier = identifier
            this.name = name
            this.postId = postId
            this.replyId = replyId
            this.date = date
            this.message = message
        }
    
        // Create an image object
        function Image(type, identifier, name, url, date, base64Data){
            this.type = type,
            this.identifier = identifier
            this.name = name
            this.url = url
            this.date = date
            this.base64Data = base64Data
        }

//document.addEventListener('DOMContentLoaded', async () => {


//})

//// Connection handler
    // New Server
        // Create joinable URL and associated QR code
    // Create/Join Peer Swarm
        // Create joinable URL and associated QR code
    // New Client
        // Join server or swarm by ID
            // Parse URL for ID
            // Await passed ID
    // Update connection status
        // Awating peers
        // Connected
            // Peer count
        // Peer disconnected
            // Peer count

//// Identitiy handler
    // Create identity (nacl)
    // Confirm identity (QR code on secondary device)
        // Import profile, index && message history

//// Peer index
    // Get index (from instance)
        // Check index integrity
    // Create index (new instance)
    // Append index (new peer) (last join)
    // Search index (existing instances)

//// Following handler - keeps track of peers you are following

//// Followed handler - keeps track of peers following you
    // Manage peers

//// Inbound content handler
    // Allow/Block types of media
        //Text
        //Images
        //Video
        //Articles

//// Local Message handler
    // Post
    // Comment
    // Repost

//// Local Message storage 

//// Local Message retrieval
    // Import to another device with confirmed identity
    // Respond to peer requests for message history (rpc request)
    // Export message data

//// Peer Message History handler
    // all posts &&/|| comments
    // last n posts &&/|| comments
    // posts &&/|| comments date
    // posts &&/|| comments between datetime

//// Notifications handler
    // Comments
    // Likes
    // Dislikes
    // Follows
    // Followers

//// Extensible Options handler
    // Get/set additional properties on objects

//})

