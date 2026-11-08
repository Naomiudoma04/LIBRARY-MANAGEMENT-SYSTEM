const Joi = require('joi');

const createCategoryValidation = (req, res, next) => {
  const categorySchema = Joi.object({
    Name: Joi.string()
      .valid('Thriller', 'Horror', 'Biography', 'Drama', 'Sci-Fi', 'Comedy', 'True Crime', 'Cookbooks', 'Romance')
      .required()
      .messages({
        'any.required': 'Category name is required',
        'any.only': 'Choose a valid category name'
      }),
    description: Joi.string().trim().min(1).max(65535).required().messages({
      'any.required': 'Category description is required',
      'string.empty': 'Category description cannot be empty',
      'string.max': 'Category description cannot exceed 65535 characters'
    })
  });

  const { error } = categorySchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    });
  }

  next();
};

const updateCategoryValidation = (req, res, next) => {
  const categorySchema = Joi.object({
    Name: Joi.string().valid('Thriller', 'Horror', 'Biography', 'Drama', 'Sci-Fi', 'Comedy', 'True Crime', 'Cookbooks', 'Romance'),
    description: Joi.string().trim().min(1).max(65535)
  }).min(1);

  const { error } = categorySchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    });
  }

  next();
};

module.exports = {
  createCategoryValidation,
  updateCategoryValidation
};
