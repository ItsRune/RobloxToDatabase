const baseEvent = require('../util/baseEvent');
const { log } = require('../../utils/colors');

class onReady extends baseEvent {
  constructor() {
    super('ready');
  }

  async run(Client) {
    log(`${Client.user.tag} is ready!`);
  }
}

module.exports = onReady;