const Scene = require('telegraf/scenes/base');
const auth = new Scene('auth');
let BotConfig;

//Utils
const {
    responses
  } = require("../utils");

//Keyboards
const {  
    basicKeyboard 
} = require("../view/keyboards");

//i18n Match
const { match } = require('telegraf-i18n')
  
  
const defaultController = async (ctx) =>{
    BotConfig = require("../bots/"+ctx.session.ACTIVE_BOT+"/database/models").BotConfig;
    
    await ctx.replyWithHTML(ctx.i18n.t("auth.start", {
        botName: ctx.session.ACTIVE_BOT,
    }), basicKeyboard(ctx));
}
auth.enter(defaultController);

auth.hears(match("shared.main"), async (ctx)=> {
    ctx.scene.leave();
    await responses.initial(ctx);
})

auth.on("message", async (ctx)=>{
    if (BotConfig) {
        const botConfig = await BotConfig.findOne({})        
        if (botConfig.password === ctx.message.text) {
            ctx.scene.enter(ctx.session.ACTIVE_BOT);
        } else {
            ctx.replyWithHTML(ctx.i18n.t("auth.wrong"));
        }
    }  
})


module.exports = auth;


