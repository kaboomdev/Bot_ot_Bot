//Utils
const {
    responses
  } = require("../utils");

const hasActiveBot = async (ctx, next )=>{
    if (ctx.session.ACTIVE_BOT) {
        return await next();
    } else {
        responses.initial(ctx);
    }
    
}

module.exports = hasActiveBot;