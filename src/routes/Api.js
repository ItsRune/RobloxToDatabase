const Express = require('express');
const Mongoose = require('mongoose');
const { Client } = require('../discord/index');
const VerifyModel = require('../mongoose/models/verification');
const { error } = require('../utils/colors');
const Router = Express.Router();
const keyGenerator = require('../utils/keyGeneration');
const Database = require("@replit/database");

const localDB = new Database();

Router.post('/verify/getkey', async (req, res) => {
  try {
    const Body = req.body;

    if ((Body.user == undefined || !Number(Body.user)) || (Body.discordid == undefined || !Number(Body.discordid))) {
      return res.json({Success:false, error:"Request resulted in an error, please double check the parameters!"});
    }

    const key = keyGenerator();
    const packedData = {key, discordId: Body.discordid};

    localDB.set(String(Body.user), packedData).then(() => {
      res.json({Success:true, key});
    });
  } catch(err) {
    error(err.message);
    res.json({Success:false, error:"Service is unresponsive!"});
  }
});

Router.post('/verify', async (req, res) => {
  try {
    const Body = req.body;

    if ((Body.verifykey == undefined) || (Body.user == undefined || !Number(Body.user))) {
      return res.json({Success:false, error:"Request resulted in an error, please double check the parameters!"});
    }

    const pendingData = await localDB.get(String(Body.user));
    if (pendingData.key != Body.verifykey) {
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
        DiscordId: String(pendingData.discordId)
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