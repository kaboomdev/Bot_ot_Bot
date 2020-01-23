const { Schema } = require('mongoose');
const config = require("../../config");
const mongoose = require("../index");

const CounterSchema = Schema({
    _id: String,
    seq: Number
});

const Counter =  mongoose.models.Counter ? mongoose.model('Counter') : mongoose.model('Counter', CounterSchema, config.DB_COL_COUNTERS);


module.exports = {
    Model: Counter,
    Schema: CounterSchema,
};