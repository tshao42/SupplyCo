const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const cookieParser = require("cookie-parser")
const { setTokenCookie, requireAuth, restoreUser } = require("../../utils/auth");
router.use(cookieParser());
router.use(express.urlencoded({ extended: false }));
const db = require('../../db/models');
const e = require('express');




//READ all reviews for a product
router.get('/products/:productId', asyncHandler(async function (req, res) {
    const productId = req.params.productId;
    const reviews = await db.Review.findAll({
        where : {
            productId: productId
        }
    });
    return res.json(reviews);
}));

//READ all reviews from a user
router.get('/users/:userId', asyncHandler(async function (req, res) {
    const userId = req.params.userId;
    const reviews = await db.Review.findAll({
        where: {
            userId: userId
        }
    });
    return res.json(reviews);
}));


module.exports = router;