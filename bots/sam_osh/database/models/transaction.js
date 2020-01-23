const { Schema } = require('mongoose');
const OrderSchema = require('./order').Schema;

const config = require("../../config");
const mongoose = require("../index");

const TransactionSchema = new Schema({
    id: String,
    time: Number,
    amount: Number,
    account: { phone: Number },    
    create_time: Number,
    perform_time: Number,
    cancel_time: Number,
    transaction: String,
    state:  Number,
    reason: Number,
    order: OrderSchema,
});

const Transaction = mongoose.models.Transaction ? mongoose.model('Transaction') : mongoose.model('Transaction', TransactionSchema, config.DB_COL_TRANSACTIONS);

module.exports = {
    Model: Transaction,
    Schema: TransactionSchema,
};