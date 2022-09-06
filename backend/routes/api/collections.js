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
            required: true
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
            required: true
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

    const detailObj = await db.Collection.build(tempDetail);
    const newObj = await detailObj.save();

    return res.json(newObj);
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


//need separate routes for deleting and adding items to collections


module.exports = router;