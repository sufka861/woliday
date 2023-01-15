const Squads = require('../models/squads');

module.exports = {
        getRoute: async (req, res) => {
            const squad = await Squads.findById(req.params.squadId);
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
        }

}


