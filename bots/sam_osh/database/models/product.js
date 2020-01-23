const { Schema } = require('mongoose');
const config = require("../../config");
const mongoose = require("../index");

const ProductSchema = new Schema({
    seq: Number,
    file_id: String,
    category_id: String,
    yaml_def: String,
    price: Number, 
});

const Product = mongoose.models.Product ? mongoose.model('Product') : mongoose.model('Product', ProductSchema, config.DB_COL_PRODUCTS);

module.exports = {
    Model: Product,
    Schema: ProductSchema,
};