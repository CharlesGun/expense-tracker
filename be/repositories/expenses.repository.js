const { Op } = require('sequelize');
const {expenses, categories, sequelize} = require('../models');


module.exports = {
  addExpense: (expenseData) => {
    return expenses.create(expenseData);
  },
  getExpenseById: (id, userId) => {
    return expenses.findOne({ where: { id, user_id: userId } });
  },
  getExpensesByUserId: (userId) => {
    return expenses.findAll({ where: { user_id: userId }, include: [{model: categories}], order: [['date', 'DESC'], ['createdAt', 'DESC']] });
  },
  updateById: (id, updatedData) => {
    return expenses.update(updatedData, { where: { id } });
  },
  deleteById: (id) => {
    return expenses.destroy({ where: { id } });
  },
  findMonthlyByUser: (userId, month, year) => {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);
    return expenses.findAll({
      where: {
        user_id: userId,
        date: {
          [Op.gte]: startDate,
          [Op.lt]: endDate
        }
      },
      include: [{model: categories}],
      order: [['date', 'ASC']]
    });
  },
  // sumByCategory(userId, month, year) {
  //   const start = new Date(year, month - 1, 1)
  //   const end = new Date(year, month, 1)

  //   return expenses.findAll({
  //     attributes: [
  //       'category_id',
  //       [sequelize.fn('SUM', sequelize.col('amount')), 'total']
  //     ],
  //     where: {
  //       user_id: userId,
  //       date: {
  //         [Op.gte]: start,
  //         [Op.lt]: end
  //       }
  //     },
  //     include: [{ model: categories, attributes: ['name'] }],
  //     group: ['category_id', 'categories.id']
  //   })
  // },
  // totalMonthlyByUser: async (userId, month, year) => {
  //   const start = new Date(year, month - 1, 1);
  //   const end = new Date(year, month, 1);

  //   const result = await expenses.findOne({
  //     attributes: [
  //       [sequelize.fn('SUM', sequelize.col('amount')), 'total']
  //     ],
  //     where: {
  //       user_id: userId,
  //       date: {
  //         [Op.gte]: start,
  //         [Op.lt]: end
  //       }
  //     }
  //   });

  //   return result.get('total') ? Number(result.get('total')) : 0;
  // }
} 