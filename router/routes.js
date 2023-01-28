const express = require('express');
const router = express.Router();

const {getRoute} = require('../controller/routes');

router.get('/',getRoute);

module.exports = router;
