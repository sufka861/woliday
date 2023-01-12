const mongoose = require('mongoose');

const familySchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
/*    squad_id : mongoose.Schema.Types.ObjectId,*/
    contactName : { type : String, required : true },
    contactPhoneNumber : { type : String, required : true },
    city : { type : String, required : true },
    street : { type : String, required : true },
    houseNumber : { type : Number, required : true },
    extra : { type : String },
    location: {type: String},
});

const familyModel = mongoose.model('Families', familySchema);
module.exports = {
    familyModel,
    familySchema
}
