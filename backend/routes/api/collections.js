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
    const emptyCheck = await db.Collectionitem.findAll({
        where: {
            collectionId: collectionId
        }
    });
    if (emptyCheck.length == 0){
        await db.Collection.destroy({where: {id: collectionId}});
        return res.json('empty collection...')
    }

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
module.exports = router;