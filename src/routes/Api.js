const Express = require('express');
const Mongoose = require('mongoose');
const { Client } = require('../discord/index');

const Router = Express.Router();

Router.post('/request/verify', (req, res) => {
  res.json({Success:true});
});

module.exports = Router;