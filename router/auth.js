const express = require('express');
const router = express.Router();

const {login, logout, register} = require('../controller/auth');

router.post('/login',login);
router.post('/register', register)
router.get('/logout', logout)

module.exports = router;
