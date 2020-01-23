

const api = require("./core/api");
const bot = require("./core/bot");
//Views
const {
    mainKeyboard,
} = require("./view/keyboards")

//Utils
const {
    responses
} = require("./utils");


//Middlewares
const {
    hasActiveBot
} = require("./middlewares");


//Settings
const settings = require("./core/bot/settings");

//i18n Match
const { match } = require('telegraf-i18n')


bot.start((ctx) => {
  responses.initial(ctx);
});



bot.hears(settings.available_bots, async (ctx) => {
  ctx.session.ACTIVE_BOT = ctx.message.text.toLowerCase();
  ctx.scene.enter("auth");
});


bot.hears(match("shared.back"), (ctx)=>{
  ctx.scene.enter(ctx.session.ACTIVE_BOT);
});

bot.hears(match("shared.main"),(ctx)=>{
  responses.initial(ctx);
});

bot.hears(match("keyboards.main.ad"), hasActiveBot ,(ctx)=>{
  ctx.scene.enter("ad");
});

bot.hears(match("keyboards.main.ban"), hasActiveBot ,(ctx)=>{
  ctx.scene.enter("user-ban");
});

bot.hears(match("keyboards.main.status"), hasActiveBot,(ctx)=>{
  ctx.scene.enter('bot-alive');
});

bot.hears(match("keyboards.main.stats"), hasActiveBot,(ctx)=>{
  ctx.scene.enter(ctx.session.ACTIVE_BOT);
});

bot.on('photo', (ctx)=>{
  console.log(ctx.message.photo);
  ctx.reply(JSON.stringify(ctx.message.photo, undefined, 3))
})



// bot.on('photo', async (ctx) => {
//   const photo = ctx.message.photo;
//   const id = photo[photo.length - 1].file_id;
//   const file = await ctx.telegram.getFile(id);
//   const path = file.file_path;
//   const url = "https://api.telegram.org/file/bot"+ process.env.BOTTOKEN +"/" + path;
 
  
  
// })

bot.launch();