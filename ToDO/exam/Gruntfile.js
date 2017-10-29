module.exports = function(grunt) {
    
      // Project configuration.
      grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
    
        env : {
          dev : {
            NODE_ENV : 'development'
          }
        },//working in development environment. Sets environment variables
        nodemon: {
            dev: { script: 'index.js' }
        },//loads the node whenever any changes are made
        jshint: {
            options: {
              reporter: require('jshint-stylish'),
              esversion: 6
            },
             all: ['index.js','Gruntfile.js', 'config/*.js', 'app/controllers/*.js']
           },
       
      
      });
    
      grunt.loadNpmTasks('grunt-env');
      grunt.loadNpmTasks('grunt-contrib-nodemon');
      grunt.loadNpmTasks('grunt-contrib-jshint');
      
      
    
      grunt.registerTask('default',  [
          'env:dev','jshint','nodemon', 
      ]);
       grunt.registerTask('production',  [
          'env:production'
       ]);
    
    };