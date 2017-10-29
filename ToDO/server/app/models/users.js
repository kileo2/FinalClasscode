var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var usersSchema = new Schema({
    firstName: { type: String , required:true},
    lastName: { type: String, required:true},
    status:{type:Boolean, default:true},
    email: {type: String, required :true, unique:true},
    password :{ type:String, required:true},
    registerDate: { type: Date, default: Date.now }  
});


module.exports = 
 Mongoose.model('User', usersSchema);

