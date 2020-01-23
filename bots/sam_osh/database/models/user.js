const { Schema } = require('mongoose');
const moment = require('moment');
const config = require("../../config");
const mongoose = require("../index");

const UserSchema = new Schema({
    _id: String,
    isBlocked: Boolean,
    name: String,
    username: String,
    phone_number: String,
    language: String,
    last_activity: { type: Date, default: moment().add(5, 'h') }, 
    chat_id: String,
});

const User = mongoose.models.User ? mongoose.model('User') : mongoose.model('User', UserSchema, config.DB_COL_USERS);


module.exports = { 
    Model: User, 
    Schema: UserSchema,
};