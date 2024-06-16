"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const mongoose = require('mongoose');
const products = require('./routes/products');
const Product = require('./models/product');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
mongoose.connect('mongodb://localhost:27017/mongoose-learning')
    .then(() => {
    console.log('connected to database successfully');
}).catch((err) => {
    console.log('error with connecting to DB: ', err);
});
app.use('/products', products);
app.listen(3000, () => {
    console.log('server is running');
});
