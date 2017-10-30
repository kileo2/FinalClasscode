var path = require('path'),//working with path module. Provides utilities for working with file or directory paths  
rootPath = path.normalize(__dirname + '/..'),    
env = process.env.NODE_ENV || 'development';//if there are multiple environments, it can determine which port to listen in on

var config = {  
development: {    
            root: rootPath,    
            app: {      name: 'Exam2'    },    
            port: 5000,//port number where server will listen 
            db: 'mongodb://127.0.0.1/exam2-dev'//folder for where the data will be stored. Creates a new folder
         
 }
 };

module.exports = config[env];//Exports config determined by the env variable