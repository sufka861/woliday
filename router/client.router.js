const express = require('express');
const clientController = require('../controller/client.controller');
const clientRouter = new express.Router();

clientRouter.get('*', clientController.loadPage);

module.exports = {
    clientRouter
}