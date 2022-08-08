const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const cookieParser = require("cookie-parser")
const { setTokenCookie, requireAuth, restoreUser } = require("../../utils/auth");
router.use(cookieParser());
router.use(express.urlencoded({ extended: false }));
const db = require('../../db/models');
const e = require('express');


//CREATE
router.post('/', asyncHandler(async function (req, res) {
    const tempReview = await db.Review.create(req.body);
    const completeReview = await tempReview.save();
    
    const newId = completeReview.id;

    const completeVer = await db.Review.findByPk(newId, {
        include: {
            model: db.User,
            required: true
        }
    })
    return res.json(completeVer);
}
));
//READ all reviews for a product
router.get('/products/:productId', asyncHandler(async function (req, res) {
    const productId = req.params.productId;
    const reviews = await db.Review.findAll({
        where : {
            productId: productId
        },
        include: {
            model: db.User,
            required: true
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
        },
        include: {
            model: db.User,
            required: true
        }
    });
    return res.json(reviews);
}));


//UPDATE
router.put('/:reviewId', asyncHandler(async function (req, res) {
    const reviewId = req.params.reviewId
    const review = await db.Review.findByPk(reviewId);
    await review.update(req.body);
    const updatedReview = await db.Review.findByPk(reviewId,{
        include: {
            model: db.User,
            required: true
        }
    });
    return res.json(updatedReview);
}));
//DELETE
router.delete('/:reviewId', asyncHandler(async function (req, res) {
const reviewId = req.params.reviewId;
    await db.Review.destroy({
        where: { id: reviewId },
    });
    return res.json(reviewId);
}));

module.exports = router;