const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {type: String},
    email: {type: String, required: true},
    tel: {type: String},
    password: {type: String, required: true},
    role: {type: String, default: "none"},
    squad_id: {type: String, default: "null"},
    img: {type: String, default: "https://cdn-icons-png.flaticon.com/512/64/64572.png"},
});

const userModel = mongoose.model('User', userSchema);

module.exports = {
    userModel,
    userSchema
}
