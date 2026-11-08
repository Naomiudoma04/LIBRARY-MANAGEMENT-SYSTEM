const router = require('express').Router();

const {
    createBorrowing,
    getAllBorrowings,
    getBorrowingById,
    updateBorrowing,
    deleteBorrowing
} = require('../controllers/borrowingController');
const {
    createBorrowingValidation,
    updateBorrowingValidation
} = require('../middlewares/borrowingValidation');

router.post('/createBorrowing', createBorrowingValidation, createBorrowing);
router.get('/allBorrowings', getAllBorrowings);
router.get('/:id', getBorrowingById);
router.put('/:id', updateBorrowingValidation, updateBorrowing);
router.delete('/:id', deleteBorrowing);

module.exports = router;

