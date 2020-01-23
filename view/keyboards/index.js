const { Markup } = require('telegraf');
const settings = require("../../core/bot/settings");
module.exports = {

    basicKeyboard: (ctx) => {
        return Markup.keyboard([
            [ctx.i18n.t("shared.main")],
        ]).oneTime().resize().extra();
    },

    mainKeyboard: (ctx) => {
        return Markup.keyboard(settings.available_bots).oneTime().resize().extra();
    },

    botMainKeyboard: (ctx) => {
        return Markup.keyboard([
            [ctx.i18n.t("keyboards.main.ad"), ctx.i18n.t("keyboards.main.status")],
            [ctx.i18n.t("keyboards.main.ban"), ctx.i18n.t("keyboards.main.stats")],
            [ctx.i18n.t("shared.back")],
            [ctx.i18n.t("shared.main")]
        ]).oneTime().resize().extra();
    },
    adKeyboard: (ctx) => {
        return Markup.keyboard([
            [ctx.i18n.t("keyboards.ad.mail")],
            [ctx.i18n.t("keyboards.ad.promo")],
            [ctx.i18n.t("shared.main")],
        ]).oneTime().resize().extra();
    },
    stateKeyboard: (ctx, isAlive) => {
        let markup;
        if (isAlive) {
            markup = [
                [ctx.i18n.t("keyboards.state.off")],
                [ctx.i18n.t("shared.back")]
            ]
        } else {
            markup = [
                [ctx.i18n.t("keyboards.state.on")],
                [ctx.i18n.t("shared.back")]
            ] 
        }
        console.log(markup);
        
        return Markup.keyboard(markup).oneTime().resize().extra();
    },
    yesKeyboard: (ctx) => {
        return Markup.keyboard([
            [ctx.i18n.t("shared.yes")],
            [ctx.i18n.t("shared.back")],
        ]).oneTime().resize();
    },







};


