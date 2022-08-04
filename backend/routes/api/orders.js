const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const cookieParser = require("cookie-parser")
const { setTokenCookie, requireAuth, restoreUser } = require("../../utils/auth");
router.use(cookieParser());
router.use(express.urlencoded({ extended: false }));
const db = require('../../db/models');
const e = require('express');
// const { Result } = require('express-validator');
// const Op = require('sequelize');

//CREATE
router.post('/', asyncHandler(async function (req, res) {
    const temp = await req.body;
    // console.log(`line 15`)
    // console.dir(temp)
    //breaking down:
    const tempDetail = {
        userId: temp.userId,
        address: temp.address,
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
    
    for (let i = 0 ; i < tempContentArr.length; i++){
        let tempProductId = tempContentArr[i].productId;
        let tempQuantity = tempContentArr[i].quantity;
        let tempItemObj = {
            orderId: newOrderId,
            productId: tempProductId,
            quantity: tempQuantity
        }
        const tempBuildObj = await db.Orderitem.build(tempItemObj);
        await tempBuildObj.save();
    }

    const newCopy = await db.Order.findByPk(newOrderId,{
        include: {
            model: db.Orderitem,
            required: true
        }
    });
    return res.json(newCopy);

}));


//READ (single)
router.get('/:orderId', asyncHandler(async function (req, res) {
    const orderId = req.params.orderId;
    //if empty, need to delete
    const emptyCheck = await db.Orderitem.findAll({ where: { orderId: orderId } });
    // console.log(`line 136, ${emptyCheck}`)
    // if everything gets deleted from the order...
    if (emptyCheck.length == 0) {
        // console.log('hit line 137')
        await db.Order.destroy({ where: { id: orderId } })
        return res.json('empty order...');
    }

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
            userId:userId
        },
        include: {
            model: db.Orderitem,
            required: true

        }
    });
    return res.json(order);
}));


//UPDATE (update an order)
router.put('/:orderId', asyncHandler(async function (req, res) {
    const orderId = req.params.orderId;
    //if we are changing addy/name: we are making changes to the Order listing
    //if we are changing quantity: we are making changes to the Orderite
    //Depending on cases

    const order= await db.Order.findByPk(orderId);
    //then we deal with the req...

    //first: get what is in the req
    const temp = await req.body;
    //take the response object apart
    //still expecting similar json format... (ref: outputs.md)

    //now proceeding with editing...
    //note: if quantity gets to zero, need to delete the listing
    const tempContentArr = temp.Orderitems;
    await tempContentArr.forEach((item) => {
        if (item.quantity === 0) {
            db.Orderitem.destroy({
                where: {
                    id: item.id
                }
            })
        } else {
            const tempval = { quantity: item.quantity };
            const tempcond = { where: { id: item.id } }
            db.Orderitem.update(tempval, tempcond);
        };
    })

    //edit order details
    const tempDetail = {
        address: temp.address,
        orderFor: temp.orderFor,
        total: temp.total
    }
    const orderIdCond = { where:{id:orderId} }

    await order.update(tempDetail, orderIdCond);
    //done with order editing

    //standardized format
    const updatedOrder = await db.Order.findAll({
        where: {
            id: orderId
        },
        include: {
            model: db.Orderitem,
            required: true

        }
    });

    //empty check?
    if (updatedOrder.length == 0) {
        // console.log('hit line 137')
        await db.Order.destroy({ where: { id: orderId } })
        return res.json('empty order...');
    }
    //what it will return
    return res.json(updatedOrder);
}));



router.delete('/:orderId', asyncHandler(async function (req, res) {
    const orderId = req.params.orderId;
    await db.Orderitem.destroy({ where: { orderId: orderId } });
    await db.Order.destroy({ where: { id: orderId } });
    return res.json(orderId);
}));

module.exports = router;