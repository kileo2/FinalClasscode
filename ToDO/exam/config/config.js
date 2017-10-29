var path = require('path'),    
rootPath = path.normalize(__dirname + '/..'),    
env = process.env.NODE_ENV || 'development';

var config = {  
development: {    
            root: rootPath,    
            app: {      name: 'Exam'    },    
            port: 3600, 
            db: 'mongodb://127.0.0.1/exam-dev'
         
 }
 };

module.exports = config[env];