const fs = require('fs');
const path = require('path');
const baseEvent = require('../util/baseEvent');

async function loadEvents(Client, dir = '../events') {
  const dirPath = path.join(__dirname, dir);
  fs.readdir(dirPath, (err, files) => {
    if (err)
      return console.error(err);
    
    for (let i = 0; i < files.length; i++) {
      const fileName = files[i];
      const filePath = path.join(dirPath, fileName);

      fs.stat(filePath, async (err, stat) => {
        if (err)
          return console.error(err);

        if (stat.isDirectory()) {
          return await loadEvents(Client, filePath);
        }

        if (fileName.endsWith('.js')) {
          const event = require(filePath);
          
          if (event.prototype instanceof baseEvent) {
            const Event = new event;

            Client.Events.set(Event.eventName, Event);
            Client.on(Event.eventName, Event.run.bind(Event, Client));
          }
        }
      });
    }
  });
}

module.exports = loadEvents;