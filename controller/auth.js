const User = require("../models/user");
const bcrypt = require("bcrypt");
const mailValidator = require('email-validator');
const mongoose = require("mongoose");
const {response} = require("express");
const {userModel} = require("../models/user");


module.exports = {
    login: async (req, res) => {
        try {
            const { email, password} = req.body;

            if (!(email && password)) throw new Error("All input is required");
            if (!mailValidator.validate(email)) throw new Error('email not valid');

            const user = await User.userModel.findOne({ email } );
            if (!user) throw new Error("User does not exist");

            const correctPassword = await bcrypt.compare(password, user.password);
            if (!correctPassword) throw new Error("Incorrect password");

            req.session.data = user
            res.cookie('name',user.name);
            res.cookie('role', user.role);
            res.cookie('img', user.img);
            res.status(200).json({
                message: "You are logged in!",
               })
        } catch (err) {
            res.status(401).json({message: err.message });
        }
    },
    register: async (req, res) => {
        try {
            const { email, password, phone, name } = req.body;
            if (!(email && password && phone && name)) {
                throw new Error("All input is required");
            }
            if (!mailValidator.validate(email)) {
                throw new Error("Email not valid");
            }
            const existingUser = await User.userModel.findOne({ email });
            if (existingUser) {
                throw new Error("Email already in use");
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User.userModel({
                email,
                password: hashedPassword,
                phone,
                name,
            });

            const savedUser = await newUser.save();

            req.session.data = savedUser;
            res.status(200).json({
                message: "User created",
            });
        } catch (err) {
            res.status(401).json({ message: err.message });
        }
    },
    check: async (require,response) =>{
        const user = await User.userModel.find({});
        response.status(200).json(user);
    },

    logout: async (req, res) =>{
        req.session.destroy((err) => {
            if(err) {
                res.send({ message: "Error while destroying session"});
            } else {
                res.clearCookie('name');
                res.clearCookie('role');
                res.clearCookie('userId');
                res.send({ message: "Session destroyed"});
            }
        });
    },
}
