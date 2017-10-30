var express = require('express'); //This is assigning a vairable express to the module express. Require will load the code from the module express.
var config = require('./config/config');//This is assigning a variable config to the module in the config folder called config.

var app = express();//The app object implements the server in express

require('./config/express')(app, config);//loads the server configuration code and passes the app and config object to it

console.log('info',"Creating HTTP server on port: %s", config.port);//Prints to the console which port the server is listening on
require('http').createServer(app).listen(config.port, function () {//turns on the server at that port number
    console.log("HTTP Server listening on port:" + " " +  config.port + " "+ app.get('env')+ "localhost:" + config.port);
});

module.exports = app;