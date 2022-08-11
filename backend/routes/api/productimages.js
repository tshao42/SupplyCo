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

module.exports = router;