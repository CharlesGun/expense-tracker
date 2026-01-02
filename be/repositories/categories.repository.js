const {categories} = require('../models');

module.exports = {
  create: (categoryData) => {
    return categories.create(categoryData);
  },
  getCategoryById: (id) => {
    return categories.findOne({ where: { id } });
  },
  findByName: (name) => {
    return categories.findOne({ where: { name } });
  },
  getAllCategories: () => {
    return categories.findAll();
  },
  updateCategory: (id, updatedData) => {
    return categories.update(updatedData, { where: { id } });
  },
  deleteCategory: (id) => {
    return categories.destroy({ where: { id } });
  }
}