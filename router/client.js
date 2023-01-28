const express = require('express');
const clientController = require('../controller/client.controller');
const client = express.Router();

client.get('*', clientController.loadPage);

module.exports = client

