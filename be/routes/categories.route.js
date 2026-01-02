const express = require('express');
const router = express.Router();
const controllers = require('../controllers/categories.controller');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', verifyToken.isLogin, controllers.getAllCategories)
module.exports = router;