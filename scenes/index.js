const userBan = require("./user-ban");
const botAlive = require("./bot-alive");
const auth = require("./auth");
const ad = require("./ad");
module.exports = [
    userBan,
    botAlive,
    auth, 
    ...ad
]