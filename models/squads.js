const mongoose = require('mongoose');
const User = require('../models/user');
const {familySchema} = require('../models/families');

const squadSchema = mongoose.Schema({
    driver : { type : User.userSchema },
    volunteer : { type : User.userSchema },
    volunteer2 : { type : User.userSchema },
    families : [familySchema],
    finished: { type: Boolean, default: false }
});
const squadsModel = mongoose.model('Squads', squadSchema);
module.exports = squadsModel;
