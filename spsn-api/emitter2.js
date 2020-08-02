
e.on("fromJSFile", function(msg){
    console.log("browser recieved message: " + msg)
})
e.emit("fromHTMLScript", "Emitted from HTML script")