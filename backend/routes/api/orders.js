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

//CREATE
router.post('/', asyncHandler(async function (req, res) {
    const temp = await req.body;
    console.log(`line 15`)
    console.dir(temp)
    //breaking down:
    const tempDetail = {
        buyerId: temp.buyerId,
        addressPlaceId: temp.addressPlaceId,
        orderFor: temp.orderFor,
        total: temp.total
    }
    
    //for the Orderitems, we are just going to send over:
    //productId
    //quantity
    //for each kind of product in the order
    //Therefore, we need to build the orderId first so that we know how to build

    //STEP 1: BUILD ORDER
    const detailObj = await db.Order.build(tempDetail);
    const newObj = await detailObj.save();

    //STEP 2: Get the new OrderId
    const newOrderId = newObj.id;

    const tempContentArr = temp.Orderitems;
    
    for (let i = 0 ; i < tempContentArr; i++){
        let tempProductId = tempContentArr.productId;
        let tempQuantity = tempContentArr.quantity;
        let tempItemObj = {
            orderId: newOrderId,
            productId: tempProductId,
            quantity: tempQuantity
        }
        const tempBuildObj = await db.Orderitem.build(tempItemObj);
        await tempBuildObj.save();
    }

    res.json(newOrderId);
}));


//READ (single)
router.get('/:orderId', asyncHandler(async function (req, res) {
    const orderId = req.params.orderId;
    const order = await db.Order.findAll({
        where:{
            id: orderId
        }, include:{
            model: db.Orderitem,
            required: true
        }});
    return res.json(order);
}));

//READ (all by one user)
router.get('/users/:userId', asyncHandler(async function (req, res) {
    const userId = req.params.userId;
    const order = await db.Order.findAll({
        where: {
            buyerId:userId
        },
        include: {
            model: db.Orderitem,
            required: true

        }
    });
    return res.json(order);
}));

module.exports = router;