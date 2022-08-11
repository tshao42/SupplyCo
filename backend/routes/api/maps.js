const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const cookieParser = require("cookie-parser")
const { setTokenCookie, requireAuth, restoreUser } = require("../../utils/auth");
router.use(cookieParser());
router.use(express.urlencoded({ extended: false }));
const db = require('../../db/models');
const e = require('express');

router.get('/', asyncHandler(async function (req, res) {
    return res.json(process.env.GOOGLE_MAP_API_KEY);
}));

module.exports = router;