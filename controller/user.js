const mongoose = require('mongoose');
const User = require('../models/user');
const moment = require('moment');
const bcrypt = require("bcrypt");

module.exports = {
    getAllUsers: (req, res) => {
        User.userModel.find().then((users) => {
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
        User.userModel.findById(user_id).then((user) => {
            res.status(200).json({
                user
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
    },
    createUser: async (req, res) => {
        const {name, email, tel, password} = req.body;

        try{
            const oldUser = await User.userModel.findOne({email})
            if(oldUser)
                throw new Error('User already exists');
        }catch(error){
            res.status(401).json({message: error.message});
            return;
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User.userModel({
                _id: new mongoose.Types.ObjectId(),
                name,
                email,
                tel,
                password : hashedPassword,
            });

            user.save().then(() => {
                res.status(201).json({
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
        User.userModel.updateOne({_id: user_id}, req.body).then(() => {
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
        User.userModel.remove({_id : user_id}).then(()=>{
            res.status(200).json({
                message: `delete user by id: ${user_id}`
            })
        }).catch(error =>{
            res.status(500).json({
                error
            })
        })
    },
    signUpToEvent: (req, res) => {
        const date = process.env.EVENTE_DATE;
        const lestDate = date.subtract(1, 'week');
        if(lestDate.getTime() < date.getTime()){
            res.status(500).json({
                message: 'The registration date has closed'
        })
        }
        User.userModel.updateOne({_id: req.session.data.email}, req.body).then(() => {
            res.status(200).json({
                message: `update user by id: ${user_id}`
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        })
    }
}
