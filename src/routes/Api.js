const Express = require('express');
const Mongoose = require('mongoose');
const { Client } = require('../discord/index');
const VerifyModel = require('../mongoose/models/verification');
const { error } = require('../utils/colors');
const Router = Express.Router();
const keyGenerator = require('../utils/keyGeneration');
const Database = require("@replit/database");

const localDB = new Database();

localDB.set("1", "123456").then(() => {
  console.log('added user 1 with 123456')
});

Router.post('/request/verify', async (req, res) => {
  try {
    const Body = req.body;

    if ((Body.verifykey == undefined) || (Body.user == undefined || !Number(Body.user)) || (Body.discordid == undefined || !Number(Body.discordid))) {
      return res.json({Success:false, error:"Request resulted in an error, please double check the parameters!"});
    }

    const pendingKey = await localDB.get(String(Body.user));
    if (pendingKey != Body.verifykey) {
      res.json({Success:false, error:"Invalid verification key."});
      await localDB.delete(String(Body.user));
      return;
    }
    await localDB.delete(String(Body.user));

    if (await VerifyModel.exists({UserId: Body.user})) {
      return res.json({Success:false, error:"User is already verified."});
    } else {
      VerifyModel.create({
        UserId: Number(Body.user),
        DiscordId: String(Body.discordid)
      }, (err, data) => {
        if (err) {
          error(err.message);
          res.json({Success:false, error: err.message});
        } else {
          res.json({Success:true, data});
        }
      });
    }
  } catch(err) {
    error(err.message);
    res.json({Success:false, error:"Service is unresponsive!"});
  }
});

module.exports = Router;