const { Schema } = require('mongoose');

const config = require("../../config");
const mongoose = require("../index");

const BotConfigSchema = new Schema({
    isAlive: Boolean, 
    password: String,
    promo: String, 
});

const BotConfig = mongoose.models.BotConfig ? mongoose.model('BotConfig') : mongoose.model('BotConfig', BotConfigSchema, config.DB_COL_BOTCONFIG);


module.exports = {
    Model: BotConfig,
    Schema: BotConfigSchema,
};