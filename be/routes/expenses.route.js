const express = require('express');
const router = express.Router();
const controllers = require('../controllers/expenses.controller');
const validator = require('../middlewares/validator')
const {expenseFormSchema} = require('../validators/expenses.validator');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', verifyToken.isLogin, validator(expenseFormSchema), controllers.formExpense);
router.get('/:month/:year', verifyToken.isLogin, controllers.getMonthlyExpenses);
router.get('/', verifyToken.isLogin, controllers.getAll);
router.get('/:id', verifyToken.isLogin, controllers.getDetail);
router.put('/:id', verifyToken.isLogin, validator(expenseFormSchema), controllers.update);
router.delete('/:id', verifyToken.isLogin, controllers.delete);
module.exports = router;