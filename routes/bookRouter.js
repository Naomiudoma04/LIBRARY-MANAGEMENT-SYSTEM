const router = require("express").Router();
const {createBookValidation,updateBookValidation} = require("../middlewares/bookValidation");

const {
   createBook,
   getAllBooks,
   getBook,
   updateBook,
   deleteBook,
   checkBookAvailability,
   increasingBook,
   decreasingBook,
} = require("../controllers/bookController");

// Book CRUD Operatuons

router.get("/books/:id", getBook);
router.get("/books", getAllBooks);
router.post("/books", createBookValidation, createBook);
router.put("/books/:id", updateBookValidation,updateBook);
router.delete("/books/:id", deleteBook);

// BOOK QUANTITY AND AVAILABILITY ROUTES,To avoid conlict i added extra descriptive path name
router.get("/books/:id/availability", checkBookAvailability);
router.put("/books/:id/increase", increasingBook);
router.put("/books/:id/decrease", decreasingBook);

module.exports = router;
