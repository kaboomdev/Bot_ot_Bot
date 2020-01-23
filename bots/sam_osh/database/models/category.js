const { Schema } = require('mongoose');
const config = require("../../config");
const mongoose = require("../index");

const CategorySchema = Schema({
    seq: Number,
    priority: Number,
    yaml_def: String,
});

const Category = mongoose.models.Category ? mongoose.model('Category') : mongoose.model('Category', CategorySchema, config.DB_COL_CATEGORIES);


module.exports = {
    Model: Category,
    Schema: CategorySchema,
};