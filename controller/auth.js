const User = require("../models/user");
const bcrypt = require("bcrypt");
const mailValidator = require('email-validator');
const mongoose = require("mongoose");


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
            res.status(200).json({
                message: "You are logged in!",
            })
        } catch (err) {
            res.status(401).json({message: err.message });
        }
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
