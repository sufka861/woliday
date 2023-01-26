const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    tel: {type: String},
    password: {type: String, required: true},
    role: {type: String, default: "none"},
    squad_id: {type: String, default: "null"}
});

const userModel = mongoose.model('User', userSchema);

module.exports = {
    userModel,
    userSchema
}