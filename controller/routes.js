const Squads = require('../models/squads');
const Families = require('../models/families');
const fs = require('fs');
const json5 = require("json5");
const iconv = require('iconv-lite');

module.exports = {
        getRoute: async (req, res) => {
            console.log("PPPPPPP")
            const squad = await Squads.findById(req.session.data.squad_id);
            const families = squad.families;
            const outputArray = families.reduce((accumulator, currentValue) => {
                return [
                    ...accumulator,
                    {
                        lat: parseFloat(currentValue.location.split(',')[0]),
                        lng: parseFloat(currentValue.location.split(',')[1]),
                    }
                ];
            }, []);
            const outputArray2 = families.reduce((accumulator, currentValue) => {
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
            res.json({locations: outputArray,families: outputArray2});
        },
        defineFamilies: (req, res) => {
            Families.familyModel.deleteMany( {});
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

        }
}
