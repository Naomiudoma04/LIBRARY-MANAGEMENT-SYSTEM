const router = require("express").Router()
const {createCategoryValidation, updateCategoryValidation} = require("../middlewares/categoryValidation")
const {createCategory, getOne, updateCategory} = require("../controllers/categoryController")

router.post("/create", createCategoryValidation, createCategory)
router.get("/getOne/:id", getOne)
router.put("/update/:id", updateCategoryValidation, updateCategory)

module.exports = router
