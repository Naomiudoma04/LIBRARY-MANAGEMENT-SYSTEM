const Joi = require('joi');

const createBorrowingValidation = (req, res, next) => {
  const borrowingSchema = Joi.object({
    book_id: Joi.string().guid({ version: 'uuidv4' }).required().messages({
      'any.required': 'Book ID is required',
      'string.guid': 'Book ID must be a valid UUID'
    }),
    libraryMember_id: Joi.string().guid({ version: 'uuidv4' }).required().messages({
      'any.required': 'Library member ID is required',
      'string.guid': 'Library member ID must be a valid UUID'
    }),
    due_date: Joi.date().iso().greater('now').required().messages({
      'any.required': 'Due date is required',
      'date.base': 'Due date must be a valid date',
      'date.format': 'Due date must use ISO date format',
      'date.greater': 'Due date must be in the future'
    })
  });

  const { error } = borrowingSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    });
  }

  next();
};

const updateBorrowingValidation = (req, res, next) => {
  const borrowingSchema = Joi.object({
    status: Joi.string().valid('Borrowed', 'Returned', 'Overdue').messages({
      'any.only': 'Status must be Borrowed, Returned or Overdue'
    }),
    due_date: Joi.date().iso().greater('now').messages({
      'date.base': 'Due date must be a valid date',
      'date.format': 'Due date must use ISO date format',
      'date.greater': 'Due date must be in the future'
    }),
    returned_date: Joi.date().iso().allow(null).messages({
      'date.base': 'Returned date must be a valid date',
      'date.format': 'Returned date must use ISO date format'
    })
  }).min(1);

  const { error } = borrowingSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    });
  }

  next();
};

module.exports = {
  createBorrowingValidation,
  updateBorrowingValidation
};
