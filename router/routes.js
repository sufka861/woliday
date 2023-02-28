const express = require('express');
const router = express.Router();

const {
    getRoute,
    defineFamilies,
    delFamily,
    countFamily,} = require('../controller/routes');

router.get('/',getRoute);
router.post('/',defineFamilies);
router.get('/count',countFamily);
router.delete('/',delFamily);


module.exports = router;
