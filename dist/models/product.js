"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose = require('mongoose');
const ProductSchema = new mongoose_1.Schema({
    item: {
        type: String,
        trim: true
    },
    trader: {
        type: String,
        required: true,
        trim: true,
        match: /^[A-Z]\w+\s[A-Z]\w+$/g
    },
    stock: Number,
    price: {
        type: Number,
        ///////////////////////
        required: function () {
            return this.stock > 0;
        }
    },
    tags: {
        type: [String],
        validate: {
            validator: function (a) {
                return a.length > 0;
            },
            message: 'please enter at least one tag'
        },
        set: (v) => v.split(','),
        required: [true, 'please enter at least one tag']
    },
    date: {
        type: Date,
        default: Date.now()
    },
    lastUpdateDate: Date
});
const Product = mongoose.model('product', ProductSchema);
module.exports = Product;
