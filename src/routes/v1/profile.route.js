const express = require('express');
const router = express.Router();
const profileController = require('../../controllers/profile.controller');
const verifyToken = require('../../middlewares/verifytoken');
router.post('/', verifyToken, profileController);

module.exports = router;
