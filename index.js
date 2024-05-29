const { Bot } = require('grammy');
const path = require('path');
const readJson = require('./utils/readJson');
const setWatchers = require('./setWatchers');
const setCommands = require('./setCommands');
const configFile = path.join(__dirname, 'config.json');

readJson(configFile).then(config => {
  const bot = new Bot(config.botToken)

  setCommands({bot, config})

  setWatchers({bot, config}).then();

  bot.start().then();
});