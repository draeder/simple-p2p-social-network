////////////////////////////////////////////////
////            SPSN Browser API            ////
////////////////////////////////////////////////

//
document.addEventListener('DOMContentLoaded', async () => {
    console.log("SPSN API loaded")
//// Process DOM inputs in real time //newly added inputs need ot be reprocessed whenever a new input is added to the DOM
    // Textarea
    // Input
    // Radial
    // Checkbox
    // document.addEventListener('DOMContentLoaded', async () => {})
    //let spsn = new SPSN() //<- API call

//// Connection handler
    // Get URL from address bar
    const url = window.location.href; 
    let urlObject = new URL(url);
    let urlStr = urlObject.href

    // testing QR code
    let urlQR = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + urlStr
    var img = document.createElement("img");
    img.src = urlQR;
    document.body.appendChild(img);

    // Process URL for peer identifier
    let peerId = urlObject.searchParams.get('p')
    if(!peerId){
        peerId = localStorage.getItem("peer-seed")
    }

    // Create or join a server
    if(peerId){
        identifier = peerId
        console.log("Joining existing server: " + peerId)
    } else {
        identifier = {seed: localStorage["peer-seed"]}
        localStorage["peer-seed"] = b.seed;
        console.log("Creating server with identifier: " + b.seed)
        window.history.pushState("","","?p="+b.seed);
    }

    let b = new Bugout(identifier)
    console.log("My peer-seed: " + b.seed)

    // Detect connected peers
    b.once("seen", function(address){
        console.log("Peers connected!")
    })

    b.on("connections", function(c){
        if(c==0){
            console.log("No peers connected")
        } else {
            console.log("Connections: " + c)
        }
    })

    function SPSN(args,opts){
        this.args = args
        this.opts = opts
    }  
})  
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

