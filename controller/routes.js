const Squads = require('../models/squads');
const Families = require('../models/families');
const fs = require('fs');
const json5 = require("json5");
const iconv = require('iconv-lite');
const Family = require("../models/families");

module.exports = {
    getRoute: async (req, res) => {
        let squad, families, outputArray, outputArray2;
        try {
            squad = await Squads.findById(req.session.data.squad_id);
            families = squad.families;
            if (squad === undefined || families === undefined) {
                throw new Error("problem getting squad id")
            }
        } catch (e) {
            res.status(404);
        }
        try {
            outputArray = families.reduce((accumulator, currentValue) => {
                return [
                    ...accumulator,
                    {
                        lat: parseFloat(currentValue.location.split(',')[0]),
                        lng: parseFloat(currentValue.location.split(',')[1]),
                    }
                ];
            }, []);
            if (!outputArray) {
                throw new Error("problem getting femilies and locations")
            }
            outputArray2 = families.reduce((accumulator, currentValue) => {
                return [
                    ...accumulator,
                    {
                        name: currentValue.contactName,
                        phoneNumber: currentValue.contactPhoneNumber,
                        city: currentValue.city,
                        street: currentValue.street,
                        houseNumber: currentValue.houseNumber,
                        notes: currentValue.extra,
                    }
                ];
            }, []);
            res.json({locations: outputArray, families: outputArray2});
        } catch (e) {
            res.status(404);
        }
    },
    defineFamilies: (req, res) => {
        Families.familyModel.deleteMany({});
        let f;
        fs.readFile('data/families.json', async (err, data) => {
            if (err) throw err;
            let family = JSON.parse(Buffer.from(data).toString('utf8'));
            console.log(family.length)
            for (let i = 0; i < family.length; i++) {
                f = new Families.familyModel({
                    contactName: family[i].contactName,
                    contactPhoneNumber: family[i].contactPhoneNumber,
                    city: family[i].city,
                    street: family[i].street,
                    houseNumber: family[i].houseNumber,
                    location: family[i].location
                })
                await f.save()
            }
        });

    },
    countFamily: (req, res) => {
        const {contactName} = req.body;
        Family.familyModel.countDocuments({contactName: contactName}).then((number) => {
            res.status(200).json({
                number
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
    },

    delFamily: (req, res) => {
        const {contactName, numberToDelete} = req.body;
        Family.familyModel.find({contactName: contactName}).limit(numberToDelete).then((docs) => {
            docs.forEach((doc) => {
                Family.familyModel.deleteOne({contactName: contactName}, (err) => {
                    if (err) {
                        res.status(500).json({
                            error
                        })
                    }
                    else {
                        res.status(200)
                    }
                })
                res.end()
            });
        });
    }
}


