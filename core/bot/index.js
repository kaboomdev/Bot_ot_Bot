require('dotenv').config("");
const path = require("path");

//Bot
const Telegraf = require('telegraf');
const TelegrafI18n = require('telegraf-i18n');

const Stage = require('telegraf/stage');

const bot = new Telegraf(process.env.BOT_TOKEN);

const i18n = new TelegrafI18n({
    defaultLanguage: 'ru',
    defaultLanguageOnMissing: true,
    directory: path.resolve(__dirname, '../../locales'),
    sessionName: 'session',
    useSession: true
})

bot.use(Telegraf.session());
bot.use(i18n.middleware());


const settings = require("./settings");

botScenes = [];
settings.available_bots.forEach(botname => {
    botScenes.push(require(`../../bots/${botname}`));
});

sharedScenes = require("../../scenes");
const stage = new Stage([...botScenes, ...sharedScenes]);

bot.use(stage.middleware());
bot.catch(err => console.log(err));
module.exports = bot;