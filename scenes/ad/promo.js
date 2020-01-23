const Scene = require('telegraf/scenes/base');
const adPromo = new Scene('ad-promo');


//Keyboard
const {
    yesKeyboard
} = require("../../view/keyboards");

//i18n Match
const { match } = require('telegraf-i18n')

let BotConfig;
adPromo.enter(async (ctx) => {
    BotConfig = require("../../bots/" + ctx.session.ACTIVE_BOT + "/database/models").BotConfig;
    const botConfig = await BotConfig.findOne({});
    await ctx.replyWithHTML(ctx.i18n.t("ad.promo.start"));
    if (botConfig.promo) {
        const resp = ctx.i18n.t("ad.promo.current") + botConfig.promo;
        await ctx.replyWithHTML(resp);
    };
})

adPromo.hears(match("shared.back"), async (ctx) => {
    ctx.scene.enter("ad");
});

adPromo.hears(match("shared.main"), async (ctx) => {
    ctx.scene.enter(ctx.session.ACTIVE_BOT);
});

adPromo.hears("❌", async (ctx) => {
    if (BotConfig) {
        const botConfig = await BotConfig.findOne({});
        botConfig.promo = "";
        await botConfig.save();
        await ctx.replyWithHTML(ctx.i18n.t("ad.promo.deleted"));
    }
    
});

adPromo.hears(match("shared.yes"), async (ctx) => {
    if (BotConfig) {
        const botConfig = await BotConfig.findOne({});
        botConfig.promo = ctx.session.SAVED_MSG;
        await botConfig.save();
        await ctx.replyWithHTML(ctx.i18n.t("ad.promo.success"));
    }

})

adPromo.on("message", async (ctx) => {
    ctx.session.SAVED_MSG = ctx.message.text;
    await ctx.telegram.sendMessage(ctx.from.id, ctx.i18n.t("ad.promo.setPromo"), {
        parse_mode: "HTML",
        reply_to_message_id: ctx.message.message_id,
        reply_markup: yesKeyboard(ctx),
    })
})


module.exports = adPromo;

