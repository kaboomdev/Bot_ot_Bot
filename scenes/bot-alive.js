const Scene = require('telegraf/scenes/base');
const botAlive = new Scene('bot-alive');


//Keyboards
const { stateKeyboard } = require("../view/keyboards");


//i18n Match
const { match } = require('telegraf-i18n')

const defaultController = async (ctx) =>{
    const { BotConfig } = require("../bots/"+ctx.session.ACTIVE_BOT+"/database/models");
    const botConfig = await BotConfig.findOne({});
    await ctx.replyWithHTML(ctx.i18n.t("botAlive.start", {
        botName: ctx.session.ACTIVE_BOT,
        isAlive: botConfig.isAlive
    }), stateKeyboard(ctx, botConfig.isAlive));
}

botAlive.enter(defaultController);

botAlive.hears([match("keyboards.state.on"), match("keyboards.state.off")], async (ctx)=>{
    const {
        BotConfig
    } = require(`../bots/${ctx.session.ACTIVE_BOT}/database/models`);
    const botConfig = await BotConfig.findOne({});
    botConfig.isAlive = !botConfig.isAlive;
    await botConfig.save();
    ctx.scene.reenter();
})


module.exports = botAlive;


