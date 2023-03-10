const mongoose = require('mongoose');
const squadsModel = require('../models/squads');
const User = require('../models/user');
const Family = require('../models/families');
// const Squads = require("../models/squads");
const axios = require("axios");
const {sendEmailEvent} = require("../sendEmail/sendEmail");

// JUST FOR DEBUG
const deleteAllSquads = async () => {
    await squadsModel.deleteMany({}).then(() => {
        console.log("deleted all squads from DB");
    }).catch(error => {
        console.log({error})
    })
}

const updateUser = async (user_id, squad_id) => {
    User.userModel.findOneAndUpdate({ _id: user_id.toString() }, { squad_id : squad_id.toString() }, (error, user) => {
        if (error) {
            return({ error });
        }
    });
}

const updateUsersSquadId = async (allSquads) => {
    // const squads = await squadsModel.find({});
    allSquads.forEach((squad) => {
        const squadId = squad._id;
        const driver = squad.driver;
        const volunteer = squad.volunteer;
        const volunteer2 = squad.volunteer2;
        const usersToUpdate = [driver, volunteer, volunteer2];
        usersToUpdate.forEach((user) => {
            const response = updateUser(user._id, squadId);
            sendEmailEvent(user,squad);
        })
    });
}

const groupUsersIntoSquads = async () => {
    let i = 65;
    const result = deleteAllSquads();
    const users = await User.userModel.find({});
    const drivers = users.filter((user) => {
        return user.role === "driver";
    })
    const nonDrivers = users.filter((user) => {
        return user.role === "volunteer";
    })
    let allSquads = [];
    drivers.forEach((driver) => {
        const squad = new squadsModel({
            name: String.fromCharCode(i),
            _id: new mongoose.Types.ObjectId(),
            driver: driver,
            volunteer: nonDrivers.pop(),
            volunteer2: nonDrivers.pop()
        })
        i++;
        squad.save()
        allSquads.push(squad);
    })
    const response = updateUsersSquadId(allSquads);
}

// const result = groupUsersIntoSquads();

const groupFamiliesIntoSquads = async () => {
    let families = await Family.familyModel.find({});
    const numOfFamilies = families.length;
    const squads = await squadsModel.find({});
    const numOfSquads = squads.length;
    const numOfFamiliesPerSquad = numOfFamilies / numOfSquads;
    squads.forEach (async (squad) => {
        for (let i = 0; i < numOfFamiliesPerSquad; i++) {
            const family = families.pop();
            const result = await squadsModel.updateOne({_id: squad._id}, {$push : {families: family}});
       }
    })
}
// const result = groupFamiliesIntoSquads();

//
//
// deleteAllSquads();


module.exports = {groupUsersIntoSquads, groupFamiliesIntoSquads}
