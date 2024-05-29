const checkSiteAvailability = require('./checkStatus');
const readJson = require('./utils/readJson');
const path = require('path');
const { InputFile } = require('grammy');
const users = path.join(__dirname, './userData.json');

const setWatchers = async ({bot, config}) => {
  config.hosts.forEach((item) => {
    setInterval(() => checkSiteAvailability(item.url)
      .then(isAvailable => {
        if (!isAvailable) {
          readJson(users).then(data => {
            Object.values(data).forEach(async (chatId) => {
              await bot.api.sendPhoto(chatId, new InputFile('./images/crash.jpg'), {
                caption: ` \nГоспода и дамы, у нас лег ${item.name}\n `
              })
            })
          });
        }
      }), 30000);
  })
}

module.exports = setWatchers;