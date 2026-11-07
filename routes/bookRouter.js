const router = require("express").Router();

const {
   createBook,
   getAllBooks,
   getBook,
   updateBook,
   deleteBook,
} = require("../controllers/bookController");

router.get("/books/:id", getBook);
router.get("/books", getAllBooks);
router.post("/books", createBook);
router.put("/books/:id", updateBook);
router.delete("/books/:id", deleteBook);

module.exports = router;
