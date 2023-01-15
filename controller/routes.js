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
            res.json(outputArray);
        }

}


