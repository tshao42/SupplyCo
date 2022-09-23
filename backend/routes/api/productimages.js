const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const cookieParser = require("cookie-parser")
const { setTokenCookie, requireAuth, restoreUser } = require("../../utils/auth");
router.use(cookieParser());
router.use(express.urlencoded({ extended: false }));
const db = require('../../db/models');
const e = require('express');



//READ IMAGES
router.get(`/:productId`, asyncHandler(async function (req, res) {
    const productId = req.params.productId;
    const images = await db.ProductImage.findAll({
        where: {
            productId: productId
        }
    });
    return res.json(images);
}));

router.get('/', asyncHandler(async function (req, res) {
    const images = await db.ProductImage.findAll();
    return res.json(images);
}));

router.post('/', asyncHandler (async function (req, res){
    const temp = await req.body;
    console.log("image tracking")
    console.table(temp);
    const newImageInfo = {
        productId: temp.productId,
        siteUrl: temp.siteUrl
    }
    
    const newImage = await db.ProductImage.build(newImageInfo);
    const newImageFeed = await newImage.save();
    res.json(newImageFeed);
}))

router.delete('/:productId', asyncHandler (async function(req,res){
    const productId = req.params.productId;
    await db.ProductImage.destroy({
        where: {
            productId: productId
        }
    })
    return res.json(productId);
}))
module.exports = router;