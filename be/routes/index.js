const express = require('express');
const router = express.Router();
const auth = require('./authentication.route');
const expenses = require('./expenses.route');
const categories = require('./categories.route');

router.use('/auth', auth);
router.use('/expenses', expenses);
router.use('/categories', categories);

module.exports = router;
