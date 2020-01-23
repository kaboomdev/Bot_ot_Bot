const { Schema } = require('mongoose');
const productSchema = require('./product').Schema;
const UserSchema = require('./user').Schema;
const config = require("../../config");
const mongoose = require("../index");

const OrderStatus = [
    'New',
    'Approved',
    'Pending',
    'Canceled',
    'Failed',
    'Complete'
];

const ProductInCartSchema = new Schema({
    _id: Number,
    product: productSchema,
    count: { type: Number, default: 0 }
});

const Delivery = new Schema({
    type: String,
    phone_number: String,
    destination: {latitude: Number, longitude: Number} | String,
    payment: String,
    time: String,
    additional_info: String
});

const OrderSchema = new Schema({
    date: Date,
    delivery: Delivery,
    products: [ProductInCartSchema],
    user_id: String,
    user: UserSchema,
    status: { type: String, enum: OrderStatus },
    total_amount: { type: Number, default: 0 },
    total_amount_in_cents: { type: Number, default: 0 },    
    is_cart: { type: Boolean, default: false },
    order_number: Number,
});

const Order = mongoose.models.Order ? mongoose.model('Order') : mongoose.model('Order', OrderSchema, config.DB_COL_ORDERS);

module.exports = {
    Model: Order,
    Schema: OrderSchema,
};;