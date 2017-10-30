// (function (){
    
//     'use strict'; //This enforces Proper syntax

var express = require('express'),//requiring is loading the code from the express module
  router = express.Router(),//router object will manage routes
   mongoose = require('mongoose');//Imports exam model. Requiring is loading the code from the mongoose module that was installed
    var Newexam = mongoose.model('Exam2');//assigning a variable to the schema that was described in models

module.exports = function (app, config) {//passes the express and the config objects
    app.use('/api', router);//Middleware that starts at api and will redirect appropriately based on the methods
    
    router.get('/exam2', function(req, res,next){
        console.log('Get all documents','verbose');
        var query = Newexam.find()//creating a new query object with the newexam's find method
        .then(result => {
         	if(result && result.length) {
			res.status(200).json(result);//will parse result data 
		} else {
			res.status(404).json({message: "No documents"});
		}
        })
        .catch(err => {
          return next(err);
        });
    });//when a get request is made to the homepage, it will return a 404. If there is an error in the query it will redirect to error handler 
    
    router.post('/exam2',function(req,res,next){
        console.log('Create document', 'verbose');
        var newexam = new Newexam(req.body);//creates a new exam model based on the data sent in the request
        newexam.save()//save the newexam and send back to the user if no error
        .then(result => {
            res.status(201).json(result);
        })
        .catch( err => {
           return next(err);//send to error handlers
        });
  
    });

    
};//Allows users to create a json document in the database
// })();