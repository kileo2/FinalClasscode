var express = require('express');//loads the code from the module express and assigns it to the variable
var bodyParser = require('body-parser');//loads the code from the module body parser and assigns it to the variable
var mongoose = require('mongoose');//loads the code from the module mongoose and assigns it to the variable
var bluebird = require('bluebird');//loads the code from bluebird and assigns it to the variable
var glob = require('glob');//loads code from glob and assigns it to the variable


module.exports = function (app, config) {//uses express and config objects

  console.log("Loading Mongoose functionality");
  mongoose.Promise = require('bluebird');//requiring the promise library called blulebird. All mongoose promises will be replaced by bluebird promise library
  mongoose.connect(config.db, {useMongoClient: true});
  var db = mongoose.connection;
  db.on('error', function () {
    throw new Error('unable to connect to database at ' + config.db);
  });

  mongoose.set('debug', true);
  mongoose.connection.once('open', function callback() {
    console.log("Mongoose connected to the database");
  });//will log all database accesses

  app.use(function (req, res, next) {
    console.log('Request from ' + req.connection.remoteAddress, 'info');
    next();
  });//prints where the request is coming from to the console.
  
//parses the text that was included for the post. 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));
//loads models files first before controllers
  var models = glob.sync(config.root + '/app/models/*.js');
  models.forEach(function (model) {
    require(model);
  });
  //loads controller files
  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app, config);
  });
  
  //loads static route
  app.use(express.static(config.root + '/public'));
  //error handlers
    app.use(function (req, res) {
      res.type('text/plan');
      res.status(404);
      res.send('404 Not Found');
    });//Processes incoming request. If no route found, it will give a 404 and not pass it to the next middleware. This will end the chain

  app.use(function (err, req, res, next) {
    //only there to test it
    if(process.env.NODE_ENV !== 'test') {
      console.error(err.stack);
    }//Processing incoming test requests
    res.type('text/plan');
    res.status(500);
    res.send('500 Sever Error');
  });// Process incoming requests. it can complete successfully or move to next middleware or give a 500 error.

  console.log("Starting application");//starts application and prints it to console.
}
