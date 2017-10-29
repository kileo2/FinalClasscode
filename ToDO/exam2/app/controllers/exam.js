// (function (){
    
//     'use strict'; //This enforces Proper syntax

var express = require('express'),
  router = express.Router(),
   mongoose = require('mongoose');
    var Newexam = mongoose.model('Exam2');

module.exports = function (app, config) {
    app.use('/api', router);
    
    router.get('/exam2', function(req, res,next){
        console.log('Get all documents','verbose');
        var query = Newexam.find()
        .then(result => {
         	if(result && result.length) {
			res.status(200).json(result);
		} else {
			res.status(404).json({message: "No documents"});
		}
        })
        .catch(err => {
          return next(err);
        });
    });
    
    router.post('/exam2',function(req,res,next){
        console.log('Create document', 'verbose');
        var newexam = new Newexam(req.body);
        newexam.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch( err => {
           return next(err);
        });
  
    });

    
};
// })();