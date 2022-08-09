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




module.exports=router;