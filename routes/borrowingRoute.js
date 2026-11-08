const router = require('express').Router();

const {
    createBorrowing,
    getAllBorrowings,
    getBorrowingById,
    updateBorrowing,
    deleteBorrowing
} = require('../controllers/borrowingController');

router.post('/createBorrowing', createBorrowing);
router.get('/allBorrowings', getAllBorrowings);
router.get('/:id', getBorrowingById);
router.put('/:id', updateBorrowing);
router.delete('/:id', deleteBorrowing);

module.exports = router;

