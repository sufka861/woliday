const mongoose = require('mongoose');
const Squads = require('../models/squads');
const Family = require('../models/families');

module.exports = {
        getRoute: async (req, res) => {
            const squad = await Squads.findById(req.params.squadId);
            const families = squad.families;
            const outputArray = families.reduce((accumulator, currentValue) => {
                return [
                    ...accumulator,
                    {
                        city: currentValue.city,
                        street: currentValue.street,
                        houseNumber: currentValue.houseNumber
                    }
                ];
            }, []);

        }

}


