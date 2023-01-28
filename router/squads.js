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
} = require('../controller/squads');

router.get('/', getAllSquads);
router.get('/:key/:value', getSquads);
//router.get('/:squadId', getSquadById);
router.post('/', createSquad);
router.put('/', updateSquad);
router.get('/getS', send)
router.delete('/:squadId', deleteSquad);
module.exports = router;
