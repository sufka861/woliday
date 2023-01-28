const mongoose = require('mongoose');
const squadsModel = require('../models/squads');
const User = require('../models/user');
const Family = require('../models/families');

const groupUsersIntoSquads = async () => {
    const users = await User.userModel.find({});
    const drivers = users.filter((user) => {
        return user.role === "driver";
    })
    const nonDrivers = users.filter((user) => {
        return user.role === "volunteer";
    })
    drivers.forEach((driver) => {
        const squad = new Squads({
            _id: new mongoose.Types.ObjectId(),
            driver: driver,
            volunteer: nonDrivers.pop(),
            volunteer2: nonDrivers.pop()
        })
        squad.save()
    })
}

const groupFamiliesIntoSquads = async () => {
    const families = await Family.familyModel.find({});
    const numOfFamilies = families.length;
    const squads = await squadsModel.find({});
    const numOfSquads = squads.length;
    const numOfFamiliesPerSquad = numOfFamilies / numOfSquads;
    squads.forEach((squad) => {
        let families_per_squad = [];
        for (let i = 0; i < numOfFamiliesPerSquad; i++) {
            families_per_squad.push(families.pop())
        }
        squadsModel.findByIdAndUpdate({_id: squad._id}, {$set: {families: families_per_squad}})
        console.log(squad.families);

    })
    // console.log(squads)
}
// ADD MODULU TO TAKE CARE OF EDGE CASE EXTRA FAMILIES

module.exports = {groupUsersIntoSquads, groupFamiliesIntoSquads}