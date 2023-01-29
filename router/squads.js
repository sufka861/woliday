const express = require('express');
const router = express.Router();
const {
    getAllSquads,
    // getSquadById,
    createSquad,
    updateSquad,
    deleteSquad,
    getSquads,
    send,
    groupSquads,
    groupFamilies
} = require('../controller/squads');

router.get('/', getAllSquads);
router.get('/:key/:value', getSquads);
//router.get('/:squadId', getSquadById);
router.post('/', createSquad);
router.get('/groupSquads', groupSquads);
router.get('/groupFamilies', groupFamilies);
router.put('/', updateSquad);
router.get('/getS', send)
router.delete('/:squadId', deleteSquad);
module.exports = router;
