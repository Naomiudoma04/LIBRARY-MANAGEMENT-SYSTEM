const { book } = require("../models");

//  Create a new book.
const createBook = async (req, res) => {
   try {
      const {
         title,
         author,
         isbn,
         publisher,
         published_year,
         copies_available,
         category_id,
      } = req.body;

      // checking if book exist by ISBN
      const existingBook = await book.findOne({ where: { isbn } });

      if (existingBook) {
         return res.status(409).json({
            message: "A book with this ISBN already exists",
         });
      }
      // But if it doesn't exist, create a new one
      const newBook = await book.create(
         title,
         author,
         isbn,
         publisher,
         published_year,
         copies_available,
         category_id,
      );
      res.status(201).json({
         message: "Book created successfully",
         data: newBook,
      });
   } catch (error) {
      res.status(500).json({
         message: error.message,
      });
   }
};

//  Get all books.
const getAllBooks = async (req, res) => {
   try {
      const findAll = await book.findAll();
      return res.status(200).json({
         message: `Here are all the books found: ${findAll.length}`,
         data: findAll,
      });
   } catch (error) {
      res.status(500).json({
         message: error.message,
      });
   }
};

// Get a single book by ID.
const getBook = async (req, res) => {
   try {
      const { id } = req.params;
      const bookExist = await book.findByPk(id);
      if (bookExist) {
         return res.status(200).json({
            message: "Book of this record is found",
            data: bookExist,
         });
      }
      return res.status(404).json({
         message: "No Book of this record is found",
      });
   } catch (error) {
      res.status(500).json({
         message: error.message,
      });
   }
};

//  Update an existing book.
const updateBook = async (req, res) => {
   try {
      const {
         title,
         author,
         isbn,
         publisher,
         published_year,
         copies_available,
         category_id,
      } = req.body;
      const { id } = req.params;
      const checkExisting = await book.findByPk(id);
      if (!checkExisting) {
         return res.status(404).json({ message: `Book not found` });
      }

      const updateAll = await book.update(
         {
            author,
            isbn,
            publisher,
            published_year,
            copies_available,
            category_id,
         },
         { where: { id } },
      );
      res.status(200).json({
         message: "Book(s) Updated successfully",
         data: updateAll,
      });
   } catch (error) {
      res.status(500).json({
         message: error.message,
      });
   }
};

// Delete a book
const deleteBook = async (req, res) => {
   try {
      const { id } = req.params;
      const checkingExist = await book.findOne({ where: { id: id } });
      if (!checkingExist) {
         return res.status(404).json({
            message: "Your book no dey here",
         });
      }
      // But if book does exist,find it by id as usual and sniper him via ID.

      const dumpBook = await book.destroy({ where: { id: id } });
      res.status(200).json({
         message: "Book deleted successfully",
      });
   } catch (error) {
      res.status(500).json({
         message: error.message,
      });
   }
};

module.exports = {
   createBook,
   getAllBooks,
   getBook,
   updateBook,
   deleteBook,
};
