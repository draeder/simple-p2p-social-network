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
    } else {
        window.history.pushState("","","?r="+identifier);
    }

//// Get name from local storage
    let profileName = localStorage.getItem("Peer Name")
    if(!profileName){
        profileName = "Anonymous"
        document.getElementById("name-input").focus()
    } else {
        document.getElementById("name-input").value = profileName
        document.getElementById("post-input").focus()
    }
    //let nameInput = document.getElementById("name-input")
    //nameInput.value = profileName

//// Process URL from the address bar
    const url = window.location.href; 
    let urlObject = new URL(url);
    let profileId = urlObject.searchParams.get('r')
    //let arrUrl = profileId.split("-");
    //let serverName = arrUrl[0]
    let serverId = profileId // connect to existing instance
    
//// Tracker resolution
    const resolver = new doh.DohResolver('https://1.1.1.1/dns-query');

    let trackers = []
    resolver.query('ws.oooooooooooooooooooooooooooo.ooo', 'TXT')
        .then(response => {
            response.answers.forEach(ans => trackers.push(ans.data.toString()))
            bugout(trackers)
        })
        .catch(err => console.error(err));

//// Initialize a Bugout session
    function bugout(trackers){
        let b = new Bugout(serverId, {announce: trackers})
        b.on("seen", function(address){
            console.log("Server identifier: " + b.identifier)
            document.getElementsByTagName("bugout-status")[0].setAttribute("title", "Connected")
            document.getElementsByTagName("bugout-status")[0].innerHTML=
                "<i class='fa fa-exchange fa-lg' aria-hidden='true' style='color: green'></i>"
        })

    //// Handle incoming messages
        // Recieve inbound message from Bugout
        b.on("message", function(address, msg){
            //let message = JSON.stringify(msg)
            processMsg(msg)
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
        article.setAttribute('class', 'post')

        var options = {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            hour12: true
          },
        date = new Intl.DateTimeFormat('default', options).format(post.date)

        article.innerHTML = "<p><b>" + post.name + "</b></p><hr><p>" + post.message + "<p class='postdate'>" + date + "</p>"

        feed.insertBefore(article, feed.firstChild)
        .setAttribute("id", post.postId)

        document.getElementById(article.id)
        .appendChild(d)
        .appendChild(inp)
        .setAttribute("id", "reply-input")

        article.after(spacer)
        getInputTags() //update input tags
    }
    
    // Add receivced replies to DOM
    function addReply (reply) { 
        var replies = document.getElementById(reply.postId),
        comment = document.createElement("article")
        d = document.createElement("div")

        var options = {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            hour12: true
          };
        var date = new Intl.DateTimeFormat('default', options).format(reply.date)

        comment.setAttribute("class", "reply")
        comment.innerHTML = "<p><b>" + reply.name + "</b></p><hr><p>" + reply.message + "<p class='postdate'>" + date + "</p>"

        replies.appendChild(comment, replies)
        .setAttribute("id", reply.replyId)
    }

//// Handle inputs from DOM
    // Get value from *any* input field upon value change
    function getInputTags(){
        var inputTags = document.getElementsByTagName("input")
    
        //Process carriage return
        for (let keyPress of inputTags){
            keyPress.addEventListener('keyup', getInput)
        }
        //Process 'clicked away' or 'tabbed out'
        for (let onBlur of inputTags){
            onBlur.addEventListener('blur', getInputTabOut)
        }
        //Process 'clicked in'
        for (let onClick of inputTags){
            onClick.addEventListener('click', function(){
                if(this.id=="name-input"){
                    if(this.value=="Anonymous"){
                        this.value=""
                    }
                }
            })
        }
    }
    
    getInputTags()

    function getInput (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            processInput(this)
        }
    }

    function getInputTabOut (e) {
        if(this.value) {
            e.preventDefault()
            processInput (this)
        } 
        else {
            e.preventDefault
            processInput(this)
        }
    }

    // Handle input field type
    function processInput (input){
        let message = {}
        let profile = {}
        if(input.id=="name-input"){
            if(input.value){
                if(input.value!="Anonymous"){
                    localStorage.setItem("Peer Name", input.value)
                } 
                else if(input.value=="Anonymous" && profileId){
                    localStorage.removeItem("Peer Name")
                    input.value = "Anonymous"
                    profileId = "Anonymous"
                }
            }
            else if(!input.value){
                input.value = localStorage.getItem("Peer Name") || "Anonymous"
            }
            profileName = input.value
            //create a user profile
            //message = new Profile("profile", identifier, Date.now(), firsstName, lastName, email, about, avatar)
        } 
        else if (input.id=="post-input"){
            //create a post message
            if(input.value){
                message = new Post("post", identifier, profileName, generateId(), Date.now(), input.value)
                input.value = ""
            }
        } 
        else if(input.id=="reply-input"){
            //create a reply message
            if(input.value){
                var postId=input.name
                message = new Reply("reply", identifier, profileName, postId, generateId(), Date.now(), input.value)
                input.value = ""
            }
        } else {
            console.log("Warning: Input field <input id='" + input.id + "'> is not defined in the function named 'processInput'.")
        }
        if(message){
            //message=profileName + " " + message
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
