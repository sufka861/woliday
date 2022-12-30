const mongoose = require('mongoose');
const Squads = require('../models/squads');

module.exports = {
    getAllSquads: (req, res) => {
        Squads.find().then((squads) => {
            res.status(200).json({
                squads
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
    },
    getSquadById: (req, res) => {
        const squad_id = req.params.squadId;
        Squads.findById(squad_id).then((squad) => {
            res.status(200).json({
                squad
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
    },
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
        const squad_id = req.params.squadId;
        Squads.updateOne({_id: squad_id}, req.body).then(() => {
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
        const squad_id = req.params.squadId;
        Squads.remove({_id : squad_id}).then(()=>{
            res.status(200).json({
                message: `delete squad by id: ${squad_id}`
            })
        }).catch(error =>{
            res.status(500).json({
                error
            })
        })
    }
}