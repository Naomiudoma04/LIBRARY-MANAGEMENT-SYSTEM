const Joi = require('joi');

const createLibraryMemberValidation = (req, res, next) => {
  const libraryMemberSchema = Joi.object({
    first_name: Joi.string()
      .trim()
      .pattern(new RegExp('^[A-Za-z]{3,}$'))
      .required()
      .messages({
        'any.required': 'First name is required',
        'string.empty': 'First name cannot be empty',
        'string.pattern.base': 'First name must contain at least 3 letters.'
      }),
    last_name: Joi.string()
      .trim()
      .pattern(new RegExp('^[A-Za-z]{3,}$'))
      .required()
      .messages({
        'any.required': 'Last name is required',
        'string.empty': 'Last name cannot be empty',
        'string.pattern.base': 'Last name must contain at least 3 letters.'
      }),
    email: Joi.string().trim().email().required().messages({
      'any.required': 'Email is required',
      'string.empty': 'Email cannot be empty',
      'string.email': 'Email must be a valid email address'
    }),
    password: Joi.string()
      .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'))
      .required()
      .messages({
        'any.required': 'Password is required',
        'string.pattern.base': 'Password must contain at least one lowercase, uppercase, digit and special character and must be minimum of 8 characters'
      }),
    gender: Joi.string().valid('Male', 'Female').required().messages({
      'any.required': 'Gender is required',
      'any.only': 'Gender must be Male or Female'
    }),
    phone_number: Joi.string()
      .trim()
      .pattern(/^\+?[0-9][0-9\s().-]{6,19}$/)
      .required()
      .messages({
        'any.required': 'Phone number is required',
        'string.pattern.base': 'Enter a valid phone number'
      }),
    address: Joi.string().trim().min(5).max(255).required().messages({
      'any.required': 'Address is required',
      'string.empty': 'Address cannot be empty',
      'string.min': 'Address must be at least 5 characters long',
      'string.max': 'Address cannot exceed 255 characters'
    })
  });

  const { error } = libraryMemberSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    });
  }

  next();
};

const updateLibraryMemberValidation = (req, res, next) => {
  const libraryMemberSchema = Joi.object({
    first_name: Joi.string().trim().pattern(new RegExp('^[A-Za-z]{3,}$')),
    last_name: Joi.string().trim().pattern(new RegExp('^[A-Za-z]{3,}$')),
    email: Joi.string().trim().email(),
    password: Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')),
    gender: Joi.string().valid('Male', 'Female'),
    phone_number: Joi.string().trim().pattern(/^\+?[0-9][0-9\s().-]{6,19}$/),
    address: Joi.string().trim().min(5).max(255)
  }).min(1);

  const { error } = libraryMemberSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    });
  }

  next();
};

module.exports = {
  createLibraryMemberValidation,
  updateLibraryMemberValidation
};
