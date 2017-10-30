var Mongoose = require('mongoose');//Require will load the code from the module mongoose. Assigning a variable.
var Schema = Mongoose.Schema;//

var examschema2 = new Schema({//creating a new schema
    firstName: { type: String , required:true},//column with firstnames
    lastName: { type: String, required:true}//column with lastnames
});//describing what fields are in the schema

module.exports = 
Mongoose.model('Exam2', examschema2)//creates and exports the model