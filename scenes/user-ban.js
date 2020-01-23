const Scene = require('telegraf/scenes/base');
const userBan = new Scene('user-ban');

const defaultController = async (ctx) => {
    await ctx.replyWithHTML(ctx.i18n.t("ban.start", {
        botName: ctx.session.ACTIVE_BOT,
    }));
}


userBan.enter(defaultController);

userBan.hears(/(\+?998[7,9][0-9][\d]{7})/gi, async (ctx) => {
    const {
        User
    } = require(`../bots/${ctx.session.ACTIVE_BOT}/database/models`);

    const user = await User.findOne({
        phone_number: ctx.message.text
    });

    if (user) {
        let resp = `<b>${user.name} ${user.phone_number}</b> `;
        if (user.isBlocked) {
            user.isBlocked = false;

            resp += ctx.i18n.t("ban.unblocked");
        } else {
            user.isBlocked = true;

            resp += ctx.i18n.t("ban.blocked");
        };

        await user.save();
        await ctx.replyWithHTML(resp);
    } else {
        await ctx.replyWithHTML(ctx.i18n.t("errors.404"));
    }

});

// userBan.use(defaultController);

module.exports = userBan;
