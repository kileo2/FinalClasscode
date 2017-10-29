// (function (){
    
//     'use strict';

// var express = require('express'),
//   router = express.Router(),
//   logger = require('../../config/logger');
//    var mongoose = require('mongoose');
//     var ToDo = mongoose.model('ToDo');

// module.exports = function (app, config) {
// 	app.use('/api', router);
//     router.get('/todos/user/:userId', function(req, res,next){
//         logger.log('Get all todo lists for a user','verbose');
//         var query = ToDo.find()
//         .sort(req.query.order)
//         .exec()
//         .then(result => {
//          	if(result && result.length) {
// 			res.status(200).json(result);
// 		} else {
// 			res.status(404).json({message: "No todo list"});
// 		}
//         })
//         .catch(err => {
//           return next(err);
//         });
//     });
    
//     router.get('/todos/:todoId', function(req, res, next){
//         logger.log('Get todo with id todoId' + req.params.id, 'verbose');
    
//         ToDo.findById(req.params.todoId)
//                     .then(ToDo => {
//                         if(ToDo){
//                             res.status(200).json(ToDo);
//                         } else {
//                             res.status(404).json({message: "No todo found"});
//                         }
//                     })
//                     .catch(error => {
//                         return next(error);
//                     });
//             }); 
         
   

//     router.post('/todos',function(req,res,next){
//         logger.log('Create todo', 'verbose');
//         var todo = new todo(req.body);
//         todo.save()
//         .then(result => {
//             res.status(201).json(result);
//         })
//         .catch( err => {
//            return next(err);
//         });
  
//     });

//     router.put('/todos/:todoId', function(req, res, next){
//         logger.log('Update todo' + req.params.id, 'verbose');
    
//         ToDo.findOneAndUpdate({_id: req.params.todoId}, 		req.body, {new:true, multi:false})
//                 .then(ToDo => {
//                     res.status(200).json(todo);
//                 })
//                 .catch(error => {
//                     return next(error);
//                 });
//         }); 
         
    

//     router.delete('/todos/:todoId', function(req, res, next){
//         logger.log('Delete todo' + req.params.id, 'verbose');
    
//         ToDo.remove({ _id: req.params.todoId })
//                 .then(ToDo => {
//                     res.status(200).json({msg: "todo Deleted"});
//                 })
//                 .catch(error => {
//                     return next(error);
//                 });
     
         

//         /*  router.post('/login', function(req, res, next){
//             console.log(req.body);
//             var email = req.body.email;
//             var password = req.body.password;
      
//             var obj = {'email' : email, 'password' : password};
//           res.status(201).json(obj);
//       });  */
      
//     });

// };
// })();

(function (){
    
    'use strict';

var express = require('express'),
  router = express.Router(),
  logger = require('../../config/logger');
   var mongoose = require('mongoose');
    var ToDo = mongoose.model('ToDo');

module.exports = function (app, config) {
    app.use('/api', router);
    
    router.get('/todos/user/:userId', function(req, res,next){
        logger.log('Get all users','verbose');
        var query = ToDo.find()
        .sort(req.query.order)
        .exec()
        .then(result => {
         	if(result && result.length) {
			res.status(200).json(result);
		} else {
			res.status(404).json({message: "No todo"});
		}
        })
        .catch(err => {
          return next(err);
        });
    });
    
    // router.get('/todos/user/:userId', function(req, res, next){
    //     logger.log('Get todos' + req.params.id, 'verbose');
    
    //     ToDo.findById(req.params.userId)
    //                 .then(todo => {
    //                     if(todo){
    //                         res.status(200).json(todo);
    //                     } else {
    //                         res.status(404).json({message: "No todo found"});
    //                     }
    //                 })
    //                 .catch(error => {
    //                     return next(error);
    //                 });
    //         }); 

    router.get('/todos/:todoId', function(req, res, next){
        logger.log('Get todo' + req.params.id, 'verbose');
    
        ToDo.findById(req.params.todoId)
                    .then(todo => {
                        if(todo){
                            res.status(200).json(todo);
                        } else {
                            res.status(404).json({message: "No todo found"});
                        }
                    })
                    .catch(error => {
                        return next(error);
                    });
            }); 
         
   

    router.post('/todos',function(req,res,next){
        logger.log('Create todo', 'verbose');
        var todo = new ToDo(req.body);
        todo.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch( err => {
           return next(err);
        });
  
    });

    router.put('/todos/:todoId', function(req, res, next){
        logger.log('Update todo' + req.params.id, 'verbose');
    
        ToDo.findOneAndUpdate({_id: req.params.todoId}, 		req.body, {new:true, multi:false})
                .then(todo => {
                    res.status(200).json(todo);
                })
                .catch(error => {
                    return next(error);
                });
        }); 
         
    

    router.delete('/todos/:todoId', function(req, res, next){
        logger.log('Delete todo' + req.params.id, 'verbose');
    
        ToDo.remove({ _id: req.params.todoId })
                .then(todo => {
                    res.status(200).json({msg: "todo Deleted"});
                })
                .catch(error => {
                    return next(error);
                });
     
         

    //     router.post('/login', function(req, res, next){
    //         console.log(req.body);
    //         var email = req.body.email;
    //         var password = req.body.password;
      
    //         var obj = {'email' : email, 'password' : password};
    //       res.status(201).json(obj);
    //   });
      
    });

};
})();

