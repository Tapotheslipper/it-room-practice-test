const http = require("http"); // here, I require "http" built-in module
http.createServer(function(request, response) { // here, I call to "createServer" method/function from the module
    response.end("Hello NodeJS!"); // sending the response in output
}).listen(3000, "127.0.0.1", function() { // Initializing the server port connection
    console.log("The server started listening to queries at port 3000"); // sending a message to the console
});