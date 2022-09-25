const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const cookieParser = require("cookie-parser")
const { setTokenCookie, requireAuth, restoreUser } = require("../../utils/auth");
router.use(cookieParser());
router.use(express.urlencoded({ extended: false }));
const db = require('../../db/models');
// const { Result } = require('express-validator');
// const Op = require('sequelize');


//API FOR PRODUCTS
//READ ONLY
router.get('/', asyncHandler(async function (req, res) {
    const products = await db.Product.findAll();
    return res.json(products);
}));

router.get('/:productId', asyncHandler(async function (req, res) {
    const productId = req.params.productId;
    const product = await db.Product.findByPk(productId);
    return res.json(product);
}));

//for business owner: post
router.post('/', asyncHandler (async function (req,res){
    //two parts
    //first, product has: name, price, info
    //second, there are images
    //ProductImage database contains productId and siteUrl
    const temp = await req.body;
    console.table(req.body);
    const newProductDetail = {
        name: temp.name,
        price: parseFloat(temp.price),
        info: temp.info
    }
    const newProduct = await db.Product.build(newProductDetail);
    const newProductFinished = await newProduct.save();
    res.json(newProductFinished);
}))

//for business owner: edit
router.put('/:productId', asyncHandler(async function (req,res){
    const productId = req.params.productId;

    const product = await db.Product.findByPk(productId);
    await product.update(req.body);
    const updatedProduct = await db.Product.findByPk(productId);
    return res.json(updatedProduct);
}))

router.delete('/:productId', asyncHandler(async function(req, res){
    const productId = req.params.productId;
    await db.Product.destroy({
        where: {
            id: productId
        }
    })
    return res.json(productId);
}))
//for business owner: delete



module.exports=router;