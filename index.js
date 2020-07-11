///////////////////////////////
// Simple P2P Social Network //
///////////////////////////////


//// Run everything asynchronously after DOM load
document.addEventListener('DOMContentLoaded', async () => {

//// Generate peer ID and store it in LocalStorage
    let identifier = localStorage.getItem("Peer ID")
    if(!identifier){
        let identifier = generateId() 
        localStorage.setItem("Peer ID", identifier)
        window.history.pushState("","","?r="+identifier);
        //console.log("There was no id, so set one: " + identifier)
    } else {
        //console.log("There was an id: " + identifier)
    }

//// Process URL from the address bar
    const url = window.location.href; 
    let urlObject = new URL(url);
    let profileId = urlObject.searchParams.get('r')
    //let arrUrl = profileId.split("-");
    //let serverName = arrUrl[0]
    let serverId = profileId // connect to existing instance

//// Initialize a Bugout session
    let b = new Bugout(serverId)
    b.on("seen", function(address){
        console.log("Server identifier: " + b.identifier)
        document.getElementsByTagName("bugout-status")[0].setAttribute("title", "Connected")
        document.getElementsByTagName("bugout-status")[0].innerHTML=
            "<i class='fa fa-exchange fa-lg' aria-hidden='true' style='color: green'></i>"
        
        //console.log("Seen: " + address)
    })

//// Handle incoming messages
    // Recieve inbound message from Bugout
    b.on("message", function(address, msg){
        //let message = JSON.stringify(msg)
        processMsg(msg)
        //console.log(address)
    })

    // Process message types
    function processMsg(message){
        if(message.type == "profile"){
            //console.log("Recieved an incoming message object of type 'profile'")
        }
        if(message.type == "post"){
            addPost(message)
        }
        if(message.type == "reply"){
            addReply(message)
        }
    }

    // Add received posts to DOM
    function addPost (post) { 
        var feed = document.getElementById('feed'),
        article = document.createElement('article'),
        d = document.createElement("div"),
        inp = document.createElement("input"),
        spacer = document.createElement("br")

        inp.name = post.postId
        inp.setAttribute("placeholder","Comment . . .")
        article.setAttribute('class', 'article')
        article.innerHTML = post.message + "<p>"

        feed.insertBefore(article, feed.firstChild)
        .setAttribute("id", post.postId)

        document.getElementById(article.id)
        .appendChild(d)
        .appendChild(inp)
        .setAttribute("id", "reply-input")

        //feed.append(spacer, article.nextSibling)
        article.after(spacer)
        getInputTags() //update input tags
    }
    
    // Add receivced replies to DOM
    function addReply (reply) { 
        console.log(reply.postId)
        var replies = document.getElementById(reply.postId),
        comment = document.createElement("blockquote")
        d = document.createElement("div")
        comment.setAttribute("class", "blockquote")
        comment.innerText = reply.message 

        replies.appendChild(comment, replies)
        .setAttribute("id", reply.replyId)
    }

//// Handle inputs from DOM
    // Get value from *any* input field upon value change
    function getInputTags(){
        var inputTags = document.getElementsByTagName("input")
        //console.log(inputTags)
    
        //Process carriage return
        for (let keyPress of inputTags){
            keyPress.addEventListener('keyup', getInput)
        }
        //Process 'clicked away' or 'tabbed out'
        for (let onBlur of inputTags){
            onBlur.addEventListener('blur', getInputTabOut)
        }
    }
    getInputTags()
    function getInput (e) {
        //console.log("Typing...")
        if (e.keyCode == 13) {
            e.preventDefault();
            processInput(this)
        }
    }

    function getInputTabOut (e) {
        console.log("Tabbed or clicked out... " + this.id)
        console.log(this.value)
        if(this.value){
            console.log(this.id + " has a value")
            e.preventDefault()
            processInput (this)
        } else
        {
            console.log(this.id + " has no value")
            console.log(this)
        }
    }

    // Handle input field type
    function processInput (input){
        let message = {}
        let profile = {}
        if(input.id=="name-input"){
            console.log("name-input")
            //create a user profile
            //message = new Profile("profile", identifier, Date.now(), firsstName, lastName, email, about, avatar)
        } else
        if(input.id=="post-input"){
            //create a post message
            console.log("post-input")
            message = new Post("post", identifier, generateId(), Date.now(), input.value)
            input.value = ""
        } else 
        if(input.id=="reply-input"){
            console.log("reply-input")
            //create a reply message
            var postId=input.name
            message = new Reply("reply", identifier, postId, generateId(), Date.now(), input.value)
            input.value = ""
        } else {
            console.log("Warning: Input field <input id='" + input.id + "'> is not defined in the function named 'processInput'.")
        }
        if(message){
            b.send(message) 
        }
    }

//// Create message objects
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
    function Post(type, identifier, postId, date, message) {
        this.type = type
        this.identifier=identifier
        this.postId=postId
        this.date = date
        this.message = message
    }

    // Create a reply object
    function Reply(type, identifier, postId, replyId, date, message) {
        this.type = type,
        this.identifier = identifier
        this.postId = postId
        this.replyId = replyId
        this.date = date
        this.message = message
    }

//// Generate crypto ID hash
    function generateId (len) {
        var arr = new Uint8Array((len || 40) / 2)
        window.crypto.getRandomValues(arr)
        return Array.from(arr, dec2hex).join('')
    }
    function dec2hex (dec) {
        return ('0' + dec.toString(16)).substr(-2)
    }

})