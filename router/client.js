const express = require('express');
const clientController = require('../controller/client.controller');
const client = express.Router();
// const sneat = express.Router();

client.get('*', clientController.loadPage);
// sneat.get('*', clientController.loadPage);

module.exports = client
// {
//     client,
//     // sneat
// };
