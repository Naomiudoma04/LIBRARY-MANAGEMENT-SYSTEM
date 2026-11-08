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
      const newBook = await book.create({
         title,
         author,
         isbn,
         publisher,
         published_year,
         copies_available,
         category_id,
      });
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

// Functions for MANAGING books (DECREASED BOOKS & INCREASE BOOKS
//  & AVAILABLE BOOKS)

// 01. DECREASED BOOKS

// DECREASE THE AVAILABLE BOOK QUANTITY AFTER CHECKING THAT THE BOOK EXISTS AND IS AVAILABLE.
const decreasingBook = async (req, res) => {
   try {
      // RETRIEVING n CHECKING IF THE BOOK EVEN EXIST FIRST
      let copiesAvailable = 0;
      const { id } = req.params;
      const findBook = await book.findByPk(id);

      // IF NO BOOK AVAILABLE, STOP THE REST COMMAND.
      if (!findBook) {
         return res.status(404).json({ message: "book not found" });
      }
      // BUT IF AVAILABLE, FIND THE AVAILABLE COPIES
      else {
         copiesAvailable = findBook.copies_available;
      }

      // CHECKING IF THE BOOK IS AVAILABLE OR NOT
      if (copiesAvailable === 0) {
         return res.status(400).json({
            message: "not available",
         });

         // IF BOOK EXIST TAKE OUT AND DECREASE BY 1
      } else if (copiesAvailable > 0) {
         copiesAvailable = copiesAvailable - 1;

         // UPDATED BOOK LIBRARY AND UPDATE COPIES_AVAILABLE ATTRIBUTE TO ITS LATEST copiesAvailable
         await findBook.update({
            copies_available: copiesAvailable,
         });

         return res.status(200).json({
            message: `Book found: The amount of Books left: ${copiesAvailable}`,
            data: findBook,
         });
      }
   } catch (error) {
      return res.status(500).json({
         message: "cant find book ID",
         error: error.message,
      });
   }
};

// INCREASE AVAILABLE COPIES

// INCREASE THE AVAILABLE BOOK QUANTITY BY ONE.
const increasingBook = async (req, res) => {
   try {
      let copiesAvailable = 0;
      const { id } = req.params;
      const findBook = await book.findByPk(id);

      // CHECK IF THE BOOK EXISTS
      if (!findBook) {
         return res.status(404).json({
            message: "book not found",
         });
      }

      // BUT IF AVAILABLE, USE THE FINDBOOK WHICH CONTAINS THE ID_TO GO FIND THE COPIES AVAILABLE IN THE copies_available ATTRIBUTE AND SHOW US ITs VALUE
      copiesAvailable = findBook.copies_available;

      // INCREASE THE AVAILABLE COPIES BY 1
      copiesAvailable += 1;

      // UPDATE THE BOOK QUANTITY IN THE DATABASE
      await findBook.update({
         copies_available: copiesAvailable,
      });

      return res.status(200).json({
         message: "Book Updated to library successfully",
         data: copiesAvailable,
      });
   } catch (error) {
      return res.status(500).json({
         message: "cant find book ID",
         error: error.message,
      });
   }
};

// CHECK AVAILABILITY
const checkBookAvailability = async (req, res) => {
   try {
      let copiesAvailable = 0;
      const { id } = req.params;
      const findBook = await book.findByPk(id);

      // CHECK IF THE BOOK EXISTS
      if (!findBook) {
         return res.status(404).json({
            message: "book not found",
         });
      }

      // RETRIEVE THE AVAILABLE COPIES
      copiesAvailable = findBook.copies_available;

      // CHECK IF THE BOOK IS AVAILABLE OR NOT
      if (copiesAvailable > 0) {
         return res.status(200).json({
            message: "Book is available",
            data: copiesAvailable,
         });
      } else if (copiesAvailable === 0) {
         return res.status(200).json({
            message: "Book is currently unavailable",
            data: copiesAvailable,
         });
      }
   } catch (error) {
      return res.status(500).json({
         message: "cant check book availability",
         error: error.message,
      });
   }
};

module.exports = {
   createBook,
   getAllBooks,
   getBook,
   updateBook,
   deleteBook,

   checkBookAvailability,
   increasingBook,
   decreasingBook,
};
