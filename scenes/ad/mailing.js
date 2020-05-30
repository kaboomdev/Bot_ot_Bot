const axios = require('axios');


const Scene = require('telegraf/scenes/base');
const adMailing = new Scene('ad-mailing');

//i18n Match
const { match } = require('telegraf-i18n')

const {
    yesKeyboard
} = require("../../view/keyboards");

adMailing.enter(async (ctx) => {
    await ctx.replyWithHTML(ctx.i18n.t("ad.mailing.start"));
});

adMailing.hears(match("shared.back"), async (ctx) => {
    ctx.scene.enter("ad");
});

adMailing.hears(match("shared.main"), async (ctx) => {
    ctx.scene.enter(ctx.session.ACTIVE_BOT);
});

adMailing.hears(match("shared.yes"), async (ctx) => {
    console.log(ctx.session);
  
    if(ctx.session.MAIL_PHOTO && ctx.session.MAIL_PHOTO !== "waiting") {

        await ctx.replyWithHTML(ctx.i18n.t("ad.mailing.sending"));
        
        try {
            const response = await axios.post('http://84.54.114.220:3000/ad', {
                message: ctx.session.SAVED_MSG,
                photo: ctx.session.MAIL_PHOTO,
            });
            console.log(response.data);
        
            ctx.session.SAVED_MSG = "";
            ctx.session.MAIL_PHOTO = "";
        } catch (error) {
            console.error(error);
        }
        
        
    } else {
        await ctx.replyWithHTML(ctx.i18n.t("ad.mailing.sending"));

        try {
            const response = await axios.post('http://84.54.114.220:3000/ad', {
                message: ctx.session.SAVED_MSG,
            });
            console.log(response.data);

            ctx.session.SAVED_MSG = "";
        } catch (error) {
            console.error(error);
        }
    } 
});

adMailing.on("photo", async (ctx) => {
    ctx.session.SAVED_MSG = ctx.message.caption;
    ctx.session.MAIL_PHOTO = "waiting";



    await ctx.replyWithHTML(ctx.i18n.t("ad.mailing.captionSaved"));
})

adMailing.on("message", async (ctx) => {
    if (ctx.session.MAIL_PHOTO !== "waiting") {
        
        ctx.session.SAVED_MSG = ctx.message.text;

        const resp = ctx.i18n.t("ad.mailing.sendMessage") + "\n\n" + ctx.session.SAVED_MSG;

        await ctx.telegram.sendMessage(ctx.from.id, resp, {
            parse_mode: "HTML",
            reply_to_message_id: ctx.message.message_id,
            reply_markup: yesKeyboard(ctx),
        })
        
    } else if (ctx.session.MAIL_PHOTO === "waiting") {
        ctx.session.MAIL_PHOTO = ctx.message.text;
        
        try {
            await ctx.telegram.sendPhoto(ctx.from.id, ctx.session.MAIL_PHOTO, {
                caption: ctx.session.SAVED_MSG,
                parse_mode: "HTML",
                reply_to_message_id: ctx.message.message_id,
                reply_markup: yesKeyboard(ctx),
            });
        } catch (error) {
            ctx.reply(error);
        }
        
        
        await ctx.replyWithHTML(ctx.i18n.t("ad.mailing.sendMessage") )
    }

});





module.exports = adMailing;






