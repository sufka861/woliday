const mongoose = require('mongoose');
const Squads = require('../models/squads');
const {groupUsersIntoSquads, groupFamiliesIntoSquads} = require('../logic/squad.grouping.logic');
const {sendEmail, sendEmailEvent} = require("../sendEmail/sendEmail");

module.exports = {
    getAllSquads: (req, res) => {
        if (req.session.data.role === 'volunteer' || req.session.data.role === 'driver'){
            Squads.findById(req.session.data.squad_id).then((squad) => {
                return res.status(200).json({
                    squad
                })
            }).catch(error => {
                res.status(500).json({
                    error
                })
            });
        }
        if (req.session.data.role === 'admin'){
            Squads.find().then((squad) => {
                res.status(200).json({
                    squad
                })
            }).catch(error => {
                res.status(500).json({
                    error
                })
            });
        }
        },
    groupSquads: (req, res) => {
        const result = groupUsersIntoSquads();
        res.status(200).json({
            "msg":"Grouped all into squads"
        })
    },
    groupFamilies: (req, res) => {
        const result = groupFamiliesIntoSquads();
        res.status(200).json({
            "msg":"Grouped families into squads"
        })
    },
/*    getSquadById: (req, res,next) => {
        const squad_id = req.params.squadId;
        Squads.findById(squad_id).then((squad) => {
            return res.status(200).json({
                squad
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
    },*/
    createSquad: (req, res) => {
        const { driver, volunteer, volunteer2, families} = req.body;
        const squad = new Squads({
            _id: new mongoose.Types.ObjectId(),
            driver,
            volunteer,
            volunteer2,
            families
        });
        squad.save().then(() => {
            res.status(200).json({
                message: `Created new squad`
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
    },
    updateSquad: (req, res) => {
        let updateFields;
        const squad_id = req.session.data.squad_id;
        if (req.body.families){
            updateFields = {$push: req.body}
        }else {
            updateFields = req.body;
        }
        Squads.updateOne({_id: squad_id}, updateFields).then(() => {
            res.status(200).json({
                message: `update squad by id: ${squad_id}`
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        })
    },
    deleteSquad: (req, res) => {
        const squad_id = req.session.data.squad_id;
        Squads.remove({_id : squad_id}).then(()=>{
            res.status(200).json({
                message: `delete squad by id: ${squad_id}`
            })
        }).catch(error =>{
            res.status(500).json({
                error
            })
        })
    },
    getSquads: (req, res) => {
        let {key, value} = req.params;
        Squads.find({ [key]: value }).then((squads) => {
            console.log(squads)
            res.status(200).json({
                squads
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
    },
}
