const {
    mainKeyboard, 
  } = require("../view/keyboards")
  
module.exports = {
    responses: {
        initial: async (ctx) =>{
            await ctx.replyWithHTML(ctx.i18n.t("greeting"), mainKeyboard(ctx));
        }, 
        statsBuilder: (stats) => {
            let resp = "";
            for (let title in stats) {
                if (stats.hasOwnProperty(title)) {
                   resp += `${title}: <b>${stats[title]}</b> \n`;
                }
            }
            return resp;
        }
    }
    
}