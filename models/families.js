const mongoose = require('mongoose');


const familySchema = mongoose.Schema({
    // _id : mongoose.Schema.Types.ObjectId,
    contactName : { type : String, required : true },
    contactPhoneNumber : { type : String, required : true },
    city : { type : String, required : true },
    street : { type : String, required : true },
    houseNumber : { type : Number, required : true },
    extra : { type : String },
    location: {type: String}, // (32.XXX , 34.XXXX)
});

const familyModel = mongoose.model('Families', familySchema);
module.exports = {
    familyModel,
    familySchema
}
