import { Request, Response, NextFunction } from "express";
import { IProduct } from "../models/product";
const express = require('express');
const Product = require('../models/product');

const router = express.Router();

router.get('/insert', (req: Request, res: Response) => {
    res.render('pages/productForm', {title: 'product inserting'});
})

// const products = [
//     {"item": "Xiaomi Pro", "trader": "Khalid Gaber", "price": 4000},
//     {"item": "Dell Computer", "trader": "Khalid Gaber", "price": 7000},
//     {"item": "Samsung Galaxy S21", "trader": "Ahmed Ali", "price": 8000},
//     {"item": "HP Pavilion", "trader": "Sara Ahmed", "price": 6500},
//     {"item": "Apple iPhone 12", "trader": "Omar Hamed", "price": 12000},
//     {"item": "Sony Bravia TV", "trader": "Mona Said", "price": 9000},
//     {"item": "Asus ROG Laptop", "trader": "Khalid Gaber", "price": 15000},
//     {"item": "Canon EOS 1500D", "trader": "Ahmed Ali", "price": 5000},
//     {"item": "Lenovo ThinkPad", "trader": "Sara Ahmed", "price": 8000},
//     {"item": "Google Pixel 5", "trader": "Omar Hamed", "price": 9000},
//     {"item": "OnePlus 9", "trader": "Mona Said", "price": 7500},
//     {"item": "LG Refrigerator", "trader": "Khalid Gaber", "price": 11000},
//     {"item": "Nikon D3500", "trader": "Ahmed Ali", "price": 6000},
//     {"item": "MacBook Air", "trader": "Sara Ahmed", "price": 13000},
//     {"item": "Sony PlayStation 5", "trader": "Omar Hamed", "price": 15000},
//     {"item": "Huawei P40", "trader": "Mona Said", "price": 7000},
//     {"item": "Acer Aspire 5", "trader": "Khalid Gaber", "price": 6000},
//     {"item": "Panasonic Lumix G7", "trader": "Ahmed Ali", "price": 7000},
//     {"item": "Microsoft Surface Pro", "trader": "Sara Ahmed", "price": 14000},
//     {"item": "Dyson V11 Vacuum", "trader": "Omar Hamed", "price": 5000},
//     {"item": "Xiaomi Mi Band 6", "trader": "Khalid Gaber", "price": 200},
//     {"item": "Samsung Galaxy Tab", "trader": "Ahmed Ali", "price": 5000},
//     {"item": "Apple MacBook Pro", "trader": "Sara Ahmed", "price": 18000},
//     {"item": "Sony WH-1000XM4", "trader": "Omar Hamed", "price": 1200},
//     {"item": "Dell XPS 13", "trader": "Mona Said", "price": 15000},
//     {"item": "LG OLED TV", "trader": "Khalid Gaber", "price": 25000},
//     {"item": "Canon PowerShot G7X", "trader": "Ahmed Ali", "price": 3500},
//     {"item": "Lenovo Yoga 7i", "trader": "Sara Ahmed", "price": 9000},
//     {"item": "Google Nest Hub", "trader": "Omar Hamed", "price": 800},
//     {"item": "OnePlus Nord", "trader": "Mona Said", "price": 4000},
//     {"item": "HP Spectre x360", "trader": "Khalid Gaber", "price": 16000},
//     {"item": "Nikon Z6", "trader": "Ahmed Ali", "price": 12000},
//     {"item": "Apple iPad Pro", "trader": "Sara Ahmed", "price": 10000},
//     {"item": "Sony Alpha a6000", "trader": "Omar Hamed", "price": 8000},
//     {"item": "Samsung Galaxy Watch", "trader": "Mona Said", "price": 1200},
//     {"item": "Acer Nitro 5", "trader": "Khalid Gaber", "price": 7000},
//     {"item": "Huawei MateBook D15", "trader": "Ahmed Ali", "price": 6000},
//     {"item": "Microsoft Xbox Series X", "trader": "Sara Ahmed", "price": 15000},
//     {"item": "GoPro Hero 9", "trader": "Omar Hamed", "price": 5000},
//     {"item": "Dyson Airwrap", "trader": "Mona Said", "price": 3500}
// ]



router.get('/', async (req: Request, res: Response)=>{
    let size = await Product.find({}).countDocuments();
    let products = await Product.find({}).limit(15 );
    res.render('pages/productsShow', {title: 'products', products, size});
})

router.get('/:id', async (req: Request, res: Response)=>{
    try {
        const newProducts = await Product.find({}, {item: 1, price: 1, trader: 1}).skip(req.params.id).limit(15);
        res.json(newProducts);
    } catch (err) {
        console.log(err);
    }
})

router.post('/', async (req: Request, res: Response)=>{
    // try{
    //     await Product.create({
    //         item: 'huawei y9',
    //         trader: 'Khalid aber',
    //         price: 3000,
    //         stock: 2,
    //         tags: ['IT'],
    //     }).then(()=>{
    //         res.send('inserted successfully');
    //     })
    // }catch(err: any){
    //     err.message.split(',').forEach((m: string,i: number) => {
    //         console.log(i+1 + ': ' + m)
    //     });
    //     res.send(`${err.message}`);
    // }

    const {item, trader, stock, price, tags} = req.body;
    try{
        await Product.create({ item, trader, stock, price, tags })
        .then(()=>{
            res.render('pages/sucResponse', {title: 'inserted successfully', item, trader, stock, price});
        })
    }catch(err: any){
        err.message.split(',').forEach((m: string,i: number) => {
            console.log(i+1 + ': ' + m)
        });
        res.render('pages/errResponse', {
            title: 'error',
            message: err.message
        });
        // res.send(`${err.message}`);
    }

})

module.exports = router;