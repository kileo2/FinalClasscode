var path = require('path'),    
rootPath = path.normalize(__dirname + '/..'),    
env = process.env.NODE_ENV || 'development';

var config = {  
development: {    
            root: rootPath,    
            app: {      name: 'Exam2'    },    
            port: 3500, 
            db: 'mongodb://127.0.0.1/exam2-dev'
         
 }
 };

module.exports = config[env];