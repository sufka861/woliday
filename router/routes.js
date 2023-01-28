const express = require('express');
const router = express.Router();

const {getRoute,defineFamilies} = require('../controller/routes');

router.get('/',getRoute);
router.post('/',defineFamilies);


module.exports = router;
