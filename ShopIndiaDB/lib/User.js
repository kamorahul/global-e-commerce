var mongoose = require('mongoose');

var user =  mongoose.Schema({
    username : String,
    password : String,
    userId:String,
    userType:String

})


module.exports = user