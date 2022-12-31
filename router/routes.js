const express = require('express');
const router = express.Router();

const {getRoute} = require('../controller/routes');
const {getSquadById} = require("../controller/squads");

router.get('/:squadId',getSquadById,getRoute);



module.exports = router;