const Scene = require('telegraf/scenes/base');
const ad = new Scene('ad');

//Keyboards
const {  
    adKeyboard,
} = require("../../view/keyboards");
  
//i18n Match
const { match } = require('telegraf-i18n')
  
const defaultController = async (ctx) =>{
    await ctx.replyWithHTML(ctx.i18n.t("ad.start", {
        botName: ctx.session.ACTIVE_BOT,
    }), adKeyboard(ctx));
}
ad.enter(defaultController);

ad.hears(match("keyboards.ad.mail"), async (ctx)=> {
    ctx.scene.enter("ad-mailing");
})
ad.hears(match("keyboards.ad.promo"), async (ctx)=> {
    ctx.scene.enter("ad-promo");
})


module.exports = ad;


