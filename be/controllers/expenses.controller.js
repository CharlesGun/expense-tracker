const expensesService = require('../services/expenses.service');

module.exports = {
  formExpense: async (req, res, next) => {
    try {
      const {amount, date, description, categoryId, categoryName} = req.body;
      const userId = req.user.id;

      const expenseData = {
        amount,
        date,
        description,
        categoryId,
        categoryName,
        userId
      };

      const newExpense = await expensesService.addExpense(expenseData);

      res.status(201).json({
        status: true,
        message: 'Expense recorded successfully',
        data: newExpense
      });
    } catch (error) {
      next(error);
    }
  },
  getMonthlyExpenses: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { month, year } = req.params;

      const expenses = await expensesService.getMonthlyDetail(userId, month, year);

      res.status(200).json({
        status: true,
        message: 'Monthly expenses retrieved successfully',
        data: expenses
      });
    } catch (error) {
      next(error);
    }
  },
  getThisMonth: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const date = new Date();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const expenses = await expensesService.getMonthlyDetail(userId, month, year);

      res.status(200).json({
        status: true,
        message: 'Monthly expenses retrieved successfully',
        data: expenses
      });
    } catch (error) {
      next(error);
    }
  },
  getDetail: async (req, res, next) => {
    try {
      const id = req.params.id;
      const userId = req.user.id;
      const expenses = await expensesService.getOne(id, userId);

      res.status(200).json({
        status: true,
        message: 'Monthly expenses detail retrieved successfully',
        data: expenses
      });
    } catch (error) {
      next(error);
    }
  },
  getAll: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const expenses = await expensesService.getAllByUser(userId);

      res.status(200).json({
        status: true,
        message: 'Monthly expenses retrieved successfully',
        data: expenses
      });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const {amount, date, description, categoryId, categoryName} = req.body;
      const id = req.params.id;
      const userId = req.user.id;

      const expenseData = {
        amount,
        date,
        description,
        categoryId,
        categoryName,
        userId
      };

      const updatedExpense = await expensesService.updateExpense(id, userId, expenseData);

      res.status(200).json({
        status: true,
        message: 'Expense updated successfully'
      });
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const id = req.params.id;
      const userId = req.user.id;

      await expensesService.deleteExpense(id, userId);

      res.status(200).json({
        status: true,
        message: 'Expense deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}