const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.status(200).json({
        message: "Get all delivery points"
    });
});

router.get('/:squadId', (req, res)=>{
    res.status(200).json({
        message: "Get delivery points by squadId"
    });
});


module.exports = router;