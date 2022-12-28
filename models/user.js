const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : { type : String, required : true },
    email : { type : String, required : true },
    tel : { type : String },
    password : { type : String, required : true },
    role : { type : String, default : "volunteer" },
});

module.exports = mongoose.model('User', userSchema);