const mongoose = require('mongoose');
const User = require('../models/user');
const Families = require('../models/families');

const squadSchema = mongoose.Schema({
    // _id : mongoose.Schema.Types.ObjectId,
    driver : { type : User.userSchema },
    volunteer : { type : User.userSchema },
    volunteer2 : { type : User.userSchema },
    families : [Families.familySchema],
    finished : {type: Boolean}
});
const squadsModel = mongoose.model('Squads', squadSchema);
module.exports = squadsModel;