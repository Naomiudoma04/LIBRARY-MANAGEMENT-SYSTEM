// VALIDATE BOOK DETAILS FOR CREATE AND UPDATE
const Joi = require("joi");

// CREATE BOOK VALIDATION
const createBookValidation = (req, res, next) => {
   const schema = Joi.object({
      title: Joi.string()
         .trim()
         .min(1)
         .required()
         .messages({
            "any.required": "Book title is required.",
            "string.empty": "Book title cannot be empty.",
         }),

      author: Joi.string()
         .trim()
         .pattern(/^[A-Za-z .'-]+$/)
         .required()
         .messages({
            "any.required": "Author name is required.",
            "string.empty": "Author name cannot be empty.",
            "string.pattern.base":
               "Author name can only contain letters, spaces, periods, apostrophes and hyphens.",
         }),

      isbn: Joi.string()
         .trim()
         .pattern(/^[0-9Xx-]+$/)
         .required()
         .messages({
            "any.required": "ISBN is required.",
            "string.empty": "ISBN cannot be empty.",
            "string.pattern.base":
               "ISBN can only contain numbers, hyphens and the letter X.",
         }),

      publisher: Joi.string()
         .trim()
         .pattern(/^[A-Za-z .'-]+$/)
         .required()
         .messages({
            "any.required": "Publisher name is required.",
            "string.empty": "Publisher name cannot be empty.",
            "string.pattern.base":
               "Publisher name can only contain letters, spaces, periods, apostrophes and hyphens.",
         }),

      published_year: Joi.string()
         .trim()
         .pattern(/^\d{4}$/)
         .required()
         .messages({
            "any.required": "Published year is required.",
            "string.empty": "Published year cannot be empty.",
            "string.pattern.base":
               "Published year must contain exactly four digits.",
         }),

      copies_available: Joi.number().integer().min(0).required().messages({
         "any.required": "Copies available is required.",
         "number.base": "Copies available must be a number.",
         "number.integer": "Copies available must be a whole number.",
         "number.min": "Copies available cannot be less than zero.",
      }),

      category_id: Joi.string()
         .guid({ version: "uuidv4" })
         .required()
         .messages({
            "any.required": "Category ID is required.",
            "string.empty": "Category ID cannot be empty.",
            "string.guid": "Category ID must be a valid UUID.",
         }),
   });

   const { error } = schema.validate(req.body);

   if (error) {
      return res.status(400).json({
         message: error.details[0].message,
      });
   }

   next();
};

// UPDATE BOOK VALIDATION
const updateBookValidation = (req, res, next) => {
   const schema = Joi.object({
      author: Joi.string()
         .trim()
         .pattern(/^[A-Za-z .'-]+$/)
         .required()
         .messages({
            "any.required": "Author name is required.",
            "string.empty": "Author name cannot be empty.",
            "string.pattern.base":
               "Author name can only contain letters, spaces, periods, apostrophes and hyphens.",
         }),

      isbn: Joi.string()
         .trim()
         .pattern(/^[0-9Xx-]+$/)
         .required()
         .messages({
            "any.required": "ISBN is required.",
            "string.empty": "ISBN cannot be empty.",
            "string.pattern.base":
               "ISBN can only contain numbers, hyphens and the letter X.",
         }),

      publisher: Joi.string()
         .trim()
         .pattern(/^[A-Za-z .'-]+$/)
         .required()
         .messages({
            "any.required": "Publisher name is required.",
            "string.empty": "Publisher name cannot be empty.",
            "string.pattern.base":
               "Publisher name can only contain letters, spaces, periods, apostrophes and hyphens.",
         }),

      published_year: Joi.string()
         .trim()
         .pattern(/^\d{4}$/)
         .required()
         .messages({
            "any.required": "Published year is required.",
            "string.empty": "Published year cannot be empty.",
            "string.pattern.base":
               "Published year must contain exactly four digits.",
         }),

      copies_available: Joi.number().integer().min(0).required().messages({
         "any.required": "Copies available is required.",
         "number.base": "Copies available must be a number.",
         "number.integer": "Copies available must be a whole number.",
         "number.min": "Copies available cannot be less than zero.",
      }),

      category_id: Joi.string()
         .guid({ version: "uuidv4" })
         .required()
         .messages({
            "any.required": "Category ID is required.",
            "string.empty": "Category ID cannot be empty.",
            "string.guid": "Category ID must be a valid UUID.",
         }),
   });

   const { error } = schema.validate(req.body);

   if (error) {
      return res.status(400).json({
         message: error.details[0].message,
      });
   }

   next();
};

module.exports = {
   createBookValidation,
   updateBookValidation,
};
