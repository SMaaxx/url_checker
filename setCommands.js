const { InputFile } = require('grammy');
const addUserChatId = require('./idService');
const checkSiteAvailability = require('./checkStatus');

const setCommands = ({bot, config}) => {
  bot.api.setMyCommands([
    {command: 'start', description: 'Запуск бота'},
    {command: 'status', description: 'Узнать статус отслеживаемых URL'},
  ]).then();

   bot.command('start', async (ctx) => {
    await ctx.reply('Добро пожаловать! \nЭтот бот будет отправлять оповещение, если один из отслеживаемых сервисов недоступен');
    await ctx.replyWithPhoto(new InputFile('./images/helloImage.jpg'))
    addUserChatId(ctx);
  })

  bot.command('status', async (ctx) => {
    let statuses = [];
    let isCrushed = false;

    const promises = config.hosts.map(async (item) => {
      try {
        const isAvailable = await checkSiteAvailability(item.url);
        !isAvailable && (isCrushed = true)
        statuses.push(`${item.name} (${item.url}): ${isAvailable ? 'running' : 'crashed'}`);
      } catch (error) {
        isCrushed = true;
        statuses.push(`${item.name}: crashed`);
      }
    });

    await Promise.all(promises);
    const title = isCrushed ? 'Один или несколько URL недоступны\n\n' : 'Все отслеживаемые URL имеют статус RUNNING\n\n';

    await ctx.replyWithPhoto(new InputFile(isCrushed ? './images/statusCrash.jpg' : './images/statusAllGood.jpg'), {
      caption: title + statuses.join('\n')
    });
  });
}

module.exports = setCommands;