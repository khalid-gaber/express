import { Model, Document, Schema, mongo } from "mongoose";
const mongoose = require('mongoose');

export interface IProduct extends Document {
    item: string,
    trader: string,
    stock: number,
    price: number,
    tags: string[],
    date: Date,
    lastUpdateDate: Date
}


const ProductSchema: Schema<IProduct> = new Schema({
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
        required: function(){
            return this.stock > 0
        }
    },
    tags: {
        type: [String],
        validate: {
            validator: function(a: string[]) {
                return a.length > 0 
            },
            message: 'please enter at least one tag'
        },
        set: (v: string) => v.split(','),
        required: [true, 'please enter at least one tag']
    },
    date: {
        type: Date,
        default: Date.now()
    },
    lastUpdateDate: Date
});

const Product: Model<IProduct> = mongoose.model('product', ProductSchema);

module.exports = Product;