const User = require("../models/user");
const bcrypt = require("bcrypt");
const mailValidator = require('email-validator');
const mongoose = require("mongoose");


module.exports = {
    login: async (req, res) => {
        try {
            const { email, password} = req.body;
            authValidator(req.body);

            const user = await User.userModel.findOne({ email } );
            if (!user) throw new Error("User does not exist");

            const correctPassword = await bcrypt.compare(password, user.password);
            if (!correctPassword) throw new Error("Incorrect password");

            req.session.user = user;

            return res.status(200).json({
                message: "You are logged in!",
            })
        } catch (err) {
            res.status(401).json({message: err.message });
        }
    },

    register : async (req, res) =>{
        try {
            authValidator(req.body);
            const hashedPassword = await bcrypt.hash(req.body.password, 12);
            const user = { ...req.body, password: hashedPassword };
          const newUser =  new User.userModel({user});
            newUser.save().then(() => {
                res.status(200).json({
                    message: `Created new user: ${name}`
                })
            }).catch(error => {
                res.status(500).json({
                    error
                })

                return res.status(200).json({
                    message: "user added successfully!"
                });
            })
        }catch (err) {
            res.status(400).json({ message: "Register unsuccessful..." });
        }
        },

    logout: async (req, res) =>{
        req.session.destroy((err) => {
            if(err) {
                res.send({ message: "Error while destroying session"});
            } else {
                res.send({ message: "Session destroyed"});
            }
        });
    }
}

const authValidator = (data) => {
    if (!(data.email && data.password)) throw new Error("All input is required");
    if (!mailValidator.validate(data.email)) throw new Error('email not valid');
}
