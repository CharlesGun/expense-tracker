const categoryService = require('../services/categories.service');

module.exports = {
  getAllCategories: async (req, res, next) => {
    try {
      const categories = await categoryService.getAll();
      res.status(200).json({
        status: true,
        message: 'Categories retrieved successfully',
        data: categories
      });
    } catch (error) {
      next(error);
    }
  },
};