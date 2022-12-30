const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = {
    getAllUsers: (req, res) => {
        User.find().then((users) => {
            res.status(200).json({
                users
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
    },
    getUserById: (req, res) => {
        const user_id = req.params.userId;
        User.findById(user_id).then((user) => {
            res.status(200).json({
                user
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
    },
    createUser: (req, res) => {
        const {name, email, tel, password, role, squad_id} = req.body;
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            name,
            email,
            tel,
            password,
            role,
            squad_id
        });
        user.save().then(() => {
            res.status(200).json({
                message: `Created new user: ${name}`
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
    },
    updateUser: (req, res) => {
        const user_id = req.params.userId;
        User.updateOne({_id: user_id}, req.body).then(() => {
            res.status(200).json({
                message: `update user by id: ${user_id}`
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        })
    },
    deleteUser: (req, res) => {
        const user_id = req.params.userId;
        User.remove({_id : user_id}).then(()=>{
            res.status(200).json({
                message: `delete user by id: ${user_id}`
            })
        }).catch(error =>{
            res.status(500).json({
                error
            })
        })
    }
}