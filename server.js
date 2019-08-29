var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;
// Create request handler
var requestHandler = function(request, response) {
    var parsedUrl = url.parse(request.url);
    // Check the request path
    if(parsedUrl.pathname === '/listings'){
        // Send response with JSON data
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.write(listingData);
        response.end();
    }
    else{
        // Send 404 response
        response.writeHead(404);
        response.end('Bad gateway error');
    }
};

fs.readFile('listings.json', 'utf8', function(err, data) {
    // Check for errors
    if(err) throw err;
    // Save the state in the listingData variable already defined
    listingData = data;
    // Create, start the server
    server = http.createServer(requestHandler);
    server.listen(port, function() {
        console.log('Server listening on: http://127.0.0.1:' + port);
    });
});
