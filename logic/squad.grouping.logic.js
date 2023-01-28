const mongoose = require('mongoose');
const squadsModel = require('../models/squads');
const User = require('../models/user');
const Family = require('../models/families');
const Squads = require("../models/squads");
const axios = require("axios");

const updateUser = async (user_id, squad_id) => {
    User.userModel.findOneAndUpdate({ _id: user_id.toString() }, { squad_id : squad_id.toString() }, (error, user) => {
        if (error) {
            return({ error });
        }
    });
}

const updateUsersSquadId = async () => {
    const squads = await squadsModel.find({});
    squads.forEach((squad) => {
        const squadId = squad._id;
        const driver = squad.driver;
        const volunteer = squad.volunteer;
        const volunteer2 = squad.volunteer2;
        const usersToUpdate = [driver, volunteer, volunteer2];
        usersToUpdate.forEach((user) => {
            const response = updateUser(user._id, squadId);
            //SEND EMAIL to user with invite
        })
    });
}

const groupUsersIntoSquads = async () => {
    const users = await User.userModel.find({});
    const drivers = users.filter((user) => {
        return user.role === "driver";
    })
    const nonDrivers = users.filter((user) => {
        return user.role === "volunteer";
    })
    drivers.forEach((driver) => {
        const squad = new squadsModel({
            _id: new mongoose.Types.ObjectId(),
            driver: driver,
            volunteer: nonDrivers.pop(),
            volunteer2: nonDrivers.pop()
        })
        squad.save()
    })
    const response = updateUsersSquadId();
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
}

//JUST FOR DEBUG
// const deleteAllSquads = () => {
//     Squads.deleteMany({}).then(() => {
//         console.log("deleted all squads from DB");
//     }).catch(error => {
//         console.log({error})
//     })
// }
// deleteAllSquads();


module.exports = {groupUsersIntoSquads, groupFamiliesIntoSquads}