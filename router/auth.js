const express = require('express');
const router = express.Router();

const {login, logout, register, check} = require('../controller/auth');

router.post('/login',login);
router.post('/register', register)
router.get('/logout', logout)
router.get('/check', check)

module.exports = router;
