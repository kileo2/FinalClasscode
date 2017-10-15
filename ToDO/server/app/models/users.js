var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var usersSchema = new Schema({
    fname: { type: String , required:true},
    lname: { type: String},
    status:{type:Boolean},
    email: {type: String},
    password :{ type:String, required:true},
    registerDate: { type: Date, default: Date.now }  
});

/* var todosschema = new Schema({
    userid: { type: Schema.Types.ObjectId, required:true },
    todo: { type: String, required:true},
    description:{type:String},
    dateCreated: {type: Date, default:Date.now},
    dateDue :{ type:Date, default:Date.now},
    completed: { type: Boolean, default: Boolean.false },
    file: {filename:String, originalName:String}
}); */

module.exports = 
 Mongoose.model('User', usersSchema);

