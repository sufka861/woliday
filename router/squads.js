const express = require('express');
const router = express.Router();
const {
    getAllSquads,
    getSquadById,
    createSquad,
    updateSquad,
    deleteSquad,
} = require('../controller/squads');

router.get('/', getAllSquads);
router.get('/:squadId', getSquadById);
router.post('/', createSquad);
router.put('/:squadId', updateSquad);
router.delete('/:squadId', deleteSquad);
module.exports = router;