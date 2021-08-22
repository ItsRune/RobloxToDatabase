const Discord = require('discord.js');
const Client = new Discord.Client();
const loadEvents = require('./functions/loadEvents');

const Initializer = (async () => {
  try {
    Client.Events = new Map();

    await loadEvents(Client, '../events');

    await Client.login(process.env.DiscordToken)
  } catch(err) {
    console.error(err);
  }

  return Client;
});

module.exports = {
  Initializer,
  Client
}