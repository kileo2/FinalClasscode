var express = require('express');
var logger = require('./logger');
var morgan =require('morgan');
var bodyParser = require('body-parser');


module.exports = function (app, config) {

  if(process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));

    app.use(function (req, res, next) {
      logger.log('Request from ' + req.connection.remoteAddress, 'info');
      next();
    });
  }


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));

  var users = [	{name: 'John', email: 'woo@hoo.com'},
  {name: 'Betty', email: 'loo@woo.com'},
  {name: 'Hal', email: 'boo@woo.com'}
];

app.get('/api/users', function (req, res) {
  res.status(200).json(users);
});
 


function One(req, res, next){
	res.set('X-One','One');
	next();
}

function Two(req, res, next){
	res.set('X-Two','Two');
	next();
}

app.get('/', [One, Two], function(req, res){
	res.send('Three');
});

require('../app/controllers/users')(app,config);

app.use(express.static(config.root + '/public'));

  app.use(function (req, res) {
    res.type('text/plan');
    res.status(404);
    res.send('404 Not Found');
  });

  app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('text/plan');
    res.status(500);
    res.send('500 Sever Error');
  });

  logger.log("Starting application");

};

