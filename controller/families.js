const mongoose = require('mongoose');
const Family = require('../models/families');

module.exports = {
    getFamilies: (req, res) => {
        Family.familyModel.find().then((families) => {
            res.status(200).json({
                families
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
    },
    getFamilyById: (req, res) => {
        const family_id = req.params.familyId;
        Family.familyModel.findById(family_id).then((family) => {
            res.status(200).json({
                family
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
    },
}
