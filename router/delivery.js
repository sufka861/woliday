const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.status(200).json({
        message: "Get all delivery points"
    });
});

router.get('/:squad_id', (req, res)=>{
    res.status(200).json({
        message: "Get delivery points by squad_id"
    });
});



module.exports = router;