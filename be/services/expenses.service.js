const expensesRepo = require('../repositories/expenses.repository');
const categoryRepo = require('../repositories/categories.repository');

module.exports = {
  addExpense: async (expenseData) => {
    if(!expenseData.categoryId && !expenseData.categoryName){
      const error = new Error('Either categoryId or categoryName must be provided');
      error.statusCode = 400;
      throw error;
    }
    if(expenseData.categoryId == null && expenseData.categoryName != null){
      const formatedCategoryName = expenseData.categoryName.trim().toLowerCase();
      let category = await categoryRepo.findByName(formatedCategoryName);
      if(!category){
        category = await categoryRepo.create({name: formatedCategoryName});
      }
      expenseData.categoryId = category.id;
    }

    const data = {
      amount: expenseData.amount,
      date: expenseData.date,
      description: expenseData.description,
      user_id: expenseData.userId,
      category_id: expenseData.categoryId
    };

    return await expensesRepo.addExpense(data);
  },
  getMonthlyDetail: async (userId, month, year) => {
    return await expensesRepo.findMonthlyByUser(userId, month, year);
  },
  getAllByUser: async (userId) => {
    return await expensesRepo.getExpensesByUserId(userId);
  },
  getOne: async (id, userId) => {
    const expense = await expensesRepo.getExpenseById(id, userId);
    if (!expense) {
      const error = new Error('Expense not found');
      error.statusCode = 404;
      throw error;
    }
    return expense;
  },
  // sumMonthlyExpenses: async (userId, month, year) => {
  //   const expenses = await expensesRepo.sumByCategory(userId, month, year);
  //   const total = await expensesRepo.totalMonthlyByUser(userId, month, year);
  //   return { expenses, total };
  // },
  updateExpense: async (id, userId, updatedData) => {
    const expense = await expensesRepo.getExpenseById(id, userId);
    if (!expense) {
      const error = new Error('Expense not found');
      error.statusCode = 404;
      throw error;
    }
    if(!updatedData.categoryId && !updatedData.categoryName){
      const error = new Error('Either categoryId or categoryName must be provided');
      error.statusCode = 400;
      throw error;
    }
    if(updatedData.categoryId == null && updatedData.categoryName != null){
      const formatedCategoryName = updatedData.categoryName.trim().toLowerCase();
      let category = await categoryRepo.findByName(formatedCategoryName);
      if(!category){
        category = await categoryRepo.create({name: formatedCategoryName});
      }
      updatedData.categoryId = category.id;
    }

    const data = {
      amount: updatedData.amount,
      date: updatedData.date,
      description: updatedData.description,
      user_id: updatedData.userId,
      category_id: updatedData.categoryId
    };
    return await expensesRepo.updateById(id, data);
  },
  deleteExpense: async (id, userId) => {
    const expense = await expensesRepo.getExpenseById(id, userId);
    if (!expense) {
      const error = new Error('Expense not found');
      error.statusCode = 404;
      throw error;
    }

    return await expensesRepo.deleteById(id);
  }
}