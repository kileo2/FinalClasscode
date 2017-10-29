var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
var glob = require('glob');


module.exports = function (app, config) {

  console.log("Loading Mongoose functionality");
  mongoose.Promise = require('bluebird');
  mongoose.connect(config.db, {useMongoClient: true});
  var db = mongoose.connection;
  db.on('error', function () {
    throw new Error('unable to connect to database at ' + config.db);
  });

  mongoose.set('debug', true);
  mongoose.connection.once('open', function callback() {
    console.log("Mongoose connected to the database");
  });

  app.use(function (req, res, next) {
    console.log('Request from ' + req.connection.remoteAddress, 'info');
    next();
  });
  

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));

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

  console.log("Starting application");
}
