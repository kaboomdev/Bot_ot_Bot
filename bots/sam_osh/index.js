require('dotenv').config({ path: './.env' })
const Scene = require('telegraf/scenes/base');

//DB
const {  
    Order, 
    Transaction,
} = require("./database/models");

//Keyboards
const {
    botMainKeyboard, 
} = require("../../view/keyboards")


//Utils
const {
    responses
} = require("../../utils")

// const { leave } = Stage
// const menus = require('../utils/menus.js');
// const { sendMedia } = require('../utils/funcs.js');

const sam_osh = new Scene('sam_osh')
sam_osh.enter(async (ctx) => {
    const resp1 = `<b>${(ctx.session.ACTIVE_BOT).toUpperCase()}</b> Bot Manager`;
    const markup = botMainKeyboard(ctx);
    await ctx.replyWithHTML(resp1, markup);
    
    const resp2 = await ctx.replyWithHTML("Загрузка....");
    
    const orders = await Order.find({});
    const transactions = await Transaction.find({});
    
    
    if (orders.length && transactions.length) {
        const stats = {
            "Заказов": orders.length,
            "Транзакции": transactions.length,
        }
        const statsString = responses.statsBuilder(stats);
        
        await ctx.telegram.editMessageText(ctx.from.id, resp2.message_id, undefined, statsString, {
            parse_mode: 'HTML',
        });
    }
});

module.exports = sam_osh;