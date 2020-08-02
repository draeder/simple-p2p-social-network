
    let e = new EventEmitter()
    e.on("fromJSFile", function(msg){
        console.log("Got it " + msg)
    })
    e.on("fromHTMLScript", function(msg){
        console.log("Recieved message from HTML script: " + msg)
    })
    e.on("fromJSFile", function(msg){
        console.log("Stuff")
    })
    e.emit("fromJSFile", "test message")
    function wait(ms) {
        const start = performance.now();
        while(performance.now() - start < ms);
      }