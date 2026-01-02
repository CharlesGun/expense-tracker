const categoriesRepo = require('../repositories/categories.repository');

module.exports = {
  getAll: () => {
    return categoriesRepo.getAllCategories();
  },
};