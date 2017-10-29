(function (){
    
    'use strict'; //This enforces Proper syntax

var express = require('express'),
  router = express.Router(),
   mongoose = require('mongoose');
    var Exam = mongoose.model('Exam');

module.exports = function (app, config) {
    app.use('/api', router);
    
    router.get('/exam', function(req, res,next){
        logger.log('Get all documents','verbose');
        var query = Exam.find()
        .sort(req.query.order)
        .exec()
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
    
    router.post('/exam',function(req,res,next){
        logger.log('Create document', 'verbose');
        var exam = new Exam(req.body);
        exam.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch( err => {
           return next(err);
        });
  
    });

    
};
})();