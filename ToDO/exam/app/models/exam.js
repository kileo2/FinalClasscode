var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var examschema = new Schema({
    firstName: { type: String , required:true},
    lastName: { type: String, required:true}
});

module.exports = 
Mongoose.model('Exam', examschema)