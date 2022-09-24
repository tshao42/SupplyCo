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


//logic:
//basic CRUD function for collection
//then there are dedicated routes to check the relationship between a product and a collection
router.get('/:collectionId', asyncHandler(async function(req,res){
    // console.trace(`hit collection individual router`)
    const collectionId = req.params.collectionId;
    // const emptyCheck = await db.Collectionitem.findAll({
    //     where: {
    //         collectionId: collectionId
    //     }
    // });
    // if (emptyCheck.length == 0){
    //     await db.Collection.destroy({where: {id: collectionId}});
    //     return res.json('empty collection...')
    // }

    const collection = await db.Collection.findAll({
        where: {
            id: collectionId
        }, include:{
            model: db.Collectionitem,
            required: false
        }
    })
    return res.json(collection);
}))

//READ: all by one user
router.get('/users/:userId', asyncHandler(async function(req,res){
    const userId = req.params.userId;
    const collection = await db.Collection.findAll({
        where: {
            userId: userId
        },
        include:{
            model: db.Collectionitem,
            required: false
        }
    });
    return res.json(collection);
}))

//CREATE
router.post('/', asyncHandler(async function(req,res) {
    const temp = await req.body;
    const tempDetail = {
        userId: temp.userId,
        collectionName: temp.collectionName
    }

    const detailObj = await db.Collection.create(tempDetail);

    return res.json(detailObj);
}))


//DELETE
router.delete('/:collectionId', asyncHandler(async function (req, res) {
    const collectionId = req.params.collectionId;
    await db.Collectionitem.destroy({where:{collectionId: collectionId}});
    await db.Collection.destroy({ where: {id: collectionId }});
    return res.json(collectionId);
}))
//EDIT
//this includes the editing of basic information
router.put('/:collectionId', asyncHandler(async function(req, res){
    const collectionId = req.params.collectionId;
    const collection = await db.Collection.findByPk(collectionId);
    const temp = await req.body;
    await collection.update(temp);
    const updatedCollection = await db.Collection.findAll({
        where: {
            id: collectionId
        },
        include: {
            model: db.Collectionitem,
            required: true
        }
    })

    return res.json(updatedCollection);
}))

//need separate routes for deleting and adding items to collections

router.post('/items', asyncHandler(async function (req, res){
    const temp = await req.body;
    console.log("line 101 from collection.js")
    console.table(temp);

    const selector = {
        where: {
            productId: temp.product.id, 
            collectionId: temp.collectionId
        }
    };

    console.table(selector);

    // console.trace('now posting item')
    await db.Collectionitem.findOrCreate(selector);
    const editedObj = await db.Collection.findByPk(
        temp.collectionId,
        {
            include:{
            model: db.Collectionitem,
            required: true
            }
        });
    return res.json(editedObj);
}))

router.delete('/items/:collectionId/:productId', asyncHandler(async function (req, res) {
    const productId = req.params.productId;
    const collectionId = req.params.collectionId;
    await db.Collectionitem.destroy({
        where:{
            collectionId: collectionId,
            productId: productId
        }
    })

    const updatedCollection = await db.Collection.findAll({
        where: {
            id: collectionId
        },
        include: {
            model: db.Collectionitem,
            required: true
        }
    })

    return res.json(updatedCollection);
}))

module.exports = router;