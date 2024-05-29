const fs = require('fs');
const path = require('path');
const readJson = require('./utils/readJson');
const userDataFile = path.join(__dirname, 'userData.json');

const addUserChatId = (ctx) => {
  readJson(userDataFile).then(userData => {
    userData[ctx.from.id] = ctx.chat.id;

    fs.writeFile(userDataFile, JSON.stringify(userData, null, 2), (err) => {
      if (err) {
        console.error(err);
      }
    });
  });
}

module.exports = addUserChatId;