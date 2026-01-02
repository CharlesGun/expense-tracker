const Joi = require('joi');

const expenseFormSchema = Joi.object({
  amount: Joi.number()
    .integer()
    .min(0)
    .required(),

  date: Joi.date()
    .required(),

  description: Joi.string()
    .max(255)
    .allow(null)
    .empty(''),
  
  categoryId: Joi.number()
    .integer()
    .allow(null),

  categoryName: Joi.string()
    .max(50)
    .allow(null)
    .empty('')
})
  .or('categoryId', 'categoryName');

module.exports = {
  expenseFormSchema
};
