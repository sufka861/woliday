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
        const user_id = req.body.params.userId;
        res.status(200).json({
            message: `Get user by id ${user_id}`
        })
    },
    createUser: (req, res) => {
        const {name, email, tel, password, role} = req.body;
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            name,
            email,
            tel,
            password,
            role
        });
        user.save().then(() => {
            res.status(200).json({
                message: "Created new user"
            })
        }).catch(error => {
                res.status(500).json({
                    error
                })
            });
    },
    updateUser: (req, res) => {
        const user_id = req.body.params.userId;
        res.status(200).json({
            message: `update user by id: ${user_id}`
        })
    },
    deleteUser: (req, res) => {
        const user_id = req.body.params.userId;
        res.status(200).json({
            message: `delete user by id: ${user_id}`
        })
    }
}